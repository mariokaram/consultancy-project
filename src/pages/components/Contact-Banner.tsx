import * as React from "react";
import Button from "@mui/material/Button";
import styles from "@/styles/Contact-Banner.module.scss";
import Link from "next/link";
export default function ContactBanner({ props }: any) {
  return (
    <>
      <div className={styles.contactSection}>
        <div className="title">contact us</div>
        <div className={`description ${styles.desc}`}>
          We believe the workspaces of tomorrow begin with people, a
          collaboration between your team and ours. Horizontal is a global
          network of expertise. Bridging geographical and cultural differences
          we are united by our purpose to create workplaces that transform the
          way people work.
        </div>
        <div className={styles.btn}>
          <Link href="/" passHref>
            <Button className="btn btn-secondary">get in touch</Button>
          </Link>
        </div>
      </div>
    </>
  );
}
