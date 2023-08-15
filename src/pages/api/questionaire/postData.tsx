import { getHandler, messageSuccess, messageError } from "@/utils/handlers";
import { db } from "@/lib/db";
import { map } from "lodash";
const sql = require("sql-template-strings");
import { insertLogs } from "@/utils/shared";

export default getHandler(true).post(async (req, res) => {
  try {
    let data = req.body;
    let getNewProjectId: number | undefined;
    if (data.projectId === "new") {
      await db
        .transaction()
        .query(
          sql`insert into projects ( customer_id , consultant_id , date_creation , project_service , status )  values ( ${req.userId}  ,  ( select id from users where role = 'a' ) , curdate() , ${data.serviceType} , 'Awaiting submission' )`
        )
        .query((getInsertLastId: { insertId: number }) => {
          getNewProjectId = getInsertLastId.insertId;
          let values: any = [];
          map(data.pageInputs, (v, i) => {
            values.push([
              parseInt(i),
              req.userId,
              v.questType === "imageType"
                ? JSON.stringify(data.imageData)
                : v.questType === "selector" && typeof v.value !== "string"
                ? v.value.join()
                : v.value,
              getNewProjectId,
              v.questType,
            ]);
          });

          return [
            "insert into quest_users ( quest_id , user_id , answers , project_id , quest_type )  values ?",
            [values],
          ];
        })

        .commit();
      await db.end();
    } else {
      let values: any = [];
      map(data.pageInputs, (v, i) => {
        values.push([
          v.answerID,
          parseInt(i),
          req.userId,
          v.questType === "imageType"
            ? JSON.stringify(data.imageData)
            : v.questType === "selector" && typeof v.value !== "string"
            ? v.value.join()
            : v.questType === "table"
            ? JSON.stringify(data.tableRows)
            : v.value,
          data.projectId,
          v.questType,
        ]);
      });

      let noNeedToUpdateImage = data.imageData
        ? "tb.answers"
        : ' IF( quest_users.quest_type <> "imageType" or quest_users.quest_type is null , tb.answers , quest_users.answers ) ';

      await db
        .transaction()
        .query(() => {
          return [
            `insert into quest_users ( id , quest_id , user_id , answers , project_id , quest_type)  values ?  as tb  ON DUPLICATE KEY UPDATE answers  =  ${noNeedToUpdateImage} `,
            [values],
          ];
        })
        .query(() => {
          if (data.step === "final") {
            return [
              `update projects set status = 'Awaiting payment' where project_id = ? and customer_id = ?`,
              [data.projectId, req.userId],
            ];
          } else {
            return null;
          }
        })
        .commit();
      await db.end();
    }

    res.json(messageSuccess(200, getNewProjectId || "", false));
  } catch (error: any) {
    res.json(messageError(500, error.message));
    insertLogs("api", "postData", "questionnaire", error.message, req.userId);
  }
});
