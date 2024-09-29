import type { NextPage } from "next";
import { css } from "@emotion/css";

export type Button2Type = {
  className?: string;
};

const Button2: NextPage<Button2Type> = ({ className = "" }) => {
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
          align-items: flex-start;
          justify-content: flex-start;
          padding: var(--padding-mid) var(--padding-5xl) var(--padding-37xl-2);
          box-sizing: border-box;
          gap: var(--gap-lgi-5);
          min-width: 20.25rem;
          max-width: 100%;
          text-align: left;
          font-size: var(--font-size-55xl-9);
          color: var(--wwwgetminjiapp-black);
          font-family: var(--font-inter);
        `,
        className,
      ].join(" ")}
    >
      
      <div
        className={css`
          align-self: stretch;
          height: 12.5rem;
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          justify-content: flex-start;
          padding: 0rem var(--padding-57xl) 0rem var(--padding-55xl);
          box-sizing: border-box;
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
            gap: var(--gap-5xs-6);
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
              padding: 0rem var(--padding-70xl) var(--padding-27xl-6)
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
                background-color: var(--color-floralwhite);
                border: 0.8px solid var(--color-khaki);
                display: flex;
                flex-direction: row;
                align-items: flex-start;
                justify-content: flex-start;
                padding: var(--padding-lgi) var(--padding-lg) var(--padding-lgi)
                  var(--padding-xl);
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
                🕵
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
                  left: 10.781rem;
                  border-radius: var(--br-sm-5);
                  width: 8.025rem;
                  height: 8.025rem;
                  object-fit: contain;
                `}
                alt=""
                src="/switch-3@2x.png"
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
                src="/button-1@2x.png"
              />
              <img
                className={css`
                  position: absolute;
                  top: 5.606rem;
                  left: 7.675rem;
                  width: 3.744rem;
                  height: 4.544rem;
                  z-index: 2;
                `}
                alt=""
                src="/rating.svg"
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
              padding: 0rem var(--padding-12xs) 0rem var(--padding-9xs);
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
              Prove the Activity
            </h1>
          </div>
        </div>
      </div>
      <div
        className={css`
          align-self: stretch;
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          justify-content: flex-start;
          padding: 0rem var(--padding-10xl) 0rem var(--padding-9xl);
          box-sizing: border-box;
          min-height: 6.125rem;
          max-width: 100%;
          text-align: center;
          font-size: var(--font-size-base);
          color: var(--color-slategray-100);
          font-family: var(--font-alexandria);
        `}
      >
        <div
          className={css`
            flex: 1;
            position: relative;
            display: inline-block;
            max-width: 100%;
          `}
        >
          Explore our directory to discover activities that spark your
          curiosity. Connect with others who share your passions and start
          building a community around exciting ideas.
        </div>
      </div>
    </div>
  );
};

export default Button2;
