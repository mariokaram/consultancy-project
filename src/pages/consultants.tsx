import styles from "@/styles/Consultants.module.scss";
import Image from "next/image";
import backGroundImage from "~/public/imgs/consultants-hero.webp";
import ContactBanner from "@/pages/components/Contact-Banner";
import { consultants } from "@/utils/shared";

export default function ConsultantsPage() {
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
                Meet our Consultants
              </h1>
              <div className={styles.description}>
                Meet our consultants, a diverse team of experts with specialized
                knowledge across various industries. No matter your sector, our
                team is equipped to craft tailored business plans that meet your
                specific needs.
              </div>
            </div>
          </div>
        </div>
        <div className={styles.mainContainer}>
          <div className={styles.consultantSection}>
            {consultants.map((consultant, index) => (
              <div key={index} className={styles.consultBloc}>
                <div className={styles.consultImg}>
                  <Image
                    alt={`Profile image of ${consultant.name}`}
                    width={285}
                    height={285}
                    src={consultant.imageSrc}
                  />
                </div>
                <div className={styles.consultDesc}>
                  <div className={styles.consultName}>{consultant.name}</div>
                  <div className={styles.consultField}>{consultant.field}</div>
                  <div className={styles.consultFocus}>
                    Industry Focus:<span> {consultant.focus}</span>
                  </div>
                  <div className={styles.consultBio}>{consultant.bio}</div>
                  <div className={styles.consultQuote}>
                    &quot;{consultant.quote}&quot;
                  </div>
                </div>
              </div>
            ))}
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
