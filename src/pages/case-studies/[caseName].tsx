import { GetStaticProps, GetStaticPaths } from "next";
import styles from "@/styles/CaseStudies.module.scss";
import SEO from "@/pages/components/SEO";
import { configs } from "@/utils/config";

type CaseStudy = {
  id: string;
  title: string;
  content: string;
};

type Props = {
  caseStudy: CaseStudy;
};

export default function CaseStudyPage({ caseStudy }: Props) {
  return (
    <>
      <SEO
        title={`${caseStudy.title} - Horizon Consultancy`}
        description={caseStudy.content.slice(0, 150)}
        url={`${configs.PUBLIC_URL}/case-studies/${caseStudy.id}`}
      />

      <section className={styles.mainContainer}>
        <h1>{caseStudy.title}</h1>
        <p>{caseStudy.content}</p>
      </section>
    </>
  );
}

type CaseStudyType = {
  id: string;
  title: string;
  content: string;
};
// Generate paths for static pages
export const getStaticPaths: GetStaticPaths = async () => {
  const caseStudies = [{ id: "case1" }, { id: "case2" }];

  const paths = caseStudies.map((caseStudy) => ({
    params: { caseName: caseStudy.id },
  }));

  return {
    paths,
    fallback: false, // Change to 'true' if you want to generate pages on demand
  };
};

// Fetch individual case study data
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const caseStudies: Record<string, CaseStudyType> = {
    case1: {
      id: "case1",
      title: "Case Study 1",
      content: "Detailed content for case study 1.",
    },
    case2: {
      id: "case2",
      title: "Case Study 2",
      content: "Detailed content for case study 2.",
    },
  };

  const caseStudy = caseStudies[params?.caseName as string];

  return {
    props: { caseStudy },
  };
};
