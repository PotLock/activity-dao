import { Fragment, useEffect } from "react";
import Head from "next/head";
import type { AppProps } from "next/app";
import { ThemeProvider, createTheme } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import createGlobalStyle from "./styles/global";
import { Web3Provider } from "../components/Web3Provider"; // Import the Web3Provider
import { 
  dynapuff, 
  alexandria, 
  manrope, 
  hankenGrotesk, 
  aclonica, 
  inter, 
  dmSans, 
  nunitoSans 
} from './styles/global' // Adjust the path to where your fonts are defined
createGlobalStyle();

export default function MyApp({ Component, pageProps }: AppProps) {
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
        <meta name="twitter:description" content="ActivityDAOs - the movement to building funded communities around every activity" />
        <meta name="twitter:image" content="/thumbnail.png" />

        <style
          dangerouslySetInnerHTML={{
            __html: `
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');
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
      <Web3Provider> {/* Wrap your entire app with Web3Provider */}
        <ThemeProvider theme={muiTheme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <div className={`${dynapuff.className} ${alexandria.className} ${manrope.className} ${hankenGrotesk.className} ${aclonica.className} ${inter.className} ${dmSans.className} ${nunitoSans.className}`}>
            <Component {...pageProps} />
          </div>
        </ThemeProvider>
      </Web3Provider>
    </Fragment>
  );
}
