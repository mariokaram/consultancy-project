import { GetStaticProps } from "next";
import Link from "next/link";
import styles from "@/styles/CaseStudies.module.scss";
import SEO from "@/pages/components/SEO";
import { configs } from "@/utils/config";

type CaseStudy = {
  id: string;
  title: string;
  description: string;
};

type Props = {
  caseStudies: CaseStudy[];
};

export default function CaseStudies({ caseStudies }: Props) {
  return (
    <>
      <SEO
        title="Case studies - Horizon Consultancy"
        description="Horizon Consultancy provides case studies."
        url={`${configs.PUBLIC_URL}/case-studies`}
      />

      <section className={styles.mainContainer}>
        <h1>Our Case Studies</h1>
        <div className={styles.grid}>
          {caseStudies.map((caseStudy) => (
            <Link
              key={caseStudy.id}
              href={`/case-studies/${caseStudy.id}`}
              className={styles.card}
            >
              <h2>{caseStudy.title}</h2>
              <p>{caseStudy.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

// Fetch case studies data
export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
    redirect: { destination: "404" },
  };
  const caseStudies = [
    {
      id: "case1",
      title: "Case Study 1",
      description: "Description for case study 1.",
    },
    {
      id: "case2",
      title: "Case Study 2",
      description: "Description for case study 2.",
    },
  ];

  return {
    props: { caseStudies },
  };
};
