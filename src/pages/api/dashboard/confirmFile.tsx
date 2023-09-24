import { getHandler, messageSuccess, messageError } from "@/utils/handlers";
import { executeQuery } from "@/lib/db";
import { insertLogs, sendEmail } from "@/utils/shared";
const sql = require("sql-template-strings");
import { db } from "@/lib/db";

export default getHandler(true).put(async (req, res) => {
  try {
    const data = req.body;

    await db
      .transaction()
      .query(() => {
        if (data.last) {
          return [
            `update projects set status = 7 , info = 'completed' where project_id = ? and customer_id = ? and status = 6 and paid = 1 `,
            [data.projectId, req.userId],
          ];
        } else {
          return [
            `update projects set status = (
                CASE
                WHEN (
                    SELECT serviceDuration
                    FROM services s
                    WHERE s.id = ${data.serviceId + 1} AND s.serviceStatus <> 8
                ) IS NULL
                THEN 7
                ELSE 2
            END            
            )           
            , info = ( 
                CASE
                WHEN (
                    SELECT serviceDuration
                    FROM services s
                    WHERE s.id = ${data.serviceId + 1} AND s.serviceStatus <> 8
                ) IS NULL
                THEN 'Completed'
                ELSE (
                    SELECT serviceDuration
                    FROM services s
                    WHERE s.id = ${data.serviceId + 1} AND s.serviceStatus <> 8
                )
            END

             )  where project_id = ? and customer_id = ? and status = 6 and paid = 1 `,
            [data.projectId, req.userId],
          ];
        }
      })
      .query(
        sql`update services set serviceStatus = 7 , confirmed = 1 where projectId = ${data.projectId} and userId =${req.userId} and id = ${data.serviceId} and serviceStatus = 6 and confirmed = 0 `
      )
      .query((affected: { affectedRows: number }) => {
        if (affected.affectedRows > 0) {
          return [
            ` update services set serviceStatus = 2  where projectId = ? and userId = ? and id = ? and serviceStatus = 5 and confirmed = 0 `,
            [data.projectId, req.userId, data.serviceId + 1],
          ];
        } else {
          return null;
        }
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
    res.json(messageError(500, error.message));
    insertLogs(
      "api",
      "put confirmFile",
      "dashboard",
      error.message,
      req.userId
    );
  }
});
