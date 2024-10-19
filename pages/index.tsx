import { useState, useEffect } from 'react';
import type { NextPage } from "next";
import { css } from "@emotion/css";
import NAVBAR from "../components/n-a-v-b-a-r";
import Header from "../components/header";
import AcivityCards from "../components/how-it-works";
import EventsList from "../components/events-list";
import DAOsDescription from "../components/d-a-os-description";
import OfficialPartners from "../components/official-partners";
import Footer from "../components/Footer";
import EmojiTicker from "../components/EmoijiTicker";
import DaoMaturity from "../components/daoMaturity";
import Evolution from "../components/evolution";
import PoweringCommunity from "../components/dao-model";
import JoinActivityDAO from "../components/join-activityDAO";
import LoadingAnimation from "../components/LoadingAnimation";

const Desktop: NextPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingAnimation />;
  }

  return (
    <div
      className={css`
        width: 100%;
        background-color: var(--background-default-default);
        overflow: hidden;
        line-height: normal;
        letter-spacing: normal;
        text-align: center;
        font-size: var(--font-size-21xl);
        color: var(--wwwgetminjiapp-black);
        font-family: var(--font-dynapuff);
      `}
    >
      {/* <Background /> */}
      
      {/* Centered navbar */}
      <div
        className={css`
          max-width: 1200px;
          margin: 0 auto;
          padding: 1rem;
        `}
      >
        <NAVBAR />
      </div>

      {/* Hero section */}
      <div
        id="home"
        className={css`
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 5rem 1rem;
          margin-bottom: 2rem;
        `}
      >
        <div
          className={css`
            max-width: 1200px;
            width: 100%;
          `}
        >
          <Header />
        </div>
      </div>

      {/* Add the EmojiTicker component here */}
      <EmojiTicker />

      {/* How It Works button */}


      {/* Main content wrapper */}

      <div
        className={css`
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        `}
      >
        {/* Let's Get Active section */}
        <button
          className={css`
            border: none;
            padding: 0.5rem 1rem;
            background-color: var(--wwwgetminjiapp-candlelight);
            border-radius: var(--br-4664xl-1);
            font-size: var(--display-1-medium-size);
            font-weight: 500;
            font-family: var(--font-alexandria);
            color: var(--wwwgetminjiapp-black);
            text-align: center;
  
 
          `}
        >
          HOW IT WORKS
        </button>
        <div
          className={css`
            text-align: center;
            padding-top: 2rem; // Reduced padding
            padding-bottom: 2.5rem;
          `}
        >
          <h1
            className={css`
              margin: 0;
              font-size: inherit;
              line-height: 3.844rem;
              font-weight: 600;
              font-family: inherit;
              @media screen and (max-width: 1050px) {
                font-size: var(--font-size-13xl);
                line-height: 3.063rem;
              }
              @media screen and (max-width: 450px) {
                font-size: var(--font-size-5xl);
                line-height: 2.313rem;
              }
            `}
          >{`Let's Get Active! `}</h1>
          <h3
            className={css`
              margin: 0;
              font-size: var(--font-size-5xl);
              line-height: 2.469rem;
              font-weight: 400;
              font-family: var(--font-hanken-grotesk);
              margin-top: 0.5rem;
              @media screen and (max-width: 450px) {
                font-size: var(--font-size-lgi);
                line-height: 2rem;
              }
            `}
          >
            Find. Do. Prove. Fund. Activities.
          </h3>
        </div>

        {/* Activities section */}
        <section
          className={css`
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: var(--gap-21xl);
            margin-bottom: 5rem;
          `}
        >
          <div
            className={css`
              display: flex;
              flex-direction: row;
              align-items: flex-start;
              justify-content: center;
              gap: var(--gap-13xl);
              max-width: 100%;
              @media screen and (max-width: 1050px) {
                flex-wrap: wrap;
              }
            `}
          >
            <AcivityCards />
            {/* <Button1 /> */}
          </div>
          <div
            className={css`
              display: flex;
              flex-direction: row;
              align-items: flex-start;
              justify-content: center;
              gap: var(--gap-13xl);
              max-width: 100%;
              @media screen and (max-width: 1050px) {
                flex-wrap: wrap;
              }
            `}
          >
           </div>
        </section>

        {/* Events section */}
        <section
          className={css`
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: flex-start;
            gap: var(--gap-31xl);
            margin-bottom: 5rem;
          `}
        >
          <EventsList mode="home" />
          {/* <div
            className={css`
              align-self: stretch;
              border-top: 1px solid var(--color-gray-500);
              display: flex;
              flex-direction: row;
              align-items: flex-start;
              justify-content: space-between;
              padding: var(--padding-mini) 0rem 0rem;
              gap: var(--gap-xl);
              @media screen and (max-width: 450px) {
                flex-wrap: wrap;
              }
            `}
          >
            <Link href="/events" passHref>
              <button
                className={css`
                  cursor: pointer;
                  border: 1px solid var(--wwwgetminjiapp-black);
                  padding: var(--padding-7xs) var(--padding-2xs) var(--padding-5xs);
                  background-color: transparent;
                  height: 2.438rem;
                  width: 11.875rem;
                  border-radius: var(--br-27xl);
                  box-sizing: border-box;
                  display: flex;
                  flex-direction: row;
                  align-items: center;
                  justify-content: center;
                  gap: var(--gap-7xs-8);
                  text-decoration: none;
                  transition: opacity 0.3s, transform 0.3s;
                  &:hover {
                    opacity: 0.8;
                    .arrow {
                      transform: translateX(5px);
                    }
                  }
                `}
              >
                <div
                  className={css`
                    flex: 1;
                    position: relative;
                    font-size: var(--font-size-sm-2);
                    line-height: 1.313rem;
                    font-weight: 600;
                    font-family: var(--font-alexandria);
                    color: var(--color-grey-7);
                    text-align: center;
                  `}
                >
                  Explore all events
                </div>
                <div
                  className={css`
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    justify-content: flex-end;
                    padding: 0rem 0rem var(--padding-11xs-5);
                  `}
                >
                  <img
                    className={css`
                      width: 1rem;
                      height: 1rem;
                      position: relative;
                      transition: transform 0.3s;
                    `}
                    alt=""
                    src="/slider.svg"
                  />
                </div>
              </button>
            </Link>
            <div
              className={css`
                display: flex;
                flex-direction: row;
                align-items: flex-start;
                justify-content: flex-start;
                gap: var(--gap-5xs);
              `}
            >
              <img
                className={css`
                  height: 2.5rem;
                  width: 2.5rem;
                  position: relative;
                `}
                alt=""
                src="/switch-container-1.svg"
              />
              <img
                className={css`
                  height: 2.5rem;
                  width: 2.5rem;
                  position: relative;
                `}
                alt=""
                src="/switch-container-2.svg"
              />
            </div>
          </div> */}
        </section>

        {/* DAOs section */}
        <section
          className={css`
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: flex-start;
            gap: var(--gap-31xl);
            margin-bottom: 5rem;
          `}
        >
          <div
            id="daos"
            className={css`
              width: 100%;
              display: flex;
              flex-direction: column;
              align-items: flex-start;
              justify-content: flex-start;
              gap: var(--gap-11xl);
            `}
          >
            {/* <DAOsHeader /> */}
            <DAOsDescription mode="home" />
          </div>
          {/* <div
            className={css`
              align-self: stretch;
              border-top: 1px solid var(--color-gray-500);
              display: flex;
              flex-direction: row;
              align-items: flex-start;
              justify-content: space-between;
              padding: var(--padding-mini) 0rem 0rem;
              gap: var(--gap-xl);
              @media screen and (max-width: 450px) {
                flex-wrap: wrap;
              }
            `}
          >
            <Link href="/explore" passHref>
              <button
                className={css`
                  cursor: pointer;
                  border: 1px solid var(--wwwgetminjiapp-black);
                  padding: var(--padding-7xs) var(--padding-2xs) var(--padding-5xs);
                  background-color: transparent;
                  height: 2.438rem;
                  width: 11.875rem;
                  border-radius: var(--br-27xl);
                  box-sizing: border-box;
                  display: flex;
                  flex-direction: row;
                  align-items: center;
                  justify-content: center;
                  gap: var(--gap-7xs-8);
                  text-decoration: none;
                  transition: opacity 0.3s, transform 0.3s;
                  &:hover {
                    opacity: 0.8;
                    .arrow {
                      transform: translateX(5px);
                    }
                  }
                `}
              >
                <div
                  className={css`
                    flex: 1;
                    position: relative;
                    font-size: var(--font-size-sm-2);
                    line-height: 1.313rem;
                    font-weight: 600;
                    font-family: var(--font-alexandria);
                    color: var(--color-grey-7);
                    text-align: center;
                  `}
                >
                  Explore all DAOs
                </div>
                <div
                  className={css`
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    justify-content: flex-end;
                    padding: 0rem 0rem var(--padding-11xs-5);
                  `}
                >
                  <img
                    className={css`
                      width: 1rem;
                      height: 1rem;
                      position: relative;
                      transition: transform 0.3s;
                    `}
                    alt=""
                    src="/slider.svg"
                  />
                </div>
              </button>
            </Link>
            <div
              className={css`
                display: flex;
                flex-direction: row;
                align-items: flex-start;
                justify-content: flex-start;
                gap: var(--gap-5xs);
              `}
            >
              <img
                className={css`
                  height: 2.5rem;
                  width: 2.5rem;
                  position: relative;
                `}
                alt=""
                src="/switch-container-1.svg"
              />
              <img
                className={css`
                  height: 2.5rem;
                  width: 2.5rem;
                  position: relative;
                `}
                alt=""
                src="/switch-container-2.svg"
              />
            </div>
          </div> */}
        </section>

        {/* Movement section */}
        <section
          className={css`
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: flex-start;
            gap: var(--gap-3xs);
            margin-bottom: 5rem;
          `}
        >

            <Evolution />
    
          <PoweringCommunity />
          <DaoMaturity />
          <OfficialPartners />
        </section>

        {/* Background section */}
        <section
          className={css`
            width: 100%;
            margin-bottom: 5rem;
          `}
        >
          <JoinActivityDAO />
        </section>
      </div>

      {/* Use the new Footer component */}
      <Footer />
    </div>
  );
};

export default Desktop;