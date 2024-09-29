import type { NextPage } from "next";
import { type CSSProperties } from "react";
import { css } from "@emotion/css";

export type ListContainerType = {
  className?: string;
  image?: string;
  eventSeparator?: string;
  may?: string;
  globalBitcoinPizzaDay?: string;
  everywhere?: string;
  allDay?: string;

  /** Style props */
  propGap?: CSSProperties["gap"];
  propBackgroundImage?: CSSProperties["backgroundImage"];
  propMinWidth?: CSSProperties["minWidth"];
  propBackgroundColor?: CSSProperties["backgroundColor"];
  propColor?: CSSProperties["color"];
  propMinWidth1?: CSSProperties["minWidth"];
};

const ListContainer: NextPage<ListContainerType> = ({
  className = "",
  propGap,
  propBackgroundImage,
  image,
  eventSeparator,
  may,
  globalBitcoinPizzaDay,
  everywhere,
  propMinWidth,
  propBackgroundColor,
  allDay,
  propColor,
  propMinWidth1,
}) => {
  return (
    <div
      className={[
        css`height: 22.875rem;
width: 19.75rem;
border-radius: var(--br-mini);
overflow: hidden;
flex-shrink: 0;
display: flex;
flex-direction: column;
align-items: flex-end;
justify-content: flex-start;
padding: var(--padding-base) var(--padding-smi) var(--padding-sm) var(--padding-sm);
box-sizing: border-box;
gap: var(--gap-173xl);
background-image: url('/image4@2x.png');
background-size: cover;
background-repeat: no-repeat;
background-position: top;
text-align: left;
font-size: var(--font-size-9xl-4);
color: var(--wwwgetminjiapp-black);
font-family: var(--font-hanken-grotesk);
gap: ${propGap}
background-image: ${propBackgroundImage}
`,
        className,
      ].join(" ")}
    >
      <img
        className={css`
          width: 19.75rem;
          flex: 1;
          position: relative;
          border-radius: var(--br-mini) var(--br-mini) 0px 0px;
          max-height: 100%;
          object-fit: cover;
          display: none;
        `}
        alt=""
        src={image}
      />
      <div
        className={css`
          width: 3.313rem;
          border-radius: var(--br-8xs);
          background-color: var(--color-gray-400);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-start;
          padding: var(--padding-8xs) var(--padding-4xs) var(--padding-6xs);
          box-sizing: border-box;
          gap: var(--gap-10xs);
          z-index: 1;
        `}
      >
        <b
          className={css`
            position: relative;
            @media screen and (max-width: 450px) {
              font-size: var(--font-size-4xl);
              line-height: 1.375rem;
            }
          `}
        >
          {eventSeparator}
        </b>
        <b
          className={css`
            width: 2.063rem;
            position: relative;
            font-size: var(--font-size-xs-4);
            display: inline-block;
            font-family: var(--font-dm-sans);
            color: var(--color-mediumblue);
            text-align: center;
          `}
        >
          {may}
        </b>
      </div>
      <div
        className={css`
          align-self: stretch;
          flex: 0.8049;
          border-radius: var(--br-3xs);
          background-color: var(--background-default-default);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-start;
          padding: var(--padding-5xs) var(--padding-xs);
          position: relative;
          gap: var(--gap-6xs);
          z-index: 1;
          font-size: var(--font-size-lg);
          font-family: var(--font-dynapuff);
        `}
      >
        <b
          className={css`
            align-self: stretch;
            position: relative;
            line-height: 1.5rem;
          `}
        >
          {globalBitcoinPizzaDay}
        </b>
        <div
          className={css`
            align-self: stretch;
            flex: 1;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            font-size: var(--ui-small-strong-size);
            color: var(--color-azure-47);
            font-family: var(--font-hanken-grotesk);
          `}
        >
          <div
            className={css`
              position: relative;
              line-height: 1.313rem;
              display: inline-block;
              min-width: 4.75rem;
              min-width: ${propMinWidth};
            `}
          >
            {everywhere}
          </div>
          <div
            className={css`
              border-radius: var(--br-7xs);
              background-color: var(--color-beige);
              overflow: hidden;
              display: flex;
              flex-direction: row;
              align-items: center;
              justify-content: center;
              padding: var(--padding-6xs);
              font-size: var(--font-size-base);
              color: var(--color-green);
              background-color: ${propBackgroundColor};
            `}
          >
            <div
              className={css`position: relative;
line-height: 1.313rem;
font-weight: 600;
display: inline-block;
min-width: 3.313rem;
color: ${propColor}
min-width: ${propMinWidth1}
`}
            >
              {allDay}
            </div>
          </div>
        </div>
        <div
          className={css`
            width: 7.813rem;
            height: 1.375rem;
            margin: 0 !important;
            position: absolute;
            top: 4.063rem;
            left: 1rem;
            z-index: 1;
          `}
        />
      </div>
    </div>
  );
};

export default ListContainer;
