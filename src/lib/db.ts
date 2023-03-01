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
      key: process.env.key,
      cert: process.env.cert,
    },
  },
  connUtilization: 0.7,
});
export async function excuteQuery(query: queryCallback) {
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
  excuteQuery,
};
