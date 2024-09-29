import type { NextPage } from "next";
import { type CSSProperties } from "react";
import { css } from "@emotion/css";
import Filter from "./filter";

export type BluntDAOType = {
  className?: string;
  image?: string;
  smokeDAO?: string;
  weMakeSureBluntsGetSmokedPro?: string;
  buttonText?: string;
  buttonText1?: string;
  propFlex?: string;
  propFlex1?: string;
  propPadding1?: string;
  propPadding2?: string;
  propBackgroundColor?: string;
  propBackgroundColor1?: string;
  propColor?: string;
  propColor1?: string;

  /** Style props */
  propPadding?: CSSProperties["padding"];
  propAlignSelf?: CSSProperties["alignSelf"];
};

const BluntDAO: NextPage<BluntDAOType> = ({
  className = "",
  propPadding,
  image,
  smokeDAO,
  propAlignSelf,
  weMakeSureBluntsGetSmokedPro,
  buttonText,
  buttonText1,
  propFlex,
  propFlex1,
  propPadding1,
  propPadding2,
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
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-start;
          padding: 0rem 0rem var(--padding-xs);
          gap: var(--gap-18xl);
          @media screen and (max-width: 450px) {
            gap: var(--gap-lg);
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
            gap: var(--gap-smi);
          `}
        >
          <div
            className={css`
              align-self: stretch;
              display: flex;
              flex-direction: row;
              align-items: center;
              justify-content: center;
              @media screen and (max-width: 450px) {
                gap: var(--gap-58xl);
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
                padding: 0rem var(--padding-109xl) 0rem 0rem;
                gap: var(--gap-7xs);
                @media screen and (max-width: 450px) {
                  padding-right: var(--padding-xl);
                  box-sizing: border-box;
                }
                padding: ${propPadding};
              `}
            >
              <img
                className={css`
                  width: 4.563rem;
                  height: 4.563rem;
                  position: relative;
                  border-radius: var(--radius-full);
                  object-fit: cover;
                `}
                alt=""
                src={image}
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
                  align-self: ${propAlignSelf};
                `}
              >
                {smokeDAO}
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
              propPadding={propPadding1}
              propBackgroundColor={propBackgroundColor}
              flowerLotus="/treepalm.svg"
              buttonText={buttonText}
              propColor={propColor}
            />
            <Filter
              propFlex={propFlex1}
              propPadding={propPadding2}
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
            align-items: center;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-line-clamp: 4;
            -webkit-box-orient: vertical;
          `}
        >
          {weMakeSureBluntsGetSmokedPro}
        </div>
      </div>
    </div>
  );
};

export default BluntDAO;
