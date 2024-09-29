import type { NextPage } from "next";
import { css } from "@emotion/css";
import IncubationDetails from "./incubation-details";
import Component1 from "./component1";

export type AggregationType = {
  className?: string;
};

const Aggregation: NextPage<AggregationType> = ({ className = "" }) => {
  return (
    <div
      className={[
        css`
          align-self: stretch;
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          justify-content: space-between;
          gap: var(--gap-xl);
          text-align: center;
          font-size: var(--font-size-12xl);
          color: var(--wwwgetminjiapp-black);
          font-family: var(--font-alexandria);
          @media screen and (max-width: 1050px) {
            flex-wrap: wrap;
            justify-content: center;
          }
        `,
        className,
      ].join(" ")}
    >
      <div
        className={css`
          width: 15.813rem;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-start;
          gap: var(--gap-lg);
        `}
      >
        <div
          className={css`
            align-self: stretch;
            display: flex;
            flex-direction: row;
            align-items: flex-start;
            justify-content: flex-start;
            padding: 0rem var(--padding-80xl);
          `}
        >
          <div
            className={css`
              height: 3.438rem;
              flex: 1;
              position: relative;
            `}
          >
            <div
              className={css`
                position: absolute;
                top: 0rem;
                left: 0rem;
                border-radius: 50%;
                background-color: var(--wwwgetminjiapp-candlelight);
                width: 100%;
                height: 100%;
                z-index: 2;
              `}
            />
            <h2
              className={css`
                margin: 0;
                position: absolute;
                top: 0.75rem;
                left: 0.75rem;
                font-size: inherit;
                letter-spacing: 0.73px;
                text-transform: capitalize;
                font-weight: 500;
                font-family: inherit;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 2rem;
                height: 1.938rem;
                white-space: nowrap;
                z-index: 3;
                @media screen and (max-width: 1050px) {
                  font-size: var(--font-size-6xl);
                }
                @media screen and (max-width: 450px) {
                  font-size: var(--font-size-lgi);
                }
              `}
            >
              💡
            </h2>
          </div>
        </div>
        <h3
          className={css`
            margin: 0;
            position: relative;
            font-size: var(--font-size-5xl);
            letter-spacing: 0.4px;
            text-transform: capitalize;
            font-weight: 500;
            font-family: var(--font-dynapuff);
            color: var(--color-darkslategray-100);
            @media screen and (max-width: 450px) {
              font-size: var(--font-size-lgi);
            }
          `}
        >{`Concept & Aggregation`}</h3>
        <div
          className={css`
            position: relative;
            font-size: var(--font-size-lg-3);
            line-height: 2rem;
            font-family: var(--font-hanken-grotesk);
            color: var(--color-dimgray);
          `}
        >
          Handbook, Directory, Interest Form
        </div>
      </div>
      <div
        className={css`
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          justify-content: flex-start;
          gap: var(--gap-261xl-1);
        `}
      >
        <IncubationDetails
          prop="🐣"
          interestIncubation={`Interest & Incubation`}
          coordinateCohortOfActivity={`Coordinate Cohort of Activity & GTM at Web3 Conferences`}
        />
        <div
          className={css`
            width: 15.906rem;
            display: flex;
            flex-direction: row;
            align-items: flex-start;
            justify-content: flex-end;
            padding: 0rem var(--padding-20xl);
            box-sizing: border-box;
            font-size: var(--display-1-medium-size);
          `}
        >
          <Component1 developmentIcon="ACTIVITY DAO MODEL" />
        </div>
      </div>
      <IncubationDetails
        propAlignSelf="unset"
        propWidth="16.875rem"
        prop="🚀"
        interestIncubation={`Scale & Development`}
        coordinateCohortOfActivity="Build Activity DAO launch pad. Anyone can launch their own activity based DAO with fund = proof mechanism + join existing DAOs."
        propWidth1="unset"
        propDisplay="unset"
        propFlex="1"
      />
    </div>
  );
};

export default Aggregation;
