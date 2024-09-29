import type { NextPage } from "next";
import { type CSSProperties } from "react";
import { css } from "@emotion/css";
import Filter from "./filter";

export type ActivityRowType = {
  className?: string;
  freepikExportojB?: string;
  treeGens?: string;
  gamifyReforestationWithTokenized?: string;
  buttonText?: string;
  buttonText1?: string;
  propFlex?: string;
  propFlex1?: string;
  propPadding2?: string;
  propPadding3?: string;
  propBackgroundColor?: string;
  propBackgroundColor1?: string;
  propColor?: string;
  propColor1?: string;

  /** Style props */
  propPadding?: CSSProperties["padding"];
  propPadding1?: CSSProperties["padding"];
  propGap?: CSSProperties["gap"];
  propWidth?: CSSProperties["width"];
};

const ActivityRow: NextPage<ActivityRowType> = ({
  className = "",
  propPadding,
  propPadding1,
  propGap,
  freepikExportojB,
  propWidth,
  treeGens,
  gamifyReforestationWithTokenized,
  buttonText,
  buttonText1,
  propFlex,
  propFlex1,
  propPadding2,
  propPadding3,
  propBackgroundColor,
  propBackgroundColor1,
  propColor,
  propColor1,
}) => {
  return (
    <div
      className={[
        css`
          width: 22.938rem;
          box-shadow: 0px 0px 0px 0.85px rgba(17, 24, 28, 0.08),
            0px 0.8px 1.7px -0.85px rgba(17, 24, 28, 0.08),
            0px 1.7px 3.4px rgba(17, 24, 28, 0.04);
          border-radius: var(--br-sm);
          background-color: var(--background-default-default);
          overflow: hidden;
          flex-shrink: 0;
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          justify-content: flex-start;
          padding: var(--padding-11xl) var(--padding-7xl);
          box-sizing: border-box;
          max-width: 100%;
          text-align: center;
          font-size: var(--font-size-13xl);
          color: var(--wwwgetminjiapp-black);
          font-family: var(--font-dynapuff);
          @media screen and (max-width: 450px) {
            padding-top: var(--padding-xl);
            padding-bottom: var(--padding-xl);
            box-sizing: border-box;
          }
        `,
        className,
      ].join(" ")}
    >
      <div
        className={css`
          align-self: stretch;
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-start;
          padding: 0rem 0rem var(--padding-base);
          gap: var(--gap-18xl);
          @media screen and (max-width: 450px) {
            gap: var(--gap-lg);
          }
          padding: ${propPadding};
        `}
      >
        <div
          className={css`
            align-self: stretch;
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: flex-start;
            gap: var(--gap-smi);
          `}
        >
          <div
            className={css`
              align-self: stretch;
              flex: 1;
              display: flex;
              flex-direction: row;
              align-items: flex-start;
              justify-content: center;
              @media screen and (max-width: 450px) {
                gap: var(--gap-58xl);
              }
            `}
          >
            <div
              className={css`align-self: stretch;
flex: 1;
display: flex;
flex-direction: column;
align-items: flex-start;
justify-content: flex-start;
padding: 0rem var(--padding-135xl) 0rem 0rem;
@media screen and (max-width: 450px) {
padding-right: var(--padding-xl);
box-sizing: border-box;

}
padding: ${propPadding1}
gap: ${propGap}
`}
            >
              <img
                className={css`
                  width: 6.313rem;
                  flex: 1;
                  position: relative;
                  max-height: 100%;
                  object-fit: cover;
                  width: ${propWidth};
                `}
                loading="lazy"
                alt=""
                src={freepikExportojB}
              />
              <h1
                className={css`
                  margin: 0;
                  align-self: stretch;
                  position: relative;
                  font-size: inherit;
                  line-height: 2.738rem;
                  font-weight: 500;
                  font-family: inherit;
                  @media screen and (max-width: 1050px) {
                    font-size: var(--font-size-7xl);
                    line-height: 2.188rem;
                  }
                  @media screen and (max-width: 450px) {
                    font-size: var(--font-size-lgi);
                    line-height: 1.625rem;
                  }
                `}
              >
                {treeGens}
              </h1>
            </div>
          </div>
          <div
            className={css`
              width: 16.938rem;
              display: flex;
              flex-direction: row;
              align-items: flex-start;
              justify-content: flex-start;
              gap: var(--gap-7xs);
              font-size: var(--display-1-medium-size);
              color: var(--color-royalblue-100);
              font-family: var(--font-alexandria);
            `}
          >
            <div
              className={css`
                flex: 0.8409;
                border-radius: var(--badges-pill);
                background-color: var(--color-aliceblue-200);
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                padding: var(--padding-9xs) var(--padding-6xs)
                  var(--padding-8xs);
                gap: var(--gap-9xs);
              `}
            >
              <img
                className={css`
                  height: 0.75rem;
                  width: 0.75rem;
                  position: relative;
                `}
                loading="lazy"
                alt=""
                src="/paintbrush.svg"
              />
              <div
                className={css`
                  flex: 1;
                  position: relative;
                  line-height: 130%;
                  display: inline-block;
                  min-width: 3.625rem;
                `}
              >
                Creativity
              </div>
            </div>
            <Filter
              propFlex={propFlex}
              propPadding={propPadding2}
              propBackgroundColor={propBackgroundColor}
              flowerLotus="/treepalm.svg"
              buttonText={buttonText}
              propColor={propColor}
            />
            <Filter
              propFlex={propFlex1}
              propPadding={propPadding3}
              propBackgroundColor={propBackgroundColor1}
              flowerLotus="/flowerlotus.svg"
              buttonText={buttonText1}
              propColor={propColor1}
            />
          </div>
        </div>
        <div
          className={css`
            position: relative;
            font-size: var(--font-size-base);
            line-height: 1.313rem;
            font-weight: 300;
            font-family: var(--font-alexandria);
            color: var(--text-default-tertiary);
            text-align: left;
            display: -webkit-inline-box;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-line-clamp: 4;
            -webkit-box-orient: vertical;
          `}
        >
          {gamifyReforestationWithTokenized}
        </div>
      </div>
    </div>
  );
};

export default ActivityRow;