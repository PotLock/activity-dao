import type { NextPage } from "next";
import { css } from "@emotion/css";
import events from "../data/events.json";
import { format, parseISO } from "date-fns";

export type EventsListType = {
  className?: string;
};

const EventCard = ({ event }: { event: { date: string; name: string; location: string; link: string; image: string } }) => {
  const eventDate = parseISO(event.date);
  const day = format(eventDate, "dd");
  const month = format(eventDate, "MMM").toUpperCase();

  return (
    <div
      className={css`
        flex: 1;
        min-width: calc(33.33% - 1rem);
        max-width: calc(33.33% - 1rem);
        height: 22.875rem;
        border-radius: var(--br-3xl);
        background-color: var(--border-default-default);
        overflow: hidden;
        display: flex;
        flex-direction: column;
        margin-bottom: 1rem;
        transition: box-shadow 0.3s ease;
        &:hover {
          box-shadow: 0 0 0 3px var(--color-gold-100);
        }
        @media screen and (max-width: 1050px) {
          min-width: calc(50% - 1rem);
          max-width: calc(50% - 1rem);
        }
        @media screen and (max-width: 768px) {
          min-width: 100%;
          max-width: 100%;
        }
      `}
    >
      <a
        href={event.link}
        target="_blank"
        rel="noopener noreferrer"
        className={css`
          text-decoration: none;
          color: inherit;
          display: flex;
          flex-direction: column;
          height: 100%;
        `}
      >
        <div
          className={css`
            flex: 1;
            background-image: url(${event.image});
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: var(--padding-xl);
          `}
        >
          <div
            className={css`
              align-self: flex-end;
              background-color: var(--background-default-default);
              border-radius: var(--br-8xs);
              padding: var(--padding-8xs) var(--padding-4xs);
              text-align: center;
              width: 3.5rem;
              height: 3.5rem;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
            `}
          >
            <b className={css`font-size: var(--font-size-9xl-4);`}>{day}</b>
            <b
              className={css`
                font-size: var(--font-size-xs-4);
                color: var(--color-mediumblue);
                font-family: var(--font-dm-sans);
              `}
            >
              {month}
            </b>
          </div>
          <div
            className={css`
              background-color: var(--background-default-default);
              border-radius: var(--br-3xs);
              padding: var(--padding-3xs-5) var(--padding-xs);
              font-family: var(--font-dynapuff);
            `}
          >
            <b className={css`
              font-size: var(--font-size-xl);
              text-align: left;
              display: block;
            `}>{event.name}</b>
            <div
              className={css`
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-top: var(--gap-6xs);
                font-size: var(--font-size-base);
                color: var(--color-azure-47);
                font-family: var(--font-hanken-grotesk);
              `}
            >
              <div className={css`font-weight: 600;`}>{event.location}</div>
              <div
                className={css`
                  background-color: var(--color-lemonchiffon);
                  color: var(--color-gold-100);
                  border-radius: var(--br-7xs);
                  padding: var(--padding-6xs-5) var(--padding-6xs);
                  font-weight: 600;
                `}
              >
                All Day
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};

const EventsList: NextPage<EventsListType> = ({ className = "" }) => {
  const sortedEvents = events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div
      className={[
        css`
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          justify-content: flex-start;
          &::after {
            content: '';
            flex: auto;
          }
        `,
        className,
      ].join(" ")}
    >
      {sortedEvents.map((event, index) => (
        <EventCard key={index} event={event} />
      ))}
    </div>
  );
};

export default EventsList;