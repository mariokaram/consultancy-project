import mysql from "serverless-mysql";
import { configs } from "@/utils/config";

const db = mysql({
  config: {
    host: configs.host,
    port: configs.port as number,
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
  
  onConnect: (error: any) => {
    console.error("Connection Started:", error);
  },
  onConnectError: (error: any) => {
    console.error("Connection Error while connecting:", error);
  },
  onError: (error: any) => {
    console.error("Connection Error:", error);
  },
  onClose: () => console.log("Connection closing"),
});

async function executeQuery(
  query: string
): Promise<{ successQuery: boolean; data?: any }> {
  try {
    const results = await db.query(query);
    console.log("Query succeeded");
    return { successQuery: true, data: JSON.stringify(results) };
  } catch (error) {
    console.error("Query error:", error);
    return { successQuery: false };
  } finally {
    await db.end();
    console.log("Connection ended");
  }
}

export { db, executeQuery };
