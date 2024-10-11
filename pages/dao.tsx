import type { NextPage, GetServerSideProps } from "next";
import { css } from "@emotion/css";
import NAVBAR from "../components/n-a-v-b-a-r";
import Footer from "../components/Footer";
import EventsList from "../components/events-list";
import { FaTwitter, FaGithub, FaGlobe, FaRss, FaMoneyBillWave, FaCalendarAlt } from "react-icons/fa";
import daoData from "../data/daos.json";
import { useState } from 'react';

// ToDo- edi events. 2) add fee by going to daos.json and adding farcaster_id and then create feed section to just map that as a component 
// Add this type definition
type DAO = {
  name: string;
  icon: string;
  url: string;
  description: string;
  maturity: string[];
  tags: string[];
  twitter?: string;
  github?: string;
  emoji: string;
  banner?: string;
};

type DAOPageProps = {
  dao: DAO;
};


const pastelColors = [
  '#FFB3BA', '#BAFFC9', '#BAE1FF', '#FFFFBA', '#FFDFBA', '#E0BBE4'
];

const Tag = ({ text, color }: { text: string; color: string }) => (
  <span
    className={css`
      display: inline-block;
      padding: 2px 8px;
      margin-right: 4px;
      margin-bottom: 4px;
      border-radius: 12px;
      font-size: 0.75rem;
      background-color: ${color};
      color: #333;
    `}
  >
    {text}
  </span>
);

const DAOPage: NextPage<DAOPageProps> = ({ dao }) => {
  const [activeTab, setActiveTab] = useState('Feed');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Feed':
        return (
          <div>
            <h2>Latest Updates</h2>
            <p>This is where the DAO's feed content would go.</p>
          </div>
        );
      case 'Treasury':
        return (
          <div>
            <h2>Treasury Overview</h2>
            <p>This is where the DAO's treasury information would be displayed.</p>
          </div>
        );
      case 'Events':
        return <EventsList 
          mode="explore" 
          hideHeader={true} 
          hideDescription={true} 
          daoMode={dao.name} 
        />;
      default:
        return (
          <div
            className={css`
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              height: 300px;
            `}
          >
            <img
              src="/coming-soon.svg"
              alt="Coming Soon"
              className={css`
                width: 150px;
                height: 150px;
                margin-bottom: 1rem;
              `}
            />
            <p>Coming Soon</p>
          </div>
        );
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
        `}
      >
        <div
          className={css`
            max-width: 1200px;
            margin: 0 auto;
            display: flex;
            align-items: center;
            gap: 2rem;
          `}
        >
          <img
            src={dao.icon}
            alt={dao.name}
            className={css`
              width: 100px;
              height: 100px;
              object-fit: cover;
              border-radius: 50%;
            `}
          />
          <div>
            <h1
              className={css`
                font-size: 2.5rem;
                margin: 0;
              `}
            >
              {dao.name} {dao.emoji}
            </h1>
            <div
              className={css`
                display: flex;
                gap: 0.5rem;
                margin-top: 0.5rem;
              `}
            >
              {dao.maturity.concat(dao.tags).map((tag, index) => (
                <Tag key={index} text={tag} color={pastelColors[index % pastelColors.length]} />
              ))}
            </div>
            <div
              className={css`
                display: flex;
                gap: 1rem;
                margin-top: 1rem;
              `}
            >
              {dao.url && (
                <a href={dao.url} target="_blank" rel="noopener noreferrer">
                  <FaGlobe size={24} />
                </a>
              )}
              {dao.twitter && (
                <a href={dao.twitter} target="_blank" rel="noopener noreferrer">
                  <FaTwitter size={24} />
                </a>
              )}
              {dao.github && (
                <a href={dao.github} target="_blank" rel="noopener noreferrer">
                  <FaGithub size={24} />
                </a>
              )}
            </div>
          </div>
        </div>
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
          padding: 2rem 0;
        `}
      >
        <p
          className={css`
            font-size: 1.2rem;
            max-width: 800px;
            line-height: 1.6;
            margin-bottom: 2rem;
          `}
        >
          {dao.description}
        </p>

        {/* Divider */}
        <hr
          className={css`
            width: 100%;
            border: none;
            border-top: 1px solid #ccc;
            margin: 2rem 0;
          `}
        />

        {/* Tabs */}
        <div
          className={css`
            display: flex;
            gap: 1rem;
            margin-bottom: 2rem;
          `}
        >
          {[
            { name: 'Feed', icon: FaRss },
            { name: 'Treasury', icon: FaMoneyBillWave },
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
            min-height: 300px;
            background-color: #f9f9f9;
            padding: 1rem;
            border-radius: 4px;
          `}
        >
          {renderTabContent()}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};


export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.query.id as string | undefined;
  
  let dao: DAO | undefined;

  if (id) {
    dao = daoData.find(dao => dao.name.toLowerCase().replace(/\s+/g, '-') === id);
  }

  if (!dao) {
    // Use the first entry as default if no matching DAO is found or no ID is provided
    dao = daoData[0];
  }

  return {
    props: { dao },
  };
};

export default DAOPage;



