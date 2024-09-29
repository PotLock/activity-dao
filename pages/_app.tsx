import { Fragment, useEffect, useState } from "react";
import Head from "next/head";
import type { AppProps } from "next/app";
import { ThemeProvider, createTheme } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

import createGlobalStyle from "./styles/global";
import Loader from "../components/loader";

createGlobalStyle();

export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }

    // Simulate loading time (remove this in production)
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const muiTheme = createTheme();

  return (
    <Fragment>
      <Head>
        {/* ... existing head content ... */}
      </Head>
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        {loading ? <Loader /> : <Component {...pageProps} />}
      </ThemeProvider>
    </Fragment>
  );
}
