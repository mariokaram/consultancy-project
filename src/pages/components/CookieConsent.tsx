// components/CookieConsent.tsx

import { useState, useEffect } from "react";
import styles from "@/styles/CookieConsent.module.scss";
import { Button } from "@mui/material";
import localFont from "next/font/local";

const Aeonik = localFont({
  src: [
    {
      path: "../../../public/fonts/Aeonik-Regular.otf",
      weight: "400",
    },
    { path: "../../../public/fonts/Aeonik-Light.otf", weight: "300" },
    { path: "../../../public/fonts/Aeonik-Bold.otf", weight: "600" },
  ],
  display: "swap",
});

const CookieConsent: React.FC = () => {
  const [showBanner, setShowBanner] = useState<boolean | null>(null);
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    const cookiesAccepted = localStorage.getItem("cookiesAccepted");
    if (cookiesAccepted) {
      setAccepted(true);
    }

    // Delay adding `.visible` for smooth entry
    setTimeout(() => setShowBanner(true), 1000);
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookiesAccepted", "true");
    setAccepted(true);
    setShowBanner(false);
  };

  if (showBanner === null) return null;

  return showBanner && !accepted ? (
    <div
      className={`${styles.cookieBanner} ${styles.visible} ${Aeonik.className}`}
    >
      <p>
        We use cookies to improve your experience and for session management
        purposes only. By continuing to use this site, you consent to our use of
        cookies. For more information, please read our{" "}
        <a href="/privacy" target="_blank" rel="noopener noreferrer">
          Privacy Policy.
        </a>{" "}
      </p>
      <Button className="btn btn-secondary" onClick={handleAccept}>
        Got it
      </Button>
    </div>
  ) : null;
};

export default CookieConsent;
