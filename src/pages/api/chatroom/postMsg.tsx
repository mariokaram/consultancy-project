import { getHandler, messageSuccess, messageError } from "@/utils/handlers";
import { executeQuery } from "@/lib/db";
import { insertLogs } from "@/utils/shared";
import { isEmpty } from "lodash";
const sql = require("sql-template-strings");

export default getHandler({}).post(async (req, res) => {
  try {
    const data = req.body;
    let answers: any;

    if (data.removeConvId) {
      if (req.userRole === "u") {
        answers = await executeQuery(
          sql`DELETE FROM chatroom WHERE id = ${data.removeConvId} and userId = ${req.userId} and msgFrom = ${req.userRole} `
        );
      } else if (req.userRole === "c") {
        answers = await executeQuery(
          sql`DELETE FROM chatroom WHERE id = ${data.removeConvId} and consultantId = ${req.userId} and msgFrom = ${req.userRole} `
        );
      } else {
        answers = await executeQuery(
          sql`DELETE FROM chatroom WHERE id = ${data.removeConvId}`
        );
      }

      if (answers?.successQuery) {
        res.json(messageSuccess(200, "", false));
      } else {
        throw {
          message: "Failed to delete row in chatroom table",
        };
      }
    } else {
      answers = await executeQuery(sql` 
    
     insert into chatroom ( userId, consultantId , message, date ,msgFrom , projectId , fileUpload , unread ) values ( ${
       req.userRole === "u" ? req.userId : data.receiverId
     }, ${
        req.userRole === "c"
          ? req.userId
          : req.userRole === "a"
          ? data.consultantId
          : data.receiverId
      },
     ${data.message} , CONVERT_TZ(NOW(), @@session.time_zone, '+00:00') , ${
        req.userRole
      } , ${data.projectId} , ${
        isEmpty(data.imageInfo) ? null : JSON.stringify(data.imageInfo)
      } , 0 ) `);

      if (answers?.successQuery) {
        res.json(messageSuccess(200, "", false));
      } else {
        throw {
          message: "chatromm table post postMSg",
        };
      }
    }
  } catch (error: any) {
    res.json(messageError(500, error?.message));
    insertLogs("api", "post postMsg", "chatroom", error?.message, req.userId);
  }
});
