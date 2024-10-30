import type { NextPage } from "next";
import { css } from "@emotion/css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ConnectKitButton } from "connectkit";
import { useAccount } from "wagmi";
import Image from 'next/image';
import { RiHome5Line, RiNewspaperLine, RiCalendarEventLine, RiGroupLine } from "react-icons/ri";
import "@farcaster/auth-kit/styles.css";
import { SignInButton } from "@farcaster/auth-kit";
import { AuthKitProvider } from "@farcaster/auth-kit";
import { QRCode } from "react-qrcode-logo";


export type NAVBARType = {
  className?: string;
};

const NAVBAR: NextPage<NAVBARType> = ({ className = "" }) => {
  const [activeLink, setActiveLink] = useState("");
  const router = useRouter();
  const { address, isConnected } = useAccount();
  const [fid, setFid] = useState<number>();
  const [signerId, setSignerId] = useState<string>();
  const [deepLink, setDeepLink] = useState<string>();
  const [openQR, setOpenQR] = useState(false);

  // Add debug logging to useEffect
  useEffect(() => {
    console.log('Current pathname:', router.pathname);
    console.log('Current query:', router.query);
    
    const storedFid = localStorage.getItem('farcaster_fid');
    const storedSignerId = localStorage.getItem('signer_id');
    
    console.log('Stored FID:', storedFid);
    console.log('Stored Signer ID:', storedSignerId);
    
    if (storedFid) {
      setFid(Number(storedFid));
    }
    
    if (storedSignerId) {
      setSignerId(storedSignerId);
    }

    const path = router.pathname;
    console.log('Setting active link for path:', path);
    
    if (path === "/events") {
      setActiveLink("events");
    } else if (path.startsWith("/dao")) {
      setActiveLink("daos");
    } else if (path.startsWith("/interest") || path.startsWith("/feeds")) {
      setActiveLink("feed");
    } else if (path === "/") {
      setActiveLink("home");
    }
    
    console.log('Active link set to:', activeLink);
  }, [router.pathname]);

  // Modified handleNavigation with better error handling and debugging
  const handleNavigation = async (path: string, linkId: string) => {
    console.log('Attempting navigation to:', path);
    console.log('Current pathname:', router.pathname);
    
    try {
      setActiveLink(linkId);
      // Use replace instead of push to avoid stacking history entries
      await router.replace(path, undefined, { 
        shallow: false,
        scroll: true
      });
      console.log('Navigation successful');
    } catch (error) {
      console.error('Navigation failed:', error);
    }
  };

  // Modified Logo click handler
  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    handleNavigation('/', 'home');
  };

  // Update navLinks with exact paths
  const navLinks = [
    { id: "home", label: "Home", href: "/", icon: RiHome5Line },
    { id: "feed", label: "Feed", href: "/feeds", icon: RiNewspaperLine },
    { id: "events", label: "Events", href: "/events", icon: RiCalendarEventLine },
    { id: "daos", label: "DAOs", href: "/daos", icon: RiGroupLine },
  ];

  // Add this debug useEffect
  useEffect(() => {
    console.log('Router ready state:', router.isReady);
    console.log('Current pathname:', router.pathname);
    console.log('Available routes:', navLinks.map(link => link.href));
  }, [router.isReady]);

  async function checkStorage() {
    try {
      if (typeof window != "undefined") {
        const signer = localStorage.getItem("signer_id");
        if (signer != null) {
          setSignerId(signer);
        } else if (fid) {
          const signerReq = await fetch(`/api/signer?fid=${fid}`);
          const signerRes = await signerReq.json();
          if (signerRes.signers.length > 0) {
            setSignerId(signerRes.signers[0].signer_uuid);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function createSigner() {
    try {
      const signerReq = await fetch(`/api/signer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fid }), // Send FID to API
      });
      const signerRes = await signerReq.json();
      
      if (signerRes.error) {
        throw new Error(signerRes.error);
      }

      setDeepLink(signerRes.deep_link_url);
      setOpenQR(true);

      // Poll for signer approval
      const pollStartTime = Date.now();
      while (true) {
        if (Date.now() - pollStartTime > 120000) {
          alert("Request timed out");
          setOpenQR(false);
          break;
        }
        const pollReq = await fetch(`/api/poll?token=${signerRes.token}`);
        const pollRes = await pollReq.json();
        if (pollRes.state === "completed") {
          setDeepLink(undefined);
          setOpenQR(false);
          setSignerId(signerRes.signer_id);
          
          // Store both FID and signer ID
          localStorage.setItem("farcaster_fid", fid!.toString());
          localStorage.setItem("signer_id", signerRes.signer_id);
          break;
        }
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
    } catch (error) {
      console.log(error);
      setOpenQR(false);
    }
  }

  return (
    <AuthKitProvider config={{
      rpcUrl: "https://mainnet.optimism.io",
      domain: "example.com",
      siweUri: "https://example.com/login"  // removed comma
    }}>
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
            onClick={handleLogoClick}
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
                    handleNavigation(link.href, link.id);
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

          {/* Connect Wallet and Farcaster Buttons */}
          <div
            className={css`
              display: flex;
              flex-direction: row;
              align-items: center;
              gap: 1rem;
              padding: var(--padding-base) 0rem 0rem;
              box-sizing: border-box;
              height: 100%;
              @media screen and (max-width: 1050px) {
                padding: 0;
              }
            `}
          >
            {/* Connect Wallet Button */}
            {/* Replace the false && with proper conditional rendering */}
            {isConnected && (
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
                      `}
                    >
                      {isConnected ? ensName ?? truncatedAddress : "Login"}
                    </button>
                  );
                }}
              </ConnectKitButton.Custom>
            )}

            <div
              className={css`
                .fc-container {
                  height: 2.5rem;
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
                }
              `}
            >
              <SignInButton
                onSuccess={({ fid, username }) => {
                  if (!fid) return;
                  console.log(`Hello, ${username}! Your fid is ${fid}.`);
                  setFid(fid);
                  localStorage.setItem('farcaster_fid', fid.toString());
                  
                  // Check if we already have a signer before creating a new one
                  const existingSignerId = localStorage.getItem('signer_id');
                  if (!existingSignerId) {
                    createSigner();
                  } else {
                    setSignerId(existingSignerId);
                  }
                }}
              />
              {/* Create Signer Button */}
              {/* {fid && !signerId && (
                <button
                  onClick={createSigner}
                  className={css`
                    height: 2.5rem;
                    background: #facc15;
                    border: none;
                    border-radius: 8665.8px;
                    color: #000;
                    font-size: 16px;
                    font-weight: 600;
                    padding: 0 16px;
                    cursor: pointer;
                  `}
                >
                  Create Signer
                </button>
              )} */}
              {openQR && (
                <QRCode
                  value={deepLink}
                  size={200}
                  logoImage="https://dweb.mypinata.cloud/ipfs/QmVLwvmGehsrNEvhcCnnsw5RQNseohgEkFNN1848zNzdng"
                  logoWidth={50}
                  logoHeight={50}
                  logoPadding={5}
                  logoPaddingStyle="square"
                  qrStyle="dots"
                  eyeRadius={15}
                />
              )}
            </div>
           
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
              handleNavigation(link.href, link.id);
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
    </AuthKitProvider>
  );
};

export default NAVBAR;
