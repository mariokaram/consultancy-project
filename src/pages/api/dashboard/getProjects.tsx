import { getHandler, messageSuccess, messageError } from "@/utils/handlers";
import { executeQuery } from "@/lib/db";
import { insertLogs } from "@/utils/shared";
const sql = require("sql-template-strings");

export interface ProjectListType {
  project_id: number;
  date_creation: Date;
  paid: boolean;
  info: number | string;
  consultantName: string;
  companyName: string;
  status_color: string;
  status_label: string;
  status_value: string;
  projectType: string;
}
interface ResponseType {
  successQuery: boolean;
  data?: ProjectListType[];
}

export default getHandler(true).get(async (req, res) => {
  try {
    let answers: ResponseType;

    answers = await executeQuery(sql` 
    select s.status_color,s.status_label , s.status_value ,p.project_id, p.date_creation , p.paid , p.info , u.name as consultantName ,  
    ( select answers from quest_users q where q.quest_type= 'projectName' and q.project_id = p.project_id   ) as companyName , 
    case 
    when p.project_service = 'i' then 'ideas-generation'
    when p.project_service = 'f' then 'financial-plan'
    when p.project_service = 'm' then 'marketing-plan'
    when p.project_service = 'bc' then 'complex-business-plan'    
    else "business-plan" end as projectType
    from projects p 
    left join users u on u.id = p.consultant_id
    left join statuses s on s.id = p.status
    where p.customer_id = ${req.userId} 
    order by p.date_creation desc    
    `);

    if (answers.successQuery) {
      res.json(messageSuccess(200, answers.data));
    } else {
      res.status(500);
      throw { message: "get projects api" };
    }
  } catch (error: any) {
    res.json(messageError(500, error.message));
    insertLogs("api", "getProjects", "dashboard", error.message, req.userId);
  }
});
