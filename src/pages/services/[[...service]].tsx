import styles from "@/styles/Services.module.scss";
import Image from "next/image";
import backGroundImage from "~/public/imgs/services-background.png";
import businessPlan from "~/public/imgs/about.png";
import listPen from "~/public/icons/list-pen.svg";
import ContactBanner from "@/pages/components/Contact-Banner";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { isEmpty } from "lodash";

export default function ServicesPage() {
  const mediaQuery = useMediaQuery("(max-width:1000px)");
  const mediaQuery14 = useMediaQuery("(max-width:1400px)");
  const mediaQuery6 = useMediaQuery("(max-width:600px)");
  const businessplanRef = useRef(null);
  const businessideaRef = useRef(null);
  const scrollToAllias: any = {
    "proposing-business-ideas": businessideaRef,
    "business-plan": businessplanRef,
  };
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
            <div
              className={styles.info}
              style={{ display: mediaQuery ? "none" : "block" }}
            >
              <div className="title">Plans</div>
              <div className="subTitle">Our Services</div>
              <div className={styles.description}>
                Our studied prices are clearly stated in the bundles with no
                hidden fees. These bundles cater for the needs of entrepreneurs
                in any industry and any location.
              </div>
            </div>
          </div>
        </div>

        <div className={styles.mainContainer}>
          {/* backGroundImage landscape  */}
          <div
            className={styles.info}
            style={{ display: mediaQuery ? "block" : "none" }}
          >
            <div className="title">Plans</div>
            <div className="subTitle">Our Services</div>
            <div className={styles.description}>
              Our studied prices are clearly stated in the bundles with no
              hidden fees. These bundles cater for the needs of entrepreneurs in
              any industry and any location.
            </div>
          </div>

          {/* buisines plan Section  */}
          <div className={styles.plansSection}>
            <div className={styles.img}>
              <Image
                alt="business-plan"
                src={businessPlan}
                quality={100}
                priority={true}
              />
            </div>
            <div className={styles.desc}>
              <div className="subTitle">Business plan</div>
              <div ref={businessplanRef} className={styles.text}>
                In any industry, business plans have become a necessity if a
                company is to succeed. The competition in all fields has been on
                the rise and markets are getting saturated.
                <br />
                <br />
                For a business to thrive and launch successfully in today&apos;s
                markets all the variables need to be accounted for. A basic
                business plan is no longer viable in a complex ecosystem.
                Currently, not considering several future opportunities makes
                the plan rigid. It should be flexible. When we analyze your idea
                and start drawing its outlines we keep all of this in mind.
                <br />
                <br />
                We go beyond providing you with a pitch deck for investors or a
                research that is only informative by nature. We delve into
                details and provide you with strategies based on explained data.
                We provide you with financial control systems so you can
                maintain and assess your business in the future.
                <br />
                <br />
                The process we follow makes it simpler to keep you on board with
                what we&apos;re doing every step of the way. We do not provide
                you with a bulk document to read all at once.
                <br />
                <br />
                Briefly, the main aspects of your business plan will be but are
                not limited to
              </div>
            </div>
          </div>

          {/* business plan  categories */}
          <div className={styles.detailsSection}>
            <div className="title">Successful businesses have</div>

            <div className={styles.detailsContainer}>
              <div className={styles.detail}>
                <div className={styles.item}>
                  <div>
                    <Image alt="listPen" src={listPen} />
                  </div>
                  <div className={styles.title}>Executive summary</div>
                  <div className={styles.desc}>
                    The first section of your business plan will be the
                    executive summary. It will contain all crucial information
                    about your business. When we create an executive summary we
                    make sure that it motivates and attracts readers,
                    particularly targeted investors. It will concisely and
                    comprehensively go through all the main points in the
                    business plan.
                  </div>
                </div>
                <div className={styles.item}>
                  <div>
                    <Image alt="listPen" src={listPen} />
                  </div>
                  <div className={styles.title}>Business model</div>
                  <div className={styles.desc}>
                    The business model identifies all the building blocks of a
                    company based on the value proposition. It covers areas such
                    as the target market, revenue streams, expenses, key
                    activities, needed resources, potential partners, customer
                    service, and marketing channels. The rest of the business
                    plan will be based in a more elaborative way on these key
                    points.
                  </div>
                </div>
              </div>
              <div className={styles.detail}>
                <div className={styles.item}>
                  <div>
                    <Image alt="listPen" src={listPen} />
                  </div>
                  <div className={styles.title}>Competitor analysis</div>
                  <div className={styles.desc}>
                    The nearest competitors offer great insight into the market
                    in terms of what works and what doesn&apos;t. Our
                    consultants will study the performance, positioning, and
                    historical data of these competitors. This allows our
                    experts to adopt their strong points, avoid their
                    shortcomings, and find out what is the best positioning for
                    your company.{" "}
                  </div>
                </div>
                <div className={styles.item}>
                  <div>
                    <Image alt="listPen" src={listPen} />
                  </div>
                  <div className={styles.title}>Market analysis</div>
                  <div className={styles.desc}>
                    Targeting the right potential customers is one of the most
                    crucial pillars for any company. After having researched the
                    market and your competitors thoroughly, our experts will
                    determine your primary market. Based on this information
                    they will choose the best channels to reach this market.
                    They will then set an appropriate price and as accurately as
                    possible, project the revenue you&apos;ll generate.
                  </div>
                </div>
              </div>
              <div className={styles.detail}>
                <div className={styles.item}>
                  <div>
                    <Image alt="listPen" src={listPen} />
                  </div>
                  <div className={styles.title}>Business infrastructure</div>
                  <div className={styles.desc}>
                    In this part we will delve into the technical operational
                    side of the business. It covers the organizational structure
                    based on the roles of the individuals working in it all
                    whilst intricately describing their jobs. By dividing
                    responsibilities the processes of the business will be
                    optimized in addition the skills and knowledge of the people
                    involved will be efficiently utilized.
                  </div>
                </div>
                <div className={styles.item}>
                  <div>
                    <Image alt="listPen" src={listPen} />
                  </div>
                  <div className={styles.title}>Financial study</div>
                  <div className={styles.desc}>
                    The financial study ties all the sections together through
                    financial statements. Our experts meticulously project the
                    expected revenue and the costs that will be incurred. Based
                    on these numbers the consultants will then craft the
                    financial statements of the business (depending on its
                    type). Also, key financial ratios like ROI, ROE, break-even
                    point, will be included to assess the business and boost
                    profitability. The investment needed and the appropriate
                    sources of funding will be determined in this study.
                  </div>
                </div>
              </div>
              <div className={styles.detail}>
                <div className={styles.item} style={{ paddingBottom: 0 }}>
                  <div>
                    <Image alt="listPen" src={listPen} />
                  </div>
                  <div className={styles.title}>Growth strategy</div>
                  <div className={styles.desc}>
                    This last point allows you to picture where your business is
                    heading in terms of product and/or service development. This
                    particularly interests investors in that it allows them to
                    see that the continuity plan has been thought of, studied,
                    and put in place.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* idea generation Section */}
          <div className={styles.ideaSection}>
            <div className={styles.plansSection}>
              <div ref={businessideaRef} className={styles.img}>
                <Image
                  alt="business-plan"
                  src={businessPlan}
                  quality={100}
                  priority={true}
                />
              </div>
              <div className={styles.desc}>
                <div className="subTitle">Idea generation</div>
                <div className={styles.text}>
                  This innovative service is the first step towards becoming an
                  entrepreneur for individuals that have the will to start but
                  are not sure what idea suits them and how to go about it.
                  <br />
                  <br />
                  We suggest uniquely tailored ideas for you based on your
                  answers in the questionnaire. You will get a proposal of 2 to
                  3 business ideas. You will also be provided with a comparative
                  study of these ideas to help you knowledgably choose the best
                  option for you. This comparison highlights the core value of
                  the business, its needed resources, and its future prospects.
                  <br />
                  <br />
                  We go beyond providing you with a pitch deck for investors or
                  a research that is only informative by nature. We delve into
                  details and provide you with strategies based on explained
                  data. We provide you with financial control systems so you can
                  maintain and assess your business in the future.
                  <br />
                  <br />
                  Upon choosing an idea, we provide you with a full analysis. It
                  covers: crucial insights on how your knowledge and available
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
            <div className={styles.detailsSection}>
              <div className="title">Idea generation categories</div>
              <div className={styles.detailsContainer}>
                <div className={styles.detail}>
                  <div className={styles.item}>
                    <div className={styles.title}>Overcoming concerns</div>
                    <div className={styles.desc}>
                      Alleviates perceived shortcomings and ambiguity by
                      proposing solutions and the best way to practically tackle
                      these apprehensions.
                    </div>
                  </div>
                  <div className={styles.item}>
                    <div className={styles.title}>
                      Optimizing the use of skills
                    </div>
                    <div className={styles.desc}>
                      Puts your knowledge and experience at the core of the
                      value proposition of the suggested business and links your
                      skills to it.
                    </div>
                  </div>
                </div>
                <div className={styles.detail}>
                  <div className={styles.item}>
                    <div className={styles.title}>Company structure</div>
                    <div className={styles.desc}>
                      Assesses and explains whether or not a team is needed, how
                      many people, in which profession, and which hierarchy.
                    </div>
                  </div>
                  <div className={styles.item}>
                    <div className={styles.title}>Prospective growth</div>
                    <div className={styles.desc}>
                      Informs you about your company&apos;s opportunities and
                      growth horizon, all while considering your outlook, risk
                      taking preferences and skills.
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* contact section */}
            <div className={styles.contactSection}>
              <ContactBanner />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
