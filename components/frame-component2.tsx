import type { NextPage } from "next";
import { css } from "@emotion/css";
import Component1 from "./component1";
export type FrameComponent2Type = {
  className?: string;
};

const FrameComponent2: NextPage<FrameComponent2Type> = ({ className = "" }) => {
  return (
    <div
      id="model"
      className={[
        css`
          align-self: stretch;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          padding: 0rem var(--padding-12xs) var(--padding-55xl) 0rem;
          box-sizing: border-box;
          gap: var(--gap-31xl);
          max-width: 100%;
          text-align: center;
          font-size: var(--font-size-21xl);
          color: var(--wwwgetminjiapp-black);
          font-family: var(--font-dynapuff);
        `,
        className,
      ].join(" ")}
    >
      <div
        className={css`
          display: flex;
          justify-content: center;
          margin-bottom: var(--gap-3xs); // Change this to match the gap between heading and subtitle
        `}
      >
        <Component1 developmentIcon="ACTIVITY DAO MODEL" />
      </div>

      <div
        className={css`
          align-self: stretch;
          display: flex;
          flex-direction: column;
          align-items: center; // Change this to center
          justify-content: flex-start;
          gap: var(--gap-3xs);
          max-width: 100%;
        `}
      >
        <h1
          className={css`
            margin: 0;
            position: relative;
            font-size: inherit;
            line-height: 3.844rem;
            font-weight: 600;
            font-family: inherit;
            max-width: 80%; // Add this to limit the width of the heading
            @media screen and (max-width: 1050px) {
              font-size: var(--font-size-13xl);
              line-height: 3.063rem;
            }
            @media screen and (max-width: 450px) {
              font-size: var(--font-size-5xl);
              line-height: 2.313rem;
            }
          `}
        >
          Powering Community-Driven Growth
        </h1>
        <div
          className={css`
            align-self: stretch;
            display: flex;
            flex-direction: row;
            align-items: flex-start;
            justify-content: center; // Change this to center
            padding: 0rem var(--padding-100xl);
            box-sizing: border-box;
            max-width: 100%;
            font-size: var(--font-size-5xl);
            font-family: var(--font-hanken-grotesk);
          `}
        >
          <h3
            className={css`
              margin: 0;
              flex: 1;
              position: relative;
              font-size: inherit;
              line-height: 2.469rem;
              font-weight: 400;
              font-family: inherit;
              display: inline-block;
              max-width: 80%; // Add this to limit the width of the subtitle
              text-align: center; // Add this to center the text
              @media screen and (max-width: 450px) {
                font-size: var(--font-size-lgi);
                line-height: 2rem;
              }
            `}
          >
            Our ecosystem thrives on member engagement, validation of
            activities, and collaborative funding, creating a self-sustaining
            cycle of growth and innovation.
          </h3>
        </div>
      </div>
      <div
        className={css`
          align-self: stretch;
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          justify-content: flex-start;
          flex-wrap: wrap;
          align-content: flex-start;
          gap: var(--gap-xl);
          max-width: 100%;
          text-align: left;
          font-size: var(--font-size-13xl);
        `}
      >
        <div
          className={css`
            flex: 1;
            box-shadow: 0px 0px 0px 0.61px rgba(17, 24, 28, 0.08),
              0px 0.6px 1.2px -0.61px rgba(17, 24, 28, 0.08),
              0px 1.2px 2.4px rgba(17, 24, 28, 0.04);
            border-radius: var(--br-4xl-1);
            background-color: var(--background-default-default);
            overflow: hidden;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: flex-start;
            padding: var(--padding-13xl) var(--padding-34xl) var(--padding-77xl);
            box-sizing: border-box;
            gap: var(--gap-45xl);
            min-width: 23.938rem;
            max-width: 100%;
            @media screen and (max-width: 450px) {
              min-width: 100%;
            }
          `}
        >
          <div
            className={css`
              align-self: stretch;
              display: flex;
              flex-direction: column;
              align-items: center; // Change this from flex-start to center
              justify-content: flex-start;
              gap: var(--gap-mid);
              text-align: center; // Add this line to center the text
            `}
          >
            <h1
              className={css`
                margin: 0;
                // Remove align-self: stretch;
                position: relative;
                font-size: inherit;
                line-height: 100%;
                font-weight: 400;
                font-family: inherit;
                max-width: 80%; // Add this line to limit the width of the heading
                @media screen and (max-width: 1050px) {
                  font-size: var(--font-size-7xl);
                  line-height: 1.625rem;
                }
                @media screen and (max-width: 450px) {
                  font-size: var(--font-size-lgi);
                  line-height: 1.188rem;
                }
              `}
            >
              Activity DAO Model
            </h1>
            <div
              className={css`
                height: 2.125rem;
                position: relative;
                font-size: var(--ui-small-strong-size);
                font-family: var(--font-alexandria);
                color: var(--text-default-tertiary);
                display: inline-block;
                flex-shrink: 0;
              `}
            >
              Harnessing the power of community participation, validation, and
              funding to drive sustainable growth and innovation.
            </div>
          </div>
 <img src="/ActivityDAOModelGraphic.png" alt="Activity DAO Model" />
        </div>
        <div
          className={css`
            flex: 1;
            box-shadow: 0px 0px 0px 0.61px rgba(17, 24, 28, 0.08),
              0px 0.6px 1.2px -0.61px rgba(17, 24, 28, 0.08),
              0px 1.2px 2.4px rgba(17, 24, 28, 0.04);
            border-radius: var(--br-4xl-1);
            background-color: var(--background-default-default);
            overflow: hidden;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: flex-start;
            padding: var(--padding-13xl) var(--padding-34xl)
              var(--padding-69xl-1);
            box-sizing: border-box;
            gap: var(--gap-11xl);
            min-width: 23.938rem;
            max-width: 100%;
            @media screen and (max-width: 450px) {
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
              gap: var(--gap-mid);
            `}
          >
            <h1
              className={css`
                margin: 0;
                // Remove align-self: stretch;
                position: relative;
                font-size: inherit;
                line-height: 100%;
                font-weight: 400;
                font-family: inherit;
                max-width: 80%; // Add this line to limit the width of the heading
                @media screen and (max-width: 1050px) {
                  font-size: var(--font-size-7xl);
                  line-height: 1.625rem;
                }
                @media screen and (max-width: 450px) {
                  font-size: var(--font-size-lgi);
                  line-height: 1.188rem;
                }
              `}
            >
              Activity DAO flywheel
            </h1>
            <div
              className={css`
                height: 2.125rem;
                position: relative;
                font-size: var(--ui-small-strong-size);
                font-family: var(--font-alexandria);
                color: var(--text-default-tertiary);
                display: inline-block;
                flex-shrink: 0;
              `}
            >
              A self-reinforcing cycle where engagement fuels activity,
              validation attracts more participants, and funding enables
              continuous growth.
            </div>
          </div>
          <img src="/ActivityDAOFlywheelGraphic.png" alt="Activity DAO Flywheel" />

        </div>
      </div>
    </div>
  );
};

export default FrameComponent2;
