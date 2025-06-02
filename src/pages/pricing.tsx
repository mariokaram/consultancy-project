import styles from "@/styles/Pricing.module.scss";
import Image from "next/image";
import backGroundImage from "~/public/imgs/pricing.webp";
import complexPplan from "~/public/imgs/complex-business-plan.webp";
import tick from "~/public/icons/tick.svg";
import bestFor from "~/public/icons/bestFor.svg";
import ContactBanner from "@/pages/components/Contact-Banner";
import Button from "@mui/material/Button";
import CustomizedAccordions from "@/pages/components/Accordion-component";
import Link from "next/link";
import { useRouter } from "next/router";
import { SpinnerContext } from "@/contexts/SpinnerContextProvider";
import axios from "axios";
import React, { useEffect, useRef } from "react";
import { toast, ToastContainer } from "react-toastify";
import SEO from "@/pages/components/SEO";

type PricingPageProps = {
  filteredCardsData: typeof cardsData;
  upgradeProjectType: string;
  projectId: number;
  originalProjectId: number;
  originalProjectType: string;
  section: string;
};

export default function PricingPage(props: PricingPageProps) {
  const router = useRouter();
  const { showSpinner } = React.useContext(SpinnerContext);

  const { section } = props;

  const faqRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // If the section prop is provided and it is not empty, scroll to it
    if (section && section === "faq" && faqRef.current) {
      faqRef.current.scrollIntoView({
        behavior: "smooth", // Smooth scroll behavior
        block: "center", // Scroll the section to the top of the viewport
      });
    }
  }, [section]); // The effect will trigger when the section prop changes

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

  return (
    <>
      <SEO
        title="Pricing - Horizon Consultancy"
        description="Explore pricing plans for expert business consulting tailored to startups and businesses—turn ideas into reality, refine strategy, and secure funding."
        url={`${configs.PUBLIC_URL}/pricing`}
      />
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
                Our Business Consulting Packages
              </h1>
              <div className={styles.description}>
                We provide expert business consulting services tailored to
                entrepreneurs, startups, and businesses at every stage of
                growth. Choose the right plan to turn your ideas into reality,
                optimize your market strategy, and secure funding.
              </div>
            </div>
          </div>
        </div>
        <div className={styles.mainContainer}>
          {/* Card Section */}
          <div className={styles.cardContainer}>
            {props.filteredCardsData?.map((card) => (
              <div key={card.id} className={styles.card}>
                <div className={`${styles.cardBackg} ${card.backgroundClass}`}>
                  <div className={styles.cardTitle}>{card.title}</div>

                  <div className={styles.cardPricing}>
                    <div className={styles.startText}>
                      {" "}
                      {card.id === "i" ||
                      (props.upgradeProjectType && props.projectId)
                        ? ""
                        : "Starting from"}
                    </div>
                    {props.upgradeProjectType && props.projectId ? (
                      <div className={styles.discount}>Discounted Quote</div>
                    ) : (
                      <>
                        {card.pricing} <small>{card.currency}</small>
                      </>
                    )}
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

                <div className={styles.bestFor}>
                  <Image alt="bestFor" width={25} height={25} src={bestFor} />
                  {card.bestFor}
                </div>

                <div className={styles.cardBtn}>
                  <Button
                    onClick={() =>
                      handleChoosePlan(card.questionnaireUrl, card.id)
                    }
                    size="large"
                    className="btn btn-secondary"
                  >
                    {props.upgradeProjectType && props.projectId
                      ? "Upgrade Plan"
                      : "Choose Plan"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
          {/* Banner Section */}
          {!props.upgradeProjectType && !props.projectId && (
            <div className={styles.bannerWrapper}>
              <div className={styles.bannerContainer}>
                <div className={styles.bannerContent}>
                  <h2 className={styles.bannerTitle}>Complex Business Plan</h2>
                  <div className={styles.bannerDesc}>
                    You might need a different quotation if your business meets
                    any of the following criteria
                  </div>
                  <div className={styles.bannerPoints}>
                    <div className={styles.bannerPnt}>
                      <div>
                        <div className={styles.bannerTick}>
                          <Image alt="tick" width={22} height={16} src={tick} />
                        </div>
                        <div className={styles.bannerInfo}>
                          More than 1 business model
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
          )}
          {/* faq Section */}
          <div className={styles.faqSection}>
            <h6 className="title">faq</h6>
            <h2 className="subTitle">Further Insights</h2>
            <div ref={faqRef} className="description">
              We are dedicated to transparency and to providing you with the
              highest level of support and clear understanding.
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
      "Two expert-validated business idea proposals",
      "A comprehensive idea and business report",
      "Business concept and basic business structure",
      "Value proposition differentiation",
      "Problem-solving strategies",
      "Simple launch roadmap",
      "One free revision",
    ],
    bestFor:
      "Best for entrepreneurs exploring innovative, profitable business ideas and opportunities.",
  },
  {
    id: "m",
    title: "Market Strategy",
    pricing: "$4,000",
    currency: "CAD",
    serviceUrl: "/services/market-strategy",
    questionnaireUrl: "marketing-plan",
    backgroundClass: styles.cardGreen,
    points: [
      "An in-depth market strategy plan for sustainable growth",
      "Standard business model",
      "Market research and competitor analysis",
      "Audience targeting and lead generation techniques",
      "Two free revisions",
    ],
    bestFor:
      "Best for business owners seeking to attract customers, increase sales, and scale effectively.",
  },
  {
    id: "f",
    title: "Idea and Finance",
    pricing: "$4,500",
    currency: "CAD",
    serviceUrl: "/services/idea-finance",
    questionnaireUrl: "financial-plan",
    backgroundClass: styles.darkBlue,
    points: [
      "A detailed proof of concept report",
      "Market validation and feasibility study",
      "Projected income statement, cashflow forecast, and balance sheet",
      "Break-even analysis, financial ratios, and funding requirements",
      "Two free revisions",
    ],
    bestFor:
      "Best for entrepreneurs and startups validating business feasibility and determining funding needs.",
  },
  {
    id: "b",
    title: "Business Plan",
    pricing: "$6,000",
    currency: "CAD",
    serviceUrl: "/services/business-plan",
    questionnaireUrl: "business-plan",
    backgroundClass: styles.darkBlack,
    points: [
      "An all-inclusive business plan",
      "Detailed business model and market strategy",
      "Financial forecasting and feasibility study",
      "Risk mitigation and contingency plan",
      "Scalable growth and expansion strategy",
      "Executive summary and investor pitch deck",
      "One free revision",
    ],
    bestFor:
      "Best for entrepreneurs seeking a strategic, execution-focused plan that drives growth and attracts investors.",
  },
];

type Params = {
  query: {
    upgradeProjectType: string;
    projectId: number;
    originalProjectId: number;
    originalProjectType: string;
    section: string;
  };
};

import { executeQuery } from "@/lib/db";
const sql = require("sql-template-strings");
import { getServerSession } from "next-auth/next";
import { GetServerSidePropsContext } from "next/types";
import { optionsAuth } from "@/pages/api/auth/[...nextauth]";
import { isEmpty } from "lodash";
import { configs } from "@/utils/config";
export async function getServerSideProps(
  context: GetServerSidePropsContext & Params
) {
  const {
    upgradeProjectType,
    projectId,
    originalProjectId,
    originalProjectType,
    section,
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
      // 3 for business plan only
      filteredCardsData = [filteredData[3]];
    } else {
      filteredCardsData = filteredData.filter(
        (card) => card.id !== upgradeProjectType
      );
    }

    const session = await getServerSession(
      context.req,
      context.res,
      optionsAuth
    );
    const id: string = session?.user.id!;
    const SQL = sql`select p.project_id from projects p where customer_id = ${id} and project_service = ${originalProjectType} and project_id=${originalProjectId} and invoice IS NOT NULL and status = 7  `;

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
      section: section ? section : "",
      filteredCardsData: filteredCardsData,
      upgradeProjectType: upgradeProjectType ? upgradeProjectType : "",
      projectId: projectId ? projectId : null,
      originalProjectId: originalProjectId ? originalProjectId : null,
      originalProjectType: originalProjectType ? originalProjectType : "",
    },
  };
}
