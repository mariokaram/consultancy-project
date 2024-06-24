import * as React from "react";
import styles from "@/styles/Footer.module.scss";
import Link from "next/link";
import Image from "next/image";
import Logo from "~/public/icons/logo-primary.svg";

export default function Footer({ props }: any) {
  return (
    <footer>
      <div className={styles.footer}>
        <div className={styles.footerSection}>
          <div className={styles.footerLinks}>
            <div>
              <div className={styles.logo}>
                <Image
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  alt="logo"
                  src={Logo}
                />
              </div>
              <div>social media icons</div>
            </div>
            <div>
              <div>Company</div>
              <Link href="/">About us</Link>
              <Link href="/">Blogs</Link>
            </div>
            <div>
              <div>Help & Support</div>
              <Link href="/">Faq</Link>
              <Link href="/">Consultants</Link>
            </div>
            <div>
              <div>Legal</div>
              <Link href="/">Terms & Conditions</Link>
              <Link href="/">Privacy Policy</Link>
            </div>
          </div>
          <div className={styles.copyRight}>
            All right reserved. Copyright 2023 Horizon
          </div>
        </div>
      </div>
    </footer>
  );
}
