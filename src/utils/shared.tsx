import axios from "axios";
import { Resend } from "resend";
import EmailTemplate from "@/pages/components/EmailTemplate";
import { configs } from "@/utils/config";

export async function insertLogs(
  type: string,
  fn: string,
  page: string,
  message: string,
  id?: string
) {
  const params = { type, fn, page, message, id };
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
          };
        case "updatedDashboard":
          return {
            to: paramsEmail.to,
            subject: paramsEmail.subject,
            heading: paramsEmail.heading,
            text: paramsEmail.text,
            btnLink: "dashboard",
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

    const { text, heading, btnLink, name, subject, to } = getEmailText();

    const emailData = await resend.sendEmail({
      from: configs.EMAIL_FROM || "",
      to: to || "",
      subject: subject || "",
      react: (
        <EmailTemplate
          text={text}
          heading={heading}
          name={name}
          link={`${webUrl}/${btnLink}`}
        />
      ),
    });

    return emailData;
  } catch (error: any) {
    return error;
  }
}
