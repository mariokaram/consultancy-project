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

const servicesDataSeo = {
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
  "market-strategy": {
    title: "Market Strategy - Horizon Consultancy",
    description: "Develop effective market strategies to grow your brand.",
    url: "market-strategy",
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
    "market-strategy": marketingstrategyRef,
    "idea-finance": ideafinanceRef,
  };

  const IdeaAndFinanceArray = [
    {
      title: "Idea Validation",
      icon: solutions,
      desc: `We assess market demand, customer pain points, and existing competitors to ensure your concept addresses a real need. We then refine the idea for market fit.`,
    },
    {
      title: "Business Model Development",
      icon: model,
      desc: `We tailor a complete business model by mapping out key resources, revenue streams, customer segments, core activities, and partnerships—all while outlining cost structures.`,
    },
    {
      title: "Financial Analysis",
      icon: growth,
      desc: `Receive a detailed financial forecast including investment needs, profit/loss projections, break-even analysis, and cash flow management to help you understand what to expect and prepare.`,
    },
  ];
  const BusinessPlanArray = [
    {
      title: "Executive summary",
      icon: summary,
      desc: `We prioritize compelling executive summaries, knowing that investors often lack the time to read full business plans. Our summaries are designed to spark interest and prompt further engagement with your company.`,
    },
    {
      title: "Business model",
      icon: model,
      desc: `Your business model is the backbone of the plan. It defines your purpose, identifies necessary resources, and sets the foundation for all detailed sections, creating a clear roadmap for implementation.`,
    },
    {
      title: "Market landscape",
      icon: competitorAnalysis,
      desc: `We collect and analyze relevant market data to position your business effectively. Our insights help you deliver value, differentiate from competitors, stay competitive, and capitalize on new opportunities.`,
    },
    {
      title: "Marketing strategy",
      icon: analysis,
      desc: `A targeted marketing strategy ensures your business connects with the right audience. We focus on measurable impact and sustainable growth in today's dynamic marketplace.`,
    },
    {
      title: "Business infrastructure",
      icon: infrastructure,
      desc: `Personnel is often your largest cost. We help define roles and responsibilities clearly, establish accountability systems, and ensure operations run efficiently.`,
    },
    {
      title: "Financial study",
      icon: budget,
      desc: `We analyze every financial detail to uncover hidden risks and opportunities. Our data-driven approach provides the clarity needed for confident financial planning and investment decisions.`,
    },
    {
      title: "Growth strategy",
      icon: goal,
      desc: `Staying ahead requires agility. We help you identify long-term opportunities and design flexible growth strategies that keep your business relevant in a changing market.`,
    },
    {
      title: "Risk assessment",
      icon: expert,
      desc: `Unexpected challenges can derail progress. Unlike many, we don't overlook this. We forecast potential risks and create proactive strategies to ensure you're well-prepared.`,
    },
  ];
  const MarketStrategyArray = [
    {
      title: "Business Model",
      icon: model,
      desc: `We help you strengthen your value proposition, define revenue strategies, and target the right customers—laying the foundation for sustainable growth.`,
    },
    {
      title: "Lead Generation",
      icon: strategyPlanning,
      desc: `We pinpoint your ideal audience, apply proven prospecting methods, and use strategic tools to convert leads into long-term clients.`,
    },
    {
      title: "Competitor Assessment",
      icon: competitorAnalysisChart,
      desc: `Gain a competitive edge through deep analysis of your industry landscape. We help you identify gaps, highlight your strengths, and refine your positioning.`,
    },
    {
      title: "Marketing Strategy",
      icon: analysis,
      desc: `We craft KPI-driven marketing plans using SEO, social media, email campaigns, and more—ensuring consistent performance tracking and optimization.`,
    },
  ];
  const IdeaGenerationArray = [
    {
      title: "Overcoming concerns",
      icon: solutions,
      desc: `We tackle uncertainties head-on, providing actionable strategies to address perceived limitations—building your confidence in your entrepreneurial journey.`,
    },
    {
      title: "Business foundations",
      icon: enterprise,
      desc: `We lay the groundwork for success by outlining clear growth strategies, organizational structure, and how to best use your unique skills.`,
    },
    {
      title: "Initiating the business",
      icon: book,
      desc: `Starting a business can be overwhelming. We break down the process, offering a clear roadmap to guide your launch step-by-step.`,
    },
    {
      title: "Funding options",
      icon: budget,
      desc: `We help you understand the funding landscape by identifying suitable financial options and guiding you through application and preparation processes.`,
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
  }, [router]);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Business Plan Writing",
    "description": "Expert business plan services to help startups and entrepreneurs secure funding and define strategy.",
    "provider": {
      "@type": "Organization",
      "name": "Horizon Consultancy",
      "url": "https://www.horizon-consultancy.com"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Canada"
    },
    "serviceType": "Business Consulting",
    "url": "https://www.horizon-consultancy.com/services/business-plan"
  };

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
        structuredData={serviceSchema}
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
                Our Market Strategy package helps refine your business model by
                identifying leads and the best ways to reach them through
                detailed market and competitor analysis.
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

              <h1 className="subTitle">Idea and Finance</h1>
              <div className="description">
                Our Idea and Finance package combines strategic concept
                development with detailed financial planning to ensure
                feasibility and long-term viability.
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
                This service is ideal for aspiring entrepreneurs who have the
                drive to start but need guidance in choosing the right idea and
                understanding how to bring it to life.
              </div>
            </div>
            <div className={styles.planContent}>
              <div className={styles.img}>
                <Image alt="bulb" src={bulb} quality={100} priority={true} />
              </div>
              <div className={styles.desc}>
                <div className={styles.summary}>Key Details</div>
                <div className={styles.text}>
                  Based on your responses to our questionnaire, we provide 2 to
                  3 personalized business ideas and a comparative analysis to
                  help you make an informed decision. Each idea includes core
                  values, resource requirements, and growth potential.
                  <br />
                  <br />
                  Once you choose your preferred idea, we conduct a deep
                  analysis aligned with your background and available resources.
                  This ensures the business is a fit for your goals and helps
                  address your concerns with tailored solutions.
                  <br />
                  <br />
                  We also build a basic business model to help you seamlessly
                  transition into a full-fledged business plan.
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
  const paths = Object.keys(servicesDataSeo).map((service) => ({
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

  const seoData = servicesDataSeo[service as keyof typeof servicesDataSeo] || {
    title: "Our Services - Horizon Consultancy",
    description:
      "Explore our comprehensive consulting services tailored for your business growth.",
    url: "",
  };

  return {
    props: { seoData },
  };
}
