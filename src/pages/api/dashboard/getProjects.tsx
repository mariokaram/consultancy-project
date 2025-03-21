import { getHandler, messageSuccess, messageError } from "@/utils/handlers";
import { executeQuery } from "@/lib/db";
import { insertLogs } from "@/utils/shared";
const sql = require("sql-template-strings");

export interface ProjectListType {
  project_id: number;
  date_creation: Date;
  info: number | string;
  consultantName: string;
  companyName: string;
  paymentLink: string;
  status_color: string;
  status_label: string;
  status_value: string;
  currentServiceName: string;
  upgradeFromProjectType: string;
  upgradeFromProjectId: number;
  project_upgraded: number;
  invoice: string;
  projectTypeName: string;
}
interface ResponseType {
  successQuery: boolean;
  data?: ProjectListType[];
}

export default getHandler({}).get(async (req, res) => {
  try {
    const answers: ResponseType = await executeQuery(sql` 
    select s.status_color,s.status_label , s.status_value, p.upgradeFromProjectType , p.upgradeFromProjectId , p.project_upgraded ,   p.paymentLink , p.invoice  ,p.project_id, p.date_creation , p.info , u.name as consultantName ,  
    (SELECT answers FROM quest_users q WHERE q.quest_type = 'projectName' AND q.project_id = IF(p.upgradeFromProjectId IS NULL, p.project_id, p.upgradeFromProjectId) ) AS companyName , 
    ( SELECT serviceName FROM services st where  st.serviceStatus = p.status and st.serviceStatus <> 7  and  st.projectId = p.project_id limit 1 ) as currentServiceName,
    case 
    when p.project_service = 'i' then 'Ideas generation'
    when p.project_service = 'f' then 'Financial plan'
    when p.project_service = 'm' then 'Marketing plan'
    when p.project_service = 'bc' then 'Complex business plan'    
    else 'Business plan' end as projectTypeName
    from projects p 
    left join users u on u.id = p.consultant_id
    left join statuses s on s.id = p.status
    where p.customer_id = ${req.userId} 
    order by p.date_creation desc , p.project_id DESC   
    `);

    if (answers.successQuery) {
      res.json(messageSuccess(200, answers.data));
    } else {
      res.status(500);
      throw { message: "get projects api" };
    }
  } catch (error: any) {
    res.json(messageError(500, error?.message));
    insertLogs("api", "getProjects", "dashboard", error?.message, req.userId);
  }
});
