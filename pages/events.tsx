import type { NextPage } from "next";
import Head from "next/head";
import { css } from "@emotion/css";
import NAVBAR from "../components/n-a-v-b-a-r";
import Footer from "../components/Footer";
import EventsList from "../components/events-list";

const Events: NextPage = () => {
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
        <title>ActivityDAO Events | Find Community Activities</title>
        <meta name="description" content="Explore upcoming and past community events, filter by date and location, and discover local activity-based communities." />
        <link rel="canonical" href="https://activity-dao-omega.vercel.app/events" />
        <meta property="og:title" content="Explore ActivityDAO Events" />
        <meta property="og:description" content="Find upcoming and past community events organized around shared activities." />
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
          flex: 1 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: clamp(0.75rem, 2.5vw, 2rem);
          padding-top: clamp(6.5rem, 10vw, 8rem);
          box-sizing: border-box;
          min-width: 0;
        `}
      >
   

        <EventsList mode="explore" />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Events;
