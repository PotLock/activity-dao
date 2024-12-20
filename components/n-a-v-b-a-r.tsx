import type { NextPage } from "next";
import { css } from "@emotion/css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ConnectKitButton } from "connectkit";
import { useAccount } from "wagmi";
import Image from 'next/image';
import { RiHome5Line, RiNewspaperLine, RiCalendarEventLine, RiGroupLine, RiHandCoinLine } from "react-icons/ri";

export type NAVBARType = {
  className?: string;
};

const NAVBAR: NextPage<NAVBARType> = ({ className = "" }) => {
  const [activeLink, setActiveLink] = useState("");
  const router = useRouter();
  const { address, isConnected } = useAccount();

  useEffect(() => {
    // Set the active link based on the current route
    if (router.pathname === "/events") {
      setActiveLink("events");
    } else if (router.pathname.startsWith("/dao")) {
      setActiveLink("daos");
    } else if (router.pathname.startsWith("/interest") || router.pathname.startsWith("/feeds")) {
      setActiveLink("feed");
    } else if (router.pathname.startsWith("/commits")) {
      setActiveLink("commits");
    } else if (router.pathname === "/") {
      setActiveLink("home");
    } else {
      setActiveLink(""); // Set to an empty string for no active link
    }
  }, [router.pathname]);

  const navLinks = [
    { id: "home", label: "Home", href: "/#home", icon: RiHome5Line },
    { id: "feed", label: "Feed", href: "/feeds", icon: RiNewspaperLine },
    { id: "events", label: "Events", href: "/events", icon: RiCalendarEventLine },
    { id: "daos", label: "DAOs", href: "/daos", icon: RiGroupLine },
    { id: "commits", label: "Commits", href: "/commits", icon: RiHandCoinLine },
  ];

  return (
    <>
      {/* Top Navbar */}
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
            z-index: 1001; // Increased z-index
            text-align: center;
            font-size: var(--font-size-base);
            color: var(--wwwgetminjiapp-black);
            font-family: var(--font-hanken-grotesk);
            @media screen and (max-width: 1050px) {
              padding: var(--padding-xs);
            }
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
            gap: var(--gap-5xl);
            max-width: 100%;
            height: 5rem;
            @media screen and (max-width: 1050px) {
              width: 100%;
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
              @media screen and (max-width: 1050px) {
                padding: 0;
              }
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
                  src="/activitymanicon.svg"
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

          {/* Desktop Nav Links */}
          <nav
            className={css`
              display: flex;
              flex-direction: row;
              align-items: center;
              justify-content: center;
              gap: var(--gap-5xl);
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
                  @media screen and (max-width: 1050px) {
                    flex-direction: column;
                    justify-content: center;
                    height: auto;
                  }
                `}
              >
                <a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveLink(link.id);
                    router.push(link.href);
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
                    @media screen and (max-width: 1050px) {
                      font-size: 0.75rem;
                    }
                    &::after {
                      content: '';
                      position: absolute;
                      bottom: 0.5rem;
                      left: 0;
                      width: 100%;
                      height: 0.125rem;
                      background-color: var(--color-gold-100);
                      transform: scaleX(0);
                      transition: transform 0.3s ease-in-out;
                      transform-origin: left;
                      @media screen and (max-width: 1050px) {
                        display: none;
                      }
                    }
                    &:hover::after {
                      transform: scaleX(1);
                    }
                  `}
                >
                  {link.label}
                </a>
                {activeLink === link.id && (
                  <div
                    className={css`
                      width: 100%;
                      height: 0.125rem;
                      position: absolute;
                      bottom: 0.5rem;
                      left: 0;
                      border-radius: var(--br-9xs);
                      background-color: var(--color-gold-100);
                      @media screen and (max-width: 1050px) {
                        display: none;
                      }
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
              @media screen and (max-width: 1050px) {
                width: auto;
                padding: 0;
              }
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
                    {isConnected ? ensName ?? truncatedAddress : "Login"}
                  </button>
                );
              }}
            </ConnectKitButton.Custom>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navbar */}
      <nav
        className={css`
          display: none;
          @media screen and (max-width: 1050px) {
            display: flex;
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            background-color: var(--background-default-default);
            justify-content: space-around;
            padding: 0.5rem 0;
            box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
            z-index: 1001;
          }
        `}
      >
        {navLinks.map((link) => (
          <a
            key={link.id}
            href={link.href}
            onClick={(e) => {
              e.preventDefault();
              setActiveLink(link.id);
              router.push(link.href);
            }}
            className={css`
              display: flex;
              flex-direction: column;
              align-items: center;
              text-decoration: none;
              color: ${activeLink === link.id ? 'var(--color-gold-100)' : 'inherit'};
              font-size: 0.75rem;
              font-weight: ${activeLink === link.id ? '600' : 'normal'};
              position: relative;
              padding: 0.25rem 0;

              &::after {
                content: '';
                position: absolute;
                bottom: 0;
                left: 50%;
                transform: translateX(-50%);
                width: 4px;
                height: 4px;
                border-radius: 50%;
                background-color: var(--color-gold-100);
                opacity: ${activeLink === link.id ? '1' : '0'};
                transition: opacity 0.3s ease;
              }
            `}
          >
            <link.icon size={24} />
            <span>{link.label}</span>
          </a>
        ))}
      </nav>
    </>
  );
};

export default NAVBAR;
