import type { NextPage, GetServerSideProps } from "next";
import { css } from "@emotion/css";
import NAVBAR from "../../components/n-a-v-b-a-r";
import Footer from "../../components/Footer";
import EventsList from "../../components/events-list";
import { FaTwitter, FaGithub, FaGlobe, FaRss, FaMoneyBillWave, FaCalendarAlt } from "react-icons/fa";
import daoData from "../../data/daos.json";
import { useState } from 'react';
import Feed from "../../components/feed";
import { isValidEthereumAddressOrDomain } from "../../utils/isEth";
import axios from 'axios';

// ToDo- edi events. 2) add fee by going to daos.json and adding farcaster_id and then create feed section to just map that as a component 
// Add this type definition
type DAO = {
  name: string;
  id?: string; // Make id optional
  icon: string;
  url: string;
  description: string;
  maturity: string[];
  tags: string[];
  twitter?: string;
  github?: string;
  emoji: string;
  banner?: string;
  farcaster_channel?: string;
  treasuryAddresses?: {
    network: string;
    address: string;
  }[];
  exists?: boolean;          // New optional field
  featured?: boolean;        // New optional field
  order?: number;            // New optional field
};

// Add this object for block explorer links
const blockExplorerLinks: { [key: string]: string } = {
  ETH: 'https://etherscan.io/address/',
  BSC: 'https://bscscan.com/address/',
  POLYGON: 'https://polygonscan.com/address/',
  NEAR: 'https://nearblocks.io/address/',
  SOL: 'https://solscan.io/account/',
  BASE: 'https://basescan.org/address/',
  ARB: 'https://arbiscan.io/address/',
  SPUTNIK: "https://near.social/astraplusplus.ndctools.near/widget/home?page=dao&daoId=",
  SNAPSHOT: "https://snapshot.org/#/",
  SAFE: "",
  
  // Add more networks as needed
  // turn this more into chainlist.org with chain id, currency, block explorer, name, sybol to switch and route
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
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100%;
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
          <Feed farcaster_channel={dao.farcaster_channel ?? ''} emoji={dao.emoji} />
        );
      case 'Treasury':
        return (
          <div>
            <h2>Treasury Overview</h2>
            {dao.treasuryAddresses && dao.treasuryAddresses.length > 0 ? (
              <table className={css`
                width: 100%;
                border-collapse: collapse;
                margin-top: 1rem;
              `}>
                <thead>
                  <tr>
                    <th className={css`
                      text-align: left;
                      padding: 0.5rem;
                      border-bottom: 1px solid #ccc;
                    `}>Network</th>
                    <th className={css`
                      text-align: left;
                      padding: 0.5rem;
                      border-bottom: 1px solid #ccc;
                    `}>Address</th>
                  </tr>
                </thead>
                <tbody>
                  {dao.treasuryAddresses.map((treasury, index) => {
                    let explorerNetwork = treasury.network;
                    if (treasury.network === "NEAR" && treasury.address.includes("sputnik-dao.near")) {
                      explorerNetwork = "SPUTNIK";
                    }
                    const {isValid: isEthAddress, type } = isValidEthereumAddressOrDomain(treasury.address);
                    console.log("Type of eth address: " + type);
                    
                    if (isEthAddress) {
                      // Check if the address is a Safe address
                      axios.get(`https://safe-transaction.gnosis.io/api/v1/safes/${treasury.address}/`)
                        .then(response => {
                          console.log("Safe API response:", response.data);
                          explorerNetwork = "SAFE";
                        })
                        .catch(error => {
                          if (error.response && error.response.status !== 404) {
                            console.error("Error checking Safe address:", error);
                          }
                        });
                    }
                    
                    return (
                      <tr key={index}>
                        <td className={css`padding: 0.5rem;`}>{treasury.network}</td>
                        <td className={css`padding: 0.5rem;`}>
                          <a
                            href={`${blockExplorerLinks[explorerNetwork]}${treasury.address}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={css`
                              color: #0066cc;
                              text-decoration: none;
                              &:hover {
                                text-decoration: underline;
                              }
                            `}
                          >
                            {treasury.address}
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <p>No treasury information available.</p>
            )}
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
          padding: 2rem;
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
        `}
      >
        {/* Banner image or gradient */}
        <div
          className={css`
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 200px;
            background: ${dao.banner
              ? `url(${dao.banner}) no-repeat center center`
              : `linear-gradient(45deg, #FFB3BA, #BAFFC9, #BAE1FF)`};
            background-size: cover;
            filter: brightness(0.7);
          `}
        />

        <div
          className={css`
            max-width: 1200px;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 2rem;
            position: relative;
            z-index: 1;
            padding: 120px 1rem 0;

            @media (min-width: 768px) {
              flex-direction: row;
              align-items: flex-end;
              padding-top: 120px;
            }
          `}
        >
          <div
            className={css`
              width: 120px;
              height: 120px;
              border-radius: 50%;
              border: 4px solid white;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
              overflow: hidden;
              flex-shrink: 0;
            `}
          >
            <img
              src={dao.icon}
              alt={dao.name}
              className={css`
                width: 100%;
                height: 100%;
                object-fit: cover;
                object-position: center;
              `}
            />
          </div>
          <div
            className={css`
              background-color: rgba(255, 255, 255, 0.9);
              padding: 1rem;
              border-radius: 8px;
              width: 100%;
            `}
          >
            <div className={css`
              display: flex;
              flex-direction: column;
              gap: 1rem;

              @media (min-width: 768px) {
                flex-direction: row;
                justify-content: space-between;
                align-items: flex-end;
              }
            `}>
              <h1
                className={css`
                  font-size: 2rem;
                  margin: 0;

                  @media (min-width: 768px) {
                    font-size: 2.5rem;
                  }
                `}
              >
                {dao.emoji} {dao.name}         
              </h1>
              <div
                id="socials" className={css`
                  display: flex;
                  gap: 1rem;
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
            <div
              className={css`
                display: flex;
                flex-wrap: wrap;
                gap: 0.5rem;
                margin-top: 0.5rem;
                max-width: 100%;
              `}
            >
              {dao.maturity.concat(dao.tags).map((tag, index) => (
                <Tag key={index} text={tag} color={pastelColors[index % pastelColors.length]} />
              ))}
            </div>
            <p
          className={css`
            font-size: 1rem;
            max-width: 800px;
            line-height: 1.6;
            margin-bottom: 2rem;
          `}
        >
          {dao.description}
        </p>
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

        {/* Divider */}
        {/* <hr
          className={css`
            width: 100%;
            border: none;
            border-top: 1px solid #ccc;
            margin: 2rem 0;
          `}
        /> */}

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
            ...(dao.treasuryAddresses && dao.treasuryAddresses.length > 0 ? [{ name: 'Treasury', icon: FaMoneyBillWave }] : []),
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
    dao = daoData.find(dao => dao.id === id);
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