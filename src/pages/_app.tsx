import "@/styles/globals.scss";
import { Roboto } from "next/font/google";
import type { AppProps } from "next/app";
import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { configs } from "@/utils/config";
import { SWRConfig } from "swr";
import { Analytics } from "@vercel/analytics/react";
import { CacheProvider, EmotionCache } from "@emotion/react";
import createCache from "@emotion/cache";
axios.defaults.baseURL = configs.serverUrl || "";

function createEmotionCache() {
  return createCache({ key: "css", prepend: true });
}
const clientSideEmotionCache = createEmotionCache();
interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}
const roboto = Roboto({ subsets: ["latin"], weight: "400" });

export default function App(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <>
      <CacheProvider value={emotionCache}>
        <SWRConfig
          value={{
            fetcher: (url) => axios(url).then((r) => r.data),
          }}
        >
          <main className={roboto.className}>
            <Component {...pageProps} />
            <Analytics />
          </main>
        </SWRConfig>
      </CacheProvider>
    </>
  );
}
