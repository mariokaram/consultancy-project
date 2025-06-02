import { getHandler, messageSuccess, messageError } from "@/utils/handlers";
import { executeQuery } from "@/lib/db";
import { insertLogs, sendEmail } from "@/utils/shared";
const sql = require("sql-template-strings");

export default getHandler({}).put(async (req, res) => {
  try {
    const data = req.body;

    const checkIfAdmin = req.userRole === "a";
    const goToPayment = data.type === "readyToPay";

    let answers: any;

    if (checkIfAdmin) {
      answers = await executeQuery(sql` 
        update projects set status = 4 , info = ${data.alertValue} where project_id = ${data.projectId}
         `);

      await sendEmail({
        to: data.to,
        type: "inputEmailAlert",
        name: data.name,
        subject: goToPayment
          ? "Your Quotation is Ready - Please Proceed with Payment"
          : "Plan modification to be change later",
        heading: goToPayment
          ? "Your Quotation is Ready"
          : "Plan modification to be change later",
        text: data.content,
      });
    }

    if (answers?.successQuery) {
      res.json(messageSuccess(200, "", false));
    } else {
      throw {
        message: "projects table update info and status",
      };
    }
  } catch (error: any) {
    res.json(messageError(500, error?.message));
    insertLogs(
      "api",
      "put alert user",
      "consultant admin",
      error?.message,
      req.userId
    );
  }
});
