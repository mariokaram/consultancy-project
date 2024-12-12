import { getHandler, messageSuccess, messageError } from "@/utils/handlers";
import { insertLogs, insertServiceTable, sendEmail } from "@/utils/shared";
const sql = require("sql-template-strings");
import { db } from "@/lib/db";
import { isEmpty } from "lodash";

export default getHandler({}).post(async (req, res) => {
  try {
    const data = req.body;
    let checkIfUserHasProjectMsg = "";
    let newProjectId = null;
    await db
      .transaction()
      .query(
        sql` select project_id from projects where 
        customer_id = ${req.userId} 
        and project_service = ${data.upgradeProjectType} 
        and invoice is not null
        and status = 7
        and project_id = ${data.projectId} 
        and project_upgraded = 0 `
      )
      .query((r: { project_id: number }) => {
        if (!isEmpty(r)) {
          return [
            `INSERT INTO projects (customer_id, date_creation, project_service, status, info , upgradeFromProjectId , upgradeFromProjectType ) 
                 VALUES (?, CURDATE(), ?, ?, ?, ?, ?) `,
            [
              req.userId,
              data.projectTypeToBeUpgraded,
              3,
              "Preparing quotation to be changed if needed by you nora",
              data.originalProjectId ? data.originalProjectId : data.projectId,
              data.originalProjectType ? data.originalProjectType : data.upgradeProjectType,
            ],
          ];
        } else {
          checkIfUserHasProjectMsg = "Service upgrade failed.";
          return null;
        }
      })
      .query((getInsertLastId: { insertId: number }) => {
        if (checkIfUserHasProjectMsg) {
          return null;
        }

        newProjectId = getInsertLastId.insertId;
        return [
          "insert into services ( serviceName , serviceStatus , statusOrder ,  projectId , userId , serviceImg )  values ?",
          [
            insertServiceTable(
              data.projectTypeToBeUpgraded,
              getInsertLastId.insertId,
              req.userId
            ),
          ],
        ];
      })

      .query(() => {
        if (checkIfUserHasProjectMsg) {
          return null;
        }

        return [
          "update projects set project_upgraded = 1  where project_id = ? and customer_id = ?",
          [data.projectId, req.userId],
        ];
      })

      .commit();
    await db.end();

    if (newProjectId && !checkIfUserHasProjectMsg) {
      await sendEmail({
        type: "fileConfirmation",
        subject: `you have an upgraded project : ${newProjectId} `,
        heading: "check your dashboard",
        text: `you have an update go to dashboard for user: ${req.userName} , project : ${newProjectId} upgraded and coming from original project : ${data.projectId} `,
      });

      res.json(messageSuccess(200, "", false));
    } else {
      res.json(messageSuccess(200, checkIfUserHasProjectMsg, false));
    }
  } catch (error: any) {
    res.json(messageError(500, error?.message));
    insertLogs(
      "api",
      "post upgradeService",
      "dashboard",
      error?.message,
      req.userId
    );
  }
});
