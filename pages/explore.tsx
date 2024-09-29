import type { NextPage } from "next";
import { css } from "@emotion/css";
import FrameComponent3 from "../components/frame-component3";
import SearchFilter from "../components/search-filter";
import Pagination from "../components/pagination";
import NAVBAR from "../components/n-a-v-b-a-r";


const Desktop1: NextPage = () => {
  return (
    <div
      className={css`
        width: 100%;
        height: 144.188rem;
        position: relative;
        background-color: var(--background-default-default);
        overflow: hidden;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        justify-content: flex-start;
        padding: var(--padding-7xl) 0rem 12.125rem;
        box-sizing: border-box;
        gap: 6.125rem;
        line-height: normal;
        letter-spacing: normal;
        text-align: center;
        font-size: var(--font-size-xl);
        color: var(--wwwgetminjiapp-black);
        font-family: var(--font-dynapuff);
        @media screen and (max-width: 1200px) {
          height: auto;
        }
        @media screen and (max-width: 750px) {
          gap: 3.063rem;
        }
        @media screen and (max-width: 450px) {
          gap: var(--gap-5xl);
        }
      `}
    >
      <div
        className={css`
          width: 13.813rem;
          border-radius: var(--br-9980xl);
          background-color: var(--wwwgetminjiapp-candlelight);
          display: none;
          flex-direction: row;
          align-items: center;
          justify-content: flex-start;
          padding: var(--padding-base) var(--padding-13xl);
          box-sizing: border-box;
          gap: var(--font-size-16);
        `}
      >
        <div
          className={css`
            overflow: hidden;
            display: none;
            flex-direction: column;
            align-items: flex-start;
            justify-content: flex-start;
          `}
        >
          <div
            className={css`
              overflow: hidden;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
            `}
          >
            <img
              className={css`
                width: 1.5rem;
                height: 1.5rem;
                position: relative;
              `}
              alt=""
              src="/component-1.svg"
            />
          </div>
        </div>
        <b
          className={css`
            position: relative;
            line-height: 1.75rem;
            @media screen and (max-width: 450px) {
              font-size: var(--font-size-base);
              line-height: 1.375rem;
            }
          `}
        >
          The Model
        </b>
      </div>
      <FrameComponent3 />
      <main
        className={css`
          align-self: stretch;
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          justify-content: center;
          padding: 0rem var(--padding-xl) 0rem var(--padding-5xl);
          box-sizing: border-box;
          max-width: 100%;
          flex-shrink: 0;
        `}
      >
        <section
          className={css`
            width: 75.25rem;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: flex-start;
            gap: var(--gap-31xl);
            max-width: 100%;
            text-align: center;
            font-size: var(--font-size-21xl);
            color: var(--wwwgetminjiapp-black);
            font-family: var(--font-dynapuff);
            @media screen and (max-width: 750px) {
              gap: var(--gap-6xl);
            }
          `}
        >
          <div
            className={css`
              width: 70.969rem;
              display: flex;
              flex-direction: row;
              align-items: flex-start;
              justify-content: center;
              padding: 0rem var(--padding-xl) var(--padding-mid);
              box-sizing: border-box;
              max-width: 100%;
            `}
          >
            <div
              className={css`
                width: 43.063rem;
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                justify-content: flex-start;
                max-width: 100%;
              `}
            >
              <h1
                className={css`
                  margin: 0;
                  align-self: stretch;
                  position: relative;
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
              >
                Explore Activities 🔍
              </h1>
              <h1
                className={css`
                  margin: 0;
                  position: relative;
                  font-size: var(--font-size-5xl);
                  line-height: 2.469rem;
                  font-weight: 400;
                  font-family: var(--font-hanken-grotesk);
                  @media screen and (max-width: 450px) {
                    font-size: var(--font-size-lgi);
                    line-height: 2rem;
                  }
                `}
              >
                Browse the most up to date directory of different activity DAOs
                and get moving today!
              </h1>
            </div>
          </div>
          <SearchFilter />
          <div
            className={css`
              align-self: stretch;
              display: flex;
              flex-direction: row;
              align-items: flex-start;
              justify-content: flex-start;
              padding: 0rem 0rem 0rem var(--padding-9xs);
              box-sizing: border-box;
              max-width: 100%;
            `}
          >
            <div
              className={css`
                align-self: stretch;
                flex: 1;
                display: flex;
                flex-direction: row;
                align-items: flex-start;
                justify-content: center;
                padding: 0rem var(--padding-xl);
                box-sizing: border-box;
                max-width: 100%;
                @media screen and (max-width: 450px) {
                  gap: 7.563rem;
                }
              `}
            >
              <Pagination />
            </div>
          </div>
        </section>
      </main>
      <img
        className={css`
          align-self: stretch;
          position: relative;
          max-width: 100%;
          overflow: hidden;
          max-height: 100%;
          flex-shrink: 0;
        `}
        alt=""
        src="/mask-group.svg"
      />
    </div>
  );
};

export default Desktop1;
