import type { NextPage } from "next";
import Component1 from "./component1";
import { css } from "@emotion/css";

export type FrameComponentType = {
  className?: string;
};

const FrameComponent: NextPage<FrameComponentType> = ({ className = "" }) => {
  return (
    <div
      className={[
        css`
          align-self: stretch;
          display: flex;
          flex-direction: row;
          align-items: flex-start;
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
          width: 40.688rem;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-start;
          gap: 1.056rem;
          max-width: 100%;
        `}
      >
        <div
          className={css`
            align-self: stretch;
            display: flex;
            flex-direction: row;
            align-items: flex-start;
            justify-content: flex-start;
            padding: 0rem var(--padding-218xl);
          `}
        >
          <Component1 developmentIcon="ACTIVITY DAO MATURITY" />
        </div>
        <div
          className={css`
            align-self: stretch;
            height: 5.375rem;
            position: relative;
            letter-spacing: -0.5px;
            line-height: 3.75rem;
            font-weight: 500;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
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
    </div>
  );
};

export default FrameComponent;
