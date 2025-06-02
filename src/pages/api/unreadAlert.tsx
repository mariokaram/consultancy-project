import { executeQuery } from "@/lib/db";
import { configs } from "@/utils/config";
import { getHandler, messageSuccess, messageError } from "@/utils/handlers";
import { sendEmail, insertLogs } from "@/utils/shared";
import { isEmpty } from "lodash";
const sql = require("sql-template-strings");

export default getHandler({ auth: false, urlRateLimit: "unreadApi" }).get(
  async (req, res) => {
    try {
      const apiKey = req.headers["x-api-key"];
      if (apiKey !== configs.UNREAD_ALERTS_KEY) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const UnreadMsgsConsultants = await executeQuery(sql`
      SELECT DISTINCT u.email
      FROM consultency.chatroom c
      INNER JOIN users u ON u.id = c.consultantId
      inner join projects p on p.project_id = c.projectId 
      where p.status <> 7 and p.invoice IS NOT NULL and c.unread = 0 and c.msgFrom = 'u' 
      `);
      const UnreadMsgsUsers = await executeQuery(sql`
      SELECT DISTINCT u.email
      FROM consultency.chatroom c
      INNER JOIN users u ON u.id = c.userId
      inner join projects p on p.project_id = c.projectId 
      where p.status <> 7 and p.invoice IS NOT NULL and c.unread = 0 and c.msgFrom in ('c' , 'a') 
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
