import { getHandler, messageSuccess, messageError } from "@/utils/handlers";
import { executeQuery } from "@/lib/db";
import { insertLogs } from "@/utils/shared";
const sql = require("sql-template-strings");

export interface ChatListType {
  id: number;
  msgFrom: string;
  message: string;
  date: Date;
  fileUpload: string;
}
interface ResponseType {
  successQuery: boolean;
  data?: ChatListType[];
}

export default getHandler({}).get(async (req, res) => {
  try {
    const dataRequest = req.query;
    let id: string = req.userId;

    let answers: ResponseType;

    if (req.userRole === "u") {
      answers = await executeQuery(sql` 
      select c.id , c.message , c.msgFrom , c.fileUpload ,  c.date 
      from chatroom c 
      where c.userId = ${id} and projectId = ${dataRequest.projectId}  `);
    } else if (req.userRole === "c") {
      answers = await executeQuery(sql` 
      select c.id , c.message , c.msgFrom , c.fileUpload , c.date 
      from chatroom c 
      where c.consultantId = ${id} and projectId = ${dataRequest.projectId}  `);
    } else {
      answers = await executeQuery(sql` 
      select c.id , c.message , c.msgFrom , c.fileUpload , c.date 
      from chatroom c 
      where projectId = ${dataRequest.projectId} `);
    }

    if (answers.successQuery) {
      const result: any = answers.data;
      res.json(JSON.parse(result));
    } else {
      res.status(500);
      throw { message: "get chatroom getMessages api" };
    }
  } catch (error: any) {
    res.json(messageError(500, error?.message));
    insertLogs("api", "getMessages", "chatroom", error?.message, req.userId);
  }
});
