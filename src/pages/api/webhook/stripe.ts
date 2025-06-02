// pages/api/webhooks/stripe.ts
import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { configs } from "@/utils/config";
import { db, executeQuery } from "@/lib/db";
import { insertLogs } from "@/utils/shared";
const sql = require("sql-template-strings");

// Initialize Stripe client
const stripe = new Stripe(configs.STRIPE_SECRET_KEY!);

// Disable body parser for raw request body parsing
export const config = {
  api: {
    bodyParser: false,
  },
};

// Helper function to parse raw body
async function buffer(req: NextApiRequest) {
  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export default async function checkout(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).end("Method Not Allowed");
  }

  let userId: string | undefined;

  try {
    const buf = await buffer(req);
    const sig = req.headers["stripe-signature"] as string;

    // Verify webhook signature
    const event = stripe.webhooks.constructEvent(
      buf,
      sig,
      configs.STRIPE_WEBHOOK_SECRET!
    );

    // Handle the event based on its type
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const projectId = session.metadata?.projectId;
      const projectType = session.metadata?.projectType;
      const sessionId = session.payment_intent;
      userId = session.metadata?.userId;
      // Start transaction for updating project and service status
      await db
        .transaction()
        .query(
          sql`UPDATE projects 
               SET status = 2, checkoutId = ${sessionId} ,info = (
                 SELECT serviceDuration 
                 FROM services 
                 WHERE projectId = ${projectId} 
                 AND userId = ${userId} 
                 AND statusOrder = 1
               )
               WHERE project_id = ${projectId} 
               AND customer_id = ${userId};`
        )
        .query(
          sql` select consultant_id
               from projects
               WHERE project_id = ${projectId} 
               AND customer_id = ${userId};`
        )

        .query(([{ consultant_id }]: [{ consultant_id: string }]) => {
          const msgFrom = `c`;
          const autoMsg = `Hi and welcome! I am your consultant and I am here to support you throughout your project. Feel free to leave your questions or thoughts anytime — I usually respond within 2 business hours.`;
          if (consultant_id) {
            return [
              sql`INSERT INTO chatroom ( userId, consultantId , message , date , msgFrom , projectId ) VALUES ( ${userId} , ${consultant_id} , ${autoMsg} ,  CONVERT_TZ(NOW(), @@session.time_zone, '+00:00')  , ${msgFrom} , ${projectId} )`,
            ];
          }
          return null;
        })

        .query(() => {
          if (projectType === "i") {
            return [
              `UPDATE services SET serviceStatus = 2 WHERE projectId = ? AND userId = ? and statusOrder in ( 1 , 2 )`,
              [projectId, userId],
            ];
          } else {
            return [
              `UPDATE services SET serviceStatus = 2 WHERE projectId = ? AND userId = ? and statusOrder in ( 1 )`,
              [projectId, userId],
            ];
          }
        })
        .commit();
    }
    if (event.type === "invoice.payment_succeeded") {
      const invoice = event.data.object as Stripe.Invoice;
      const invoicePdfUrl = invoice.invoice_pdf;
      const checkoutId = invoice.payment_intent;
      if (invoicePdfUrl && checkoutId) {
        const updateInvoiceQuery = sql`UPDATE projects 
                                       SET invoice = ${invoicePdfUrl}
                                       WHERE checkoutId= ${checkoutId} ;`;

        const invoiceResult = await executeQuery(updateInvoiceQuery);
        if (!invoiceResult.successQuery) {
          console.error("Database update failed:");
          throw new Error("Failed to update project with invoice PDF URL.");
        }
      }
    }

    // Acknowledge Stripe event
    res.status(200).json({ received: true });
  } catch (error: any) {
    // Log error and return response
    console.error("Error processing webhook:", error.message);
    insertLogs("api", "webhook stripe", "checkout", error.message, userId);
    res.status(400).send(`Webhook Error: ${error.message}`);
  }
}
