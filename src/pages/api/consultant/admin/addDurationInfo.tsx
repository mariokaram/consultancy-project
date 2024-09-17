import { getHandler, messageSuccess, messageError } from "@/utils/handlers";
import { executeQuery } from "@/lib/db";
import { insertLogs, sendEmail } from "@/utils/shared";
const sql = require("sql-template-strings");

export default getHandler({}).put(async (req, res) => {
  try {
    const data = req.body;

    let answers: any;

    answers = await executeQuery(sql` 
        update services set serviceDuration = ${data.duration}  where id = ${data.serviceId}
         `);

    if (answers?.successQuery) {
      res.json(messageSuccess(200, "", false));
    } else {
      throw {
        message: "services table update serviceDuration",
      };
    }
  } catch (error: any) {
    res.json(messageError(500, error?.message));
    insertLogs(
      "api",
      "put addDurationInfo",
      "consultant admin",
      error?.message,
      req.userId
    );
  }
});
