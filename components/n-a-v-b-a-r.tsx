import type { NextPage } from "next";
import { css } from "@emotion/css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ConnectKitButton } from "connectkit";
import { useAccount } from "wagmi";

export type NAVBARType = {
  className?: string;
};

const NAVBAR: NextPage<NAVBARType> = ({ className = "" }) => {
  const [activeLink, setActiveLink] = useState("home");
  const router = useRouter();
  const { address, isConnected } = useAccount();

  useEffect(() => {
    // Set the active link based on the current route
    if (router.pathname === "/events") {
      setActiveLink("events");
    } else if (router.pathname === "/daos") {
      setActiveLink("daos");
    } else {
      setActiveLink("home");
    }
  }, [router.pathname]);

  const navLinks = [
    { id: "home", label: "Home", href: "/#home" },
    { id: "handbook", label: "Handbook", href: "https://potlock.notion.site/ActivityDAO-Handbook-2979c91a779e46659a5646438af3324c", target: "_blank" },
    { id: "events", label: "Events", href: "/events" },
    { id: "daos", label: "DAOs", href: "/daos" },
    // { id: "model", label: "Model", href: "#model" },
    // { id: "cta-bubble", label: "cta", href: "#cta-bubble" },
  ];

  return (
    <header
      className={[
        css`
          position: fixed;
          top: 0;
          left: 0;
          background-color: var(--background-default-default);
          width: 100%;
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          justify-content: center;
          padding: var(--padding-xl);
          box-sizing: border-box;
          max-width: 100%;
          z-index: 1000;
          text-align: center;
          font-size: var(--font-size-base);
          color: var(--wwwgetminjiapp-black);
          font-family: var(--font-hanken-grotesk);
        `,
        className,
      ].join(" ")}
    >
      <div
        className={css`
          width: 75rem;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          padding: 0rem var(--padding-12xs);
          box-sizing: border-box;
          gap: var(--gap-5xl); // Increased gap between main elements
          max-width: 100%;
          height: 5rem; // Add a fixed height to the container
          @media screen and (max-width: 1050px) {
            width: 43.563rem;
          }
        `}
      >
        {/* Logo */}
        <div
          className={css`
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: flex-start;
            padding: var(--padding-xl-3) var(--padding-6xs) 0rem 0rem;
            cursor: pointer;
          `}
          onClick={() => window.location.href = '/#home'}
        >
          <div
            className={css`
              align-self: stretch;
              display: flex;
              flex-direction: row;
              align-items: flex-start;
              justify-content: flex-start;
            `}
          >
            <div
              className={css`
                width: 1.994rem;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: flex-start;
                padding: var(--padding-10xs-2) var(--padding-6xs);
                box-sizing: border-box;
                flex-shrink: 0;
              `}
            >
              <img
                className={css`
                  height: 1.681rem;
                  width: 1.013rem;
                  position: relative;
                `}
                alt=""
                src="/-emoji-light-bulb.svg"
              />
            </div>
            <div
              className={css`
                flex: 1;
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                justify-content: flex-start;
                padding: var(--padding-9xs-1) 0rem 0rem;
              `}
            >
              <img
                className={css`
                  align-self: stretch;
                  height: 1.569rem;
                  position: relative;
                  max-width: 100%;
                  overflow: hidden;
                  flex-shrink: 0;
                `}
                loading="lazy"
                alt=""
                src="/activitydaos.svg"
              />
            </div>
          </div>
        </div>

        {/* Nav Links */}
        <nav
          className={css`
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            gap: var(--gap-5xl); // Increased gap between nav links
            flex: 1;
            height: 100%;
            @media screen and (max-width: 1050px) {
              display: none;
            }
          `}
        >
          {navLinks.map((link) => (
            <div
              key={link.id}
              className={css`
                position: relative;
                height: 100%;
                display: flex;
                align-items: center;
              `}
            >
              <a
                href={link.href}
                target={link.target}
                rel={link.target === "_blank" ? "noopener noreferrer" : undefined}
                onClick={(e) => {
                  if (!link.target) {
                    e.preventDefault();
                    setActiveLink(link.id);
                    router.push(link.href);
                  }
                }}
                className={css`
                  text-decoration: none;
                  position: relative;
                  font-weight: 600;
                  color: inherit;
                  padding: 0.5rem;
                  height: 100%;
                  display: flex;
                  align-items: center;
                  &::after {
                    content: '';
                    position: absolute;
                    bottom: 0.5rem; // Reduced space between text and underline
                    left: 0;
                    width: 100%;
                    height: 0.125rem;
                    background-color: var(--color-gold-100);
                    transform: scaleX(0);
                    transition: transform 0.3s ease-in-out;
                    transform-origin: left;
                  }
                  &:hover::after {
                    transform: scaleX(1);
                  }
                `}
              >
                {link.label}
              </a>
              {activeLink === link.id && !link.target && (
                <div
                  className={css`
                    width: 100%;
                    height: 0.125rem;
                    position: absolute;
                    bottom: 0.5rem; // Reduced space between text and underline
                    left: 0;
                    border-radius: var(--br-9xs);
                    background-color: var(--color-gold-100);
                  `}
                />
              )}
            </div>
          ))}
        </nav>

        {/* Connect Wallet Button */}
        <div
          className={css`
            width: 11.194rem;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: flex-start;
            padding: var(--padding-base) 0rem 0rem;
            box-sizing: border-box;
            height: 100%;
          `}
        >
          <ConnectKitButton.Custom>
            {({ isConnected, show, truncatedAddress, ensName }) => {
              return (
                <button
                  onClick={show}
                  className={css`
                    align-self: stretch;
                    height: 2.5rem;
                    transition: all 0.3s ease;
                    background: #facc15;
                    border: none;
                    border-radius: 8665.8px;
                    color: #000;
                    font-size: 16px;
                    font-weight: 600;
                    padding: 0 16px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    &:hover {
                      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
                      animation: rainbow-glow 3s linear infinite;
                    }
                    @keyframes rainbow-glow {
                      0% { box-shadow: 0 0 10px #ff0000; }
                      14% { box-shadow: 0 0 10px #ff7f00; }
                      28% { box-shadow: 0 0 10px #ffff00; }
                      42% { box-shadow: 0 0 10px #00ff00; }
                      57% { box-shadow: 0 0 10px #0000ff; }
                      71% { box-shadow: 0 0 10px #8b00ff; }
                      85% { box-shadow: 0 0 10px #ff00ff; }
                      100% { box-shadow: 0 0 10px #ff0000; }
                    }
                  `}
                >
                  {isConnected ? ensName ?? truncatedAddress : "Connect Wallet"}
                </button>
              );
            }}
          </ConnectKitButton.Custom>
        </div>
      </div>
    </header>
  );
};

export default NAVBAR;