import type { NextPage } from "next";
import { css } from "@emotion/css";

export type Button1Type = {
  className?: string;
};

const Button1: NextPage<Button1Type> = ({ className = "" }) => {
  return (
    <div
      className={[
        css`
          flex: 1;
          box-shadow: 0px 0px 0px 0.85px rgba(17, 24, 28, 0.08),
            0px 0.8px 1.7px -0.85px rgba(17, 24, 28, 0.08),
            0px 1.7px 3.4px rgba(17, 24, 28, 0.04);
          border-radius: var(--br-sm);
          background-color: var(--background-default-default);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          justify-content: flex-start;
          padding: var(--padding-lg) var(--padding-xl) var(--padding-xl)
            var(--padding-base);
          box-sizing: border-box;
          gap: var(--gap-base);
          min-width: 18rem; // Reduced from 20.25rem
          min-height: 26rem; // Reduced from 30.063rem
          max-width: 100%;
          text-align: center;
          font-size: var(--font-size-45xl); // Reduced from 59xl-3
          color: var(--color-darkslateblue-200);
          font-family: var(--font-aclonica);
          @media screen and (max-width: 1050px) {
            min-height: auto;
          }
        `,
        className,
      ].join(" ")}
    > button123
      <div
        className={css`
          align-self: stretch;
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          justify-content: flex-end;
          padding: 0rem var(--padding-11xl) 0rem 0rem;
          box-sizing: border-box;
          max-width: 100%;
        `}
      >
        <div
          className={css`
            width: 24.988rem;
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            justify-content: flex-start;
            padding: 0rem 0rem 0rem var(--padding-12xs);
            box-sizing: border-box;
            gap: var(--gap-3xs);
            max-width: 100%;
          `}
        >

          <div
            className={css`
              height: 12.206rem;
              display: flex;
              flex-direction: row;
              align-items: flex-start;
              justify-content: flex-end;
              padding: 0rem var(--padding-base);
              box-sizing: border-box;
              max-width: 100%;
              text-align: left;
              font-size: var(--font-size-55xl-9);
              color: var(--wwwgetminjiapp-black);
              font-family: var(--font-inter);
            `}
          >
            <div
              className={css`
                align-self: stretch;
                flex: 1;
                display: flex;
                flex-direction: column;
                align-items: flex-end;
                justify-content: flex-start;
                gap: var(--gap-7xs-3);
              `}
            >
              <div
                className={css`
                  align-self: stretch;
                  flex: 1;
                  display: flex;
                  flex-direction: row;
                  align-items: flex-start;
                  justify-content: flex-start;
                  padding: 0rem var(--padding-70xl) var(--padding-25xl-2)
                    var(--padding-76xl);
                  position: relative;
                `}
              >
                <div
                  className={css`
                    align-self: stretch;
                    flex: 1;
                    box-shadow: 0px 3.4px 3.4px rgba(0, 0, 0, 0.16) inset,
                      0px 0px 0px 0.85px rgba(17, 24, 28, 0.08),
                      0px 0.8px 1.7px -0.85px rgba(17, 24, 28, 0.08),
                      0px 1.7px 3.4px rgba(17, 24, 28, 0.04);
                    border-radius: var(--br-6xl-4);
                    background-color: var(--color-lavenderblush);
                    border: 0.8px solid var(--color-hotpink);
                    display: flex;
                    flex-direction: row;
                    align-items: flex-start;
                    justify-content: flex-start;
                    padding: var(--padding-lgi) var(--padding-lg)
                      var(--padding-lgi) var(--padding-xl);
                    z-index: 1;
                  `}
                >
                  <div
                    className={css`
                      flex: 1;
                      position: relative;
                      line-height: 100%;
                      @media screen and (max-width: 1050px) {
                        font-size: var(--font-size-41xl);
                        line-height: 3.75rem;
                      }
                      @media screen and (max-width: 450px) {
                        font-size: var(--font-size-26xl);
                        line-height: 2.813rem;
                      }
                    `}
                  >
                    🤼
                  </div>
                </div>
                <div
                  className={css`
                    height: 100%;
                    width: 100%;
                    position: absolute;
                    margin: 0 !important;
                    top: 0rem;
                    right: 0rem;
                    bottom: 0rem;
                    left: 0rem;
                  `}
                >
                  <img
                    className={css`
                      position: absolute;
                      top: 0rem;
                      left: 10.788rem;
                      border-radius: var(--br-sm-5);
                      width: 8.025rem;
                      height: 8.025rem;
                      object-fit: contain;
                    `}
                    loading="lazy"
                    alt=""
                    src="/button@2x.png"
                  />
                  <img
                    className={css`
                      position: absolute;
                      top: 0.319rem;
                      left: 0rem;
                      border-radius: var(--br-6xl-4);
                      width: 8.025rem;
                      height: 8.025rem;
                      object-fit: contain;
                    `}
                    alt=""
                    src="/switch-2@2x.png"
                  />
                  <img
                    className={css`
                      position: absolute;
                      top: 4rem;
                      left: 6.506rem;
                      width: 6.063rem;
                      height: 6rem;
                      object-fit: cover;
                      z-index: 2;
                    `}
                    alt=""
                    src="/image-2@2x.png"
                  />
                </div>
              </div>
              <div
                className={css`
                  align-self: stretch;
                  display: flex;
                  flex-direction: row;
                  align-items: flex-start;
                  justify-content: flex-end;
                  padding: 0rem var(--padding-xs) 0rem var(--padding-mini);
                  text-align: center;
                  font-size: var(--font-size-13xl);
                  color: var(--color-darkslateblue-100);
                  font-family: var(--font-dynapuff);
                `}
              >
                <h1
                  className={css`
                    margin: 0;
                    flex: 1;
                    position: relative;
                    font-size: inherit;
                    line-height: 1.825rem;
                    font-weight: 600;
                    font-family: inherit;
                    @media screen and (max-width: 1050px) {
                      font-size: var(--font-size-7xl);
                      line-height: 1.438rem;
                    }
                    @media screen and (max-width: 450px) {
                      font-size: var(--font-size-lgi);
                      line-height: 1.125rem;
                    }
                  `}
                >
                  Find An Event IRL
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <img
        className={css`
          width: 11.625rem;
          height: 11.625rem;
          position: relative;
          object-fit: cover;
          display: none;
        `}
        alt=""
        src="/image2@2x.png"
      />
      <div
        className={css`
          width: 24.6rem;
          position: relative;
          font-size: var(--font-size-base-9);
          font-family: var(--font-alexandria);
          color: var(--color-slategray-100);
          display: flex;
          align-items: center;
          justify-content: center;
          max-width: 100%;
        `}
      >
        Engage in diverse and exciting experiences. Whether it's sports, arts,
        or something entirely new, immerse yourself in activities that foster
        meaningful connections and personal growth.
      </div>
    </div>
  );
};

export default Button1;
