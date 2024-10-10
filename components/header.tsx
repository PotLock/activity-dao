import type { NextPage } from "next";
import { Button } from "@mui/material";
import { css } from "@emotion/css";

export type HeaderType = {
  className?: string;
};

const Header: NextPage<HeaderType> = ({ className = "" }) => {
  return (
    <section
      className={[
        css`
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-start;
          gap: var(--gap-xs-4);
          max-width: 100%;
          text-align: center;
          font-size: var(--font-size-3xs-2);
          color: var(--wwwgetminjiapp-black);
          font-family: var(--font-alexandria);
          
          @media screen and (max-width: 768px) {
            padding: 1rem;
            gap: var(--gap-xs); // Reduce gap on mobile
          }

          @media screen and (max-width: 480px) {
            margin-top: 0.5rem; // Smaller top margin for very small devices
            gap: var(--gap-xs); 
          }

          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }

          @keyframes underline {
            0% { width: 0; }
            100% { width: 100%; }
          }

          img[src$=".svg"] {
            animation: bounce 2s ease-in-out infinite;
          }
        `,
        className,
      ].join(" ")}
    >
      <div
        className={css`
          width: 35.694rem;
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          justify-content: flex-start;
          padding: 0rem var(--padding-44xl);
          box-sizing: border-box;
          max-width: 100%;
        `}
      >
        <div
          className={css`
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            justify-content: flex-start;
            gap: var(--gap-base-9);
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
            `}
          >
            <img
              className={css`
                height: 2.456rem;
                width: 2.638rem;
                position: relative;
                flex-shrink: 0;

                @media screen and (max-width: 768px) {
                  margin-top: -.5rem
                }
              `}
              alt=""
              src="/group-5.svg"
            />
          </div>
          <img
            className={css`
              width: 0.631rem;
              height: 0.931rem;
              position: relative;
              flex-shrink: 0;
              z-index: 2;
              @media screen and (max-width: 768px) {
              margin-top: -.5rem
            `}
            alt=""
            src="/group-6.svg"
          />
        </div>
      </div>
      <div
        className={css`
          align-self: stretch;
          display: flex;
          flex-direction: row;
          align-items: flex-end;
          justify-content: flex-start;
          gap: var(--gap-9xs-4);
          max-width: 100%;
          @media screen and (max-width: 1050px) {
            flex-wrap: wrap;
          }
          @media screen and (max-width: 768px) {
            flex-direction: column;
            align-items: center;
            gap: var(--gap-xs); // Reduce gap on mobile
          }
        `}
      >
        <div
          className={css`
            height: 7.85rem;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: flex-start;
            @media screen and (max-width: 768px) {
              height: auto;
              margin-bottom: 1rem; // Add space below on mobile
            }
          `}
        >
          <img
            className={css`
              width: 1.725rem;
              height: 1.531rem;
              position: relative;
              z-index: 2;
              @media screen and (max-width: 768px) {
                margin-top: 1rem; // Lower the image on mobile
                
              }
            `}
            alt=""
            src="/group-7.svg"
          />
        </div>
        <div
          className={css`
            flex: 1;
            display: flex;
            flex-direction: row;
            align-items: flex-start;
            justify-content: flex-start;
            gap: var(--gap-5xs);
            min-width: 49.063rem;
            max-width: 100%;
            @media screen and (max-width: 1050px) {
              flex-wrap: wrap;
              min-width: 100%;
            }
            @media screen and (max-width: 768px) {
              padding: 0; // Remove padding on mobile
              min-width: auto; // Allow content to shrink on mobile
              flex-direction: row; // Keep buttons in one row on mobile
              flex-wrap: wrap; // Allow wrapping if needed
              justify-content: center; // Center buttons
              width: 100%; // Full width on mobile
              gap: 1rem; // Add gap between buttons
            }
          `}
        >
          <div
            className={css`
              flex: 1;
              display: flex;
              flex-direction: column;
              align-items: flex-start;
              justify-content: flex-start;
              padding: 0rem 0rem 0rem var(--padding-143xl);
              box-sizing: border-box;
              position: relative;
              max-width: 100%;
              @media screen and (max-width: 750px) {
                min-width: 100%;
              }
              @media screen and (max-width: 768px) {
                padding: 0; // Remove padding on mobile
              }
            `}
          >
            <div
              className={css`
                width: 54.313rem;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: flex-start;
                padding: 0rem 0rem;
                box-sizing: border-box;
                position: relative;
                gap: var(--gap-5xl);
                max-width: 100%;
                z-index: 2;
                @media screen and (max-width: 768px) {
                  width: 100%; // Full width on mobile
                }
              `}
            >
              <a
                href="https://potlock.notion.site/ActivityDAO-Handbook-2979c91a779e46659a5646438af3324c"
                target="_blank"
                rel="noopener noreferrer"
                className={css`
                  text-decoration: none;
                  color: inherit;
                  cursor: pointer;
                `}
              >
                <div
                  className={css`
                    width: 17.375rem;
                    height: 1.875rem;
                    box-shadow: 0px 0px 1px rgba(17, 17, 17, 0.05),
                      1px 1px 1px rgba(17, 17, 17, 0.04),
                      2px 3px 2px rgba(17, 17, 17, 0.03),
                      4px 4px 2px rgba(17, 17, 17, 0.01);
                    border-radius: var(--br-5xs);
                    background-color: var(--wwwamplemarketcom-alabaster-75);
                    border: 1px solid var(--color-whitesmoke-100);
                    box-sizing: border-box;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: center;
                    padding: var(--padding-10xs) var(--padding-3xs)
                      var(--padding-10xs) var(--padding-9xs);
                    gap: var(--item-spacing-8);
                    max-width: var(--width-472);
                    text-align: left;
                    color: var(--color-grey-7);
                    @media screen and (max-width: 750px) {
                      max-width: var(--width-472);
                    }
                    transition: all 0.3s ease;
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
                  <div
                    className={css`
                      width: 3.125rem;
                      box-shadow: 0px 0px 1px rgba(17, 17, 17, 0.05),
                        1px 1px 1px rgba(17, 17, 17, 0.04),
                        2px 3px 2px rgba(17, 17, 17, 0.03),
                        4px 4px 2px rgba(17, 17, 17, 0.01);
                      border-radius: var(--br-9xs);
                      background-color: var(--wwwamplemarketcom-alabaster-75);
                      border: 1px solid var(--wwwamplemarketcom-alabaster);
                      box-sizing: border-box;
                      display: flex;
                      flex-direction: column;
                      align-items: flex-start;
                      justify-content: flex-start;
                      padding: var(--padding-10xs) var(--padding-7xs);
                    `}
                  >
                    <div
                      className={css`
                        display: flex;
                        flex-direction: column;
                        align-items: flex-start;
                        justify-content: flex-start;
                      `}
                    >
                      <div
                        className={css`
                          position: relative;
                          line-height: 0.625rem;
                          display: inline-block;
                          min-width: 2.313rem;
                        `}
                      >
                        <span
                          className={css`
                            font-weight: 500;
                          `}
                        >{`NEW `}</span>
                        <b className={css``}>🌟</b>
                      </div>
                    </div>
                  </div>
                  <div
                    className={css`
                      display: flex;
                      flex-direction: column;
                      align-items: flex-start;
                      justify-content: flex-start;
                      opacity: 0.8;
                      font-size: var(--display-1-medium-size);
                    `}
                  >
                    <div
                      className={css`
                        position: relative;
                        line-height: 0.75rem;
                      `}
                    >
                      Grab Your Activity Handbook Now
                    </div>
                  </div>
                </div>
              </a>
              <h1
                className={css`
                  margin: 0;
                  width: 55.75rem;
                  position: relative;
                  font-size: var(--font-size-32xl);
                  line-height: 4.469rem;
                  display: inline-block;
                  max-width: 103%;
                  font-family: var(--font-dynapuff);
                  @media screen and (max-width: 1050px) {
                    font-size: var(--font-size-22xl);
                    line-height: 3.563rem;
                  }
                  @media screen and (max-width: 450px) {
                    font-size: var(--font-size-12xl);
                    line-height: 2.688rem;
                  }
                  @media screen and (max-width: 768px) {
                    font-size: var(--font-size-xl);
                    line-height: 2.5rem;
                    width: 100%;
                  }

                  .emoji {
                    display: inline-block;
                    animation: surf 3s ease-in-out infinite;
                  }

                  .emoji:nth-of-type(2) {
                    animation-delay: 0.2s;
                  }

                  .emoji:nth-of-type(3) {
                    animation-delay: 0.4s;
                  }

                  @keyframes surf {
                    0%, 100% { transform: translateY(0) rotate(0deg); }
                    25% { transform: translateY(-5px) rotate(-5deg); }
                    50% { transform: translateY(0) rotate(0deg); }
                    75% { transform: translateY(-5px) rotate(5deg); }
                  }

                  .activity-based {
                    position: relative;
                    display: inline-block;
                    animation: tickle 2s ease-in-out infinite, rainbow-glow 5s linear infinite;
                  }

                  .activity-based::before,
                  .activity-based::after { 
                    content: '✨';
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    font-size: 0.5em;
                    animation: sparkle 1.5s ease-in-out infinite;
                  }

                  .activity-based::before {
                    left: -1em;
                  }

                  .activity-based::after {
                    right: -1em;
                  }

                  @keyframes tickle {
                    0%, 100% { transform: translateY(0); }
                    25% { transform: translateY(-2px) rotate(-1deg); }
                    50% { transform: translateY(0) rotate(1deg); }
                    75% { transform: translateY(2px) rotate(-1deg); }
                  }

                  @keyframes sparkle {
                    0%, 100% { opacity: 0; transform: translateY(-50%) scale(0.8); }
                    50% { opacity: 1; transform: translateY(-50%) scale(1.2); }
                  }

                  @keyframes rainbow-glow {
                    0% { text-shadow: 0 0 10px #ff0000; }
                    14% { text-shadow: 0 0 10px #ff7f00; }
                    28% { text-shadow: 0 0 10px #ffff00; }
                    42% { text-shadow: 0 0 10px #00ff00; }
                    57% { text-shadow: 0 0 10px #0000ff; }
                    71% { text-shadow: 0 0 10px #8b00ff; }
                    85% { text-shadow: 0 0 10px #ff00ff; }
                    100% { text-shadow: 0 0 10px #ff0000; }
                  }
                `}
              >
                bootstrap <span className="emoji">💸</span> the proliferation <span className="emoji">🚀</span> of <span className="activity-based">activity-based</span> <span className="emoji">🏄</span> communities
              </h1>
              <h3
                className={css`
                  margin: 0;
                  width: 43.063rem;
                  position: relative;
                  font-size: var(--font-size-5xl);
                  line-height: 2.469rem;
                  font-weight: 400;
                  font-family: var(--font-hanken-grotesk);
                  display: inline-block;
                  max-width: 100%;
                  @media screen and (max-width: 450px) {
                    font-size: var(--font-size-lgi);
                    line-height: 2rem;
                  }
                  @media screen and (max-width: 768px) {
                    font-size: var(--font-size-lg); // Smaller font on mobile
                    line-height: 1.5rem;
                    width: 100%; // Full width on mobile
                  }

                  .dope {
                    position: relative;
                    font-weight: bold;
                    animation: bold-unbold 2s infinite;
                  }

                  .dope::after {
                    content: '';
                    position: absolute;
                    left: 0;
                    bottom: -2px;
                    width: 0;
                    height: 2px;
                    background-color: yellow;
                    animation: underline 2s ease-in-out infinite;
                  }

                  @keyframes bold-unbold {
                    0%, 100% { font-weight: bold; }
                    50% { font-weight: normal; }
                  }
                `}
              >
                the movement to have community run & funded ecosystems around every <span className="dope">dope</span> activity
              </h3>
              <div
                className={css`
                  width: 31.375rem;
                  display: flex;
                  flex-direction: row;
                  align-items: center;
                  justify-content: center;
                  gap: var(--gap-15xl);
                  max-width: 100%;
                  @media screen and (max-width: 750px) {
                    flex-wrap: wrap;
                  }
                  @media screen and (max-width: 768px) {
                    width: 100%; // Full width on mobile
                    justify-content: center; // Center buttons
                    gap: 1rem; // Reduce gap between buttons
                  }
                `}
              >
                <a
                  href="https://discord.gg/mmEv99x9QK"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none' }}
                >
                  <Button
                    className={css`
                      height: 3.75rem;
                      width: 9.875rem;
                      @media screen and (max-width: 768px) {
                        width: 158px; // Original width
                      }
                    `}
                    disableElevation
                    variant="contained"
                    sx={{
                      textTransform: "none",
                      color: "#000",
                      fontSize: "20",
                      background: "#facc15",
                      borderRadius: "9999px",
                      "&:hover": { background: "#facc15" },
                      width: 158,
                      height: 60,
                    }}
                  >
                    Join Now
                  </Button>
                </a>
                <a
                  href="https://potlock.notion.site/ActivityDAO-Handbook-2979c91a779e46659a5646438af3324c"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none' }}
                >
                  <Button
                    className={css`
                      height: 3.75rem;
                      flex: 1;
                      min-width: 12.563rem;
                      @media screen and (max-width: 768px) {
                        width: 200px; // Fixed width on mobile
                      }
                    `}
                    startIcon={
                      <img width="24px" height="24px" src="/notebook.svg" />
                    }
                    disableElevation
                    variant="outlined"
                    sx={{
                      textTransform: "none",
                      color: "#000",
                      fontSize: "20",
                      borderColor: "#000",
                      borderRadius: "9999px",
                      "&:hover": { 
                        color: "#fff",
                        backgroundColor: "#000",
                        borderColor: "#000",
                      },
                      height: 60,
                    }}
                  >
                    Download Handbook
                  </Button>
                </a>
              </div>
              <div
                className={css`
                  width: 10.138rem;
                  height: 8.581rem;
                  position: absolute;
                  margin: 0 !important;
                  bottom: 0.806rem;
                  left: -10.125rem;
                `}
              >
                <img
                  className={css`
                    position: absolute;
                    height: calc(100% - 3.2px);
                    top: 0.2rem;
                    bottom: 0rem;
                    left: 0rem;
                    max-height: 100%;
                    width: 8.381rem;
                    object-fit: contain;
                    z-index: 2;
                  `}
                  alt=""
                  src="/rectangle@2x.png"
                />
                <img
                  className={css`
                    position: absolute;
                    top: 0rem;
                    left: 7.5rem;
                    width: 2.638rem;
                    height: 2.456rem;
                    z-index: 3;
                  `}
                  alt=""
                  src="/group-8.svg"
                />
              </div>
            </div>
            <img
              className={css`
                width: 2.638rem;
                height: 2.456rem;
                position: absolute;
                margin: 0 !important;
                top: 3.056rem;
                left: 3.75rem;
                z-index: -0;
                animation: twinkle 2s ease-in-out infinite;

                @keyframes twinkle {
                  0%, 100% { opacity: 1; }
                  50% { opacity: 0.5; }
                }
              `}
              alt=""
              src="/group-9.svg"
            />
          </div>
          <div
            className={css`
              width: 10.538rem;
              display: flex;
              flex-direction: column;
              align-items: flex-start;
              justify-content: flex-start;
              padding: var(--padding-2xl-9) 0rem 0rem;
              box-sizing: border-box;
            `}
          >
            <div
              className={css`
                align-self: stretch;
                display: flex;
                flex-direction: column;
                align-items: flex-end;
                justify-content: flex-start;
                position: relative;
                gap: var(--gap-137xl-5);
              `}
            >
              <img
                className={css`
                  width: 2.656rem;
                  height: 2.406rem;
                  position: absolute;
                  margin: 0 !important;
                  bottom: 5.531rem;
                  left: 0rem;
                  z-index: 2;
                `}
                alt=""
                src="/group-10.svg"
              />
              <div
                className={css`
                  align-self: stretch;
                  display: flex;
                  flex-direction: row;
                  align-items: flex-start;
                  justify-content: flex-start;
                  padding: 0rem var(--padding-4xl);
                `}
              >
                <div
                  className={css`
                    width: 5.725rem;
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    justify-content: flex-start;
                    gap: var(--gap-sm-7);
                  `}
                >
                  <img
                    className={css`
                      width: 0.6rem;
                      height: 0.525rem;
                      position: relative;
                      flex-shrink: 0;
                      z-index: 2;
                    `}
                    alt=""
                    src="/group-11.svg"
                  />
                  <div
                    className={css`
                      align-self: stretch;
                      display: flex;
                      flex-direction: row;
                      align-items: flex-start;
                      justify-content: flex-start;
                      padding: 0rem 0rem 0rem var(--padding-5xs);
                    `}
                  >
                    <div
                      className={css`
                        flex: 1;
                        display: flex;
                        flex-direction: column;
                        align-items: flex-start;
                        justify-content: flex-start;
                        gap: var(--gap-10xs-7);
                        flex-shrink: 0;
                      `}
                    >
                      <div
                        className={css`
                          align-self: stretch;
                          height: 4.25rem;
                          position: relative;
                        `}
                      >
                        <img
                          className={css`
                            position: absolute;
                            top: 0.644rem;
                            left: 3.5rem;
                            width: 1.725rem;
                            height: 1.531rem;
                            z-index: 2;
                          `}
                          alt=""
                          src="/group-12.svg"
                        />
                        <img
                          className={css`
                            position: absolute;
                            height: 100%;
                            top: 0rem;
                            bottom: 0rem;
                            left: 0rem;
                            max-height: 100%;
                            width: 4.25rem;
                            object-fit: cover;
                            z-index: 3;
                          `
                          
                        }
                          alt=""
                          src="/rectangle-1@2x.png"
                        />
                      </div>
                      <div
                        className={css`
                          display: flex;
                          flex-direction: row;
                          align-items: flex-start;
                          justify-content: flex-start;
                          padding: 0rem var(--padding-2xs);
                        `}
                      >
                        <img
                          className={css`
                            height: 0.569rem;
                            width: 0.35rem;
                            position: relative;
                            z-index: 2;
                          `}
                          alt=""
                          src="/group-13.svg"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <img
                className={css`
                  width: 1.725rem;
                  height: 1.531rem;
                  position: relative;
                  z-index: 2;
                `}
                alt=""
                src="/group-14.svg"
              />
            </div>
          </div>
        </div>
      </div>
      {/* Adjust positions of group-5.svg and group-6.svg */}
      <img
        className={css`
          // ... existing styles ...
          @media screen and (max-width: 768px) {
            top: auto;
            bottom: 1rem; // Lower the image on mobile
            display: none;
            
          }
        `}
        alt=""
        src="/group-5.svg"
      />
      <img
        className={css`
          // ... existing styles ...
          @media screen and (max-width: 768px) {
            top: auto;
            bottom: 2rem; // Lower the image on mobile
            
          }
        `}
        alt=""
        src="/group-6.svg"
      />
    </section>
  );
};

export default Header;