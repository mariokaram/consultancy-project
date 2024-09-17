import { getHandler, messageSuccess, messageError } from "@/utils/handlers";
import { configs } from "@/utils/config";
import { insertLogs } from "@/utils/shared";
const cloudinary = require("cloudinary").v2;

export default getHandler({}).get(async (req, res) => {
  try {
    cloudinary.config({
      cloud_name: configs.cloudinary_cloud_name,
      api_key: configs.cloudinary_api_key,
      api_secret: configs.cloudinary_api_secret,
      secure: true,
    });
    const response = await cloudinary.api.delete_resources([req.query.id]);
    res.json(messageSuccess(200, response, false));
  } catch (error: any) {
    res.json(messageError(500, error?.message));
    insertLogs("api", "cloudinaryDelete", "cloudinary", error?.message, req.userId);

    
  }
});
