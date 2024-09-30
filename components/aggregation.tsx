import type { NextPage } from "next";
import { css } from "@emotion/css";
import Component1 from "./component1";
import MovementCard from "./MovementCard";

export type AggregationType = {
  className?: string;
};

const movementData = [
  {
    icon: "💡",
    title: "Concept & Aggregation",
    description: "Handbook, Directory, Interest Form",
    isYellowBackground: true,
  },
  {
    icon: "🐣",
    title: "Interest & Incubation",
    description: "Coordinate Cohort of Activity & GTM at Web3 Conferences",
    isYellowBackground: false,
  },
  {
    icon: "🚀",
    title: "Scale & Development",
    description: "Build Activity DAO launch pad. Anyone can launch their own activity based DAO with fund = proof mechanism + join existing DAOs.",
    isYellowBackground: false,
  },
];

const Aggregation: NextPage<AggregationType> = ({ className = "" }) => {
  return (
    <div>
      <div
        className={[
          css`
            align-self: stretch;
            display: flex;
            flex-direction: column; // Changed from row to column
            align-items: center; // Center items horizontally
            justify-content: center;
            padding: 0rem var(--padding-2xl) 0rem var(--padding-xl);
            box-sizing: border-box;
            max-width: 100%;
            text-align: center;
            font-size: var(--font-size-27xl-5);
            color: var(--color-gray-300);
            font-family: var(--font-dynapuff);
          `,
          className,
        ].join(" ")}
      >
        <div
          className={css`
            display: flex;
            flex-direction: row;
            align-items: center; // Change to center vertically
            justify-content: center;
            padding: 0; // Remove horizontal padding
            margin-bottom: 1rem;
          `}
        >
          <Component1 developmentIcon="EVOLUTION"  />
        </div>
        <div
          className={css`
            width: 100%; // Ensure full width
            height: 5.375rem;
            position: relative;
            letter-spacing: -0.5px;
            line-height: 3.75rem;
            font-weight: 500;
            display: flex;
            align-items: center;
            justify-content: center;
            @media screen and (max-width: 1050px) {
              font-size: var(--font-size-18xl);
              line-height: 3rem;
            }
            @media screen and (max-width: 450px) {
              font-size: var(--font-size-9xl);
              line-height: 2.25rem;
            }
          `}
        >
          The Start of A Movement
        </div>
      </div>
      <div
        className={css`
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          gap: 2rem;
          padding: 2rem;
          @media screen and (max-width: 768px) {
            flex-direction: column;
            align-items: center;
          }
        `}
      >
        {movementData.map((card, index) => (
          <MovementCard
            key={index}
            icon={card.icon}
            title={card.title}
            description={card.description}
            isYellowBackground={card.isYellowBackground}
          />
        ))}
      </div>
      <div
        className={css`
          width: 15.906rem;
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          justify-content: flex-end;
          padding: 2rem var(--padding-20xl);
          box-sizing: border-box;
          font-size: var(--display-1-medium-size);
        `}
      >
      </div>
    </div>
  );
};

export default Aggregation;
