import { getHandler, messageSuccess, messageError } from "@/utils/handlers";
import { executeQuery } from "@/lib/db";
import { insertLogs } from "@/utils/shared";
const sql = require("sql-template-strings");

export interface QuestionnaireListType {
  id: number;
  answerID: number;
  quest_title: string;
  answers: string;
  quest_labels: string;
  quest_placeholder: string;
  quest_type: string;
  quest_tooltip: string;
  quest_min_char: number;
  quest_order_index: number;
  options: string;
  status: string;
}

interface ResponseType {
  successQuery: boolean;
  data?: QuestionnaireListType[];
}

export default getHandler(true).get(async (req, res) => {
  try {
    let serviceTypeQueryParam = req.query.serviceType;
    if (serviceTypeQueryParam === "bc") {
      serviceTypeQueryParam = "b";
    }

    let answers: ResponseType;

    if (req.query.projectId === "new") {
      answers = await executeQuery(sql`
  select q.id  , q.quest_title  , q.quest_labels , q.quest_placeholder ,q.quest_type, q.options , q.quest_tooltip ,q.quest_min_char ,q.quest_order_index
  from questionnaire q 
  where q.quest_service_type = ${serviceTypeQueryParam} and q.version = ( select max(version) from questionnaire )
  order by quest_order_index , q.order
`);
    } else {
      answers = await executeQuery(sql`
  select q.id , qu.id as answerID , q.quest_title , p.status,  qu.answers , q.quest_labels , q.options , q.quest_placeholder ,q.quest_type, q.quest_tooltip ,q.quest_min_char ,q.quest_order_index
  from questionnaire q 
  inner join quest_users qu on  qu.quest_id =  q.id and qu.user_id = ${req.userId} and qu.project_id = ${req.query.projectId} 
  inner join projects p on p.project_id = ${req.query.projectId}
  where q.quest_service_type = ${serviceTypeQueryParam} 
  order by quest_order_index , q.order
`);
    }

    if (answers.successQuery) {
      res.json(messageSuccess(200, answers.data));
    } else {
      res.status(500);
      throw { message: "quest_users table initData" };
    }
  } catch (error: any) {
    res.json(messageError(500, error.message));
    insertLogs("api", "initData", "questionnaire", error.message, req.userId);
  }
});
