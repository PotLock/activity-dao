import type { NextPage } from "next";
import { type CSSProperties } from "react";
import { css } from "@emotion/css";

export type IncubationDetailsType = {
  className?: string;
  prop?: string;
  interestIncubation?: string;
  coordinateCohortOfActivity?: string;

  /** Style props */
  propAlignSelf?: CSSProperties["alignSelf"];
  propWidth?: CSSProperties["width"];
  propWidth1?: CSSProperties["width"];
  propDisplay?: CSSProperties["display"];
  propFlex?: CSSProperties["flex"];
};

const IncubationDetails: NextPage<IncubationDetailsType> = ({
  className = "",
  propAlignSelf,
  propWidth,
  prop,
  interestIncubation,
  coordinateCohortOfActivity,
  propWidth1,
  propDisplay,
  propFlex,
}) => {
  return (
    <div
      className={[
        css`align-self: stretch;
display: flex;
flex-direction: column;
align-items: flex-start;
justify-content: flex-start;
gap: var(--gap-lg);
text-align: center;
font-size: var(--font-size-12xl);
color: var(--wwwgetminjiapp-black);
font-family: var(--font-alexandria);
align-self: ${propAlignSelf}
width: ${propWidth}
`,
        className,
      ].join(" ")}
    >
      <div
        className={css`
          align-self: stretch;
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          justify-content: flex-start;
          padding: 0rem var(--padding-88xl);
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
              background-color: var(--color-silver);
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
            {prop}
          </h2>
        </div>
      </div>
      <h3
        className={css`
          margin: 0;
          align-self: stretch;
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
      >
        {interestIncubation}
      </h3>
      <div
        className={css`
          align-self: stretch;
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          justify-content: flex-start;
          padding: 0rem var(--padding-12xs);
          font-size: var(--font-size-lg-3);
          color: var(--color-dimgray);
          font-family: var(--font-hanken-grotesk);
        `}
      >
        <div
          className={css`width: 16.75rem;
position: relative;
line-height: 2rem;
display: flex;
align-items: center;
justify-content: center;
flex-shrink: 0;
width: ${propWidth1}
display: ${propDisplay}
flex: ${propFlex}
`}
        >
          {coordinateCohortOfActivity}
        </div>
      </div>
    </div>
  );
};

export default IncubationDetails;
