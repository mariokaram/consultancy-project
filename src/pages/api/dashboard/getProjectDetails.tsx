import { getHandler, messageSuccess, messageError } from "@/utils/handlers";
import { executeQuery } from "@/lib/db";
import { insertLogs } from "@/utils/shared";
import { isEmpty } from "lodash";
const sql = require("sql-template-strings");

export interface ProjectListDetailsType {
  project_id: number;
  date_creation: Date;
  info: string;
  consultantName: string;
  companyName: string;
  projectLabelStatus: string;
  projectColorStatus: string;
  serviceName: string;
  serviceId: number;
  serviceOrder : number;
  serviceValue: string;
  projectType: string;
  confirmed: number;
  status_color: string;
  status_label: string;
  invoice: string;
  status_value: string;
  paymentLink: string;
  upgradeFromProjectType: string;
  upgradeFromProjectId: number;
  project_upgraded: number;
  projectUpgradeCount:number;
  currentServiceName: string;

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
  serviceId: number;
  confirmed: number;
  serviceOrder : number;
  status_label: string;
  status_value: string;
  serviceImg: string;
}
export interface finalDataType {
  project_id: number;
  paymentLink: string;
  date_creation: Date | null;
  info: string | number;
  consultantName: string;
  projectUpgradeCount:number;
  projectType: string;
  companyName: string;
  currentServiceName: string;
  invoice: string;
  projectLabelStatus: string;
  projectColorStatus: string;
  projectStatusValue: string;
  projectTypeName: string;
  upgradeFromProjectType: string;
  upgradeFromProjectId: number;
  project_upgraded: number;
}

interface ResponseType {
  successQuery: boolean;
  data?: ProjectListDetailsType[];
}

export default getHandler({}).get(async (req, res) => {
  try {
    let answers: ResponseType;

    const projectId = req.query?.project;
    answers = await executeQuery(sql` 
    select s.id as serviceId , s.statusOrder  as serviceOrder , p.upgradeFromProjectType , p.upgradeFromProjectId , p.project_upgraded , p.invoice , p.paymentLink , p.project_service as projectType ,    
    (select serviceName from services se where se.serviceStatus = p.status and se.serviceStatus <> 7 and se.projectId= ${projectId} limit 1 ) as currentServiceName , 
    case 
    when p.project_service = 'i' then 'Ideas generation'
    when p.project_service = 'f' then 'Financial plan'
    when p.project_service = 'm' then 'Marketing plan'
    when p.project_service = 'bc' then 'Complex business plan'    
    else "Business plan" end as projectTypeName,
    (SELECT COUNT(*) FROM projects WHERE upgradeFromProjectId = p.upgradeFromProjectId and s.userId = ${req.userId} ) as projectUpgradeCount , 
    s.confirmed , s.serviceName , st.status_color , st.status_label , st.status_value , s.serviceImg , s.serviceValue , p.info,  p.project_id, u.name as consultantName , p.date_creation ,
    ( select sta.status_label from statuses sta where sta.id = p.status ) as projectLabelStatus ,
    ( select sta.status_value from statuses sta where sta.id = p.status ) as projectStatusValue ,
    ( select sta.status_color from statuses sta where sta.id = p.status ) as projectColorStatus , 
    (SELECT answers FROM quest_users q WHERE q.quest_type = 'projectName' AND q.project_id = IF(p.upgradeFromProjectId IS NULL,${projectId}, p.upgradeFromProjectId) ) AS companyName 
    from services s 
    inner join projects p on p.project_id = s.projectId  and p.customer_id = ${req.userId}
    left join users u on u.id = p.consultant_id
    left join statuses st on st.id = s.serviceStatus
    where s.projectId = ${projectId} and s.userId = ${req.userId}
    order by s.statusOrder
     
    `);

    if (answers.successQuery) {
      const dataResult: any = answers?.data;
      let services: servicesType[] = [];
      let finalData: finalDataType | any = {};
      if (!isEmpty(JSON.parse(dataResult))) {
        JSON.parse(dataResult)?.map((v: any) => {
          services.push({
            serviceName: v.serviceName,
            serviceId: v.serviceId,
            serviceImg: v.serviceImg,
            serviceValue: v.serviceValue ? JSON.parse(v.serviceValue) : null,
            status_color: v.status_color,
            serviceOrder : v.serviceOrder ,
            confirmed: v.confirmed,
            status_label: v.status_label,
            status_value: v.status_value,
          });
            (finalData.companyName = v.companyName),
            (finalData.consultantName = v.consultantName),
            (finalData.date_creation = v.date_creation),
            (finalData.info = v.info),
            (finalData.projectType = v.projectType),
            (finalData.projectColorStatus = v.projectColorStatus),
            (finalData.projectLabelStatus = v.projectLabelStatus),
            (finalData.projectStatusValue = v.projectStatusValue),
            (finalData.upgradeFromProjectType = v.upgradeFromProjectType),
            (finalData.upgradeFromProjectId = v.upgradeFromProjectId),
            (finalData.project_upgraded = v.project_upgraded),
            (finalData.paymentLink = v.paymentLink),
            (finalData.projectTypeName = v.projectTypeName),
            (finalData.projectUpgradeCount = v.projectUpgradeCount),
            (finalData.project_id = v.project_id),
            (finalData.invoice = v.invoice),
            (finalData.currentServiceName = v.currentServiceName)
          
        });
      }

      res.json(messageSuccess(200, { services, finalData }, false));
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
