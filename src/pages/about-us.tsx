import styles from "@/styles/About.module.scss";
import Image from "next/image";
import backGroundImage from "~/public/imgs/about.webp";
import SEO from "@/pages/components/SEO";
import { configs } from "@/utils/config";

export default function AboutPage() {
  return (
    <>
      <SEO
        title="About us - Horizon Consultancy"
        description="Horizon Consultancy offers expert business planning and strategic consulting, helping startups and businesses navigate compliance across industries."
        url={`${configs.PUBLIC_URL}/about-us`}
      />
      <section className={styles.sectionMain}>
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
                About Us
              </h1>
              <div className={styles.description}>
                Horizon Consultancy provides expert business planning and
                strategic consulting for startups and businesses globally,
                focusing on compliance and collaboration across key industries.
              </div>
            </div>
          </div>
        </div>
        <div className={styles.mainContainer}>
          <div className={styles.aboutSection}>
            <h6 className="title">Who We Are</h6>
            <div className={styles.aboutText}>
              At Horizon Consultancy, we specialize in business planning and
              strategic consulting, helping startups and businesses succeed with
              well-structured, results-driven strategies. Our primary focus is
              on Canadian businesses, but we also assist international clients
              seeking expert guidance.
              <br />
              <br />
              Our core team is based in Canada, bringing deep industry knowledge
              across financial services, hospitality, healthcare, technology,
              and more. To enhance our expertise, we also collaborate with
              carefully selected international specialists when needed.
              <br />
              <br />
              To ensure compliance, legal adherence, and a deep understanding of
              market nuances, we strategically partner with trusted Canadian and
              local experts in different regions. This approach guarantees that
              all aspects of your business are covered professionally, while
              keeping our solutions aligned with Canadian regulations and market
              expectations, or other regions&apos; local regulations when
              applicable.
            </div>
          </div>
          <div className={styles.aboutSection}>
            <h6 className="title">Our mission</h6>
            <div className={styles.aboutText}>
              Above all else, our goal is to deliver not just the plan, but the
              knowledge that enables its success. We are dedicated to ensuring
              that, before finalizing any plan, you fully understand how to
              manage and execute it.
              <br />
              <br />
              Our mission is to provide the insights and guidance needed to help
              you navigate risks, make informed decisions, and steer your
              business toward sustainable growth. We are committed to equipping
              you with the understanding and clarity required to lead your
              company confidently and achieve lasting success.
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
