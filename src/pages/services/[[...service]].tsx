import styles from "@/styles/Services.module.scss";
import Image from "next/image";
import backGroundImage from "~/public/imgs/services-background.webp";
import businessPlan from "~/public/imgs/businessPlan.webp";
import summary from "~/public/icons/summary.svg";
import growth from "~/public/icons/growth.svg";
import book from "~/public/icons/book.svg";
import marketing from "~/public/icons/marketing.svg";
import enterprise from "~/public/icons/enterprise.svg";
import solutions from "~/public/icons/solutions.svg";
import creativeIdea from "~/public/icons/creative-idea.svg";
import budget from "~/public/icons/budget.svg";
import goal from "~/public/icons/goal.svg";
import expert from "~/public/icons/expert.svg";
import infrastructure from "~/public/icons/infrastructure.svg";
import bulb from "~/public/imgs/bulb.webp";
import analysis from "~/public/icons/analysis.svg";
import competitorAnalysis from "~/public/icons/competitor-analysis.svg";
import competitorAnalysisBlue from "~/public/icons/competitor-analysisBlue.svg";
import strategyPlanning from "~/public/icons/strategy-planning.svg";
import competitorAnalysisChart from "~/public/icons/competitorAnalysis.svg";
import model from "~/public/icons/modal.svg";
import report from "~/public/icons/financialReport.svg";
import ContactBanner from "@/pages/components/Contact-Banner";
import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { isEmpty } from "lodash";
import SEO from "@/pages/components/SEO";
import { configs } from "@/utils/config";

interface SEOType {
  description: string;
  url: string;
  title: string;
}

const servicesData = {
  "proposing-business-ideas": {
    title: "Proposing Business Ideas - Horizon Consultancy",
    description: "Unlock innovative business ideas tailored to your goals.",
    url: "proposing-business-ideas",
  },
  "business-plan": {
    title: "Business Plan - Horizon Consultancy",
    description: "Craft a comprehensive business plan for your success.",
    url: "business-plan",
  },
  "marketing-strategy": {
    title: "Marketing Strategy - Horizon Consultancy",
    description: "Develop effective marketing strategies to grow your brand.",
    url: "marketing-strategy",
  },
  "idea-finance": {
    title: "Idea and Finance - Horizon Consultancy",
    description: "Strategic financial planning for your business growth.",
    url: "idea-finance",
  },
};

export default function ServicesPage({ seoData }: { seoData: SEOType }) {
  const ideagenRef = useRef(null);
  const businessplanRef = useRef(null);
  const marketingstrategyRef = useRef(null);
  const ideafinanceRef = useRef(null);
  const scrollToAllias: any = {
    "proposing-business-ideas": ideagenRef,
    "business-plan": businessplanRef,
    "marketing-strategy": marketingstrategyRef,
    "idea-finance": ideafinanceRef,
  };

  const IdeaAndFinanceArray = [
    {
      title: "Idea Validation",
      icon: solutions,
      desc: `We analyze the market demand, 
      customer pain points, and existing competitors to ensure 
      your idea solves a real problem. We adapt the concept to fit
       market needs, thus ensuring the highest chance of success.`,
    },
    {
      title: "Business Model Development",
      icon: model,
      desc: `We craft a tailored business model
      by identifying key resources, revenue streams, and customer
      segments. We also outline critical activities, partnerships, and
      a clear cost structure to support your business.`,
    },
    {
      title: "Financial Analysis",
      icon: competitorAnalysis,
      desc: `Get a detailed financial plan that includes
      investment breakdowns, profit and loss forecasts, cash flow
      management, and a break-even analysis, helping you understand
      what to expect and ensuring your business is financially sound
      from the start.`,
    },
  ];
  const BusinessPlanArray = [
    {
      title: "Executive summary",
      icon: summary,
      desc: `We prioritize executive summaries as investors often lack time for reading full Business Plans. Our compelling summaries aim to pique investor interest and encourage further exploration of your offerings.`,
    },
    {
      title: "Business model",
      icon: model,
      desc: `As a service, the business model is indispensable, delineating the company's purpose and resource requirements, serving as the foundation from which all subsequent detailed sections are derived for comprehensive planning.`,
    },
    {
      title: "Market landscape",
      icon: competitorAnalysis,
      desc: `Our market data analysis service will gather, interpret, and leverage market insights to enhance customer service, differentiate your offerings, stay competitive, and capitalize on growth opportunities effectively.`,
    },
    {
      title: "Marketing strategy ",
      icon: analysis,
      desc: `An effective targeted marketing strategy for maximum impact is vital. It ensures we connect your company with its target audience, paving the way for sustained growth and success in today's competitive business environment.`,
    },
    {
      title: "Business infrastructure",
      icon: infrastructure,
      desc: `The most significant expenditures typically revolve around personnel. To mitigate losses, our company will implement clear role definitions, and establish accountability frameworks. This will ensure that every employee understands their responsibilities, leading to efficient operations and processes.`,
    },
    {
      title: "Financial study",
      icon: budget,
      desc: `In our financial studies service, we meticulously analyse every numerical detail of a company, providing a unique perspective and uncovering hidden data that could potentially pose challenges to the business.`,
    },
    {
      title: "Growth strategy",
      icon: goal,
      desc: `We study future prospects in an ever-changing market to assist you in avoiding the risk of becoming obsolete or surpassed by more flexible competitors. We aim to ensure sustained relevance and competitiveness.`,
    },
    {
      title: "Risk assessment",
      icon: expert,
      desc: `Unforeseen changes can jeopardize a business's success. Many planners overlook this vital aspect, but we provide proactive risk projection and prepare the company to navigate potential challenges with flexibility.`,
    },
  ];
  const MarketStrategyArray = [
    {
      title: "Business Model",
      icon: model,
      desc: `We help you shape your value proposition,
      revenue strategy, and customer targeting. Our approach ensures
      you have a strong operational structure and key partnerships in
      place.`,
    },
    {
      title: "Lead Generation",
      icon: strategyPlanning,
      desc: `We identify your target audience, implement
      effective prospecting techniques, and nurture leads with the
      right tools and strategies to maximize conversions.`,
    },
    {
      title: "Competitor Assessment",
      icon: competitorAnalysisChart,
      desc: `Gain insights into the strengths and weaknesses of your competitors. We'll help you position your
      business effectively and identify areas where you can outperform
      the competition.`,
    },
    {
      title: "Marketing Strategy",
      icon: analysis,
      desc: `Our team creates a comprehensive marketing
      plan, including digital marketing tactics like SEO, social
      media, and email outreach. We'll track performance through
      measurable KPIs to ensure your campaigns are on the right track.`,
    },
  ];
  const IdeaGenerationArray = [
    {
      title: "Overcoming concerns",
      icon: solutions,
      desc: `We address concerns head-on, providing clear solutions and actionable strategies to alleviate any perceived shortcomings, ensuring a smooth and confident path forward.`,
    },
    {
      title: "Business foundations",
      icon: enterprise,
      desc: `We ensure comprehensive coverage of future growth, organisational structure, and skill utilization components, laying a solid blueprint for progress and development.`,
    },
    {
      title: "Initiating the business",
      icon: book,
      desc: `The uncertainty of launching a business can be daunting, especially for those lacking experience. Our goal is to clear the path by outlining the essential steps needed to launch your startup.`,
    },
    {
      title: "Funding options",
      icon: growth,
      desc: `We assess and propose the various funding opportunities available to you to help you navigate the financial challenges of a new business startup.`,
    },
  ];
  const router = useRouter();

  useEffect(() => {
    const queryString = router?.query?.service ? router.query.service[0] : "";

    if (!isEmpty(router.query)) {
      if (scrollToAllias[queryString]) {
        scrollToAllias[queryString].current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      } else {
        router.replace("/services");
      }
    }
    console.log(seoData, "am,rioo");
  }, [router]);

  return (
    <>
      <SEO
        title={seoData.title}
        description={seoData.description}
        url={
          seoData.url
            ? `${configs.PUBLIC_URL}/services/${seoData.url}`
            : `${configs.PUBLIC_URL}/services`
        }
      />
      <section>
        {/* backGroundImage Section */}
        <div className={styles.backgroundImg}>
          <div className={styles.image}>
            <Image
              alt="background"
              src={backGroundImage}
              quality={100}
              priority={true}
            />
            <div className={styles.info}>
              <h1 style={{ color: "white" }} className="subTitle">
                Our Services
              </h1>
              <div className={styles.description}>
                Let us help you navigate challenges, seize opportunities, and
                achieve sustainable growth in today&apos;s competitive
                landscape.
              </div>
            </div>
          </div>
        </div>
        <div className={styles.mainContainer}>
          {/* buisines plan Section  */}
          <div ref={businessplanRef} className={styles.plansSection}>
            <div className={styles.planTitle}>
              <div className={styles.planIcon}>
                <Image alt="report" width={42} height={45} src={report} />
              </div>

              <h1 className="subTitle">Business Plan</h1>
              <div className="description">
                At Horizon Consultancy, we pride ourselves on delivering
                comprehensive business plans that help launch and maintain
                businesses.
              </div>
            </div>
            <div
              className={`${styles.planContent} ${styles.planContentBusiness}`}
            >
              <div className={styles.desc}>
                <div className={styles.summary}>Key Details</div>
                <div className={styles.text}>
                  Our approach involves meticulous attention to detail and the
                  crafting of well-defined strategies, all while ensuring
                  clarity by explaining the rationale behind each decision.
                  Whether gathering qualitative or quantitative data, our
                  rigorous research standards ensure high-quality insights that
                  minimise risks and solidify your plan, facilitating a smooth
                  integration into the market landscape.
                  <br />
                  <br />
                  Our main Business Plan bundle offers an all-inclusive
                  solution, yet we understand that every client&apos;s needs are
                  different. Therefore, we offer flexibility with sub-bundles
                  tailored to focus specifically on either targeted marketing
                  strategy for maximum impact or financial planning, both of
                  which still provide a holistic overview of your company.
                  <br />
                  <br />
                  In today&apos;s competitive and saturated markets, success
                  requires a thorough yet assertive approach, and that&apos;s
                  precisely what we provide.
                </div>
              </div>
              <div className={styles.img}>
                <Image
                  alt="business-plan"
                  src={businessPlan}
                  quality={100}
                  priority={true}
                />
              </div>
            </div>
            <div className={styles.successStorySection}>
              <h5 className={styles.smallTitle}>Successful businesses have</h5>
            </div>

            <div className={styles.businessPlanSection}>
              <div className={styles.planCards}>
                {BusinessPlanArray.map((item, index: number) => (
                  <div key={index} className={styles.planCard}>
                    <div className={styles.imageWrapper}>
                      <Image
                        alt={`${item.icon}`}
                        width={50}
                        height={53}
                        src={item.icon}
                      />
                    </div>
                    <h3 className={styles.cardTitle}>{item.title}</h3>
                    <p className={styles.cardDescription}>{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Market Strategy Section */}
          <div
            ref={marketingstrategyRef}
            className={`${styles.plansSection} ${styles.planIdeaSection} `}
          >
            <div className={styles.planTitle}>
              <div className={`${styles.planIcon} ${styles.planIdea}`}>
                <Image alt="idea-gen" width={42} height={45} src={marketing} />
              </div>

              <h2 className="subTitle">Market Strategy</h2>
              <div className="description">
                Our Market Strategy package refines your business model, helping
                identify leads and effective ways to reach them by analyzing the
                market and competitors.
              </div>
            </div>

            <div
              className={`${styles.successStorySection} ${styles.successStorySectionMarket}`}
            >
              <h5 className={styles.smallTitle}>What&apos;s included</h5>
            </div>

            <div className={styles.ideaGenSection}>
              <div className={styles.planCards}>
                {MarketStrategyArray.map((item, index: number) => (
                  <div key={index} className={styles.planCard}>
                    <div className={styles.planIcon}>
                      <Image
                        alt={`${item.icon}`}
                        width={50}
                        height={53}
                        src={item.icon}
                      />
                    </div>
                    <div className={styles.planCardContent}>
                      <h3 className={styles.cardTitle}>{item.title}</h3>
                      <p className={styles.cardDescription}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Idea & Finance Section  */}
          <div
            ref={ideafinanceRef}
            className={`${styles.plansSection} ${styles.financeIdea}`}
          >
            <div className={styles.planTitle}>
              <div className={styles.planIcon}>
                <Image
                  alt="report"
                  width={42}
                  height={45}
                  src={competitorAnalysisBlue}
                />
              </div>

              <h1 className="subTitle">Idea & Finance</h1>
              <div className="description">
                Our Idea & Finance Package shapes your business model, outlining
                costs, necessary resources, and how operations will need to run
                for success.
              </div>
            </div>

            <div
              className={`${styles.successStorySection} ${styles.successStorySectionFinance}`}
            >
              <h5 className={styles.smallTitle}>What&apos;s included</h5>
            </div>

            <div className={styles.businessPlanSection}>
              <div className={styles.planCards}>
                {IdeaAndFinanceArray.map((item, index: number) => (
                  <div key={index} className={styles.planCard}>
                    <div className={styles.imageWrapper}>
                      <Image
                        alt={`${item.icon}`}
                        width={50}
                        height={53}
                        src={item.icon}
                      />
                    </div>
                    <h3 className={styles.cardTitle}>{item.title}</h3>
                    <p className={styles.cardDescription}>{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* idea generation Section */}
          <div
            ref={ideagenRef}
            className={`${styles.plansSection} ${styles.planIdeaSection} `}
          >
            <div className={styles.planTitle}>
              <div className={`${styles.planIcon} ${styles.planIdea}`}>
                <Image
                  alt="idea-gen"
                  width={42}
                  height={45}
                  src={creativeIdea}
                />
              </div>

              <h2 className="subTitle">Idea Generation</h2>
              <div className="description">
                This innovative service is the first step towards becoming an
                entrepreneur for individuals that have the will to start but are
                not sure what idea suits them and how to go about it.
              </div>
            </div>
            <div className={styles.planContent}>
              <div className={styles.img}>
                <Image alt="bulb" src={bulb} quality={100} priority={true} />
              </div>
              <div className={styles.desc}>
                <div className={styles.summary}>Key Details</div>
                <div className={styles.text}>
                  We offer personalized business ideas based on questionnaire
                  responses, presenting two to three proposals, and providing a
                  comparative analysis to aid informed decision-making. This
                  comparison outlines each idea&apos;s core values, resource
                  requirements, and future prospects.
                  <br />
                  <br />
                  Upon selecting an idea, we conduct a comprehensive analysis
                  tailored to your expertise and available assets, demonstrating
                  why the business aligns with your preferences and desired
                  outcomes. This approach ensures that your concerns are
                  addressed and solutions are provided, paving a clear and
                  professional path forward.
                  <br />
                  <br />
                  Additionally, we develop a basic business model for your
                  chosen idea, allowing for seamless transition into an
                  executable business plan.
                </div>
              </div>
            </div>
            <div
              className={styles.successStorySection}
              style={{ paddingBottom: "1rem" }}
            >
              <h5 className={styles.smallTitle}>Idea generation categories</h5>
            </div>

            <div className={styles.ideaGenSection}>
              <div className={styles.planCards}>
                {IdeaGenerationArray.map((item, index: number) => (
                  <div key={index} className={styles.planCard}>
                    <div className={styles.planIcon}>
                      <Image
                        alt={`${item.icon}`}
                        width={50}
                        height={53}
                        src={item.icon}
                      />
                    </div>
                    <div className={styles.planCardContent}>
                      <h3 className={styles.cardTitle}>{item.title}</h3>
                      <p className={styles.cardDescription}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* contact section */}
          <div className={styles.contactus}>
            <ContactBanner />
          </div>
        </div>
      </section>
    </>
  );
}

export async function getStaticPaths() {
  // Generate paths for each service dynamically
  const paths = Object.keys(servicesData).map((service) => ({
    params: { service: [service] }, // Wrap service in an array
  }));

  return {
    paths,
    fallback: "blocking", // Optionally enable fallback if paths are missing
  };
}

export async function getStaticProps({
  params,
}: {
  params: { service: string };
}) {
  const { service } = params;

  const seoData = servicesData[service as keyof typeof servicesData] || {
    title: "Our Services - Horizon Consultancy",
    description:
      "Explore our comprehensive consulting services tailored for your business growth.",
    url: "",
  };

  return {
    props: { seoData },
  };
}
