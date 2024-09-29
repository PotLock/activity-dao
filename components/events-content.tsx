import type { NextPage } from "next";
import Component1 from "./component1";
import { css } from "@emotion/css";

export type EventsContentType = {
  className?: string;
};

const EventsContent: NextPage<EventsContentType> = ({ className = "" }) => {
  return (
    <div id="events"
      className={[
        css`
          align-self: stretch;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-start;
          gap: var(--gap-3xs);
          text-align: center;
          font-size: var(--font-size-21xl);
          color: var(--wwwgetminjiapp-black);
          font-family: var(--font-dynapuff);
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
          padding: 0rem var(--padding-512xl);
        `}
      >
        <Component1 developmentIcon="FEATURED EVENTS" />
      </div>
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
        Find an Event 🎉
      </h1>
      <h3
        className={css`
          margin: 0;
          align-self: stretch;
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
        Check out upcoming activity based events!
      </h3>
    </div>
  );
};

export default EventsContent;
