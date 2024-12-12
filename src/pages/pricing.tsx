import styles from "@/styles/Pricing.module.scss";
import Image from "next/image";
import backGroundImage from "~/public/imgs/pricing.webp";
import complexPplan from "~/public/imgs/complex-business-plan.webp";
import tick from "~/public/icons/tick.svg";
import ContactBanner from "./components/Contact-Banner";
import Button from "@mui/material/Button";
import CustomizedAccordions from "./components/Accordion-component";
import Link from "next/link";
import { useRouter } from "next/router";
import { SpinnerContext } from "@/contexts/SpinnerContextProvider";
import axios from "axios";
import React from "react";
import { toast, ToastContainer } from "react-toastify";

type PricingPageProps = {
  filteredCardsData: typeof cardsData;
  upgradeProjectType: string;
  projectId: number;
  originalProjectId: number;
  originalProjectType: string;
};

export default function PricingPage(props: PricingPageProps) {
  const router = useRouter();
  const { showSpinner } = React.useContext(SpinnerContext);

  async function handleChoosePlan(
    questionnaireUrl: string,
    projectTypeToBeUpgraded: string
  ) {
    try {
      if (
        props.upgradeProjectType &&
        props.projectId &&
        props.originalProjectId &&
        props.originalProjectType
      ) {
        showSpinner(true);
        const params = {
          upgradeProjectType: props.upgradeProjectType,
          projectTypeToBeUpgraded,
          originalProjectId: props.originalProjectId,
          originalProjectType: props.originalProjectType,
          projectId: props.projectId,
        };
        const response = await axios.post(
          "/api/dashboard/upgradeService",
          params
        );

        if (response.data.success && !response.data?.result) {
          router.replace("/dashboard");
          showSpinner(false);
        } else {
          showSpinner(false);
          if (response.data?.result) {
            return toast.error(response.data?.result);
          }
          toast.error("Sorry, something went wrong!");
        }
      } else {
        router.push({
          pathname: "/questionnaire",
          query: {
            service: questionnaireUrl,
            project: "new",
          },
        });
      }
    } catch (error) {
      showSpinner(false);
      toast.error("Sorry, something went wrong!");
    }
  }

  // const cardsData = [
  //   {
  //     id: 1,
  //     title: "Idea Generation",
  //     pricing: "$1,500",
  //     currency: "CAD",
  //     serviceUrl: "/services/proposing-business-ideas",
  //     backgroundClass: styles.cardBlue,
  //     points: [
  //       "Customized plan",
  //       "Dynamic dashboard",
  //       "Website chatroom",
  //       "2 to 3 answer oriented and specific idea proposals",
  //       "2 free idea proposals revision",
  //       "In-depth analysis of your answers",
  //       "Elaborate idea description",
  //       "Solutions for concerns",
  //       "Optimisation of skills",
  //       "Business launch roadmap",
  //       "5 to 8 days working full process time",
  //       "10 to 15 pages analysis document on average",
  //     ],
  //   },
  //   {
  //     id: 2,
  //     title: "Business Model and Financial Study",
  //     pricing: "$3,000",
  //     currency: "CAD",
  //     serviceUrl: "/services/business-plan",
  //     backgroundClass: styles.darkBlue,
  //     points: [
  //       "Customized strategies",
  //       "Dynamic dashboard",
  //       "Website chatroom",
  //       "Business model",
  //       "2 free business model revisions",
  //       "Financial projections",
  //       "9 to 11 working days full process time",
  //       "8 to 12 pages full study",
  //     ],
  //   },
  //   {
  //     id: 3,
  //     title: "Business Model and Marketing Strategy",
  //     pricing: "$4,500",
  //     currency: "CAD",
  //     serviceUrl: "/services/business-plan",
  //     backgroundClass: styles.darkBlack,
  //     points: [
  //       "Customized strategies",
  //       "Dynamic dashboard",
  //       "Website chatroom",
  //       "Business model",
  //       "2 free business model revisions",
  //       "Market research",
  //       "9 to 12 working days full process time",
  //       "10 to 14 pages full study",
  //     ],
  //   },
  //   {
  //     id: 4,
  //     title: "Business Plan",
  //     pricing: "$2,000",
  //     currency: "CAD",
  //     serviceUrl: "/services/business-plan",
  //     backgroundClass: styles.cardGreen,
  //     points: [
  //       "Customized strategies",
  //       "Dynamic dashboard",
  //       "Website chatroom",
  //       "Business model",
  //       "2 free business model revisions",
  //       "Marketing strategy",
  //       "Risk mitigation",
  //       "Company structure and operations",
  //       "Financial study",
  //       "Growth prospects",
  //       "12 to 15 working days full process time",
  //       "25 to 30 pages full plan",
  //       "Business presentation slides (Pitch deck)",
  //       "Other supporting documents as per request",
  //     ],
  //   },
  // ];

  // const cardsData = [
  //   {
  //     id: "i",
  //     title: "Idea Generation",
  //     pricing: "$1,500",
  //     currency: "CAD",
  //     serviceUrl: "/services/proposing-business-ideas",
  //     questionnaireUrl: "ideas-generation",
  //     backgroundClass: styles.cardBlue,
  //     points: [
  //       "Customized plan",
  //       "Dynamic dashboard",
  //       "Website chatroom",
  //       "2 to 3 answer oriented and specific idea proposals",
  //       "2 free idea proposals revision",
  //       "In-depth analysis of your answers",
  //     ],
  //   },
  //   {
  //     id: "f",
  //     title: "Business Model and Financial Study",
  //     pricing: "$3,000",
  //     currency: "CAD",
  //     serviceUrl: "/services/business-plan",
  //     questionnaireUrl: "financial-plan",
  //     backgroundClass: styles.darkBlue,
  //     points: [
  //       "Customized strategies",
  //       "Dynamic dashboard",
  //       "Website chatroom",
  //       "Business model",
  //       "2 free business model revisions",
  //       "Financial projections",
  //     ],
  //   },
  //   {
  //     id: "m",
  //     title: "Business Model and Marketing Strategy",
  //     pricing: "$4,500",
  //     currency: "CAD",
  //     serviceUrl: "/services/business-plan",
  //     questionnaireUrl: "marketing-plan",
  //     backgroundClass: styles.darkBlack,
  //     points: [
  //       "Customized strategies",
  //       "Dynamic dashboard",
  //       "Website chatroom",
  //       "Business model",
  //       "2 free business model revisions",
  //       "Market research",
  //     ],
  //   },
  //   {
  //     id: "b",
  //     title: "Business Plan",
  //     pricing: "$2,000",
  //     currency: "CAD",
  //     serviceUrl: "/services/business-plan",
  //     questionnaireUrl: "business-plan",
  //     backgroundClass: styles.cardGreen,
  //     points: [
  //       "Customized strategies",
  //       "Dynamic dashboard",
  //       "Website chatroom",
  //       "Business model",
  //       "2 free business model revisions",
  //       "Marketing strategy",
  //     ],
  //   },
  // ];
  return (
    <>
      <section>
        {/* backGroundImage Section */}
        <div className={styles.backgroundImg}>
          <div className={styles.image}>
            <Image
              alt="background-pricing"
              src={backGroundImage}
              quality={100}
              priority={true}
            />
            <div className={styles.info}>
              <h1 style={{ color: "white" }} className="subTitle">
                Choose a Service Plan
              </h1>
              <div className={styles.description}>
                Enhance your strategic decision-making, attract investors, and
                boost business success. At Horizon Consultancy, we provide
                comprehensive studies and detailed analysis to develop dynamic
                business strategies tailored to your needs.
              </div>
            </div>
          </div>

          {/* Card Section */}
          <div className={styles.cardContainer}>
            {props.filteredCardsData?.map((card) => (
              <div key={card.id} className={styles.card}>
                <div className={`${styles.cardBackg} ${card.backgroundClass}`}>
                  <div className={styles.cardTitle}>{card.title}</div>
                  <div className={styles.cardPricing}>
                    {card.pricing} <small>{card.currency}</small>
                  </div>
                  <Link href={card.serviceUrl}>
                    <div className={styles.cardReadMore}>Learn More</div>
                  </Link>
                </div>
                <div className={styles.cardBody}>
                  {card.points.map((point, index) => (
                    <div key={index} className={styles.cardPoint}>
                      <div className={styles.cardTick}>
                        <Image alt="tick" width={22} height={16} src={tick} />
                      </div>
                      <div className={styles.cardInfo}>{point}</div>
                    </div>
                  ))}
                </div>

                <div className={styles.cardBtn}>
                  <Button
                    onClick={() =>
                      handleChoosePlan(card.questionnaireUrl, card.id)
                    }
                    size="large"
                    className="btn btn-secondary"
                  >
                    Choose Plan
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Banner Section */}
          <div className={styles.bannerWrapper}>
            <div className={styles.bannerContainer}>
              <div className={styles.bannerContent}>
                <h2 className={styles.bannerTitle}>Complex business plan</h2>
                <div className={styles.bannerDesc}>
                  You might need a different quotation if your business meets
                  some of these criteria
                </div>
                <div className={styles.bannerPoints}>
                  <div className={styles.bannerPnt}>
                    <div>
                      <div className={styles.bannerTick}>
                        <Image alt="tick" width={22} height={16} src={tick} />
                      </div>
                      <div className={styles.bannerInfo}>
                        More than 1 businness modal
                      </div>
                    </div>
                    <div>
                      <div className={styles.bannerTick}>
                        <Image alt="tick" width={22} height={16} src={tick} />
                      </div>
                      <div className={styles.bannerInfo}>
                        Budget higher than $400,000
                      </div>
                    </div>
                  </div>
                  <div className={styles.bannerPnt}>
                    <div>
                      <div className={styles.bannerTick}>
                        <Image alt="tick" width={22} height={16} src={tick} />
                      </div>
                      <div className={styles.bannerInfo}>
                        Intricate operations/processes
                      </div>
                    </div>
                    <div>
                      <div className={styles.bannerTick}>
                        <Image alt="tick" width={22} height={16} src={tick} />
                      </div>
                      <div className={styles.bannerInfo}>
                        Medium to large sized entreprise
                      </div>
                    </div>
                  </div>
                </div>

                <div className={styles.bannerBtn}>
                  <Button
                    onClick={() =>
                      handleChoosePlan("complex-business-plan", "bc")
                    }
                    size="large"
                    className="btn btn-secondary"
                  >
                    Get quotation
                  </Button>
                </div>
              </div>
              <Image
                className={styles.bannerImg}
                alt="Banner Image"
                src={complexPplan}
                quality={100}
              />
            </div>
          </div>
        </div>

        <div className={styles.mainContainer}>
          {/* faq Section */}
          <div className={styles.faqSection}>
            <h6 className="title">faq</h6>
            <h2 className="subTitle">How can we help you?</h2>
            <div className="description">
              Simply put, we are a result driven company, we want you to succeed
              even after your project is finalized. We also use a top-notch
              process that makes the entire experience clear, easy and
              trackable.
            </div>

            <div className={styles.accordion}>
              <CustomizedAccordions />
            </div>
          </div>

          {/* contact section */}
          <div className={styles.contactSection}>
            <ContactBanner />
          </div>
        </div>
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
        />
      </section>
    </>
  );
}

const cardsData = [
  {
    id: "i",
    title: "Idea Generation",
    pricing: "$1,500",
    currency: "CAD",
    serviceUrl: "/services/proposing-business-ideas",
    questionnaireUrl: "ideas-generation",
    backgroundClass: styles.cardBlue,
    points: [
      "Customized plan",
      "Dynamic dashboard",
      "Website chatroom",
      "2 to 3 answer oriented and specific idea proposals",
      "2 free idea proposals revision",
      "In-depth analysis of your answers",
    ],
  },
  {
    id: "f",
    title: "Business Model and Financial Study",
    pricing: "$3,000",
    currency: "CAD",
    serviceUrl: "/services/business-plan",
    questionnaireUrl: "financial-plan",
    backgroundClass: styles.darkBlue,
    points: [
      "Customized strategies",
      "Dynamic dashboard",
      "Website chatroom",
      "Business model",
      "2 free business model revisions",
      "Financial projections",
    ],
  },
  {
    id: "m",
    title: "Business Model and Marketing Strategy",
    pricing: "$4,500",
    currency: "CAD",
    serviceUrl: "/services/business-plan",
    questionnaireUrl: "marketing-plan",
    backgroundClass: styles.darkBlack,
    points: [
      "Customized strategies",
      "Dynamic dashboard",
      "Website chatroom",
      "Business model",
      "2 free business model revisions",
      "Market research",
    ],
  },
  {
    id: "b",
    title: "Business Plan",
    pricing: "$2,000",
    currency: "CAD",
    serviceUrl: "/services/business-plan",
    questionnaireUrl: "business-plan",
    backgroundClass: styles.cardGreen,
    points: [
      "Customized strategies",
      "Dynamic dashboard",
      "Website chatroom",
      "Business model",
      "2 free business model revisions",
      "Marketing strategy",
    ],
  },
];

type Params = {
  query: {
    upgradeProjectType: string;
    projectId: number;
    originalProjectId: number;
    originalProjectType: string;
  };
};

import { executeQuery } from "@/lib/db";
const sql = require("sql-template-strings");
import { getServerSession } from "next-auth/next";
import { GetServerSidePropsContext } from "next/types";
import { optionsAuth } from "@/pages/api/auth/[...nextauth]";
import { isEmpty } from "lodash";
export async function getServerSideProps(
  context: GetServerSidePropsContext & Params
) {
  const {
    upgradeProjectType,
    projectId,
    originalProjectId,
    originalProjectType,
  } = context.query;

  let filteredCardsData = cardsData;

  if (
    projectId &&
    (!["i", "m", "f"].includes(originalProjectType) ||
      !["i", "m", "f"].includes(upgradeProjectType))
  ) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }

  if (
    upgradeProjectType &&
    originalProjectId &&
    originalProjectType &&
    projectId
  ) {
    let filteredData = [...cardsData];

    if (upgradeProjectType !== "i") {
      delete filteredData[0];
    }
    filteredCardsData = filteredData.filter(
      (card) => card.id !== upgradeProjectType
    );

    const session = await getServerSession(
      context.req,
      context.res,
      optionsAuth
    );
    const id: string = session?.user.id!;
    const SQL = sql`select p.project_id from projects p where customer_id = ${id} and project_service = ${originalProjectType} and project_id=${originalProjectId} and invoice is not null and status = 7  `;

    const checkIfhasProjects: {
      successQuery: boolean;
      data: any;
    } = (await executeQuery(SQL)) as {
      successQuery: boolean;
      data: any;
    };

    //check if User has this project
    if (
      !checkIfhasProjects.successQuery ||
      isEmpty(JSON.parse(checkIfhasProjects.data))
    ) {
      return {
        redirect: {
          destination: "/dashboard",
          permanent: false,
        },
      };
    }
  }

  return {
    props: {
      filteredCardsData: filteredCardsData,
      upgradeProjectType: upgradeProjectType ? upgradeProjectType : "",
      projectId: projectId ? projectId : null,
      originalProjectId: originalProjectId ? originalProjectId : null,
      originalProjectType: originalProjectType ? originalProjectType : "",
    },
  };
}
