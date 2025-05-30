import { getHandler, messageSuccess, messageError } from "@/utils/handlers";
import { executeQuery } from "@/lib/db";
import { insertLogs } from "@/utils/shared";
const sql = require("sql-template-strings");

export interface ProjectConsultantListType {
  project_id: number;
  date_creation: Date;
  info: string | number;
  consultantName: string;
  companyName: string;
  status_color: string;
  status_label: string;
  status_value: string;
  projectTypeName: string;
  invoice:string;
  upgradeFromProjectType: string;
  upgradeFromProjectId: number;
  project_upgraded: number;
  paymentLink:string;
  userEmail: string;
  userName: string;
  currentServiceName:string
  userId: string;
}
interface ResponseType {
  successQuery: boolean;
  data?: ProjectConsultantListType[];
}

export default getHandler({}).get(async (req, res) => {
  try {
    let answers: ResponseType;

    const checkIfAdmin = req.userRole === "a";

    if (checkIfAdmin) {
      answers = await executeQuery(sql` 
        select s.status_color,s.status_label , s.status_value, p.upgradeFromProjectType , p.upgradeFromProjectId , p.project_upgraded ,p.project_id, p.paymentLink , p.date_creation , p.invoice , p.info , u.name as consultantName , p.customer_id as userId , 
        (SELECT answers FROM quest_users q WHERE q.quest_type = 'projectName' AND q.project_id = IF(p.upgradeFromProjectId IS NULL, p.project_id, p.upgradeFromProjectId) ) AS companyName , 
        (SELECT answers FROM quest_users q WHERE q.quest_type = 'name' AND q.project_id = IF(p.upgradeFromProjectId IS NULL, p.project_id, p.upgradeFromProjectId) ) AS userName,
        (SELECT answers FROM quest_users q WHERE q.quest_type = 'email' AND q.project_id = IF(p.upgradeFromProjectId IS NULL, p.project_id, p.upgradeFromProjectId) ) AS userEmail ,
        (SELECT serviceName FROM services st where st.serviceStatus = p.status and st.serviceStatus <> 7  and  st.projectId = p.project_id limit 1 ) as currentServiceName,
        case 
        when p.project_service = 'i' then 'Ideas generation'
        when p.project_service = 'f' then 'Idea & Finance'
        when p.project_service = 'm' then 'Market strategy'
        when p.project_service = 'bc' then 'Complex business plan'    
        else 'Business plan' end as projectTypeName
        from projects p 
        left join users u on u.id = p.consultant_id
        left join statuses s on s.id = p.status
        order by p.date_creation desc , p.project_id DESC   
        `);
    } else {
      answers = await executeQuery(sql` 
        select s.status_color,s.status_label , s.status_value , p.upgradeFromProjectType , p.upgradeFromProjectId , p.project_upgraded ,p.project_id, p.date_creation , p.invoice , p.info , u.name as consultantName ,  p.customer_id as userId ,
        (SELECT answers FROM quest_users q WHERE q.quest_type = 'projectName' AND q.project_id = IF(p.upgradeFromProjectId IS NULL, p.project_id, p.upgradeFromProjectId) ) AS companyName , 
        ( select answers from quest_users q where q.quest_type= 'name' and q.project_id = p.project_id   ) as userName , 
        ( select answers from quest_users q where q.quest_type= 'email' and q.project_id = p.project_id   ) as userEmail , 
        ( SELECT serviceName FROM services st where st.serviceStatus = p.status and st.serviceStatus <> 7  and  st.projectId = p.project_id limit 1 ) as currentServiceName,
        case 
        when p.project_service = 'i' then 'Ideas generation'
        when p.project_service = 'f' then 'Idea & Finance'
        when p.project_service = 'm' then 'Market strategy'
        when p.project_service = 'bc' then 'Complex business plan'    
        else 'Business plan' end as projectTypeName
        from projects p 
        left join users u on u.id = p.consultant_id
        left join statuses s on s.id = p.status
        where  p.consultant_id = ${req.userId}
        order by p.date_creation desc , p.project_id DESC   
        `);
    }

    if (answers.successQuery) {
      res.json(messageSuccess(200, answers.data));
    } else {
      res.status(500);
      throw { message: "get projects consultant api" };
    }
  } catch (error: any) {
    res.json(messageError(500, error?.message));
    insertLogs(
      "api",
      "getProjects consultant",
      "consultant dashboard",
      error?.message,
      req.userId
    );
  }
});
