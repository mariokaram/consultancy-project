import { getHandler, messageSuccess, messageError } from "@/utils/handlers";
import { executeQuery } from "@/lib/db";
import { insertLogs } from "@/utils/shared";
const sql = require("sql-template-strings");

export default getHandler({}).put(async (req, res) => {
  try {
    const data = req.body;

    const serviceOrder = await executeQuery(sql` 
    update services set statusOrder = statusOrder + 1  where statusOrder >= ${data.order} and projectId = ${data.projectId}  `);

    const serviceInsert = await executeQuery(sql`
    insert into services ( serviceName , serviceStatus , statusOrder ,  projectId , userId , serviceImg )  
    values ( ${data.service.name} , 5 , ${data.order} ,   ${data.projectId} ,  ${data.userId} , ${data.service.image}   )     `);

    if (serviceOrder?.successQuery && serviceInsert?.successQuery) {
      res.json(messageSuccess(200, "", false));
    } else {
      throw { message: "services table addServiceOrder" };
    }
  } catch (error: any) {
    res.json(messageError(500, error?.message));
    insertLogs(
      "api",
      "put addServiceWithOrder",
      "admin",
      error?.message,
      req.userId
    );
  }
});
