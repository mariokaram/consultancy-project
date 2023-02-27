export const configs = {
  serverUrl: process.env.NODE_ENV !== "production" && "http://localhost:3000",
  host: process.env.NODE_ENV !== "production" ? "localhost" : "",
  port: process.env.NODE_ENV !== "production" ? 3306 : undefined,
  database: process.env.NODE_ENV !== "production" ? "consultency" : "",
  user: process.env.NODE_ENV !== "production" ? "mario" : "",
  password: process.env.NODE_ENV !== "production" ? "password" : "",
};
