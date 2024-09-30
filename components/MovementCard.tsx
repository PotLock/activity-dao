import React from "react";
import { css } from "@emotion/css";

interface MovementCardProps {
  icon: string;
  title: string;
  description: string;
  isYellowBackground: boolean;
}

const MovementCard: React.FC<MovementCardProps> = ({ icon, title, description, isYellowBackground }) => {
  return (
    <div
      className={css`
        width: 30%;
        min-width: 250px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        padding: 1.5rem;
        text-align: center;
        transition: color 0.3s ease;
        &:hover {
          color: black;
          h3, div {
            color: black;
          }
        }
        @media screen and (max-width: 768px) {
          width: 100%;
        }
      `}
    >
      <div
        className={css`
          width: 3.438rem;
          height: 3.438rem;
          border-radius: 50%;
          background-color: ${isYellowBackground ? 'var(--wwwgetminjiapp-candlelight)' : '#f0f0f0'};
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
        `}
      >
        {icon}
      </div>
      <h3
        className={css`
          margin: 0;
          font-size: var(--font-size-5xl);
          letter-spacing: 0.4px;
          text-transform: capitalize;
          font-weight: 500;
          font-family: var(--font-dynapuff);
          color: var(--color-darkslategray-100);
          transition: color 0.3s ease;
          @media screen and (max-width: 450px) {
            font-size: var(--font-size-lgi);
          }
        `}
      >
        {title}
      </h3>
      <div
        className={css`
          font-size: var(--font-size-lg-3);
          line-height: 2rem;
          font-family: var(--font-hanken-grotesk);
          color: var(--color-dimgray);
          transition: color 0.3s ease;
        `}
      >
        {description}
      </div>
    </div>
  );
};

export default MovementCard;
