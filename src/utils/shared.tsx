import axios from "axios";
import { Resend } from "resend";
import EmailTemplate from "@/pages/components/EmailTemplate";
import { configs } from "@/utils/config";
import { CreateEmailResponse } from "resend/build/src/emails/interfaces";
import consultantProf2 from "~/public/imgs/consultant1.png";
import { StaticImageData } from "next/image";
export async function insertLogs(
  type: string,
  fn: string,
  page: string,
  message: string,
  id?: string
) {
  const params = { type, fn, page, message, id };
  axios.defaults.baseURL = configs.webUrl || "";
  return await axios.post("/api/logs", params);
}

interface EmailParams {
  type?: string;
  to?: string;
  heading?: string;
  subject?: string;
  userName?: string;
  text?: string;
  btnLink?: string;
  name?: string;
  cc?: string;
}

export async function sendEmail(paramsEmail: EmailParams) {
  try {
    const webUrl = configs.webUrl;

    const getEmailText = (): EmailParams => {
      switch (paramsEmail.type) {
        case "reviewUserQuestionnaire":
          return {
            to: paramsEmail.to,
            subject: "Questionnaire under review",
            heading: "We are reviewing your questionnaire",
            text: "We are reviewing your questionnaire it will take around 2 business days",
            btnLink: "dashboard",
          };
        case "reviewAdminQuestionnaire":
          return {
            to: configs.EMAIL_FROM,
            subject: "Questionnaire under review",
            heading: `You have questionnaire to review for project: ${paramsEmail.userName}`,
            text: `You have questionnaire to review for project: ${paramsEmail.userName}`,
            btnLink: "consultant/dashboard-consultant",
          };
        case "inputEmailAlert":
          return {
            to: paramsEmail.to,
            subject: paramsEmail.subject,
            heading: paramsEmail.heading,
            text: paramsEmail.text,
            btnLink: "dashboard",
            name: paramsEmail.name,
          };
        case "updatedDashboard":
          return {
            to: paramsEmail.to,
            subject: paramsEmail.subject,
            heading: paramsEmail.heading,
            text: paramsEmail.text,
            btnLink: "dashboard",
          };
        case "contactUs":
          return {
            to: configs.EMAIL_FROM,
            subject: `${paramsEmail.name} contacted you`,
            heading: paramsEmail.subject,
            name: paramsEmail.name,
            text: paramsEmail.text,
          };
        case "alertUnread":
          return {
            to: paramsEmail.to,
            subject: paramsEmail.subject,
            heading: paramsEmail.subject,
            text: paramsEmail.text,
            cc: paramsEmail.cc,
          };
        case "fileConfirmation":
          return {
            to: configs.EMAIL_FROM,
            subject: paramsEmail.subject,
            heading: paramsEmail.heading,
            text: paramsEmail.text,
            btnLink: "consultant/dashboard-consultant",
          };
        default:
          // case custom type will be empty ""
          return {
            to: paramsEmail.to,
            heading: paramsEmail.heading,
            subject: paramsEmail.subject,
            text: paramsEmail.text,
            btnLink: paramsEmail.btnLink,
            name: paramsEmail.name,
          };
      }
    };

    const resend = new Resend(configs.resend_api);

    const { text, heading, btnLink, name, subject, to, cc } = getEmailText();

    const emailData: CreateEmailResponse = await resend.sendEmail({
      from: configs.EMAIL_FROM || "",
      to: to || "",
      subject: subject || "",
      cc: cc || "",
      react: (
        <EmailTemplate
          type={paramsEmail.type}
          text={text}
          heading={heading}
          name={name}
          link={`${webUrl}/${btnLink}`}
        />
      ),
    });

    if (!emailData.id) {
      throw "resend email from shared not working correct , no ID output ";
    }

    return emailData;
  } catch (error: any) {
    throw error;
  }
}

// utils/services.ts

export type ServiceEntry = [string, number, number, number | undefined, string];

export const insertServiceTable = (
  serviceType: string,
  projectId: number | undefined,
  userId: string
): ServiceEntry[] => {
  let returnedValue: ServiceEntry[] = [];

  switch (serviceType) {
    case "b":
      returnedValue = [
        ["Business model", 5, 1, projectId, userId],
        ["Marketing plan", 5, 2, projectId, userId],
        ["Description of management and organization", 5, 3, projectId, userId],
        ["Potential risks and mitigation strategies", 5, 4, projectId, userId],
        ["Financial projections", 5, 5, projectId, userId],
        ["Growth strategy", 5, 6, projectId, userId],
        ["Executive summary", 5, 7, projectId, userId],
        ["Execution plan", 5, 8, projectId, userId],
        ["Business plan", 5, 9, projectId, userId],
      ];
      break;
    case "m":
      returnedValue = [
        ["Business model", 5, 1, projectId, userId],
        ["Lead generation", 5, 2, projectId, userId],
        ["Competitor assessment", 5, 3, projectId, userId],
        ["Marketing strategy", 5, 4, projectId, userId],
        ["Expansion strategy", 5, 5, projectId, userId],
      ];
      break;
    case "f":
      returnedValue = [
        ["Idea validation", 5, 1, projectId, userId],
        ["Business model", 5, 2, projectId, userId],
        ["Financial plan", 5, 3, projectId, userId],
        ["Idea & finance", 5, 4, projectId, userId],
      ];
      break;
    case "bc":
      returnedValue = [
        ["Business model", 5, 1, projectId, userId],
        ["Marketing plan", 5, 2, projectId, userId],
        ["Description of management and organization", 5, 3, projectId, userId],
        ["Potential risks and mitigation strategies", 5, 4, projectId, userId],
        ["Financial projections", 5, 5, projectId, userId],
        ["Growth strategy", 5, 6, projectId, userId],
        ["Executive summary", 5, 7, projectId, userId],
        ["Execution plan", 5, 8, projectId, userId],
        ["Business plan", 5, 9, projectId, userId],
      ];
      break;
    case "i":
      returnedValue = [
        ["Idea 1", 5, 1, projectId, userId],
        ["Idea 2", 5, 2, projectId, userId],
        ["Idea analysis", 5, 3, projectId, userId],
      ];
      break;
  }

  return returnedValue;
};

export type ConsultantProfile = {
  name: string;
  field: string;
  focus: string;
  bio: string;
  quote: string;
  imageSrc: StaticImageData;
  id: string;
  color: string;
};

export const consultants: ConsultantProfile[] = [
  {
    id: "f84fc3ac-0742-4017-8b69-98f3be23c7ab",
    name: "Mario K.",
    field: "PhD, Entrepreneurship, Stanford University",
    focus: "Healthcare and Biotechnology",
    bio: "Jane played a pivotal role in crafting a strategic business plan for a biotech startup...Jane played a pivotal role in crafting a strategic business plan for a biotech startup...Jane played a pivotal role in crafting a strategic business plan for a biotech startup...",
    quote:
      "I thrive on transforming complex ideas into compelling strategies that drive growth...",
    imageSrc: consultantProf2,
    color: "lightBlue",
  },
  {
    id: "efade3aa-57ec-42f1-9364-6fba8df2316c",
    name: "Tony. D",
    field: "MBA, Finance, Harvard Business School",
    focus: "Financial Services",
    bio: "John has extensive experience in financial planning and investment strategies...",
    quote:
      "My goal is to leverage financial acumen to maximize returns and ensure long-term stability...",
    imageSrc: consultantProf2,
    color: "rose",
  },
  {
    id: "sdsd",
    name: "John",
    field: "MBA, Finance, Harvard Business School",
    focus: "Financial Services and Investment",
    bio: "John has extensive experience in financial planning and investment strategies...",
    quote:
      "My goal is to leverage financial acumen to maximize returns and ensure long-term stability...",
    imageSrc: consultantProf2,
    color: "salmon",
  },
  {
    id: "sdsd",
    name: "John",
    field: "MBA, Finance, Harvard Business School",
    focus: "Financial Services and Investment",
    bio: "John has extensive experience in financial planning and investment strategies...",
    quote:
      "My goal is to leverage financial acumen to maximize returns and ensure long-term stability...",
    imageSrc: consultantProf2,
    color: "blue",
  },
];
