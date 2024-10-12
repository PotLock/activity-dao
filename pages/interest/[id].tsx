import type { NextPage, GetServerSideProps } from "next";
import { css } from "@emotion/css";
import NAVBAR from "../../components/n-a-v-b-a-r";
import Footer from "../../components/Footer";
import Feed from "../../components/feed";
import interestsData from "../../data/interests.json";

type InterestPageProps = {
  interest: {
    id_slug: string;
    activity: string;
    emoji: string;
    farcaster_id: string;
  };
};

const InterestPage: NextPage<InterestPageProps> = ({ interest }) => {
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
      {/* Centered navbar */}
      <div
        className={css`
          max-width: 1200px;
          margin: 0 auto;
          padding: 4rem;
          width: 100%;
        `}
      >
        <NAVBAR />
      </div>

      {/* Banner and header section */}
      <div
        className={css`
          width: 100%;
          background-color: #f0f0f0;
          padding: 2rem 0;
          position: relative;
          overflow: hidden;
          text-align: center;
        `}
      >
        <h1>{interest.emoji} {interest.activity}</h1>
      </div>

      <main>
        <Feed farcaster_channel={interest.id_slug} emoji={interest.emoji} />
      </main>
      <Footer />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };
  const interest = interestsData.find(item => item.id_slug === id);

  if (!interest) {
    return {
      notFound: true,
    };
  }

  return {
    props: { interest },
  };
};

export default InterestPage;
