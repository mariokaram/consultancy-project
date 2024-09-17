import { getHandler, messageSuccess, messageError } from "@/utils/handlers";
import { executeQuery } from "@/lib/db";
import { insertLogs, sendEmail } from "@/utils/shared";
const sql = require("sql-template-strings");

export default getHandler({}).put(async (req, res) => {
  try {
    const data = req.body;

    let answers: any;

    const isDeleteImage = data.isDelete || false;

    if (isDeleteImage) {
      answers = await executeQuery(sql` 
        update services set serviceValue = null , confirmed = 0 , serviceStatus = 2  where id = ${data.serviceId}
         `);
      await executeQuery(sql`
         update projects set status = 2 ,info = ( select serviceDuration from services s where s.id = ${data.serviceId} ) where project_id = ${data.projectId}
         `);
    } else {
      answers = await executeQuery(sql` 
        update services set serviceValue = ${JSON.stringify(
          data.imageInfo
        )} , serviceStatus = 6 where id = ${data.serviceId}
         `);

      await executeQuery(sql`
         update projects set status = 6 , info = 'need info msg telling him to confirm' where project_id = ${data.projectId}
         `);
    }

    if (answers?.successQuery) {
      await sendEmail({
        to: data.userEmail,
        type: "updatedDashboard",
        subject: "you have an update",
        heading: "check your dashboard",
        text: "you have an update go to dashboard",
      });

      res.json(messageSuccess(200, "", false));
    } else {
      throw { message: "services table addServiceImage" };
    }
  } catch (error: any) {
    res.json(messageError(500, error?.message));
    insertLogs(
      "api",
      "put addServiceImage",
      "consultant",
      error?.message,
      req.userId
    );
  }
});
