import axios from "axios";

export async function insertLogs(
  type: string,
  fn: string,
  page: string,
  message: string,
  id?: string
) {
  const params = { type, fn, page, message, id };
  return await axios.post("api/logs", params);
}
