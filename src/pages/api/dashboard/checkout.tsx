import { getHandler, messageSuccess, messageError } from "@/utils/handlers";
import { insertLogs } from "@/utils/shared";
const sql = require("sql-template-strings");
import { db } from "@/lib/db";

export default getHandler({}).post(async (req, res) => {
  try {
    const data = req.body;

    await db
      .transaction()
      .query(
        sql`update projects  set status = 2 , info = ( select serviceDuration from services s where s.projectId = ${data.projectId} and userId =${req.userId} and statusOrder = 1  ) where project_id = ${data.projectId} and customer_id =${req.userId}`
      )
      .query(
        sql`update services set serviceStatus = 2 where projectId = ${data.projectId} and userId =${req.userId} and statusOrder = 1 `
      )
      .commit();
    await db.end();
    res.json(messageSuccess(200, "", false));
  } catch (error: any) {
    res.json(messageError(500, error?.message));
    insertLogs("api", "post checkout", "dashboard", error?.message, req.userId);
  }
});
