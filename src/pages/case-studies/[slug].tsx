import { GetStaticPaths, GetStaticProps } from "next";
import SEO from "@/pages/components/SEO";
import { configs } from "@/utils/config";
import {
  getAllCaseStudies,
  CaseStudyDetailType,
  getCaseStudyBySlug,
} from "@/utils/shared";
import CaseStudyDetail from "@/pages/components/CaseStudyDetail";

type Props = {
  caseStudy: CaseStudyDetailType;
};

export default function CaseStudyPage({ caseStudy }: Props) {
  return (
    <>
      <SEO
        title={`${caseStudy.title} - Horizon Consultancy`}
        description={caseStudy.sections
          .map((s) => s.body)
          .join(" ")
          .slice(0, 150)}
        url={`${configs.PUBLIC_URL}/case-studies/${caseStudy.slug}`}
      />

      <CaseStudyDetail cs={caseStudy} />
    </>
  );
}
export const getStaticPaths: GetStaticPaths = async () => ({
  paths: getAllCaseStudies().map((cs) => ({
    params: { slug: cs.slug },
  })),
  fallback: "blocking",
});

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const cs = getCaseStudyBySlug(params?.slug as string);
  if (!cs) return { notFound: true };
  return { props: { caseStudy: cs } };
};
