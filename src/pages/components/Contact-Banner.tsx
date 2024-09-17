import * as React from "react";
import Button from "@mui/material/Button";
import styles from "@/styles/Contact-Banner.module.scss";
import Link from "next/link";
import Image from "next/image";
import contactus from "~/public/imgs/contact.webp";

export default function ContactBanner() {
  return (
    <>
      <div className={styles.contactSection}>
        <Image quality={100} src={contactus} alt="contactus" />
        <div className={styles.content}>
          <h6 className={`title ${styles.title} `}>contact us</h6>
          <h2 className={`subTitle ${styles.subTitle} `}>
            Got a project? Let&apos;s talk
          </h2>
          <div className={`description ${styles.desc}`}>
            We believe the workspaces of tomorrow begin with people, a
            collaboration between your team and ours. Horizontal is a global
            network of expertise. Bridging geographical and cultural differences
            we are united by our purpose to create workplaces that transform the
            way people work.
          </div>
          <div className={styles.btn}>
            <Link href="/">
              <Button size="large" className="btn btn-secondary">
                get in touch
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
