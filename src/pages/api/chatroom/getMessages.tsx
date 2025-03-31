import { getHandler, messageError } from "@/utils/handlers";
import { db, executeQuery } from "@/lib/db";
import { insertLogs } from "@/utils/shared";
const sql = require("sql-template-strings");

export interface ChatListType {
  id: number;
  msgFrom: string;
  message: string;
  date: Date;
  fileUpload: string;
}

// Define allowed fields for validation
const validFields = ["userId", "consultantId"];

export default getHandler({}).get(async (req, res) => {
  try {
    const { projectId } = req.query;
    const userId = req.userId;
    const userRole = req.userRole;

    let field: string | null = null;
    let sender: string | null = null;

    if (userRole === "u") {
      field = "userId";
      sender = "c";
    }
    if (userRole === "c") {
      field = "consultantId";
      sender = "u";
    }

    // Whitelist validation for the dynamic field
    if (field && !validFields.includes(field)) {
      throw new Error("Invalid field provided.");
    }

    // Mark messages as read (only if user is not an admin)
    if (field && sender) {
      const query =
        userRole === "u"
          ? `
        UPDATE chatroom
        SET unread = 1 
        WHERE ${field} = ${db.escape(userId)} 
        AND projectId = ${db.escape(projectId)} 
        AND (msgFrom = ${db.escape(sender)} OR msgFrom = 'a') 
        AND unread = 0
      `
          : `
        UPDATE chatroom
        SET unread = 1 
        WHERE ${field} = ${db.escape(userId)} 
        AND projectId = ${db.escape(projectId)} 
        AND msgFrom = ${db.escape(sender)} 
        AND unread = 0
      `;

      // Execute the query\
      const updateResultNoAdmin = await executeQuery(query);

      if (!updateResultNoAdmin.successQuery) {
        throw new Error("Failed to update noAdmin unread status.");
      }
    }
    if (userRole === "a") {
      const query = `
      UPDATE chatroom
      SET unread = 1 
      where projectId = ${db.escape(projectId)} 
      AND msgFrom = 'u' 
      AND unread = 0
    `;

      // Execute the query\
      const updateResultAdmin = await executeQuery(query);

      if (!updateResultAdmin.successQuery) {
        throw new Error("Failed to update Admin unread status.");
      }
    }

    let chatData;

    // Admin case: Fetch all messages for the project
    if (userRole === "a") {
      chatData = await executeQuery(sql`
        SELECT id, message, msgFrom, fileUpload, date 
        FROM chatroom 
        WHERE projectId = ${projectId}
      `);
    } else {
      const query = `
        SELECT id, message, msgFrom, fileUpload, date 
        FROM chatroom c
        WHERE c.${field} = ${db.escape(userId)} 
        AND projectId = ${db.escape(projectId)}
      `;

      // Execute the query
      chatData = await executeQuery(query);
    }

    if (!chatData.successQuery) {
      throw new Error("Failed to fetch chat messages.");
    }

    res.json(JSON.parse(chatData.data));
  } catch (error: any) {
    insertLogs("api", "getMessages", "chatroom", error?.message, req.userId);
    res.status(500).json(messageError(500, error?.message));
  }
});
