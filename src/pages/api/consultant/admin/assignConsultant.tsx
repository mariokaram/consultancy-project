import { getHandler, messageSuccess, messageError } from "@/utils/handlers";
import { executeQuery } from "@/lib/db";
import { insertLogs } from "@/utils/shared";
const sql = require("sql-template-strings");

export default getHandler(true).put(async (req, res) => {
  try {
    const data = req.body;

    const checkIfAdmin = req.userRole === "a";
    let answers: any;

    if (checkIfAdmin) {
      answers = await executeQuery(sql` 
        update projects set consultant_id = ${
          data.consultantId || null
        } where project_id = ${data.projectId}
         `);
    }

    if (answers?.successQuery) {
      res.json(messageSuccess(200, "", false));
    } else {
      throw { message: "projects table assigneConsultant" };
    }
  } catch (error: any) {
    res.json(messageError(500, error.message));
    insertLogs(
      "api",
      "put assignUser",
      "consultant admin",
      error.message,
      req.userId
    );
  }
});
