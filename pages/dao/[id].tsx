import type { NextPage, GetServerSideProps } from "next";
import { css } from "@emotion/css";
import NAVBAR from "../../components/n-a-v-b-a-r";
import Footer from "../../components/Footer";
import EventsList, { EventsListReturnType } from "../../components/events-list";
import { FaTwitter, FaGithub, FaGlobe, FaRss, FaMoneyBillWave, FaCalendarAlt, FaDiscord, FaChevronDown, FaChevronUp } from "react-icons/fa";
import daoData from "../../data/daos.json";
import { useState, useEffect, useCallback, useRef } from 'react';
import Feed from "../../components/feed";
import { isValidEthereumAddressOrDomain } from "../../utils/isEth";
import axios from 'axios';
import Image from 'next/image';
import React from 'react';
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
const DEFAULT_TAB = 'Treasury';
const SECONDARY_DEFAULT_TAB = 'Feed';

// Helper function to determine image source
const getImageSrc = (path: string) => {
  return path.startsWith('http') || path.startsWith('https') ? path : `/${path}`;
};

const DAOPage: NextPage<DAOPageProps> = ({ dao }) => {
  const [hasMatchingEvents, setHasMatchingEvents] = useState<boolean | null>(null);
  const [activeTab, setActiveTab] = useState<'Feed' | 'Treasury' | 'Events' | null>(null);
  const eventsChecked = useRef(false);

  const hasTreasury = dao.treasuryAddresses.length > 0;
  const hasFeed = !!dao.farcaster_channel;

  useEffect(() => {
    const checkForEvents = async () => {
      if (!eventsChecked.current) {
        const eventsExist = await EventsList.checkForEvents(dao.name);
        setHasMatchingEvents(eventsExist);
        eventsChecked.current = true;
        console.log(`Events exist for ${dao.name}: ${eventsExist}`);
      }
    };

    checkForEvents();
  }, [dao.name]);

  useEffect(() => {
    const determineActiveTab = () => {
      const availableTabs = [
        ...(hasTreasury ? ['Treasury'] : []),
        ...(hasFeed ? ['Feed'] : []),
        ...(hasMatchingEvents ? ['Events'] : []),
      ] as ('Feed' | 'Treasury' | 'Events')[];

      console.log('Available tabs:', availableTabs);

      if (availableTabs.length === 0) {
        console.log('No content available for this DAO');
        setActiveTab(null);
        return;
      }

      if (availableTabs.includes(dao.defaultTab as any)) {
        setActiveTab(dao.defaultTab as 'Feed' | 'Treasury' | 'Events');
      } else if (availableTabs.includes(DEFAULT_TAB)) {
        setActiveTab(DEFAULT_TAB);
      } else if (availableTabs.includes(SECONDARY_DEFAULT_TAB)) {
        setActiveTab(SECONDARY_DEFAULT_TAB);
      } else {
        setActiveTab(availableTabs[0]);
      }
    };

    determineActiveTab();
  }, [dao.defaultTab, hasTreasury, hasFeed, hasMatchingEvents]);

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
          console.error(`API Error: ${response.data.error.message}`);
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
          console.error(`API Error (${error.response.status}): ${error.response.data.error?.message || 'Unknown error'}`);
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
    // Implement token price fetching logic here
    // This should return the current USD price of the token
    // You might want to use a price feed API for this
    return 1; // Default to 1 USD for now
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
              params: [treasury.address]
            }
          );

          if (response.data.error) {
            console.error(`API Error: ${response.data.error.message}`);
            throw new Error(response.data.error.message);
          }

          const tokenBalances = response.data.result.tokenBalances;
          const balancesPromises = tokenBalances.map(async (token: any) => {
            const tokenInfo = await fetchTokenInfo(token.contractAddress, treasury.network);
            return {
              token: tokenInfo.symbol,
              tokenAddress: token.contractAddress,
              amount: (parseInt(token.tokenBalance, 16) / Math.pow(10, tokenInfo.decimals)).toString(),
              usdPrice: await fetchTokenPrice(token.contractAddress, treasury.network),
              icon: tokenInfo.icon
            };
          });

          const resolvedBalances = await Promise.all(balancesPromises);
          setBalances(prev => ({ ...prev, [index]: resolvedBalances }));
          console.log(`Balances fetched successfully for ${treasury.address}`);
        } catch (error) {
          if (axios.isAxiosError(error) && error.response) {
            console.error(`API Error (${error.response.status}): ${error.response.data.error?.message || 'Unknown error'}`);
          } else {
            console.error('Error fetching token balances:', error);
          }
          // Set an error state or display an error message to the user
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
    if (!activeTab) {
      return (
        <div className={css`
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 300px;
          text-align: center;
        `}>
          <img
            src="/empty-state.svg"
            alt="No Content"
            className={css`
              width: 150px;
              height: 150px;
              margin-bottom: 1rem;
            `}
          />
          <p>This DAO has no content to display.</p>
        </div>
      );
    }

    switch (activeTab) {
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
                    <th>Network</th>
                    <th>Address</th>
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
                              <th>Token</th>
                              <th>Amount</th>
                              <th className={css`white-space: nowrap;`}>USD Price</th>
                              <th className={css`white-space: nowrap;`}>Total USD</th>
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
                                  <td>{formatNumber(token.amount)}</td>
                                  <td>${formatNumber(token.usdPrice)}</td>
                                  <td>${formatNumber(parseFloat(token.amount) * token.usdPrice)}</td>
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

  // Render tabs based on hasMatchingEvents
  const renderTabs = () => {
    const tabs = [
      ...(hasFeed ? [{ name: 'Feed', icon: FaRss }] : []),
      ...(hasTreasury ? [{ name: 'Treasury', icon: FaMoneyBillWave }] : []),
      ...(hasMatchingEvents ? [{ name: 'Events', icon: FaCalendarAlt }] : [])
    ];

    if (tabs.length === 0) {
      return null;
    }

    return (
      <div
        className={css`
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
        `}
      >
        {tabs.map(({ name, icon: Icon }) => (
          <button
            key={name}
            onClick={() => setActiveTab(name as 'Feed' | 'Treasury' | 'Events')}
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
        {renderTabs()}

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
    dao = daoData.find(dao => dao.id === id) as DAO;
  }

  if (!dao) {
    dao = daoData[0] as DAO;
  }

  return {
    props: { dao },
  };
};

export default DAOPage;