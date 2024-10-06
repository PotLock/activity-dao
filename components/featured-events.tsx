import type { NextPage } from "next";
import { css } from "@emotion/css";

export type FeaturedEventsType = {
  className?: string;
  developmentIcon?: string;
};

const FeaturedEvents: NextPage<FeaturedEventsType> = ({
  className = "",
  developmentIcon,
}) => {
  return (
    <div
      className={[
        css`
          flex: 1;
          border-radius: var(--br-4664xl-1);
          background-color: var(--wwwgetminjiapp-candlelight);
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          justify-content: flex-start;
          padding: var(--padding-5xs-5) var(--padding-xl) var(--padding-5xs-5)
            var(--padding-2xl);
          text-align: center;
          font-size: var(--display-1-medium-size);
          color: var(--wwwgetminjiapp-black);
          font-family: var(--font-alexandria);
        `,
        className,
      ].join(" ")}
    > 
      <div
        className={css`
          overflow: hidden;
          display: none;
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-start;
          z-index: 1;
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
              width: 0.7rem;
              height: 0.7rem;
              position: relative;
            `}
            alt=""
            src="/component-1-2.svg"
          />
        </div>
      </div>
      <div
        className={css`
          flex: 1;
          position: relative;
          line-height: 0.819rem;
          font-weight: 500;
        `}
      >
        {developmentIcon}
      </div>
    </div>
  );
};

export default FeaturedEvents;  