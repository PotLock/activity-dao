import { Fragment, useEffect } from "react";
import Head from "next/head";
import type { AppProps } from "next/app";
import { ThemeProvider, createTheme } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import createGlobalStyle from "./styles/global";

createGlobalStyle();

export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props;
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  const muiTheme = createTheme();

  return (
    <Fragment>
      <Head>
        <title>ActivityDAO</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <link rel="icon" href="favicon.ico" />
        <meta property="og:image" content="/thumbnail.png" />
        
        {/* New meta tags for improved SEO */}
        <meta name="description" content="ActivityDAOs - the movement to bootstrap the proliferation of activity-based communities" />
        <meta name="keywords" content="ActivityDAO, Local Activities, Funding Activities, Web3, Ethereum, NounsDAO, DAO, decentralized, community, activities, blockchain, PizzaDAO, Fund Activities, DAOs, BluntDAO, SuanaDAO, GnarsDAO, Proof of Vibes" />
        <meta property="og:title" content="ActivityDAO" />
        <meta property="og:description" content="ActivityDAOs - the movement to bootstrap the proliferation of activity-based communities" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://activity.community" /> {/* Replace with your actual URL */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ActivityDAO - Community-Driven Activities" />
        <meta name="twitter:description" content="ActivityDAOs - the movement to bootstrap the proliferation of activity-based communitie" />
        <meta name="twitter:image" content="/thumbnail.png" />

        <style
          dangerouslySetInnerHTML={{
            __html: `@import url('https://fonts.googleapis.com/css2?family=DynaPuff:wght@400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Alexandria:wght@300;400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Aclonica:wght@400&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400&display=swap');
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@700&display=swap');
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');

@font-face {
        font-family: "SF Pro Text";
        src: url("/FontsFree-Net-SFProText-Bold.ttf");
        font-weight: 700;
      }
@font-face {
        font-family: "GT America";
        src: url("/GT-America-Standard-Regular-Trial.otf");
        font-weight: 500;
      }
`,
          }}
        />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-7RG25GG1ZB"
        ></script>
        <script>{`window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-7RG25GG1ZB');`}</script>
      </Head>
      <ThemeProvider theme={muiTheme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </Fragment>
  );
}
