import mysql from "serverless-mysql";
import { configs } from "@/utils/config";
import { queryCallback } from "mysql";
const fs = require("fs");
export const db = mysql({
  config: {
    host: configs.host,
    port: 25060,
    database: configs.database,
    user: configs.user,
    password: configs.password,
    timezone: "Z",
    ssl: {
      ca: process.env.CA_CERT,
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
