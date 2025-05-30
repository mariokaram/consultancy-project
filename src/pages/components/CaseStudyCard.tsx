import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/CaseStudies.module.scss";
import type { CaseStudySummaryType } from "@/utils/shared";

export default function CaseStudyCard({
  cs,
  type,
  rest,
}: {
  cs?: CaseStudySummaryType;
  type: string;
  rest?: CaseStudySummaryType[];
}) {
  return (
    <div className={styles.CardContainer}>
      {type === "first" && cs ? (
        <div className={styles.heroCard}>
          <div className={styles.heroImage}>
            <Image
              src={cs.image}
              alt={cs.title}
              fill
              className={styles.imgCover}
            />
          </div>
          <div className={styles.heroContent}>
            <p className={styles.date}>{cs.date}</p>
            <h3>{cs.title}</h3>
            <p className={styles.description}>{cs.description}</p>
            <div className={styles.metaRow}>
              <div className={styles.authorInfo}>
                <Image
                  src={cs.authorImage}
                  alt={cs.author}
                  width={24}
                  height={24}
                />
                <span>By {cs.author}</span>
              </div>
              <Link href={`/case-studies/${cs.slug}`} className={styles.cta}>
                Read more →
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.grid}>
          {rest?.map((cs) => (
            <div key={cs.title} className={styles.card}>
              <div className={styles.cardImage}>
                <Image
                  src={cs.image}
                  alt={cs.title}
                  fill
                  className={styles.imgCover}
                />
              </div>
              <div className={styles.cardContent}>
                <p className={styles.date}>{cs.date}</p>
                <h3>{cs.title}</h3>
                <p className={styles.description}>{cs.description}</p>
                <div className={styles.metaRow}>
                  <div className={styles.authorInfo}>
                    <Image
                      src={cs.authorImage}
                      alt={cs.author}
                      width={24}
                      height={24}
                    />
                    <span>By {cs.author}</span>
                  </div>
                  <Link
                    href={`/case-studies/${cs.slug}`}
                    className={styles.cta}
                  >
                    Read more →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
