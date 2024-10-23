import type { NextPage } from "next";
import { css } from "@emotion/css";
import React from "react";
import { keyframes } from "@emotion/react";

export type BuiltWithTYpe = {
  className?: string;
};

const partners = [
  {
    name: "Base",
    logo: "/baselogo.png",
    url: "https://base.org",
  },
  {
    name: "Social Layer",
    logo: "/sociallayerlogo.svg", // You'll need to add this image
    url: "https://www.sociallayer.im/",
  },
  {
    name: "Farcaster",
    logo: "/farcasterlogo.png",
    url: "https://www.farcaster.xyz/",
  },
];

interface PartnerLogoProps {
  name: string;
  logo: string;
  url: string;
  showText?: boolean;
}

const PartnerLogo: React.FC<PartnerLogoProps> = ({ name, logo, url, showText = false }) => {
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
      {showText && (
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
      )}
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

const BuiltWith: NextPage<BuiltWithTYpe> = ({
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
        Built with
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
          We are built on top of the leading protocols.
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
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 2rem;
            flex-wrap: wrap;
            padding: 1rem;
          `}
        >
          {partners.map((partner) => (
            <PartnerLogo
              key={partner.name}
              name={partner.name}
              logo={partner.logo}
              url={partner.url}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BuiltWith;
