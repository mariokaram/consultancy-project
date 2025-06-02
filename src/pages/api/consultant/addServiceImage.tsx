import { getHandler, messageSuccess, messageError } from "@/utils/handlers";
import { executeQuery } from "@/lib/db";
import { insertLogs, sendEmail } from "@/utils/shared";
const sql = require("sql-template-strings");

export default getHandler({}).put(async (req, res) => {
  try {
    const data = req.body;

    let answersServices: any;
    let answersProject: any;

    const isDeleteImage = data.isDelete || false;

    if (isDeleteImage) {
      answersServices = await executeQuery(
        sql` update services set serviceValue = null , confirmed = 0 , serviceStatus = 2  where id = ${data.serviceId}  `
      );

      if (data.ideaPickingPhase) {
        answersProject = await executeQuery(sql`
          update projects set status = 2 ,info = ( select serviceDuration from services s where projectId = ${data.projectId} and  statusOrder = 1  ) where project_id = ${data.projectId} `);
      } else {
        answersProject = await executeQuery(sql`
          update projects set status = 2 ,info = ( select serviceDuration from services s where s.id = ${data.serviceId} ) where project_id = ${data.projectId} `);
      }
    } else {
      answersServices = await executeQuery(sql` 
        update services set serviceValue = ${JSON.stringify(
          data.imageInfo
        )} , serviceStatus = 6 where id = ${data.serviceId} `);

      if (data.ideaPickingPhase) {
        answersProject = await executeQuery(sql`
          update projects set status = 6 , info = 'Feel free to choose one of the two business ideas. If neither feels right, let''s chat so we can better understand your needs!' where project_id = ${data.projectId}  `);
      } else {
        answersProject = await executeQuery(sql`
          update projects set status = 6 , info = 'To move forward with the process, please confirm that you have finalized and are satisfied with the document related to the current stage.' where project_id = ${data.projectId}  `);
      }
    }

    if (answersServices?.successQuery && answersProject?.successQuery) {
      if (!isDeleteImage && !data.ideaPickingFirstUpload) {
        await sendEmail({
          to: data.userEmail,
          type: "updatedDashboard",
          subject: "An Update is available on your Dashboard",
          heading: "New Update on your Project",
          text: `Your project dashboard has been updated. Log in to review the latest developments and keep your progress on track.`,
          name: data.userName,
        });
      }

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
