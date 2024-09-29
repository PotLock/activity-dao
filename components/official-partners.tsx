import type { NextPage } from "next";
import { css } from "@emotion/css";
import React from "react";
import { keyframes } from "@emotion/react";

export type OfficialPartnersType = {
  className?: string;
};

const partners = [
  {
    name: "BluntDAO",
    logo: "https://www.blunts.wtf/_next/image?url=%2Fjointslogo.png&w=96&q=75",
    url: "https://bluntdao.com",
  },
  {
    name: "POTLOCK",
    logo: "https://pbs.twimg.com/profile_images/1724444877713268736/N9T64YIm_400x400.jpg", // You'll need to add this image
    url: "https://potlock.org",
  },
  {
    name: "Public Goods Club",
    logo: "/lqutejqt-400x400-1@2x.png",
    url: "https://publicgoods.club",
  },
  {
    name: "Proof of Vibes",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKXBoXoFg6JiaCQ1dQOzujL3oaUDgGhi2gmQ&s",
    url: "https://proofofvibes.com",
  },
];

interface PartnerLogoProps {
  name: string;
  logo: string;
  url: string;
}

const PartnerLogo: React.FC<PartnerLogoProps> = ({ name, logo, url }) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={css`
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        gap: var(--gap-xs);
        text-decoration: none;
        color: inherit;
        transition: opacity 0.3s ease;
        font-size: var(--font-size-3xl); // Maintain original font size
        font-family: var(--display-1-medium); // Maintain original font

        &:hover {
          opacity: 0.7;
        }
      `}
    >
      <img
        className={css`
          height: 1.5rem;
          width: auto;
          max-width: 7.525rem;
          position: relative;
          object-fit: contain;
        `}
        alt={`${name} logo`}
        src={logo}
      />
      <h3
        className={css`
          margin: 0;
          position: relative;
          font-size: inherit;
          line-height: 1.375rem;
          font-weight: 700;
          font-family: inherit;
          display: inline-block;
          @media screen and (max-width: 450px) {
            font-size: var(--font-size-lg);
            line-height: 1.125rem;
          }
        `}
      >
        {name}
      </h3>
    </a>
  );
};

const tickerAnimation = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
`;

const OfficialPartners: NextPage<OfficialPartnersType> = ({
  className = "",
}) => {
  return (
    <div
      className={[
        css`
          align-self: stretch;
          background-color: var(--background-default-default);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: var(--padding-6xl) 0rem;
          box-sizing: border-box;
          gap: var(--gap-29xl);
          max-width: 100%;
          text-align: center;
          font-size: var(--font-size-37xl-1);
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
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          gap: var(--gap-3xs);
          max-width: 100%;
        `}
      >
        <div
          className={css`
            width: 34.125rem;
            position: relative;
            line-height: 4.75rem;
            font-weight: 500;
            display: flex;
            align-items: center;
            justify-content: center;
            max-width: 100%;
            @media screen and (max-width: 1050px) {
              font-size: var(--font-size-26xl);
              line-height: 3.813rem;
            }
            @media screen and (max-width: 450px) {
              font-size: var(--font-size-15xl);
              line-height: 2.875rem;
            }
          `}
        >
          Official Partners 🤝
        </div>
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
          Collaborating with leading organizations to enhance community-driven
          activities.
        </h3>
      </div>
      <div
        className={css`
          width: 100%;
          overflow: hidden;
          white-space: nowrap;
          position: relative;
        `}
      >
        <div
          className={css`
            display: inline-block;
            animation: ${tickerAnimation} 40s linear infinite;
            &:hover {
              animation-play-state: paused;
            }
          `}
        >
          {[...partners, ...partners].map((partner, index) => (
            <div
              key={`${partner.name}-${index}`}
              className={css`
                display: inline-block;
                padding: 0 1rem;
              `}
            >
              <PartnerLogo
                name={partner.name}
                logo={partner.logo}
                url={partner.url}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OfficialPartners;
