import styles from "@/styles/Services.module.scss";
import Image from "next/image";
import backGroundImage from "~/public/imgs/services-background.webp";
import businessPlan from "~/public/imgs/businessPlan.webp";
import summary from "~/public/icons/summary.svg";
import growth from "~/public/icons/growth.svg";
import book from "~/public/icons/book.svg";
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
import model from "~/public/icons/modal.svg";
import report from "~/public/icons/financialReport.svg";
import ContactBanner from "@/pages/components/Contact-Banner";
import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { isEmpty } from "lodash";

export default function ServicesPage() {
  const businessplanRef = useRef(null);
  const businessideaRef = useRef(null);
  const scrollToAllias: any = {
    "proposing-business-ideas": businessplanRef,
    "business-plan": businessideaRef,
  };
  const BusinessPlanArray = [
    {
      title: "Executive summary",
      icon: summary,
      desc: `Targeting the right potential customers is one of the most crucial pillars for any company. After having researched the market and your competitors thoroughly, our experts will determine your primary market. Based on this information they will choose the best channels to reach this market. They will then set an appropriate price and as accurately as possible, project the revenue you’ll generate.`,
    },
    {
      title: "Business model",
      icon: model,
      desc: `The business model identifies all the building blocks of a company based on the value proposition. It covers areas such as the target market, revenue streams, expenses, key activities, needed resources, potential partners, customer service, and marketing channels. The rest of the business plan will be based in a more elaborative way on these key points.`,
    },
    {
      title: "Competitor analysis",
      icon: competitorAnalysis,
      desc: `The nearest competitors offer great insight into the market in terms of what works and what doesn’t. Our consultants will study the performance, positioning, and historical data of these competitors. This allows our experts to adopt their strong points, avoid their shortcomings, and find out what is the best positioning for your company.`,
    },
    {
      title: "Market analysis",
      icon: analysis,
      desc: `Targeting the right potential customers is one of the most crucial pillars for any company. After having researched the market and your competitors thoroughly, our experts will determine your primary market. Based on this information they will choose the best channels to reach this market. They will then set an appropriate price and as accurately as possible, project the revenue you’ll generate.`,
    },
    {
      title: "Business infrastructure",
      icon: infrastructure,
      desc: `In this part we will delve into the technical operational side of the business. It covers the organizational structure based on the roles of the individuals working in it all whilst intricately describing their jobs. By dividing responsibilities the processes of the business will be optimized in addition the skills and knowledge of the people involved will be efficiently utilized.`,
    },
    {
      title: "Financial study",
      icon: budget,
      desc: `Our financial study brings together all sections by projecting revenue, costs, and crafting tailored financial statements. Key ratios like ROI, ROE, and break-even point are included to assess and boost profitability. Additionally, we determine the investment needed and appropriate funding sources.`,
    },
    {
      title: "Growth strategy",
      icon: goal,
      desc: `This last point allows you to picture where your business is heading in terms of product and/or service development. This particularly interests investors in that it allows them to see that the continuity plan has been thought of, studied, and put in place.`,
    },
    {
      title: "Expert Guidance ",
      icon: expert,
      desc: `Expert guidance and support are crucial aspects of our business plan services. Our experienced consultants work closely with you to understand your unique business goals, challenges, and opportunities. They provide personalized assistance every step of the way, offering valuable insights, recommendations, and industry expertise to help you make informed decisions and achieve success.`,
    },
  ];
  const IdeaGenerationArray = [
    {
      title: "Overcoming concerns",
      icon: solutions,
      desc: `Alleviates perceived shortcomings and ambiguity by proposing solutions and the best way to practically tackle these apprehensions`,
    },
    {
      title: "Company structure",
      icon: enterprise,
      desc: `Assesses and explains whether or not a team is needed, how many people, in which profession, and which hierarchy`,
    },
    {
      title: "Optimizing the use of skills",
      icon: book,
      desc: `Puts your knowledge and experience at the core of the value proposition of the suggested business and links your skills to it`,
    },
    {
      title: "Prospective growth",
      icon: growth,
      desc: `Informs you about your company's opportunities and growth horizon, all while considering your outlook, risk taking preferences and skills`,
    },
  ];
  const router = useRouter();

  useEffect(() => {
    const queryString = router?.query?.service ? router.query.service[0] : "";
    if (!isEmpty(router.query)) {
      scrollToAllias[queryString]
        ? scrollToAllias[queryString].current.scrollIntoView(false)
        : router.replace("/services");
    }
  }, [router]);

  return (
    <>
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
                Our studied prices are clearly stated in the bundles with no
                hidden fees. These bundles cater for the needs of entrepreneurs
                in any industry and any location.
              </div>
            </div>
          </div>
        </div>
        <div className={styles.mainContainer}>
          {/* buisines plan Section  */}
          <div className={styles.plansSection}>
            <div className={styles.planTitle}>
              <div  ref={businessplanRef} className={styles.planIcon}>
                <Image alt="report" width={42} height={45} src={report} />
              </div>

              <h1 className="subTitle">Business plan</h1>
              <div className="description">
                In any industry, business plans have become a necessity if a
                company is to succeed. The competition in all fields has been on
                the rise and markets are getting saturated.
              </div>
            </div>
            <div
              className={`${styles.planContent} ${styles.planContentBusiness}`}
            >
              <div className={styles.desc}>
                <div ref={businessideaRef} className={styles.text}>
                  For a business to thrive and launch successfully in today’s
                  markets all the variables need to be accounted for. A basic
                  business plan is no longer viable in a complex ecosystem.
                  Currently, not considering several future opportunities makes
                  the plan rigid. It should be flexible. When we analyze your
                  idea and start drawing its outlines we keep all of this in
                  mind.
                  <br />
                  <br />
                  We go beyond providing you with a pitch deck for investors or
                  a research that is only informative by nature. We delve into
                  details and provide you with strategies based on explained
                  data. We provide you with financial control systems so you can
                  maintain and assess your business in the future. The process
                  we follow makes it simpler to keep you on board with what
                  we’re doing every step of the way. We do not provide you with
                  a bulk document to read all at once.
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
              <h2>
                Briefly, the main aspects of your business plan will be but are
                not limited to
              </h2>
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
          {/* idea generation Section */}
          <div
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

              <h2 className="subTitle">Idea generation</h2>
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
                <div ref={businessplanRef} className={styles.text}>
                  We suggest uniquely tailored ideas for you based on your
                  answers in the questionnaire. You will get a proposal of 2 to
                  3 business ideas. You will also be provided with a comparative
                  study of these ideas to help you knowledgably choose the best
                  option for you. This comparison highlights the core value of
                  the business, its needed resources, and its future prospects.
                  <br />
                  <br />
                  Upon choosing an idea, we provide you with a full analysis. It
                  covers crucial insights on how your knowledge and available
                  assets can make it happen and why the business suits you in
                  terms of preferences and desired future outcomes. That is how
                  your concerns will be addressed and solutions provided. A
                  clear professional path will be drawn for you.
                  <br />
                  <br />
                  This service draws a basic business model for the proposed
                  idea you picked. This means that the report can easily be
                  turned into an executable business plan.
                </div>
              </div>
            </div>
            <div
              className={styles.successStorySection}
              style={{ paddingBottom: "1rem" }}
            >
              <h2 className="subTitle">Idea generation categories</h2>
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
