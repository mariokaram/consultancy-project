import { getHandler, messageSuccess, messageError } from "@/utils/handlers";
import { insertLogs, sendEmail } from "@/utils/shared";
const sql = require("sql-template-strings");
import { db } from "@/lib/db";

export default getHandler({}).put(async (req, res) => {
  try {
    const data = req.body;

    await db
      .transaction()
      .query(() => {
        return [
          `update projects set status = 2 , info = ( SELECT serviceDuration FROM services s WHERE s.statusOrder = 3  and s.projectId = ${data.projectId} )
           
           where project_id = ? and customer_id = ? and status = 6 and checkoutId IS NOT NULL `,
          [data.projectId, req.userId],
        ];
      })
      .query(
        sql`update services set serviceStatus = 7 , confirmed = 1 where projectId = ${data.projectId} and userId = ${req.userId} and id = ${data.serviceId} and serviceStatus = 6 and confirmed = 0 `
      )
      .query(() => {
        return [
          ` update services set serviceStatus = 7  where projectId = ? and userId = ? and statusOrder <> 3 and serviceStatus = 6 and confirmed = 0 `,
          [data.projectId, req.userId],
        ];
      })
      .query(() => {
        return [
          ` update services set serviceStatus = 2  where projectId = ? and userId = ? and statusOrder = 3 `,
          [data.projectId, req.userId],
        ];
      })
      .commit();
    await db.end();

    await sendEmail({
      type: "fileConfirmation",
      subject: `you have an update for project : ${data.projectId} `,
      heading: "check your dashboard",
      text: `you have an update go to dashboard for user: ${req.userName} , project : ${data.projectId}  `,
    });

    res.json(messageSuccess(200, "", false));
  } catch (error: any) {
    res.json(messageError(500, error?.message));
    insertLogs(
      "api",
      "put confirmIdeaPicking",
      "dashboard",
      error?.message,
      req.userId
    );
  }
});
