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
    // Get the timestamp in seconds
    const timestamp = Math.round(new Date().getTime() / 1000);

    const { folderName, subFolder, id } = req.query;

    // Get the signature using the Node.js SDK method api_sign_request
    const signature = cloudinary.utils.api_sign_request(
      {
        folder: `${folderName}/${id}/${subFolder}`,
        use_filename: true,
        overwrite: true,
        timestamp: timestamp,
        transformation: "fl_attachment",
      },
      configs.cloudinary_api_secret
    );

    res.json(messageSuccess(200, { signature, timestamp }, false));
  } catch (error: any) {
    res.json(messageError(500, error?.message));
    insertLogs("api", "getSignature", "cloudinary", error?.message, req.userId);
  }
});
