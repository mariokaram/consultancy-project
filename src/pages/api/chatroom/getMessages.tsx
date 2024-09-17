import { getHandler, messageSuccess, messageError } from "@/utils/handlers";
import { executeQuery } from "@/lib/db";
import { insertLogs } from "@/utils/shared";
const sql = require("sql-template-strings");

export interface ChatListType {
  id: number;
  msgFrom: string;
  message: string;
  date: Date;
  consultantName: string;
  userName: string;
}
interface ResponseType {
  successQuery: boolean;
  data?: ChatListType[];
}

export default getHandler({}).get(async (req, res) => {
  try {
    let answers: ResponseType;

    const checkIfUser = req.userRole === "u";
    let id: string;
    if (checkIfUser) {
      id = req.userId;
    } else {
      id = req.query?.userID as string;
    }

    answers = await executeQuery(sql` 
      select c.id , c.message , c.msgFrom ,
      ( select u.name  from users u where u.id = c.consultantId ) as consultantName ,  
      ( select u.name  from users u where u.id = c.userId ) as userName , c.date from chatroom c 
      where c.userId = ${id} 
     
        `);

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
