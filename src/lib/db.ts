import mysql from "serverless-mysql";
import { configs } from "@/utils/config";
import { queryCallback } from "mysql";
export const db = mysql({
  config: {
    host: configs.host,
    port: 3306,
    database: configs.database,
    user: configs.user,
    password: configs.password,
    timezone: "Z",
    ssl: {
      // should be false in development
      rejectUnauthorized: process.env.NODE_ENV === "production",
      ca: configs.cert,
    },
  },
  connUtilization: 0.7,
});
export async function executeQuery(
  query: queryCallback
): Promise<{ successQuery: boolean; data?: any }> {
  try {
    const results = await db.query(query);
    await db.end();
    return { successQuery: true, data: JSON.stringify(results) };
  } catch (error) {
    console.log(error);
    return { successQuery: false };
  }
}
export default {
  db,
  executeQuery,
};
