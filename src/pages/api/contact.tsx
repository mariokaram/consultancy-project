import { getHandler, messageSuccess, messageError } from "@/utils/handlers";
import { sendEmail } from "@/utils/shared";

export default getHandler({ auth: false, urlRateLimit: "contactUs" }).post(
  async (req, res) => {
    try {
      const data = req.body;

      await sendEmail({
        type: "contactUs",
        text: data.message,
        name: data.name,
        subject: data.email,
      });
      res.json(messageSuccess(200, true));
    } catch (error: any) {
      res.json(messageError(500, error?.message));
    }
  }
);
