import * as React from "react";
import styles from "@/styles/Footer.module.scss";
import Link from "next/link";
import Image from "next/image";
import Logo from "~/public/icons/logo-primary.svg";
import XIcon from "@mui/icons-material/X";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
export default function Footer() {
  return (
    <>
      <div className={styles.footer}>
        <div className={styles.footerSection}>
          <div className={styles.footerLinks}>
            <div>
              <div>
                <Link href="/">
                  <Image alt="logo-footer" priority src={Logo} />
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
              <div>About Us</div>
              <Link href="/about-us">Who We Are</Link>
              <Link href="/case-studies">Case Studies</Link>
              <Link href="/services">Our Services</Link>
              {/* <Link href="/consultants">Our Consultants</Link> */}
            </div>

            <div>
              <div>Explore</div>
              <Link href="/dashboard">Dashboard</Link>
              <Link href="/pricing">Pricing</Link>
              <Link href="/pricing?section=faq">FAQs</Link>
              <Link href="/contact">Contact Us</Link>
            </div>

            <div>
              <div>Legal</div>
              <Link href="/terms">Terms & Conditions</Link>
              <Link href="/privacy">Privacy Policy</Link>
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
