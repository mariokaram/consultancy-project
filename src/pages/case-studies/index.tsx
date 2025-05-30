import { GetStaticProps } from "next";
import SEO from "@/pages/components/SEO";
import { configs } from "@/utils/config";
import { getAllCaseStudies, CaseStudySummaryType } from "@/utils/shared";
import CaseStudyCard from "@/pages/components/CaseStudyCard";
import styles from "@/styles/CaseStudies.module.scss";

export const getStaticProps: GetStaticProps = async () => ({
  props: { caseStudies: getAllCaseStudies() },
});
type Props = {
  caseStudies: CaseStudySummaryType[];
};

export default function CaseStudies({ caseStudies }: Props) {
  const [first, ...rest] = caseStudies;
  return (
    <>
      <SEO
        title="Case studies - Horizon Consultancy"
        description="Discover how Horizon Consultancy empowers businesses to grow and innovate through real-world case studies featuring strategic solutions and measurable results across diverse industries."
        url={`${configs.PUBLIC_URL}/case-studies`}
      />
      <section>
        <div className={styles.mainContainer}>
          <div className={styles.textIntro}>
            <h2 className="subTitle">Case Studies</h2>
            <div className="description">
              Discover how Horizon Consultancy has helped businesses grow,
              innovate, and succeed. Our case studies showcase real-world
              projects, strategic solutions, and measurable results that
              demonstrate the impact of our work across a range of industries.
            </div>
          </div>
          <CaseStudyCard cs={first} type="first" />
          <CaseStudyCard rest={rest} type="rest" />
        </div>
      </section>
    </>
  );
}
