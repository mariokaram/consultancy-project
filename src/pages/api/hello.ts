import { getHandler, messageSuccess, messageError } from "@/utils/handlers";
import { excuteQuery } from "@/lib/db";
const sql = require("sql-template-strings");

export default getHandler(false).get(async (req, res) => {
  try {
    const answers: any = await excuteQuery(sql`
    select * from roles
`);
    if (answers.successQuery) {
      res.json(JSON.parse(answers.data));
    } else {
      res.status(500);
      throw { message: "init dashboard projects table initData" };
    }
  } catch (error: any) {
    res.json(messageError(500, error.message));
  }
});
