import { executeQuery } from "@/lib/db";
import { configs } from "@/utils/config";
import { getHandler, messageSuccess, messageError } from "@/utils/handlers";
import { sendEmail, insertLogs } from "@/utils/shared";
import { isEmpty } from "lodash";
const sql = require("sql-template-strings");

export default getHandler({ auth: false, urlRateLimit: "unreadApi" }).get(
  async (req, res) => {
    try {
      // Get secret key from query string instead of headers
      const apiKey = req.query.key;

      if (apiKey !== configs.UNREAD_ALERTS_KEY) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const UnreadMsgsConsultants = await executeQuery(sql`
      SELECT DISTINCT u.email
      FROM chatroom c
      INNER JOIN users u ON u.id = c.consultantId
      INNER JOIN projects p ON p.project_id = c.projectId 
      WHERE p.status <> 7 AND p.invoice IS NOT NULL AND c.unread = 0 AND c.msgFrom = 'u' 
      `);

      const UnreadMsgsUsers = await executeQuery(sql`
      SELECT DISTINCT u.email
      FROM chatroom c
      INNER JOIN users u ON u.id = c.userId
      INNER JOIN projects p ON p.project_id = c.projectId 
      WHERE p.status <> 7 AND p.invoice IS NOT NULL AND c.unread = 0 AND c.msgFrom IN ('c' , 'a') 
      `);

      if (
        !UnreadMsgsConsultants.successQuery ||
        !UnreadMsgsUsers.successQuery
      ) {
        throw new Error("Failed to fetch UnreadMsgs.");
      }

      if (!isEmpty(JSON.parse(UnreadMsgsConsultants.data))) {
        await Promise.all(
          JSON.parse(UnreadMsgsConsultants.data).map(
            async (message: { email: string }) => {
              await sendEmail({
                type: "alertUnread",
                text: "you have unread msgs from your user",
                subject: "unread msgs",
                cc: configs.EMAIL_FROM,
                to: message.email,
              });
            }
          )
        );
      }
      if (!isEmpty(JSON.parse(UnreadMsgsUsers.data))) {
        await Promise.all(
          JSON.parse(UnreadMsgsUsers.data).map(
            async (message: { email: string }) => {
              await sendEmail({
                type: "alertUnread",
                text: "you have unread msgs from your consultant",
                subject: "unread msgs",
                to: message.email,
              });
            }
          )
        );
      }

      res.json(messageSuccess(200, true));
    } catch (error: any) {
      res.json(messageError(500, error?.message));
      insertLogs("api from github", "unreadAlert", "chatroom", error?.message);
    }
  }
);
