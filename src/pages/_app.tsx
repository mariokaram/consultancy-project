import "@/styles/globals.scss";
import { Roboto } from "next/font/google";
import type { AppProps } from "next/app";
import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { configs } from "@/utils/config";
import { SWRConfig } from "swr";
import { Analytics } from '@vercel/analytics/react';
const roboto = Roboto({ subsets: ["latin"], weight: "400" });
axios.defaults.baseURL = configs.serverUrl || "";
export default function App({ Component, pageProps }: AppProps) {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);
  return (
    <>
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
    </>
  );
}
App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
