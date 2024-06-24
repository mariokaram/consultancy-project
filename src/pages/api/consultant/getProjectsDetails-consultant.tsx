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
  userEmail: string;
  serviceDuration: number;
  serviceName: string;
  serviceValue: string;
  status_color: string;
  status_label: string;
  serviceId: number;
  projectType: string;
  idea1: string;
  idea2: string;
  idea3: string;
  ideaPicked: string;
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
  status_label: string;
  status_value: string;
  serviceDuration: number;
  serviceId: number;
}
export interface finalDataType {
  project_id: number;
  date_creation: Date | null;
  info: string | number;
  userEmail: string;
  consultantName: string;
  consultantId: string;
  companyName: string;
  projectLabelStatus: string;
  projectColorStatus: string;
  projectType: string;
  idea1: string;
  idea2: string;
  idea3: string;
  ideaPicked: string;
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

export default getHandler(true).get(async (req, res) => {
  try {
    let answers: ResponseType;
    let usersConsultant: ResponseTypeUsers | null;

    const projectId = req.query?.project;

    if (req.userRole === "a") {
      answers = await executeQuery(sql` 
        select s.id as serviceId , p.project_service as projectType , p.idea1 , p.idea2 , p.idea3 , p.ideaPicked ,s.serviceDuration , s.serviceName , st.status_color , st.status_label , st.status_value , s.serviceValue , p.info,  p.project_id, u.id as consultantId ,u.name as consultantName , p.date_creation ,
        ( select sta.status_label from statuses sta where sta.id = p.status ) as projectLabelStatus ,
        ( select sta.status_color from statuses sta where sta.id = p.status ) as projectColorStatus , 
        ( select answers from quest_users q where q.quest_type= 'email' and q.project_id = ${projectId}   ) as userEmail ,
        ( select answers from quest_users q where q.quest_type= 'projectName' and q.project_id = ${projectId}   ) as companyName  
        from services s 
        inner join projects p on p.project_id = s.projectId
        left join users u on u.id = p.consultant_id
        left join statuses st on st.id = s.serviceStatus
        where s.projectId = ${projectId} 
        order by s.statusOrder
         
        `);

      usersConsultant = await executeQuery(sql` 
       select name , id from users where role = 'c'       
        
       `);
    } else {
      answers = await executeQuery(sql` 
        select s.id as serviceId, s.serviceName , st.status_color , st.status_label , st.status_value , s.serviceValue , p.info,  p.project_id, u.name as consultantName , p.date_creation ,
        ( select sta.status_label from statuses sta where sta.id = p.status ) as projectLabelStatus ,
        ( select sta.status_color from statuses sta where sta.id = p.status ) as projectColorStatus , 
        ( select answers from quest_users q where q.quest_type= 'email' and q.project_id = ${projectId}   ) as userEmail ,
        ( select answers from quest_users q where q.quest_type= 'projectName' and q.project_id = ${projectId}   ) as companyName  
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
            serviceId: v.serviceId,
            serviceValue: v.serviceValue ? JSON.parse(v.serviceValue) : null,
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
            (finalData.info = v.info),
            (finalData.projectColorStatus = v.projectColorStatus),
            (finalData.projectLabelStatus = v.projectLabelStatus),
            (finalData.project_id = v.project_id),
            (finalData.projectType = v.projectType),
            (finalData.idea1 = v.idea1),
            (finalData.idea2 = v.idea2),
            (finalData.idea3 = v.idea3),
            (finalData.ideaPicked = v.ideaPicked);
        });
      }

      res.json(messageSuccess(200, { services, finalData, usersInfo }, false));
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
