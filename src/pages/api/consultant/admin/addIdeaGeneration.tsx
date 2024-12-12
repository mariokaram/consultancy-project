import { getHandler, messageSuccess, messageError } from "@/utils/handlers";
import { executeQuery } from "@/lib/db";
import { insertLogs } from "@/utils/shared";
const sql = require("sql-template-strings");

export default getHandler({}).put(async (req, res) => {
  try {
    const data = req.body;

    let answers1 = await executeQuery(sql`
    update services set serviceName = ${data.idea1 || null}  where projectId = ${data.projectId} and statusOrder = 1 ;     
    `);
    let answers2 = await executeQuery(sql`
    update services set serviceName = ${data.idea2 || null}  where projectId = ${data.projectId} and statusOrder = 2 ;     
    `);

    if (answers1?.successQuery && answers2?.successQuery) {
      res.json(messageSuccess(200, "", false));
    } else {
      throw { message: "services table addIdeaGeneration" };
    }
  } catch (error: any) {
    res.json(messageError(500, error?.message));
    insertLogs(
      "api",
      "put addIdeaGeneration",
      "consultant admin",
      error?.message,
      req.userId
    );
  }
});
