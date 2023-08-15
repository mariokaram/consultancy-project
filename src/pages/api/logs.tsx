import { getHandler, messageSuccess, messageError } from "@/utils/handlers";
import { executeQuery } from "@/lib/db";
import { getServerSession } from "next-auth/next";
import { optionsAuth } from "@/pages/api/auth/[...nextauth]";
const sql = require("sql-template-strings");

export default getHandler(false).post(async (req, res) => {
  try {
    let data = req.body;

    const session: any = await getServerSession(req, res, optionsAuth);
    let id: string = "";
    if (session) {
      id = session.user["id"];
    } else {
      if (data.id) {
        id = data.id;
      }
    }

    await executeQuery(sql`
    insert into logs ( userID, type , fn, page ,message , date ) values ( ${id}, ${data.type}, ${data.fn} , ${data.page} , ${data.message} ,current_timestamp(6) )   
    `);

    res.json(messageSuccess(200, false));
  } catch (error: any) {
    res.json(messageError(500, error.message));
  }
});
