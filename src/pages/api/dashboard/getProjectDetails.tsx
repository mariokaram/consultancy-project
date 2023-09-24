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
  serviceValue: string;
  confirmed: number;
  status_color: string;
  status_label: string;
  status_value: string;
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
  status_label: string;
  status_value: string;
}
export interface finalDataType {
  project_id: number;
  date_creation: Date | null;
  info: string | number;
  consultantName: string;
  companyName: string;
  projectLabelStatus: string;
  projectColorStatus: string;
}

interface ResponseType {
  successQuery: boolean;
  data?: ProjectListDetailsType[];
}

export default getHandler(true).get(async (req, res) => {
  try {
    let answers: ResponseType;

    const projectId = req.query?.project;
    answers = await executeQuery(sql` 
    select s.id as serviceId , s.confirmed , s.serviceName , st.status_color , st.status_label , st.status_value , s.serviceValue , p.info,  p.project_id, u.name as consultantName , p.date_creation ,
    ( select sta.status_label from statuses sta where sta.id = p.status ) as projectLabelStatus ,
    ( select sta.status_color from statuses sta where sta.id = p.status ) as projectColorStatus , 
    ( select answers from quest_users q where q.quest_type= 'projectName' and q.project_id = ${projectId}   ) as companyName  
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
            serviceValue: v.serviceValue ? JSON.parse(v.serviceValue) : null,
            status_color: v.status_color,
            confirmed: v.confirmed,
            status_label: v.status_label,
            status_value: v.status_value,
          });
          (finalData.companyName = v.companyName),
            (finalData.consultantName = v.consultantName),
            (finalData.date_creation = v.date_creation),
            (finalData.info = v.info),
            (finalData.projectColorStatus = v.projectColorStatus),
            (finalData.projectLabelStatus = v.projectLabelStatus),
            (finalData.project_id = v.project_id);
        });
      }

      res.json(messageSuccess(200, { services, finalData }, false));
    } else {
      res.status(500);
      throw { message: "get projectsDetails successQuery false" };
    }
  } catch (error: any) {
    res.json(messageError(500, error.message));
    insertLogs(
      "api",
      "getProjectsDetails",
      "projects",
      error.message,
      req.userId
    );
  }
});
