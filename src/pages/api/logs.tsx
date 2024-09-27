import { getHandler, messageSuccess, messageError } from "@/utils/handlers";
import { executeQuery } from "@/lib/db";
import { getServerSession } from "next-auth/next";
import { optionsAuth } from "@/pages/api/auth/[...nextauth]";
const sql = require("sql-template-strings");

export default getHandler({ auth: false, urlRateLimit: "logs" }).post(
  async (req, res) => {
    try {
      const data = req.body;

      const session: any = await getServerSession(req, res, optionsAuth);
      let id: string = "";
      if (session) {
        id = session.user["id"];
      } else {
        if (data.id) {
          id = data.id;
        }
      }

      const logResult = await executeQuery(sql`
    insert into logs ( userID, type , fn, page ,message , date ) values ( ${id}, ${data.type}, ${data.fn} , ${data.page} , ${data.message} ,current_timestamp(6) )   
    `);
      if (logResult.successQuery) {
        res.json(messageSuccess(200, true));
      }else{
        res.status(500)
        throw { message: "logs errors" };
      }

    } catch (error: any) {
      res.json(messageError(500, error?.message));
    }
  }
);
