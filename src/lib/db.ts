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

  onConnect: () => {
    console.error("Connection Started");
  },
  onConnectError: (error: any) => {
    console.error("Connection Error while connecting:", error);
  },
  onError: (error: any) => {
    if (error?.code === "PROTOCOL_CONNECTION_LOST") {
      console.error("prototol lost connection from Db inital");
    } else {
      console.error("Connection Error from Db inital:", error);
    }
  },
  onClose: () => console.log("Connection closing"),
});

async function executeQuery(
  query: string
): Promise<{ successQuery: boolean; data?: any }> {
  try {
    const results = await db.query(query);
    console.log("Query Succeeded");
    return { successQuery: true, data: JSON.stringify(results) };
  } catch (error) {
    console.error("Query Error:", error);
    return { successQuery: false };
  } finally {
    await db.end();
    console.log("Connection Ended");
  }
}

export { db, executeQuery };
