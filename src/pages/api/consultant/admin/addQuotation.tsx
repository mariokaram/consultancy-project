import { getHandler, messageSuccess, messageError } from "@/utils/handlers";
import { executeQuery } from "@/lib/db";
import { insertLogs } from "@/utils/shared";
const sql = require("sql-template-strings");

export default getHandler({}).put(async (req, res) => {
  try {
    const data = req.body;

    let answers: any;

    answers = await executeQuery(sql` 
        update projects set paymentLink = ${data.quotationLink}  where project_id = ${data.projectId}
         `);

    if (answers?.successQuery) {
      res.json(messageSuccess(200, "", false));
    } else {
      throw {
        message: "projects table update paymentLink",
      };
    }
  } catch (error: any) {
    res.json(messageError(500, error?.message));
    insertLogs(
      "api",
      "put quotation link",
      "consultant admin",
      error?.message,
      req.userId
    );
  }
});
