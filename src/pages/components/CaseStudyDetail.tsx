import Image from "next/image";
import styles from "@/styles/CaseName.module.scss";
import type { CaseStudyDetailType } from "@/utils/shared";
import Link from "next/link";

export default function CaseStudyDetail({ cs }: { cs: CaseStudyDetailType }) {
  if (!cs) return <div>Loading or no data</div>;
  return (
    <section>
      <div className={styles.mainContainer}>
        <div className={styles.dateRow}>
          <Link href="/case-studies" className={styles.cta}>
            ← Show all cases
          </Link>
        </div>
        <h1 className={styles.title}>{cs.title}</h1>

        <div className={styles.authorSection}>
          <div className={styles.authorInfo}>
            <Image
              src={cs.authorImage}
              alt={cs.author}
              width={24}
              height={24}
            />
            <span>By {cs.author}</span>
          </div>
          <div className={styles.date}>{cs.date}</div>
        </div>

        <div className={styles.heroWrapper}>
          <Image
            src={cs.image}
            alt={cs.title}
            width={1200}
            height={600}
            className={styles.heroImage}
            priority
          />
        </div>

        <article className={styles.caseContent}>
          {cs.sections.map((sec) => (
            <div key={sec.heading} className={styles.contentSection}>
              <h2 className={styles.sectionHeading}>{sec.heading}</h2>
              {sec.body.split("\n\n").map((para, i) => (
                <p key={i} className={styles.sectionBody}>
                  {para}
                </p>
              ))}
            </div>
          ))}
        </article>
      </div>
    </section>
  );
}
