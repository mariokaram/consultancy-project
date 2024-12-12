import { getHandler, messageSuccess, messageError } from "@/utils/handlers";
import { executeQuery } from "@/lib/db";
import { insertLogs } from "@/utils/shared";
import { isEmpty } from "lodash";
const sql = require("sql-template-strings");

export interface ProjectListDetailsConsultantType {
  project_id: number;
  date_creation: Date;
  info: string;
  consultantName: string;
  consultantid: string;
  companyName: string;
  projectLabelStatus: string;
  projectColorStatus: string;
  projectStatusValue: string;
  projectTypeName: string;
  userEmail: string;
  serviceDuration: number;
  serviceName: string;
  paymentLink:string;
  serviceValue: string;
  upgradeFromProjectType: string;
  upgradeFromProjectId: number;
  project_upgraded: number;
  status_color: string;
  status_label: string;
  serviceId: number;
  projectType: string;
  confirmed: number;
  status_value: string;
  userName: string;
  userId: string;
}

export interface IMAGEValueType {
  original_filename: string;
  public_id: string;
  secure_url: string;
}

export interface servicesType {
  serviceName: string;
  serviceValue: IMAGEValueType | null;
  status_color: string;
  status_label: string;
  status_value: string;
  confirmed: number;
  serviceDuration: number;
  serviceId: number;
  serviceImg: string;
}
export interface finalDataType {
  project_id: number;
  date_creation: Date | null;
  info: string | number;
  userEmail: string;
  consultantName: string;
  consultantId: string;
  upgradeFromProjectType: string;
  upgradeFromProjectId: number;
  project_upgraded: number;
  companyName: string;
  projectLabelStatus: string;
  projectColorStatus: string;
  projectType: string;  
  invoice: string;
  projectStatusValue: string;
  paymentLink:string;
  projectTypeName: string;
  userName: string;
  currentServiceName:string
  userId: string;
}

interface ResponseType {
  successQuery: boolean;
  data?: ProjectListDetailsConsultantType[];
}
interface ResponseTypeUsers {
  successQuery: boolean;
  data?: UsersConsultantType[];
}

export interface UsersConsultantType {
  name: string;
  id: string;
}

export default getHandler({}).get(async (req, res) => {
  try {
    let answers: ResponseType;
    let usersConsultant: ResponseTypeUsers | null;

    const projectId = req.query?.project;

    if (req.userRole === "a") {
      answers = await executeQuery(sql` 
        select s.id as serviceId , p.invoice , s.confirmed , p.upgradeFromProjectType , p.upgradeFromProjectId , p.project_upgraded , p.paymentLink, p.project_service as projectType ,
        (select serviceName from services se where se.serviceStatus = p.status and se.serviceStatus <> 7 and se.projectId = ${projectId} limit 1 ) as currentServiceName ,   
        case 
        when p.project_service = 'i' then 'Ideas generation'
        when p.project_service = 'f' then 'Financial plan'
        when p.project_service = 'm' then 'Marketing plan'
        when p.project_service = 'bc' then 'Complex business plan'    
        else "Business plan" end as projectTypeName,
        s.serviceDuration , s.serviceName , st.status_color , st.status_label , s.serviceImg , st.status_value , s.serviceValue , p.info,  p.project_id, u.id as consultantId, p.customer_id as userId , u.name as consultantName , p.date_creation ,
        ( select sta.status_label from statuses sta where sta.id = p.status ) as projectLabelStatus ,
        ( select sta.status_color from statuses sta where sta.id = p.status ) as projectColorStatus , 
        ( select sta.status_value from statuses sta where sta.id = p.status ) as projectStatusValue ,
        (SELECT answers FROM quest_users q WHERE q.quest_type = 'name' AND q.project_id = IF(p.upgradeFromProjectId IS NULL, ${projectId}, p.upgradeFromProjectId) ) AS userName,
        (SELECT answers FROM quest_users q WHERE q.quest_type = 'email' AND q.project_id = IF(p.upgradeFromProjectId IS NULL, ${projectId}, p.upgradeFromProjectId) ) AS userEmail ,
        (SELECT answers FROM quest_users q WHERE q.quest_type = 'projectName' AND q.project_id = IF(p.upgradeFromProjectId IS NULL,${projectId}, p.upgradeFromProjectId) ) AS companyName 
        from services s 
        inner join projects p on p.project_id = s.projectId
        left join users u on u.id = p.consultant_id
        left join statuses st on st.id = s.serviceStatus
        where s.projectId = ${projectId} 
        order by s.statusOrder
         
        `);

      usersConsultant = await executeQuery(sql` 
       select name , id from users where role in ( 'a' , 'c' )      
        
       `);
    } else {
      answers = await executeQuery(sql` 
        select s.id as serviceId, p.invoice , p.project_service as projectType, p.upgradeFromProjectType , p.upgradeFromProjectId , p.project_upgraded , s.confirmed ,s.serviceName , st.status_color , st.status_label , st.status_value , s.serviceValue , s.serviceImg , p.customer_id as userId , p.info,  p.project_id, u.name as consultantName , p.date_creation ,
        (select serviceName from services se where se.serviceStatus = p.status and se.serviceStatus <> 7 and se.projectId = ${projectId} limit 1 ) as currentServiceName ,         
        case 
        when p.project_service = 'i' then 'Ideas generation'
        when p.project_service = 'f' then 'Financial plan'
        when p.project_service = 'm' then 'Marketing plan'
        when p.project_service = 'bc' then 'Complex business plan'    
        else "Business plan" end as projectTypeName,
        ( select sta.status_label from statuses sta where sta.id = p.status ) as projectLabelStatus ,
        ( select sta.status_color from statuses sta where sta.id = p.status ) as projectColorStatus , 
        ( select sta.status_value from statuses sta where sta.id = p.status ) as projectStatusValue ,
        ( select answers from quest_users q where q.quest_type= 'email' and q.project_id = ${projectId} ) as userEmail ,
        ( select answers from quest_users q where q.quest_type= 'name' and q.project_id = ${projectId} ) as userName , 
        ( select answers from quest_users q where q.quest_type= 'projectName' and q.project_id = ${projectId} ) as companyName  
        from services s 
        inner join projects p on p.project_id = s.projectId and p.consultant_id = ${req.userId}
        left join users u on u.id = p.consultant_id
        left join statuses st on st.id = s.serviceStatus
        where s.projectId = ${projectId} 
        order by s.statusOrder
         
        `);

      usersConsultant = null;
    }

    if (answers.successQuery) {
      const dataResult: any = answers?.data;

      let services: servicesType[] = [];
      let finalData: finalDataType | any = {};
      let usersInfo: UsersConsultantType[] = [];

      if (usersConsultant?.successQuery) {
        const dataResult: any = usersConsultant?.data;
        if (!isEmpty(JSON.parse(dataResult))) {
          usersInfo = JSON.parse(dataResult);
        }
      }

      if (!isEmpty(JSON.parse(dataResult))) {
        JSON.parse(dataResult)?.map((v: any) => {
          services.push({
            serviceName: v.serviceName,
            serviceImg: v.serviceImg,
            serviceId: v.serviceId,
            serviceValue: v.serviceValue ? JSON.parse(v.serviceValue) : null,
            confirmed : v.confirmed,
            status_color: v.status_color,
            status_label: v.status_label,
            status_value: v.status_value,
            serviceDuration: v.serviceDuration,
          });
            (finalData.companyName = v.companyName),
            (finalData.consultantName = v.consultantName),
            (finalData.consultantId = v.consultantId),
            (finalData.date_creation = v.date_creation),
            (finalData.userEmail = v.userEmail),
            (finalData.paymentLink = v.paymentLink),
            (finalData.info = v.info),
            (finalData.projectColorStatus = v.projectColorStatus),
            (finalData.projectLabelStatus = v.projectLabelStatus),
            (finalData.projectStatusValue = v.projectStatusValue);
            (finalData.userName = v.userName);
            (finalData.upgradeFromProjectType = v.upgradeFromProjectType),
            (finalData.upgradeFromProjectId = v.upgradeFromProjectId),
            (finalData.project_upgraded = v.project_upgraded),
            (finalData.userId = v.userId);
            (finalData.currentServiceName = v.currentServiceName);
            (finalData.projectTypeName = v.projectTypeName);
            (finalData.project_id = v.project_id),
            (finalData.invoice = v.invoice),
            (finalData.projectType = v.projectType)
           
        });
      }

      res.json(messageSuccess(200, { services, finalData, usersInfo }, false));
    } else {
      res.status(500);
      throw { message: "get projectsDetails successQuery false" };
    }
  } catch (error: any) {
    res.json(messageError(500, error?.message));
    insertLogs(
      "api",
      "getProjectsDetails",
      "projects",
      error?.message,
      req.userId
    );
  }
});
