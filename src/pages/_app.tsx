import "react-toastify/dist/ReactToastify.css";
import type { AppProps } from "next/app";
import React from "react";
import axios from "axios";
import { configs } from "@/utils/config";
import { SWRConfig } from "swr";
import { Analytics } from "@vercel/analytics/react";
import { CacheProvider, EmotionCache } from "@emotion/react";
import createCache from "@emotion/cache";
import Header from "@/pages/components/Header-component";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from "@/pages/components/Footer-component";
import localFont from "next/font/local";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import SpinnerContextProvider from "@/contexts/SpinnerContextProvider";
import CookieConsent from "@/pages/components/CookieConsent";
import { useRouter } from "next/router";
import "@/styles/globals.scss";
import NextNProgress from "nextjs-progressbar";
// Material-UI imports
import { createTheme, ThemeProvider } from "@mui/material/styles";

// ----- axios base URL START
axios.defaults.baseURL = configs.webUrl || "";

// --------- stuff to do in order to run material ui to works on server side START
function createEmotionCache() {
  return createCache({ key: "css", prepend: true });
}
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  session: Session;
}

// ----- FONT_FAMILY FOR ALL WEB FROM LOCAL FONT START
const DMSans = localFont({
  src: [
    {
      path: "../../public/fonts/DM_Sans/DMSans-VariableFont_opsz,wght.ttf",
      weight: "100 900",
      style: "normal",
    },
    {
      path: "../../public/fonts/DM_Sans/DMSans-Italic-VariableFont_opsz,wght.ttf",
      weight: "100 900",
      style: "italic",
    },
  ],
  display: "swap",
  fallback: ["sans-serif"],
});

// Create a custom theme with the DM Sans font for the button component
const theme = createTheme({
  typography: {
    fontFamily: DMSans.style.fontFamily,
    button: {
      fontFamily: DMSans.style.fontFamily,
    },
  },
});

export default function App(props: MyAppProps) {
  const {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps,
    session,
  }: any = props;

  const router = useRouter();
  const hideFooterRoutes = ["/chatroom", "/signin", "/questionnaire"]; // Add more routes if needed
  return (
    <>
      <SessionProvider session={session} refetchInterval={300}>
        <SpinnerContextProvider>
          <ThemeProvider theme={theme}>
            <CacheProvider value={emotionCache}>
              <div className={DMSans.className}>
                <Header />
                <CookieConsent />
                <SWRConfig
                  value={{
                    fetcher: (url) => axios(url).then((r) => r.data),
                    errorRetryCount: 3,
                    errorRetryInterval: 5000,
                  }}
                >
                  <main className="main">
                    <NextNProgress color="var(--blueColor)" />
                    <Component {...pageProps} />
                    <Analytics />
                  </main>
                </SWRConfig>
                {!hideFooterRoutes.includes(router.pathname) && (
                  <footer>
                    <Footer />
                  </footer>
                )}
              </div>
            </CacheProvider>
          </ThemeProvider>
        </SpinnerContextProvider>
      </SessionProvider>
    </>
  );
}
