import type { NextPage } from "next";
import Head from "next/head";
import daoData from "../data/daos.json";
import { css } from "@emotion/css";
import NAVBAR from "../components/n-a-v-b-a-r";
import Footer from "../components/Footer";
import DAOsDescription from "../components/d-a-os-description";
const canonical = "https://activity-dao-omega.vercel.app/daos";
const directoryJsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "ActivityDAO Community Directory",
  description: "Discover communities built around shared activities.",
  url: canonical,
  mainEntity: {
    "@type": "ItemList",
    itemListElement: daoData.map((dao, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: dao.name,
      url: "https://activity-dao-omega.vercel.app/dao/" + encodeURIComponent(dao.id),
    })),
  },
}).replace(/</g, "\\u003c");

const DAOs: NextPage = () => {
  return (
    <div
      className={css`
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        background-color: var(--background-default-default);
        color: var(--wwwgetminjiapp-black);
        font-family: var(--font-dynapuff);
      `}
    >
      <Head>
        <title>Explore ActivityDAOs | Community Directory</title>
        <meta name="description" content="Discover grassroots activity-based communities, browse interests, and find the official website for each ActivityDAO." />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content="Explore ActivityDAO Communities" />
        <meta property="og:description" content="Find and support communities organized around doing activities together." />
        <meta property="og:url" content={canonical} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: directoryJsonLd }} />
      </Head>
      {/* Centered navbar */}
      <div
        className={css`
          max-width: 1200px;
          margin: 0 auto;
          padding: 1rem;
          width: 100%;
        `}
      >
        <NAVBAR />
      </div>

      {/* Main content */}
      <main
        className={css`
          flex: 1 0 auto; // This will make the main content grow and shrink as needed
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: clamp(1rem, 3vw, 2rem);
          min-width: 0;
          width: 100%;
          box-sizing: border-box;
        `}
      >
        <DAOsDescription mode="explore" />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default DAOs;
