import type { NextPage, GetServerSideProps } from "next";
import { css } from "@emotion/css";
import NAVBAR from "../../components/n-a-v-b-a-r";
import Footer from "../../components/Footer";
import Feed from "../../components/feed";
import interestsData from "../../data/interests.json";
import EventsList from "../../components/events-list";
import { useState } from 'react';
import { FaRss, FaCalendarAlt } from "react-icons/fa";

type InterestPageProps = {
  interest: {
    id_slug: string;
    activity: string;
    emoji: string;
    farcaster_id: string;
  };
};

const InterestPage: NextPage<InterestPageProps> = ({ interest }) => {
  const [activeTab, setActiveTab] = useState('Feed');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Feed':
        return (
          <Feed farcaster_channel={interest.id_slug} emoji={interest.emoji} />
        );
      case 'Events':
        return <EventsList 
          mode="explore" 
          hideHeader={true} 
          hideDescription={true} 
          interestMode={interest.activity} 
        />;
      default:
        return null;
    }
  };

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
        {/* Tabs */}
        <div
          className={css`
            display: flex;
            gap: 1rem;
            margin: 2rem auto;
            max-width: 1200px;
          `}
        >
          {[
            { name: 'Feed', icon: FaRss },
            { name: 'Events', icon: FaCalendarAlt }
          ].map(({ name, icon: Icon }) => (
            <button
              key={name}
              onClick={() => setActiveTab(name)}
              className={css`
                padding: 0.5rem 1rem;
                background-color: ${activeTab === name ? '#e0e0e0' : '#f0f0f0'};
                border: none;
                border-radius: 4px;
                font-size: 1rem;
                cursor: pointer;
                display: flex;
                align-items: center;
                gap: 0.5rem;
                &:hover {
                  background-color: #e0e0e0;
                }
              `}
            >
              <Icon size={16} />
              {name}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div
          className={css`
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;
            min-height: 300px;
            background-color: #f9f9f9;
            padding: 1rem;
            border-radius: 4px;
          `}
        >
          {renderTabContent()}
        </div>
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
