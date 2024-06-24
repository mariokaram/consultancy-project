import { getHandler, messageSuccess, messageError } from "@/utils/handlers";
import { executeQuery } from "@/lib/db";
import { insertLogs } from "@/utils/shared";
const sql = require("sql-template-strings");

export default getHandler(true).post(async (req, res) => {
  try {
    const data = req.body;

    let answers: any;

    answers = await executeQuery(sql` 
    
 insert into chatroom ( userId, consultantId , message, date ,msgFrom) values ( ${
   req.userRole === "u" ? req.userId : data.receiverId
 }, ${req.userRole === "c" ? req.userId : data.receiverId},
 ${data.message} , ${data.date} , ${req.userRole})          `);

    if (answers?.successQuery) {
      res.json(messageSuccess(200, "", false));
    } else {
      throw {
        message: "chatromm table post postMSg",
      };
    }
  } catch (error: any) {
    res.json(messageError(500, error.message));
    insertLogs("api", "post postMsg", "chatroom", error.message, req.userId);
  }
});
