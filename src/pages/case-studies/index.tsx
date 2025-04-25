import { GetStaticProps } from "next";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import styles from "@/styles/CaseStudies.module.scss";
import SEO from "@/pages/components/SEO";
import { configs } from "@/utils/config";
import businessPlan from "~/public/imgs/businessPlan.webp";
import successWork from "~/public/imgs/case-study-1.jpg";
import consultantProf2 from "~/public/imgs/consultant1.png";

type CaseStudy = {
  id: string;
  title: string;
  description: string;
  date: string;
  image: StaticImageData;
  author: string;
  authorImage: StaticImageData;
};

type Props = {
  caseStudies: CaseStudy[];
};

export default function CaseStudies({ caseStudies }: Props) {
  const [first, ...rest] = caseStudies;

  return (
    <>
      <SEO
        title="Case studies - Horizon Consultancy"
        description="Horizon Consultancy provides case studies."
        url={`${configs.PUBLIC_URL}/case-studies`}
      />

      <section>
        <div className={styles.mainContainer}>
          <div className={styles.textIntro}>
            <h2 className="subTitle">Case Studies</h2>
            <div className="description">
              Discover how Horizon Consultancy has helped businesses grow,
              innovate, and succeed. Our case studies highlight real-world
              projects, strategic solutions, and measurable results that
              showcase the impact of our work across various industries.
            </div>
          </div>

          <div className={styles.CardContainer}>
            {/* Hero-style first case */}
            <div className={styles.heroCard}>
              <div className={styles.heroImage}>
                <Image
                  src={first.image}
                  alt={first.title}
                  fill
                  className={styles.imgCover}
                />
              </div>
              <div className={styles.heroContent}>
                <p className={styles.date}>{first.date}</p>
                <h2>{first.title}</h2>
                <p className={styles.description}>{first.description}</p>
                <div className={styles.metaRow}>
                  <div className={styles.authorInfo}>
                    <Image
                      src={first.authorImage}
                      alt={first.author}
                      width={24}
                      height={24}
                    />
                    <span>{first.author}</span>
                  </div>
                  <Link
                    href={`/case-studies/${first.id}`}
                    className={styles.cta}
                  >
                    Read more →
                  </Link>
                </div>
              </div>
            </div>

            {/* Other cards */}
            <div className={styles.grid}>
              {rest.map((caseStudy) => (
                <div key={caseStudy.id} className={styles.card}>
                  <div className={styles.cardImage}>
                    <Image
                      src={caseStudy.image}
                      alt={caseStudy.title}
                      fill
                      className={styles.imgCover}
                    />
                  </div>
                  <div className={styles.cardContent}>
                    <p className={styles.date}>{caseStudy.date}</p>
                    <h3>{caseStudy.title}</h3>
                    <p className={styles.description}>
                      {caseStudy.description}
                    </p>
                    <div className={styles.metaRow}>
                      <div className={styles.authorInfo}>
                        <Image
                          src={caseStudy.authorImage}
                          alt={caseStudy.author}
                          width={24}
                          height={24}
                        />
                        <span>{caseStudy.author}</span>
                      </div>
                      <Link
                        href={`/case-studies/${caseStudy.id}`}
                        className={styles.cta}
                      >
                        Read more →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const caseStudies: CaseStudy[] = [
    {
      id: "case1",
      title:
        "Transforming Expertise into a Profitable Visa Consulting Business",
      description:
        "Our client had extensive experience managing Canadian visa applications but was unsure whether she could build a business around it. Without a law degree, she worried about legal limitations and feared she wouldn't be able to offer her services compliantly, which held her back from pursuing her entrepreneurial potential.",
      date: "October 21, 2023",
      image: successWork,
      author: "Paul Martins",
      authorImage: consultantProf2,
    },
    {
      id: "case2",
      title: "Unleashing Creativity: Idea Generation",
      description: "Creativity is the lifeblood of innovation. Creativity is the li Creativity is the li",
      date: "November 5, 2023",
      image: successWork,
      author: "Sarah Collins",
      authorImage: consultantProf2,
    },
    {
      id: "case3",
      title: "Scaling Efficiently",
      description: "A roadmap to scalable operations. oadmap to scalable oper oadmap to scalable oper oadmap to scalable oper oadmap to scalable oper",
      date: "November 19, 2023",
      image: successWork,
      author: "Tom Richards",
      authorImage: consultantProf2,
    },
    {
      id: "case4",
      title: "Scaling Efficiently",
      description: "A roadmap to scalable operations.",
      date: "November 19, 2023",
      image: businessPlan,
      author: "Tom Richards",
      authorImage: consultantProf2,
    },
    {
      id: "case5",
      title: "Scaling Efficiently",
      description: "A roadmap to scalable operations.",
      date: "November 19, 2023",
      image: businessPlan,
      author: "Tom Richards",
      authorImage: consultantProf2,
    },
    {
      id: "case6",
      title: "Scaling Efficiently",
      description: "A roadmap to scalable operations.",
      date: "November 19, 2023",
      image: businessPlan,
      author: "Tom Richards",
      authorImage: consultantProf2,
    },
  ];

  return {
    props: { caseStudies },
  };
};
