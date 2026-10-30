import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import { css } from "@emotion/css";
import NAVBAR from "../../components/n-a-v-b-a-r";
import Footer from "../../components/Footer";
import EventsList, { EventsListReturnType } from "../../components/events-list";
import { FaTwitter, FaGithub, FaGlobe, FaRss, FaMoneyBillWave, FaCalendarAlt, FaDiscord, FaChevronDown, FaChevronUp } from "react-icons/fa";
import daoData from "../../data/daos.json";
import { useState, useEffect, useCallback } from 'react';
import Feed from "../../components/feed";
import { isValidEthereumAddressOrDomain } from "../../utils/isEth";
import axios from 'axios';
import Image from 'next/image';
import React from 'react';
import { Network, Alchemy } from "alchemy-sdk";

// Optional config object, but defaults to demo api-key and eth-mainnet.
const settings = {
  apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID, // Replace with your Alchemy API Key.
  network: Network.ETH_MAINNET, // Replace with your network.
};
const alchemy = new Alchemy(settings);
// ToDo- edi events. 2) conditional rednering on events if events lists returns no matching events
// add dao join interest phase
// add related daos 
// no treasury displaying if default page, the information shouldnt display this maybe events error 
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
  telegram?: string;
  discord?: string;
  emoji: string;
  banner?: string;
  farcaster_channel?: string;
  treasuryAddresses: {
    network: string;
    address: string;
  }[];
  exists?: boolean;          // New optional field
  featured?: boolean;        // New optional field
  order?: number;    
  farcaster_user?: string;        // New optional field
  defaultTab?: 'Feed' | 'Treasury' | 'Events';
  events?: any[]; // Replace 'any[]' with a more specific type if you have one for events
};

// Add this object for block explorer links
const blockExplorerLinks: { [key: string]: string } = {
  ETH: 'https://etherscan.io/address/',
  BSC: 'https://bscscan.com/address/',
  POLYGON: 'https://polygonscan.com/address/',
  NEAR: 'https://nearblocks.io/address/',
  SOL: 'https://solscan.io/account/',
  BASE: 'https://basescan.org/tokenholdings?a=', // https://basescan.org/address/
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

// Add this constant for the social icon styles
const socialIconStyle = css`
  color: black;
  transition: color 0.3s ease, opacity 0.3s ease;

  &:hover {
    color: var(--wwwgetminjiapp-yellow);
    opacity: 0.8;
  }
`;

type TokenBalance = {
  token: string;
  tokenAddress: string;
  amount: string;
  usdPrice: number;
  icon?: string;
};

type TreasuryBalance = {
  [key: string]: TokenBalance[];
};

// Add this near the top of your file, outside of the component
const SHOW_DEV_MODE_TOGGLE = false; // Set this to false to hide the dev mode toggle

// Add this function at the top of your file, outside the component
const formatNumber = (num: number | string): string => {
  return Number(num).toLocaleString('en-US', { maximumFractionDigits: 2 });
};

// Add these constants near the top of the file
const DEFAULT_TAB = 'Feed';
const SECONDARY_DEFAULT_TAB = 'Events';

// Helper function to determine image source
const getImageSrc = (path: string) => {
  return path.startsWith('http') || path.startsWith('https') ? path : `/${path}`;
};

const DAOPage: NextPage<DAOPageProps> = ({ dao }) => {
  const [activeTab, setActiveTab] = useState<'Overview' | 'Feed' | 'Treasury' | 'Events'>('Overview');
  const hasTreasury = dao.treasuryAddresses.length > 0;
  const hasFeed = Boolean(dao.farcaster_channel);

  // Every DAO has a useful first-party overview, even when external activity APIs fail.
  useEffect(() => {
    setActiveTab('Overview');
  }, [dao.id]);

  const [expandedRows, setExpandedRows] = useState<{ [key: string]: boolean }>({});
  const [balances, setBalances] = useState<TreasuryBalance>({});
  const [totalBalance, setTotalBalance] = useState<number | null>(null);
  const [isLoadingBalances, setIsLoadingBalances] = useState(false);
  const [devMode, setDevMode] = useState(false);

  const handleDevModeChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setDevMode(event.target.checked);
  }, []);

  const toggleRow = (index: number) => {
    setExpandedRows(prev => ({ ...prev, [index]: !prev[index] }));
  };

  useEffect(() => {
    Object.entries(expandedRows).forEach(([index, isExpanded]) => {
      if (isExpanded && balances[index] === undefined) {
        fetchBalance(parseInt(index));
      }
    });
  }, [expandedRows]);

  useEffect(() => {
    calculateTotalBalance();
  }, [balances]);

  useEffect(() => {
    // Refetch balances when dev mode is toggled
    Object.keys(expandedRows).forEach((index) => {
      if (expandedRows[index]) {
        fetchBalance(parseInt(index));
      }
    });
  }, [devMode, expandedRows]);

  const calculateTotalBalance = () => {
    const total = Object.values(balances).reduce((sum, tokenBalances) => {
      return sum + tokenBalances.reduce((tokenSum, token) => {
        return tokenSum + (parseFloat(token.amount) * token.usdPrice);
      }, 0);
    }, 0);
    setTotalBalance(total);
  };

  const fetchTokenInfo = async (tokenAddress: string, network: string) => {
    const ethereumBasedNetworks = ['ETH', 'BSC', 'POLYGON', 'BASE', 'ARB'];
    if (ethereumBasedNetworks.includes(network)) {
      try {
        console.log(`Fetching token info for ${tokenAddress} on ${network}`);
        const response = await axios.post(
          `https://${network.toLowerCase()}-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`,
          {
            jsonrpc: '2.0',
            id: 1,
            method: 'alchemy_getTokenMetadata',
            params: [tokenAddress]
          }
        );

        if (response.data.error) {
          console.error(`Alchemy API Error: after reponse ${response.data.error.message}`);
          throw new Error(response.data.error.message);
        }

        const result = response.data.result;
        console.log(`Token info fetched successfully for ${tokenAddress}`);
        return {
          symbol: result.symbol,
          decimals: result.decimals,
          icon: result.logo
        };
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          console.error(`Alchemy API Error (${error.response.status}): ${error.response.data.error?.message || 'Unknown error'}`);
        } else {
          console.error('Error fetching token info:', error);
        }
        // Return default values in case of error
        return { symbol: 'UNKNOWN', decimals: 18, icon: '/default-token-icon.png' };
      }
    } else {
      console.log(`Token info fetching not implemented for ${network}`);
      return { symbol: 'UNKNOWN', decimals: 18, icon: '/default-token-icon.png' };
    }
  };

  const fetchTokenPrice = async (tokenAddress: string, network: string) => {
    if (tokenAddress === 'NATIVE') {
      // Fetch native token price (e.g., ETH, BNB, MATIC) based on the network
      // You might want to use a price feed API for this
      return 0; // Default to 0 USD for now
    }
    // Implement token price fetching logic for other tokens
    return 0; // Default to 0 USD for now
  };

  const fetchBalance = useCallback(async (index: number) => {
    const treasury = dao.treasuryAddresses[index];
    if (!treasury) return;

    setIsLoadingBalances(true);
    setBalances(prev => ({ ...prev, [index]: [] }));

    if (devMode) {
      // Simulating API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Dev mode: set mock balances
      const mockBalances: TokenBalance[] = [
        {
          token: treasury.network === 'ETH' ? 'ETH' : 'NATIVE_TOKEN',
          tokenAddress: 'NATIVE_TOKEN',
          amount: (Math.random() * 10).toFixed(4),
          usdPrice: 2000,
          icon: '/eth-icon.png',
        },
        {
          token: 'USDC',
          tokenAddress: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
          amount: (Math.random() * 10000).toFixed(2),
          usdPrice: 1,
          icon: '/usdc-icon.png',
        },
      ];
      setBalances(prev => ({ ...prev, [index]: mockBalances }));
    } else {
      const ethereumBasedNetworks = ['ETH', 'BSC', 'POLYGON', 'BASE', 'ARB'];
      if (ethereumBasedNetworks.includes(treasury.network)) {
        try {
          console.log(`Fetching balances for ${treasury.address} on ${treasury.network}`);
          const response = await axios.post(
            `https://${treasury.network.toLowerCase()}-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`,
            {
              jsonrpc: '2.0',
              id: 1,
              method: 'alchemy_getTokenBalances',
              params: [treasury.address, 'erc20']
            }
          );

          if (response.data.error) {
            console.error(`API Error: ${response.data.error.message}`);
            throw new Error(response.data.error.message);
          }

          const tokenBalances = response.data.result.tokenBalances;
          const balancesPromises = tokenBalances.map(async (token: any) => {
            const tokenInfo = await fetchTokenInfo(token.contractAddress, treasury.network);
            const balance = BigInt(token.tokenBalance);
            const amount = Number(balance) / Math.pow(10, tokenInfo.decimals);
            return {
              token: tokenInfo.symbol,
              tokenAddress: token.contractAddress,
              amount: amount.toString(),
              usdPrice: await fetchTokenPrice(token.contractAddress, treasury.network),
              icon: tokenInfo.icon
            };
          });

          const resolvedBalances = await Promise.all(balancesPromises);
          
          // Fetch native token balance
          const nativeBalanceResponse = await axios.post(
            `https://${treasury.network.toLowerCase()}-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`,
            {
              jsonrpc: '2.0',
              id: 1,
              method: 'eth_getBalance',
              params: [treasury.address, 'latest']
            }
          );

          const nativeBalance = BigInt(nativeBalanceResponse.data.result);
          const nativeAmount = Number(nativeBalance) / 1e18; // Assuming 18 decimals for native token

          const nativeToken = {
            token: treasury.network,
            tokenAddress: 'NATIVE',
            amount: nativeAmount.toString(),
            usdPrice: await fetchTokenPrice('NATIVE', treasury.network),
            icon: `/icons/${treasury.network.toLowerCase()}.png` // Assuming you have these icons
          };

          setBalances(prev => ({ ...prev, [index]: [nativeToken, ...resolvedBalances] }));
          console.log(`Balances fetched successfully for ${treasury.address}`);
        } catch (error) {
          if (axios.isAxiosError(error) && error.response) {
            console.error(`API Error (${error.response.status}): ${error.response.data.error?.message || 'Unknown error'}`);
          } else {
            console.error('Error fetching token balances:', error);
          }
          setBalances(prev => ({ ...prev, [index]: [] }));
        }
      } else {
        console.log(`Balance fetching for ${treasury.network} not implemented yet`);
      }
    }

    setIsLoadingBalances(false);
  }, [devMode, dao.treasuryAddresses]);

  const EstimatedTotalBalance = () => {
    return (
      <div className={css`
        margin-top: 1rem;
        padding: 1rem;
        background-color: #f0f0f0;
        border-radius: 8px;
      `}>
        <div className={css`
          display: flex;
          justify-content: space-between;
          align-items: center;
        `}>
          <h3 className={css`
            margin: 0;
            font-size: 1.2rem;
          `}>Estimated Total Balance</h3>
          {isLoadingBalances ? (
            <div className={css`
              display: flex;
              align-items: center;
            `}>
              <div className={css`
                width: 100px;
                height: 24px;
                background: linear-gradient(90deg, #f0f0f0, #e0e0e0, #f0f0f0);
                background-size: 200% 100%;
                animation: loading 1.5s infinite;
                border-radius: 4px;
                margin-right: 0.5rem;
              `} />
              <span>Loading...</span>
            </div>
          ) : totalBalance === null ? (
            <span>N/A</span>
          ) : (
            <span className={css`
              font-size: 1.2rem;
              font-weight: bold;
            `}>
              ${formatNumber(totalBalance)}
            </span>
          )}
        </div>
      </div>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Overview':
        return <section className={css`font-family:var(--font-hanken-grotesk);line-height:1.65;max-width:850px;padding:clamp(12px,2vw,24px)`}>
          <h2 className={css`font-size:clamp(22px,3vw,30px);margin:0 0 16px`}>About {dao.name}</h2>
          <p>{dao.description}</p>
          {dao.tags.length > 0 && <p><strong>Activities and interests:</strong> {dao.tags.join(', ')}</p>}
          {dao.maturity.length > 0 && <p><strong>Community maturity:</strong> {dao.maturity.join(' · ')}</p>}
          {dao.url && <a href={dao.url} target="_blank" rel="noopener noreferrer"
            className={css`display:inline-flex;align-items:center;min-height:44px;background:#facc15;border-radius:24px;color:#171717;padding:10px 20px;font-weight:700;text-decoration:none;
              &:focus-visible {outline:3px solid #171717;outline-offset:3px;}`}>
              Visit {dao.name} website ↗
            </a>}
          <p className={css`font-size:14px;margin-top:20px;color:#4b5563`}>Community information is curated in ActivityDAO's directory. Social feeds, events and treasury data may use external providers and can be unavailable.</p>
        </section>;
      case 'Feed':
        return <Feed farcaster_channel={dao.farcaster_channel ?? ''} emoji={dao.emoji} />;
      case 'Treasury':
        if (!hasTreasury) {
          return <p>No treasury information available.</p>;
        }
        return (
          <div>
            <h2>Treasury Overview</h2>
            {SHOW_DEV_MODE_TOGGLE && (
              <div className={css`
                margin-top: 1rem;
                display: flex;
                align-items: center;
                justify-content: flex-end;
              `}>
                <label htmlFor="devMode" className={css`margin-right: 0.5rem;`}>
                  Dev Mode
                </label>
                <input
                  type="checkbox"
                  id="devMode"
                  checked={devMode}
                  onChange={handleDevModeChange}
                  className={css`
                    cursor: pointer;
                  `}
                />
              </div>
            )}
            <EstimatedTotalBalance />
            <div className={css`
              overflow-x: auto;
              width: 100%;
            `}>
              <table className={css`
                width: 100%;
                border-collapse: collapse;
                margin-top: 1rem;
              `}>
                <thead>
                  <tr>
                    <th></th>
                    <th className={css`text-align: left;`}>Network</th>
                    <th className={css`text-align: left;`}>Address</th>
                  </tr>
                </thead>
                <tbody>
                  {dao.treasuryAddresses.map((treasury, index) => {
                    const explorerNetwork = treasury.network === "NEAR" && treasury.address.includes("sputnik-dao.near") ? "SPUTNIK" : treasury.network;
                    const {isValid: isEthAddress, type } = isValidEthereumAddressOrDomain(treasury.address);
                    
                    return (
                      <React.Fragment key={index}>
                        <tr>
                          <td className={css`padding: 0.5rem; cursor: pointer;`} onClick={() => toggleRow(index)}>
                            {expandedRows[index] ? <FaChevronUp /> : <FaChevronDown />}
                          </td>
                          <td>{treasury.network}</td>
                          <td>
                            <a href={`${blockExplorerLinks[explorerNetwork]}${treasury.address}`} target="_blank" rel="noopener noreferrer">
                              {treasury.address}
                            </a>
                          </td>
                        </tr>
                        {expandedRows[index] && (
                          <>
                            <tr className={css`background-color: #f0f0f0;`}>
                              <th></th>
                              <th className={css`text-align: left;`}>Token</th>
                              <th className={css`text-align: right;`}>Amount</th>
                              <th className={css`text-align: right; white-space: nowrap;`}>USD Price</th>
                              <th className={css`text-align: right; white-space: nowrap;`}>Total USD</th>
                            </tr>
                            {balances[index] === undefined ? (
                              <tr>
                                <td colSpan={5} className={css`padding: 1rem; text-align: center;`}>
                                  <img src="/loading.svg" alt="Loading" className={css`width: 50px; height: 50px;`} />
                                </td>
                              </tr>
                            ) : balances[index].length === 0 ? (
                              <tr>
                                <td colSpan={5} className={css`padding: 1rem; text-align: center;`}>
                                  No balance found
                                </td>
                              </tr>
                            ) : (
                              balances[index].map((token, tokenIndex) => (
                                <tr key={`${index}-${tokenIndex}`} className={css`background-color: #f5f5f5;`}>
                                  <td></td>
                                  <td>
                                    {token.icon && <img src={token.icon} alt={token.token} className={css`width: 20px; height: 20px; margin-right: 0.5rem;`} />}
                                    {token.token} ({token.tokenAddress.length > 10 
                                      ? `${token.tokenAddress.slice(0, 6)}...${token.tokenAddress.slice(-4)}`
                                      : token.tokenAddress})
                                  </td>
                                  <td className={css`text-align: right;`}>{formatNumber(token.amount)}</td>
                                  <td className={css`text-align: right;`}>${formatNumber(token.usdPrice)}</td>
                                  <td className={css`text-align: right;`}>${formatNumber(parseFloat(token.amount) * token.usdPrice)}</td>
                                </tr>
                              ))
                            )}
                          </>
                        )}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
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
        return null;
    }
  };

  // The Overview and Events tabs are always available without a Farcaster or API prerequisite.
  const renderTabs = () => {
    const tabs = [
      { name: 'Overview', icon: FaGlobe },
      ...(hasFeed ? [{ name: 'Feed', icon: FaRss }] : []),
      ...(hasTreasury ? [{ name: 'Treasury', icon: FaMoneyBillWave }] : []),
      { name: 'Events', icon: FaCalendarAlt }
    ];
    return (
      <div role="tablist" aria-label={`${dao.name} sections`} className={css`
        width:100%;display:flex;flex-wrap:wrap;gap:8px;margin-bottom:18px;
        font-family:var(--font-hanken-grotesk);
      `}>
        {tabs.map(({ name, icon: Icon }) => (
          <button key={name} type="button" role="tab"
            id={`dao-tab-${name.toLowerCase()}`} aria-controls="dao-tab-panel"
            aria-selected={activeTab === name}
            onClick={() => setActiveTab(name as 'Overview' | 'Feed' | 'Treasury' | 'Events')}
            className={css`min-height:44px;padding:10px 16px;background:${activeTab === name ? '#facc15' : '#f4f4f4'};
              color:#171717;border:1px solid #bbb;border-radius:24px;font-size:15px;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:8px;
              &:focus-visible {outline:3px solid #171717;outline-offset:3px;}
            `}>
            <Icon size={16} aria-hidden="true" />{name}
          </button>
        ))}
      </div>
    );
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
      <Head>
        <title>{dao.name} | ActivityDAO Community Directory</title>
        <meta name="description" content={dao.description.slice(0, 155)} />
        <link rel="canonical" href={`https://activity-dao-omega.vercel.app/dao/${dao.id}`} />
      </Head>
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
              ? `url(${getImageSrc(dao.banner)}) no-repeat center center`
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
              src={getImageSrc(dao.icon)}
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
                  <a href={dao.url} target="_blank" rel="noopener noreferrer" className={socialIconStyle}>
                    <FaGlobe size={24} />
                  </a>
                )}
                {dao.twitter && (
                  <a href={dao.twitter} target="_blank" rel="noopener noreferrer" className={socialIconStyle}>
                    <FaTwitter size={24} />
                  </a>
                )}
                {dao.github && (
                  <a href={dao.github} target="_blank" rel="noopener noreferrer" className={socialIconStyle}>
                    <FaGithub size={24} />
                  </a>
                )}
                {dao.discord && (
                  <a href={dao.discord} target="_blank" rel="noopener noreferrer" className={socialIconStyle}>
                    <FaDiscord size={24} />
                  </a>
                )}
                {dao.farcaster_user && (
                  <a href={`https://warpcast.com/${dao.farcaster_user}`} target="_blank" rel="noopener noreferrer" className={socialIconStyle}>
                    <Image src="/farcaster.svg" width={24} height={24} alt="Farcaster" />
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
          padding: clamp(1rem, 3vw, 2rem);
          box-sizing: border-box;
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
        {renderTabs()}

        {/* Tab content */}
        <div id="dao-tab-panel" role="tabpanel" aria-labelledby={`dao-tab-${activeTab.toLowerCase()}`}
          className={css`
            width: 100%;
            min-width: 0;
            overflow-wrap: anywhere;
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


export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params?.id;
  if (typeof id !== 'string') return { notFound: true };
  const dao = daoData.find(entry => entry.id === id);
  if (!dao) return { notFound: true };
  return { props: { dao } };
};

export default DAOPage;