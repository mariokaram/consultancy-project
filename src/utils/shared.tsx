import axios from "axios";
import { Resend } from "resend";
import EmailTemplate from "@/pages/components/EmailTemplate";
import { configs } from "@/utils/config";
import { CreateEmailResponse } from "resend/build/src/emails/interfaces";
import { StaticImageData } from "next/image";
import successWork from "~/public/imgs/immigration.jpg";
import consultantProf2 from "~/public/imgs/consultant1.png";
import houseFurn from "~/public/imgs/furniture.jpg";
import fabricated from "~/public/imgs/fabricated.png";

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

export type CaseStudyDetailType = {
  title: string;
  slug: string;
  description: string;
  date: string;
  image: StaticImageData;
  author: string;
  authorImage: StaticImageData;
  sections: { heading: string; body: string }[];
};
export const allCaseStudyDetails: CaseStudyDetailType[] = [
  {
    title: "Transforming Expertise into a Profitable Visa Consulting Business",
    slug: "visa-consulting-business",
    description:
      "Our client had extensive experience managing Canadian visa applications but wasn't sure she could launch a compliant business without a law degree.",
    date: "October 21, 2024",
    image: successWork,
    author: "Nour D.",
    authorImage: consultantProf2,
    sections: [
      {
        heading: "Client Challenge",
        body: "Our client had years of hands-on experience handling visa applications in Canada. She knew the process inside out, from temporary permits to permanent residency applications. However, she believed she couldn't turn this expertise into a business because she lacked a law degree. Concerned about legal restrictions, she hesitated to take the leap, fearing she would be unable to offer her services in a compliant way.",
      },
      {
        heading: "Our Approach",
        body: "We started by assessing the legal landscape. After careful research, we identified a solution: she could legally assist clients in filling out their applications, provided they submitted them themselves. This small but critical adjustment allowed her to operate fully within legal boundaries while leveraging her expertise.\n\nBut a business model is more than just compliance—it's about making services attractive and accessible. We restructured her offering by positioning her as an affordable alternative to expensive legal firms. Since she didn't have to act as a legal representative or communicate with the government on behalf of her clients, she could price her services lower, making them more appealing to a wider audience.\n\n This also meant she could handle more clients efficiently, increasing her revenue potential.\n\nTo further enhance her value, we suggested a strategic partnership with a lawyer. If a client required legal representation, she could refer them to a trusted attorney and earn a commission. This not only expanded her service range but also created an additional revenue stream without adding workload.",
      },
      {
        heading: "Results",
        body: "By month two, she had secured her first paying clients. As word spread about her affordable and efficient services, her business grew steadily. What started as uncertainty turned into a thriving venture—all because the right business model shaped her expertise into something desirable and legally viable.",
      },
      {
        heading: "Key Takeaway",
        body: "This case underscores an essential truth: a business model is often more critical than the idea itself. Structuring a business the right way doesn't just make it possible—it makes it profitable.",
      },
    ],
  },
  {
    title:
      "When Growth Outpaces Space: Expanding a Furniture Brand Beyond Borders",
    slug: "furniture-brand-gulf-expansion",
    description:
      "An ambitious furniture entrepreneur sought to scale beyond domestic success and break into the Gulf market's competitive landscape.",
    date: "January 7, 2025",
    image: houseFurn,
    author: "Nour D.",
    authorImage: consultantProf2,
    sections: [
      {
        heading: "Client Challenge",
        body: "Our client was a design-focused entrepreneur looking to expand his growing furniture business beyond his home market. He aimed to enter a competitive international market in the Gulf region, where regulatory hurdles and strong local competition posed significant entry challenges.",
      },
      {
        heading: "Our Approach",
        body: "We began with in-depth market research to assess demand and validate the expansion opportunity. After confirming a clear market need, we analyzed competitors and crafted a business model suited to efficient, low-risk entry.\n\nInstead of launching immediately with a physical store or manufacturing facility, we recommended a phased approach. The first step was to establish a local office offering furniture design services, consultations, project management, and on-demand manufacturing—produced in the client's home country and imported as needed.\n\nWe advised beginning with business clients who already had ties to the brand, focusing on streamlining the supply chain and developing a project portfolio that showcased the company's capabilities in large-scale commercial work.\n\nFor long-term growth, the plan included eventually setting up local manufacturing to reduce tariffs and delivery times, followed by a retail space to reach individual customers once profits and key financial ratios hit sustainable levels.",
      },
      {
        heading: "Results",
        body: "The client secured significant investor funding after a single meeting. The investor's decision was driven by:\n\n• Experience of the client\n\n• Proven sales track record in the home country\n\n• A solid business plan covering operations, finances, and a clear, profitable growth strategy",
      },
      {
        heading: "Key Takeaway",
        body: "Expanding internationally carries risk, but it also opens the door to new markets, new clients, and new ways of doing business. When planned strategically, that risk can be transformed into an opportunity to diversify income and strengthen the company's long-term resilience.",
      },
    ],
  },
  {
    title:
      "Turning Skills into a Scalable Venture: A Case in Agile Business Planning",
    slug: "turning-skills-into-a-scalable-venture",
    description:
      "An architect with limited capital and no clear direction explored pre-fabricated housing. A flexible, low-risk plan helped him start lean and earn through design and assembly services.",
    date: "May 22, 2025",
    image: fabricated,
    author: "Nour D.",
    authorImage: consultantProf2,
    sections: [
      {
        heading: "Client Challenge",
        body: "An architect employed in the private sector approached us with the ambition of launching a new venture. While he had a strong professional background, he was unsure which path to pursue within the broad architectural field. He needed a concrete business idea and a clear, actionable roadmap to bring it to life. A comprehensive business plan was essential to guide his next steps.",
      },
      {
        heading: "Our Approach",
        body: "The client began with our Idea Generation package and ultimately selected the niche of pre-fabricated house design and assembly. To address his concerns and financial constraints, we crafted an Agile Business Plan—one designed to remain flexible and mitigate risks, particularly regarding liquidity.\n\nThe plan emphasized securing clients and confirmed payments prior to any investment in units. Revenue streams were separated into two categories: design and assembly. This allowed the client to generate income across multiple fronts without incurring significant upfront costs.\n\nThis strategy is particularly effective for entrepreneurs with limited capital and no existing market presence. While it may take longer to begin generating revenue, the advantage is that overhead remains minimal during the early stages, reducing financial risk.",
      },
      {
        heading: "Results",
        body: "The client secured his first contract for both design and assembly. The resulting revenue provided him with enough liquidity to confidently take on two additional projects.\n\nThis agile approach allowed him not only to manage his cash flow wisely but also to test the market, gain real insights into client needs, and fine-tune his service offering to better align with both his expertise and the realities of the market.",
      },
      {
        heading: "Key Takeaway",
        body: "Business plans must be tailored to fit the unique variables of each client — there is no one-size-fits-all solution. While the business idea is important, the strategy behind how it's planned and executed is equally critical. For new entrepreneurs, especially those with tight budgets, the right business model can make all the difference between a slow start and sustainable momentum.",
      },
    ],
  },
];

export type CaseStudySummaryType = Pick<
  CaseStudyDetailType,
  "slug" | "title" | "description" | "date" | "image" | "author" | "authorImage"
>;

export function getAllCaseStudies(): CaseStudySummaryType[] {
  return allCaseStudyDetails.map(
    ({ slug, title, description, date, image, author, authorImage }) => ({
      slug,
      title,
      description,
      date,
      image,
      author,
      authorImage,
    })
  );
}
export function getCaseStudyBySlug(
  slug: string
): CaseStudyDetailType | undefined {
  return allCaseStudyDetails.find((cs) => cs.slug === slug);
}

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

export async function sendEmail(paramsEmail: EmailParams) {
  try {
    const webUrl = configs.webUrl;

    const getEmailText = (): EmailParams => {
      switch (paramsEmail.type) {
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
            name: paramsEmail.name,
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
    name: "Rachel D.",
    field: "Entrepreneurship, Warwick University",
    focus: "Business Consulting",
    bio: "Jane played a pivotal role in crafting a strategic business plan for a biotech startup...Jane played a pivotal role in crafting a strategic business plan for a biotech startup...Jane played a pivotal role in crafting a strategic business plan for a biotech startup...",
    quote:
      "I thrive on transforming complex ideas into compelling strategies that drive growth...",
    imageSrc: consultantProf2,
    color: "lightBlue",
  },
  {
    id: "9f6cdb33-6186-42c2-b961-68d6fd6d422d",
    name: "Tony. D",
    field: "Entrepreneurship, Warwick University",
    focus: "Business Consulting",
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
