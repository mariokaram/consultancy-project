import { getHandler, messageSuccess, messageError } from "@/utils/handlers";
import { db } from "@/lib/db";
import { isEmpty, map } from "lodash";
const sql = require("sql-template-strings");
import { insertLogs, insertServiceTable, sendEmail } from "@/utils/shared";

export default getHandler({}).post(async (req, res) => {
  try {
    const data = req.body;

    const step = data.step ? (data.step - 14213) / 14343 : 0;

    let getNewProjectId: number | undefined;

    const info = `Complete the questionnaire in order to review it , noura hone fike tzabte l kalem aktr`;
    const infoFinal = `We are reviewing your questionnaire , it will take around 2 business days, we will inform you by email or you can check your dashboard's statuss`;
    if (data.projectId === "new" && step === 0) {
      await db
        .transaction()
        .query(
          sql`insert into projects ( customer_id , date_creation , project_service , status , info )  values ( ${req.userId} , curdate() , ${data.serviceType} , 1 , ${info} )`
        )

        .query((getInsertLastId: { insertId: number }) => {
          getNewProjectId = getInsertLastId.insertId;
          let values: any = [];
          map(data.pageInputs, (v, i) => {
            values.push([
              parseInt(i),
              req.userId,
              v.index === step
                ? v.questType === "imageType"
                  ? JSON.stringify(data.imageData)
                  : v.questType === "selector" && typeof v.value !== "string"
                  ? v.value.join()
                  : v.value
                : "",
              getNewProjectId,
              v.questType,
            ]);
          });

          return [
            "insert into quest_users ( quest_id , user_id , answers , project_id , quest_type )  values ?",
            [values],
          ];
        })
        .query(() => [
          `update users u set name = ( select answers from quest_users q where q.quest_type= 'name' and q.project_id = ${getNewProjectId}  )
          where u.id = ? and u.name is NULL or u.name = '' `,
          req.userId,
        ])
        .query(() => {
          return [
            "insert into services ( serviceName , serviceStatus , statusOrder ,  projectId , userId , serviceImg )  values ?",
            [insertServiceTable(data.serviceType, getNewProjectId, req.userId)],
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
          v.index === step
            ? v.questType === "imageType"
              ? JSON.stringify(data.imageData)
              : v.questType === "selector" && typeof v.value !== "string"
              ? v.value.join()
              : v.questType === "table"
              ? JSON.stringify(data.tableRows)
              : v.value
            : "",
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
          // if we have values and answerID is included
          if (!isEmpty(values) && values[0][0] && req.userRole === "u") {
            return [
              `select  qu.id ,q.quest_order_index as indexOrder  from quest_users qu
               inner join projects p  on p.project_id = qu.project_id and p.customer_id = ?
               inner join questionnaire q on q.id = qu.quest_id and q.quest_order_index = ? and q.quest_service_type = ?
               where qu.user_id = ? and qu.project_id = ? and p.status = ?
               group by indexOrder
               having count(qu.id) = ?
              `,
              [
                req.userId,
                step,
                data.serviceType === "bc" ? "b" : data.serviceType,
                req.userId,
                data.projectId,
                1,
                values.length,
              ],
            ];
          } else {
            return null;
          }
        })
        .query((r: any) => {
          if (isEmpty(r)) {
            return null;
          }
          return [
            `insert into quest_users ( id , quest_id , user_id , answers , project_id , quest_type)  values ?  as tb  ON DUPLICATE KEY UPDATE answers  =  ${noNeedToUpdateImage} `,
            [values],
          ];
        })
        .query((r: any) => {
          if (data.isFinalStep && !isEmpty(r)) {
            return [
              `update projects set status = 3 , info = ? where project_id = ? and customer_id = ?`,
              [infoFinal, data.projectId, req.userId],
            ];
          } else {
            return null;
          }
        })
        .commit();
      await db.end();
    }

    if (data.isFinalStep) {
      // send to the user reviewing your questionnaire
      await sendEmail({
        to: data.emailValue,
        type: "reviewUserQuestionnaire",
      });

      // send to the admin reviewing your questionnaire
      await sendEmail({
        type: "reviewAdminQuestionnaire",
        userName: data.projectId,
      });
    }

    res.json(messageSuccess(200, getNewProjectId || "", false));
  } catch (error: any) {
    res.json(messageError(500, error?.message));
    insertLogs("api", "postData", "questionnaire", error?.message, req.userId);
  }
});
