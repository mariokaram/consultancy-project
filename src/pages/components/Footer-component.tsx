import * as React from "react";
import styles from "@/styles/Footer.module.scss";
import Link from "next/link";
import Image from "next/image";
import Logo from "~/public/icons/logo-primary.svg";
import XIcon from "@mui/icons-material/X";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
export default function Footer({ props }: any) {
  return (
    <>
      <div className={styles.footer}>
        <div className={styles.footerSection}>
          <div className={styles.footerLinks}>
            <div>
              <div>
                <Link href="/">
                  <Image alt="logo-footer" src={Logo} />
                </Link>
              </div>
              <div className={styles.social}>
                <XIcon />
                <FacebookIcon />
                <LinkedInIcon />
                <YouTubeIcon />
              </div>
            </div>
            <div>
              <div>Company</div>
              <Link href="/">About us</Link>
              <Link href="/">Blogs</Link>
              <Link href="/consultants">Consultants</Link>
              <Link href="/services">Services</Link>
            </div>
            <div>
              <div>Help & Support</div>
              <Link href="/pricing">Faq</Link>
              <Link href="/pricing">Pricing</Link>
              <Link href="/contact">Contact us</Link>
            </div>
            <div>
              <div>Legal</div>
              <Link href="/">Terms & Conditions</Link>
              <Link href="/">Privacy Policy</Link>
            </div>
          </div>
          <hr />
          <div className={styles.copyRight}>
            Copyright © {new Date().getFullYear()} Horizon Consultancy. All
            rights reserved.
          </div>
        </div>
      </div>
    </>
  );
}
