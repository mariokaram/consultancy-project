import mysql from "serverless-mysql";
import { configs } from "@/utils/config";
import { queryCallback } from "mysql";

const db = mysql({
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
  onConnectError: (error: any) => {
    console.error("Connection Error while connecting:", error);
  },
  onError: (error: any) => {
    console.error("Connection Error:", error);
  },
  onClose: () => console.log("on close connection"),
});

async function executeQuery(
  query: queryCallback
): Promise<{ successQuery: boolean; data?: any }> {
  try {
    const results = await db.query(query);
    console.log("connection and query succeeded");
    return { successQuery: true, data: JSON.stringify(results) };
  } catch (error) {
    console.error("query error:", error);
    return { successQuery: false };
  } finally {
    console.error("db connection ended:");
    await db.end();
  }
}

export { db, executeQuery };
