import styles from "@/styles/Home.module.scss";
import Button from "@mui/material/Button";
import Link from "next/link";
import Image from "next/image";
import backGroundImage from "~/public/imgs/landing-background.jpg";
export default function Home() {
  return (
    <>
      <section>
        <div className={styles.backgroundImg}>
          <div className={styles.image}>
            <Image
              height={586}
              width={1440}
              alt="background"
              src={backGroundImage}
              quality={100}
              priority={true}
            />
            <div className={styles.info}>
              <div className={styles.title}>Consulting Agency</div>
              <div className={styles.subTitle}>Endless Ideas</div>
              <div className={styles.description}>
                Our studied prices are clearly stated in the bundles with no
                hidden fees. These bundles cater for the needs of entrepreneurs
                in any industry and any location.
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className={styles.infoSmall}>
            <div className={styles.description}>
              Our studied prices are clearly stated in the bundles with no
              hidden fees. These bundles cater for the needs of entrepreneurs in
              any industry and any location.
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
