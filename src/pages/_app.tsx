import "react-toastify/dist/ReactToastify.css";
import { Montserrat } from "next/font/google";
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
import Footer from "./components/Footer-component";

import { SessionProvider, useSession } from "next-auth/react";
import { Session } from "next-auth";
import { useRouter } from "next/router";
import SpinnerContextProvider from "@/contexts/SpinnerContextProvider";
import "@/styles/globals.scss";

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

// TODO  responsive all pages

// ----- FONT_FAMILY FOR ALL WEB FROM GOOGLE FONT START
const roboto = Montserrat({ subsets: ["latin"], weight: "400" });

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
          <CacheProvider value={emotionCache}>
            <Header />
            <SWRConfig
              value={{
                fetcher: (url) => axios(url).then((r) => r.data),
              }}
            >
              <main className={`${roboto.className} main`}>
                <Component {...pageProps} />
                {/* <Analytics /> */}
              </main>
            </SWRConfig>
            <Footer />
          </CacheProvider>
        </SpinnerContextProvider>
      </SessionProvider>
    </>
  );
}

// function Auth({ role, children }: { role: { role: string }; children: any }) {
//   const { data: session, status } = useSession();
//   const router = useRouter();

//   React.useEffect(() => {
//     if (status === "loading") return;
//     if (status === "unauthenticated") router.push("/signin"); // If not authenticated, force log in
//     if (status === "authenticated" && session?.user?.role !== role.role)
//       // if authenticated but not authorized
//       router.push("/");
//   }, [session, status, router.pathname]);
//   if (status === "authenticated" && session?.user?.role === role.role) {
//     // if authenticated and authorized
//     return children;
//   }
//   // TODO waiting until redirecting
//   return <div style={{ height: "100%", zIndex: "999", background: "white" }}></div>; //should add loader or smthng todo
// }
