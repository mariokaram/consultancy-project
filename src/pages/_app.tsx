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

// ----- FONT_FAMILY FOR ALL WEB FROM GOOGLE FONT START
const Aeonik = localFont({
  src: [
    {
      path: "../../public/fonts/Aeonik-Regular.otf",
      weight: "400",
    },
    { path: "../../public/fonts/Aeonik-Light.otf", weight: "300" },
    { path: "../../public/fonts/Aeonik-Bold.otf", weight: "600" },
  ],
  display: "swap",
});

// Create a custom theme with the Aeonik font for the button component
const theme = createTheme({
  typography: {
    fontFamily: Aeonik.style.fontFamily,
    button: {
      fontFamily: Aeonik.style.fontFamily,
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
  return (
    <>
      <SessionProvider session={session}>
        <SpinnerContextProvider>
          <ThemeProvider theme={theme}>
            <CacheProvider value={emotionCache}>
              <Header />
              <CookieConsent/>
              <SWRConfig
                value={{
                  fetcher: (url) => axios(url).then((r) => r.data),
                  errorRetryCount: 3,
                  errorRetryInterval: 5000,
                }}
              >
                <main className={`${Aeonik.className} main`}>
                  <NextNProgress color="var(--blueColor)" />
                  <Component {...pageProps} />
                  {/* <Analytics /> */}
                </main>
              </SWRConfig>
              <footer className={`${Aeonik.className}`}>
                <Footer />
              </footer>
            </CacheProvider>
          </ThemeProvider>
        </SpinnerContextProvider>
      </SessionProvider>
    </>
  );
}
