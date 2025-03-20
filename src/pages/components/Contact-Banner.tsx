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
            Got more questions? Let&apos;s talk
          </h2>
          <div className={`description ${styles.desc}`}>
            Whether you have more questions or need to schedule a meeting, don&apos;t
            hesitate to reach out. We&apos;re always ready to help and clarify any
            concerns you may have. Additionally, we can discuss and provide a
            mock-up plan during the meeting to give you a better understanding
            of our approach.
          </div>
          <div className={styles.btn}>
            <Link href="/contact">
              <Button size="large" className="btn btn-secondary">
                contact us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
