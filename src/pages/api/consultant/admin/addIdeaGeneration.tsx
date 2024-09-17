import { getHandler, messageSuccess, messageError } from "@/utils/handlers";
import { executeQuery } from "@/lib/db";
import { insertLogs } from "@/utils/shared";
const sql = require("sql-template-strings");

export default getHandler({}).put(async (req, res) => {
  try {
    const data = req.body;

    const answers = await executeQuery(sql`
    update projects set idea1 = ${data.idea1 || null} , idea2 = ${
      data.idea2 || null
    } , idea3 = ${data.idea3 || null}  where project_id = ${
      data.projectId
    }      
    `);

    if (answers?.successQuery) {
      res.json(messageSuccess(200, "", false));
    } else {
      throw { message: "projects table addIdeaGeneration" };
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
