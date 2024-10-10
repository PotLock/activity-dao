import type { NextPage } from "next";
import {
  TextField,
  InputAdornment,
  Icon,
  IconButton,
  Button,
} from "@mui/material";
import { css } from "@emotion/css";

export type JoinActivityDAOType = {
  className?: string;
};

const JoinActivityDAO: NextPage<JoinActivityDAOType> = ({ className = "" }) => {
  return (
    <section
      id="cta-bubble"
      className={[
        css`
          border-radius: var(--br-13xl);
          background-color: var(--background-default-default);
          border: 1px solid var(--color-gainsboro-100);
          box-sizing: border-box;
          width: 100%;
          max-width: 75rem;
          margin: 0 auto;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          justify-content: flex-start;
          padding: var(--padding-40xl) var(--padding-8xl);
          gap: var(--gap-3xs);
          text-align: left;
          font-size: var(--font-size-23xl-2);
          color: var(--color-gray-200);
          font-family: var(--font-dynapuff);
          position: relative;
          @media screen and (max-width: 1050px) {
            padding: var(--padding-xl) var(--padding-base);
          }
          @media screen and (max-width: 768px) {
            padding: var(--padding-lg) var(--padding-sm);
          }
        `,
        className,
      ].join(" ")}
    > 
      <img
        className={css`
          width: 6.919rem;
          height: 6.744rem;
          position: absolute;
          margin: 0 !important;
          bottom: -2.931rem;
          left: 24.188rem;
          object-fit: contain;
        `}
        loading="lazy"
        alt=""
        src="/-emoji-smiling-face-with-sunglasses@2x.png"
      />
      <div
        className={css`
          align-self: stretch;
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          justify-content: flex-start;
          padding: 0rem var(--padding-23xl);
          box-sizing: border-box;
          max-width: 100%;
          flex-shrink: 0;
          @media screen and (max-width: 768px) {
            padding: 0;
          }
        `}
      >
        <div
          className={css`
            width: 65.375rem;
            display: flex;
            flex-direction: row;
            align-items: flex-start;
            justify-content: flex-start;
            gap: var(--gap-13xl);
            max-width: 100%;
            @media screen and (max-width: 1050px) {
              flex-wrap: wrap;
            }
            @media screen and (max-width: 768px) {
              flex-direction: column;
              align-items: center;
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
              gap: var(--gap-xs);
              max-width: 100%;
              @media screen and (max-width: 750px) {
                min-width: 100%;
              }
            `}
          >
            <div
              className={css`
                align-self: stretch;
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                justify-content: flex-start;
                max-width: 100%;
              `}
            >
              <div
                className={css`
                  display: flex;
                  flex-direction: row;
                  align-items: flex-start;
                  justify-content: flex-start;
                  padding: 0rem var(--padding-lg) 0rem 0rem;
                  box-sizing: border-box;
                  max-width: 100%;
                `}
              >
                <div
                  className={css`
                    display: flex;
                    flex-direction: row;
                    align-items: flex-start;
                    justify-content: flex-start;
                    position: relative;
                    max-width: 100%;
                  `}
                >
                  <div
                    className={css`
                      width: 39.063rem;
                      position: relative;
                      line-height: 3.625rem;
                      font-weight: 500;
                      display: flex;
                      align-items: center;
                      flex-shrink: 0;
                      @media screen and (max-width: 1050px) {
                        font-size: var(--font-size-15xl);
                        line-height: 2.875rem;
                      }
                      @media screen and (max-width: 450px) {
                        font-size: var(--font-size-6xl);
                        line-height: 2.188rem;
                      }
                    `}
                  >{`Join the ActivityDAO Movement `}</div>
                  <img
                    className={css`
                      height: 5.581rem;
                      width: 5.581rem;
                      position: absolute;
                      margin: 0 !important;
                      top: -5.5rem;
                      right: -3.894rem;
                      object-fit: contain;
                    `}
                    loading="lazy"
                    alt=""
                    src="/-emoji-star-struck@2x.png"
                  />
                  <img
                    className={css`
                      height: 4.388rem;
                      width: 4.888rem;
                      position: absolute;
                      margin: 0 !important;
                      top: -3.812rem;
                      left: -3.812rem;
                      object-fit: contain;
                    `}
                    loading="lazy"
                    alt=""
                    src="/-emoji-sparkling-heart@2x.png"
                  />
                </div>
                <div
                  className={css`
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    justify-content: flex-start;
                    padding: var(--padding-10xl) 0rem 0rem;
                    margin-left: -4.5rem;
                  `}
                >
                  <img
                    className={css`
                      align-self: stretch;
                      height: 3rem;
                      position: relative;
                      max-width: 100%;
                      overflow: hidden;
                      flex-shrink: 0;
                    `}
                    alt=""
                    src="/-emoji-sparkles.svg"
                  />
                </div>
              </div>
              <div
                className={css`
                  align-self: stretch;
                  display: flex;
                  flex-direction: row;
                  align-items: flex-start;
                  justify-content: flex-start;
                  gap: var(--gap-82xl);
                  max-width: 100%;
                  margin-top: -0.375rem;
                  font-size: var(--font-size-mid-5);
                  color: var(--color-gray-100);
                  font-family: var(--font-alexandria);
                  @media screen and (max-width: 750px) {
                    flex-wrap: wrap;
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
                    padding: var(--padding-base) 0rem 0rem;
                    box-sizing: border-box;
                    min-width: 22.438rem;
                    min-height: 5.938rem;
                    max-width: 100%;
                    @media screen and (max-width: 750px) {
                      min-width: 100%;
                      min-height: auto;
                    }
                  `}
                >
                  <div
                    className={css`
                      position: relative;
                      line-height: 1.875rem;
                    `}
                  >
                    Proliferate the movement of doing dope things with dope
                    people anywhere in the world for every dope activity.
                  </div>
                </div>
                <img
                  className={css`
                    height: 3.713rem;
                    width: 4.125rem;
                    position: relative;
                  `}
                  alt=""
                  src="/-emoji-sparkles-1.svg"
                />
              </div>
            </div>
            <div
              className={css`
                width: 39.063rem;
                display: flex;
                flex-direction: row;
                align-items: flex-start;
                justify-content: flex-start;
                gap: var(--gap-6xl);
                max-width: 100%;
                @media screen and (max-width: 768px) {
                  width: 100%;
                  flex-direction: column;
                  align-items: center;
                }
              `}
            >

              <Button
                className={css`
                  height: 3rem;
                  width: 7.25rem;
                  @media screen and (max-width: 768px) {
                    width: 100%;
                    max-width: 300px;
                  }
                `}
                disableElevation
                variant="contained"
                sx={{
                  textTransform: "none",
                  color: "#fff",
                  fontSize: "13.5",
                  background: "#101010",
                  borderRadius: "30px",
                  "&:hover": { background: "#101010" },
                  width: 116,
                  height: 48,
                }}
                href="https://discord.gg/mmEv99x9QK"
                target="_blank"
                rel="noopener noreferrer"
              >
                Join
              </Button>
            </div>
          </div>
          <div
            className={css`
              height: 16.169rem;
              display: flex;
              flex-direction: column;
              align-items: flex-start;
              justify-content: flex-start;
              padding: var(--padding-7xs) 0rem 0rem;
              box-sizing: border-box;
              @media screen and (max-width: 1050px) {
                flex: 1;
              }
              @media screen and (max-width: 768px) {
                width: 100%;
                height: auto;
                max-width: 300px;
              }
            `}
          >
            <img
              className={css`
                align-self: stretch;
                flex: 1;
                position: relative;
                max-width: 100%;
                overflow: hidden;
                max-height: 100%;
                @media screen and (max-width: 1050px) {
                  align-self: stretch;
                  width: auto;
                }
                @media screen and (max-width: 768px) {
                  width: 100%;
                  height: auto;
                }
              `}
              loading="lazy"
              alt=""
              src="/-emoji-handshake.svg"
            />
          </div>
        </div>
      </div>
      <img
        className={css`
          width: 4.813rem;
          height: 4.813rem;
          position: relative;
        `}
        loading="lazy"
        alt=""
        src="/-emoji-slightly-smiling-face.svg"
      />
    </section>
  );
};

export default JoinActivityDAO;
