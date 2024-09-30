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
          <div
            className={css`
              align-self: stretch;
              display: flex;
              flex-direction: row;
              align-items: flex-start;
              justify-content: flex-start;
              padding: 0rem var(--padding-8xs) 0rem var(--padding-9xs);
              box-sizing: border-box;
              max-width: 100%;
              font-size: var(--font-size-7xl-1);
              font-family: var(--font-inter);
            `}
          >
            <div
              className={css`
                flex: 1;
                display: flex;
                flex-direction: row;
                align-items: flex-start;
                justify-content: flex-start;
                gap: var(--gap-2xl-8);
                max-width: 100%;
                @media screen and (max-width: 750px) {
                  flex-wrap: wrap;
                }
              `}
            >
              <div
                className={css`
                  display: flex;
                  flex-direction: column;
                  align-items: flex-end;
                  justify-content: flex-start;
                  gap: var(--gap-11xs-7);
                  @media screen and (max-width: 750px) {
                    flex: 1;
                  }
                `}
              >
                <div
                  className={css`
                    align-self: stretch;
                    box-shadow: 0px 0px 0px 0.49px rgba(17, 24, 28, 0.08),
                      0px 0.5px 1px -0.49px rgba(17, 24, 28, 0.08),
                      0px 1px 1.9px rgba(17, 24, 28, 0.04);
                    border-radius: var(--br-4xs-1);
                    background-color: var(--background-default-default);
                    border: 0.6px solid var(--color-limegreen-200);
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    justify-content: flex-start;
                    padding: var(--padding-smi) var(--padding-2xl)
                      var(--padding-6xl) var(--padding-6xl);
                    gap: var(--gap-6xs-9);
                  `}
                >
                  <div
                    className={css`
                      display: flex;
                      flex-direction: row;
                      align-items: flex-start;
                      justify-content: flex-start;
                      padding: 0rem var(--padding-7xl) 0rem var(--padding-xl);
                    `}
                  >
                    <div
                      className={css`
                        height: 3.525rem;
                        width: 3.525rem;
                        box-shadow: 0px 0px 0px 0.49px rgba(17, 24, 28, 0.08),
                          0px 0.5px 1px -0.49px rgba(17, 24, 28, 0.08),
                          0px 1px 1.9px rgba(17, 24, 28, 0.04);
                        border-radius: var(--br-5737xl-4);
                        background-color: var(--color-honeydew);
                        overflow: hidden;
                        flex-shrink: 0;
                        display: flex;
                        flex-direction: row;
                        align-items: flex-start;
                        justify-content: flex-start;
                        padding: var(--padding-mini-9) var(--padding-smi)
                          var(--padding-base-5) var(--padding-mini);
                        box-sizing: border-box;
                      `}
                    >
                      <div
                        className={css`
                          height: 3.525rem;
                          width: 3.525rem;
                          position: relative;
                          border-radius: 50%;
                          background-color: var(--border-default-default);
                          display: none;
                        `}
                      />
                      <div
                        className={css`
                          flex: 1;
                          position: relative;
                          line-height: 100%;
                          @media screen and (max-width: 450px) {
                            font-size: var(--font-size-2xl);
                            line-height: 1.313rem;
                          }
                        `}
                      >
                        🏋️
                      </div>
                    </div>
                  </div>
                  <div
                    className={css`
                      align-self: stretch;
                      position: relative;
                      font-size: var(--font-size-sm-8);
                      line-height: 100%;
                      font-family: var(--font-alexandria);
                      color: var(--color-limegreen-200);
                      text-align: center;
                    `}
                  >
                    Do the Activity
                  </div>
                </div>
                <div
                  className={css`
                    display: flex;
                    flex-direction: row;
                    align-items: flex-start;
                    justify-content: flex-end;
                    padding: 0rem var(--padding-20xl);
                    position: relative;
                  `}
                >
                  <img
                    className={css`
                      height: 5.863rem;
                      width: 2.519rem;
                      position: relative;
                    `}
                    alt=""
                    src="/slider-2.svg"
                  />
                  <img
                    className={css`
                      height: 0.038rem;
                      width: 2.175rem;
                      position: absolute;
                      margin: 0 !important;
                      top: 2.9rem;
                      right: -1.487rem;
                      z-index: 1;
                    `}
                    alt=""
                    src="/interested-label.svg"
                  />
                </div>
                <div
                  className={css`
                    align-self: stretch;
                    box-shadow: 0px 0px 0px 0.49px rgba(17, 24, 28, 0.08),
                      0px 0.5px 1px -0.49px rgba(17, 24, 28, 0.08),
                      0px 1px 1.9px rgba(17, 24, 28, 0.04);
                    border-radius: var(--br-4xs-1);
                    background-color: var(--background-default-default);
                    border: 0.6px solid var(--color-indigo);
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    justify-content: flex-start;
                    padding: var(--padding-smi) var(--padding-xs)
                      var(--padding-lg) var(--padding-sm);
                    gap: var(--gap-sm);
                  `}
                >
                  <div
                    className={css`
                      display: flex;
                      flex-direction: row;
                      align-items: flex-start;
                      justify-content: flex-start;
                      padding: 0rem var(--padding-17xl) 0rem var(--padding-12xl);
                    `}
                  >
                    <div
                      className={css`
                        height: 3.525rem;
                        width: 3.525rem;
                        box-shadow: 0px 0px 0px 0.49px rgba(17, 24, 28, 0.08),
                          0px 0.5px 1px -0.49px rgba(17, 24, 28, 0.08),
                          0px 1px 1.9px rgba(17, 24, 28, 0.04);
                        border-radius: var(--br-5737xl-4);
                        background-color: var(--color-thistle);
                        overflow: hidden;
                        flex-shrink: 0;
                        display: flex;
                        flex-direction: row;
                        align-items: flex-start;
                        justify-content: flex-start;
                        padding: var(--padding-mini) var(--padding-smi)
                          var(--padding-base-4) var(--padding-mini);
                        box-sizing: border-box;
                      `}
                    >
                      <div
                        className={css`
                          height: 3.525rem;
                          width: 3.525rem;
                          position: relative;
                          border-radius: 50%;
                          background-color: var(--border-default-default);
                          display: none;
                        `}
                      />
                      <div
                        className={css`
                          flex: 1;
                          position: relative;
                          line-height: 100%;
                          @media screen and (max-width: 450px) {
                            font-size: var(--font-size-2xl);
                            line-height: 1.313rem;
                          }
                        `}
                      >
                        🙋
                      </div>
                    </div>
                  </div>
                  <div
                    className={css`
                      align-self: stretch;
                      position: relative;
                      font-size: var(--font-size-sm-8);
                      line-height: 100%;
                      font-family: var(--font-alexandria);
                      color: var(--color-indigo);
                      text-align: center;
                    `}
                  >
                    Interested People
                  </div>
                </div>
              </div>
              <div
                className={css`
                  flex: 1;
                  display: flex;
                  flex-direction: row;
                  align-items: flex-start;
                  justify-content: flex-start;
                  min-width: 12.25rem;
                  row-gap: 20px;
                  text-align: center;
                  font-size: var(--font-size-sm-8);
                  font-family: var(--font-alexandria);
                  @media screen and (max-width: 450px) {
                    flex-wrap: wrap;
                  }
                `}
              >
                <div
                  className={css`
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    justify-content: flex-start;
                    padding: var(--padding-30xl-5) 0rem 0rem;
                    box-sizing: border-box;
                    min-width: 8.131rem;
                    @media screen and (max-width: 450px) {
                      flex: 1;
                    }
                  `}
                >
                  <div
                    className={css`
                      align-self: stretch;
                      display: flex;
                      flex-direction: column;
                      align-items: flex-end;
                      justify-content: flex-start;
                      gap: var(--gap-11xs-7);
                    `}
                  >
                    <div
                      className={css`
                        align-self: stretch;
                        display: flex;
                        flex-direction: row;
                        align-items: flex-start;
                        justify-content: flex-end;
                        padding: 0rem var(--padding-3xs) 0rem var(--padding-xs);
                      `}
                    >
                      <div
                        className={css`
                          height: 3.131rem;
                          flex: 1;
                          position: relative;
                        `}
                      >
                        <img
                          className={css`
                            position: absolute;
                            top: 0rem;
                            left: 0rem;
                            width: 100%;
                            height: 100%;
                          `}
                          loading="lazy"
                          alt=""
                          src="/rectangle-2.svg"
                        />
                        <div
                          className={css`
                            position: absolute;
                            top: 0.656rem;
                            left: 0.763rem;
                            line-height: 100%;
                            display: inline-block;
                            width: 5.25rem;
                            height: 0.875rem;
                            min-width: 5.25rem;
                            z-index: 1;
                          `}
                        >
                          🌟 Members
                        </div>
                      </div>
                    </div>
                    <div
                      className={css`
                        align-self: stretch;
                        height: 8.131rem;
                        position: relative;
                        text-align: left;
                        font-size: var(--font-size-56xl-2);
                        font-family: var(--font-inter);
                      `}
                    >
                      <div
                        className={css`
                          position: absolute;
                          top: 0rem;
                          left: 0rem;
                          border-radius: 50%;
                          background-color: var(--color-aliceblue-300);
                          width: 100%;
                          height: 100%;
                        `}
                      />
                      <div
                        className={css`
                          position: absolute;
                          top: 1.688rem;
                          left: 1.694rem;
                          line-height: 100%;
                          display: inline-block;
                          width: 4.813rem;
                          height: 4.688rem;
                          z-index: 1;
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
                        👨‍👨‍👦‍👦
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className={css`
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    align-items: flex-end;
                    justify-content: flex-start;
                    gap: var(--gap-11xs-7);
                    min-width: 7rem;
                    text-align: left;
                    font-size: var(--font-size-7xl-1);
                    font-family: var(--font-inter);
                  `}
                >
                  <div
                    className={css`
                      box-shadow: 0px 0px 0px 0.49px rgba(17, 24, 28, 0.08),
                        0px 0.5px 1px -0.49px rgba(17, 24, 28, 0.08),
                        0px 1px 1.9px rgba(17, 24, 28, 0.04);
                      border-radius: var(--br-4xs-1);
                      background-color: var(--background-default-default);
                      border: 0.6px solid var(--color-gold-100);
                      display: flex;
                      flex-direction: column;
                      align-items: flex-start;
                      justify-content: flex-start;
                      padding: var(--padding-smi) var(--padding-smi)
                        var(--padding-4xl) var(--padding-base);
                      gap: var(--gap-4xs-1);
                    `}
                  >
                    <div
                      className={css`
                        align-self: stretch;
                        display: flex;
                        flex-direction: row;
                        align-items: flex-start;
                        justify-content: flex-start;
                        padding: 0rem var(--padding-15xl) 0rem
                          var(--padding-10xl);
                      `}
                    >
                      <div
                        className={css`
                          height: 3.525rem;
                          flex: 1;
                          position: relative;
                        `}
                      >
                        <div
                          className={css`
                            position: absolute;
                            top: 0rem;
                            left: 0rem;
                            border-radius: 50%;
                            background-color: var(--color-cornsilk-300);
                            width: 100%;
                            height: 100%;
                          `}
                        />
                        <div
                          className={css`
                            position: absolute;
                            top: 0.95rem;
                            left: 0.519rem;
                            line-height: 100%;
                            z-index: 1;
                          `}
                        >
                          <span className={css``}>🕵</span>
                          <span
                            className={css`
                              font-size: var(--font-size-smi);
                            `}
                          >
                            ✅
                          </span>
                        </div>
                      </div>
                    </div>
                    <div
                      className={css`
                        align-self: stretch;
                        position: relative;
                        font-size: var(--font-size-sm-8);
                        line-height: 100%;
                        font-family: var(--font-alexandria);
                        text-align: center;
                        display: inline-block;
                        min-width: 7.5rem;
                      `}
                    >
                      Proof the Activity
                    </div>
                  </div>
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
                        display: flex;
                        flex-direction: row;
                        align-items: flex-start;
                        justify-content: flex-start;
                        gap: var(--gap-7xl-8);
                      `}
                    >
                      <div
                        className={css`
                          display: flex;
                          flex-direction: column;
                          align-items: flex-start;
                          justify-content: flex-start;
                          padding: var(--padding-27xl-4) 0rem 0rem;
                        `}
                      >
                        <img
                          className={css`
                            width: 2.175rem;
                            height: 0.038rem;
                            position: relative;
                            z-index: 1;
                          `}
                          alt=""
                          src="/funders.svg"
                        />
                      </div>
                      <img
                        className={css`
                          height: 5.863rem;
                          width: 2.519rem;
                          position: relative;
                          object-fit: contain;
                        `}
                        alt=""
                        src="/slider-3@2x.png"
                      />
                    </div>
                  </div>
                  <div
                    className={css`
                      box-shadow: 0px 0px 0px 0.49px rgba(17, 24, 28, 0.08),
                        0px 0.5px 1px -0.49px rgba(17, 24, 28, 0.08),
                        0px 1px 1.9px rgba(17, 24, 28, 0.04);
                      border-radius: var(--br-4xs-1);
                      background-color: var(--background-default-default);
                      border: 0.6px solid var(--color-red);
                      display: flex;
                      flex-direction: column;
                      align-items: flex-start;
                      justify-content: flex-start;
                      padding: var(--padding-smi) var(--padding-smi)
                        var(--padding-6xl) var(--padding-mid);
                      gap: var(--gap-6xs);
                    `}
                  >
                    <div
                      className={css`
                        display: flex;
                        flex-direction: row;
                        align-items: flex-start;
                        justify-content: flex-start;
                        padding: 0rem var(--padding-14xl) 0rem
                          var(--padding-9xl);
                      `}
                    >
                      <div
                        className={css`
                          height: 3.525rem;
                          width: 3.525rem;
                          box-shadow: 0px 0px 0px 0.49px rgba(17, 24, 28, 0.08),
                            0px 0.5px 1px -0.49px rgba(17, 24, 28, 0.08),
                            0px 1px 1.9px rgba(17, 24, 28, 0.04);
                          border-radius: var(--br-5737xl-4);
                          background-color: var(--color-mistyrose);
                          overflow: hidden;
                          flex-shrink: 0;
                          display: flex;
                          flex-direction: row;
                          align-items: flex-start;
                          justify-content: flex-start;
                          padding: var(--padding-mini) var(--padding-smi)
                            var(--padding-base-4) var(--padding-mini);
                          box-sizing: border-box;
                        `}
                      >
                        <div
                          className={css`
                            height: 3.525rem;
                            width: 3.525rem;
                            position: relative;
                            border-radius: 50%;
                            background-color: var(--border-default-default);
                            display: none;
                          `}
                        />
                        <div
                          className={css`
                            flex: 1;
                            position: relative;
                            line-height: 100%;
                            @media screen and (max-width: 450px) {
                              font-size: var(--font-size-2xl);
                              line-height: 1.313rem;
                            }
                          `}
                        >
                          💰
                        </div>
                      </div>
                    </div>
                    <div
                      className={css`
                        align-self: stretch;
                        position: relative;
                        font-size: var(--font-size-sm-8);
                        line-height: 100%;
                        font-family: var(--font-alexandria);
                        color: var(--color-red);
                        text-align: center;
                        display: inline-block;
                        min-width: 7.438rem;
                      `}
                    >
                      Fund the Activity
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
          <div
            className={css`
              align-self: stretch;
              display: flex;
              flex-direction: row;
              align-items: flex-start;
              justify-content: flex-start;
              padding: 0rem var(--padding-8xs) 0rem var(--padding-9xs);
              box-sizing: border-box;
              max-width: 100%;
              text-align: center;
              font-size: var(--font-size-5xs-9);
              color: var(--color-royalblue-100);
              font-family: var(--font-alexandria);
            `}
          >
            <div
              className={css`
                flex: 1;
                display: flex;
                flex-direction: row;
                align-items: flex-end;
                justify-content: flex-start;
                gap: var(--gap-2xl-8);
                max-width: 100%;
                @media screen and (max-width: 750px) {
                  flex-wrap: wrap;
                }
              `}
            >
              <div
                className={css`
                  display: flex;
                  flex-direction: column;
                  align-items: flex-start;
                  justify-content: flex-start;
                  gap: var(--gap-lg);
                  @media screen and (max-width: 750px) {
                    flex: 1;
                  }
                `}
              >
                <div
                  className={css`
                    align-self: stretch;
                    display: flex;
                    flex-direction: row;
                    align-items: flex-start;
                    justify-content: flex-start;
                    padding: 0rem var(--padding-smi) 0rem var(--padding-3xs);
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
                      gap: var(--gap-7xs);
                      @media screen and (max-width: 750px) {
                        flex: 1;
                      }
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
                        padding: 0rem var(--padding-3xs);
                      `}
                    >
                      <button
                        className={css`
                          cursor: pointer;
                          border: 0.7px solid var(--color-deepskyblue);
                          padding: var(--padding-3xs) var(--padding-9xs)
                            var(--padding-3xs) var(--padding-7xs);
                          background-color: var(--color-azure);
                          align-self: stretch;
                          flex: 1;
                          border-radius: var(--br-lgi-6);
                          display: flex;
                          flex-direction: row;
                          align-items: flex-start;
                          justify-content: flex-start;
                        `}
                      >
                        <div
                          className={css`
                            flex: 1;
                            position: relative;
                            font-size: var(--font-size-5xs-9);
                            line-height: 100%;
                            font-family: var(--font-alexandria);
                            color: var(--color-deepskyblue);
                            text-align: center;
                          `}
                        >
                          Allow Members
                        </div>
                        <div
                          className={css`
                            height: 0.813rem;
                            width: 3.538rem;
                            border-radius: var(--br-xl);
                            border: 0.5px solid var(--wwwgetminjiapp-black);
                            box-sizing: border-box;
                            display: none;
                            flex-direction: row;
                            align-items: center;
                            justify-content: center;
                            padding: var(--padding-11xs-5) var(--padding-12xs);
                          `}
                        >
                          <div
                            className={css`
                              position: relative;
                              font-size: var(--font-size-6xs-5);
                              line-height: 100%;
                              font-family: var(--font-alexandria);
                              color: var(--wwwgetminjiapp-black);
                              text-align: left;
                            `}
                          >
                            REPUTATION
                          </div>
                        </div>
                      </button>
                    </div>
                    <div
                      className={css`
                        align-self: stretch;
                        flex: 0.2867;
                        border-radius: var(--br-lgi-6);
                        background-color: var(--color-aliceblue-100);
                        border: 0.7px solid var(--color-royalblue-100);
                        display: flex;
                        flex-direction: row;
                        align-items: flex-start;
                        justify-content: flex-start;
                        padding: var(--padding-3xs) var(--padding-9xs)
                          var(--padding-3xs) var(--padding-7xs);
                        z-index: 2;
                      `}
                    >
                      <div
                        className={css`
                          flex: 1;
                          position: relative;
                          line-height: 100%;
                        `}
                      >
                        New Members Organizing to
                      </div>
                      <div
                        className={css`
                          height: 0.813rem;
                          width: 3.538rem;
                          border-radius: var(--br-xl);
                          border: 0.5px solid var(--wwwgetminjiapp-black);
                          box-sizing: border-box;
                          display: none;
                          flex-direction: row;
                          align-items: center;
                          justify-content: center;
                          padding: var(--padding-11xs-5) var(--padding-12xs);
                          text-align: left;
                          font-size: var(--font-size-6xs-5);
                          color: var(--wwwgetminjiapp-black);
                        `}
                      >
                        <div
                          className={css`
                            position: relative;
                            line-height: 100%;
                          `}
                        >
                          REPUTATION
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className={css`
                    align-self: stretch;
                    box-shadow: 0px 0px 0px 0.49px rgba(17, 24, 28, 0.08),
                      0px 0.5px 1px -0.49px rgba(17, 24, 28, 0.08),
                      0px 1px 1.9px rgba(17, 24, 28, 0.04);
                    border-radius: var(--br-4xs-1);
                    background-color: var(--background-default-default);
                    border: 0.6px solid var(--color-indigo);
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    justify-content: flex-start;
                    padding: var(--padding-smi) var(--padding-xs)
                      var(--padding-6xl) var(--padding-sm);
                    gap: var(--gap-6xs-9);
                    z-index: 2;
                    text-align: left;
                    font-size: var(--font-size-7xl-1);
                    color: var(--wwwgetminjiapp-black);
                    font-family: var(--font-inter);
                  `}
                >
                  <div
                    className={css`
                      align-self: stretch;
                      display: flex;
                      flex-direction: row;
                      align-items: flex-start;
                      justify-content: flex-start;
                      padding: 0rem var(--padding-17xl) 0rem var(--padding-12xl);
                    `}
                  >
                    <div
                      className={css`
                        flex: 1;
                        box-shadow: 0px 0px 0px 0.49px rgba(17, 24, 28, 0.08),
                          0px 0.5px 1px -0.49px rgba(17, 24, 28, 0.08),
                          0px 1px 1.9px rgba(17, 24, 28, 0.04);
                        border-radius: var(--br-5737xl-4);
                        background-color: var(--color-thistle);
                        overflow: hidden;
                        display: flex;
                        flex-direction: row;
                        align-items: flex-start;
                        justify-content: flex-start;
                        padding: var(--padding-mini) var(--padding-smi)
                          var(--padding-base-4) var(--padding-mini);
                      `}
                    >
                      <div
                        className={css`
                          height: 3.525rem;
                          width: 3.525rem;
                          position: relative;
                          border-radius: 50%;
                          background-color: var(--border-default-default);
                          display: none;
                        `}
                      />
                      <div
                        className={css`
                          flex: 1;
                          position: relative;
                          line-height: 100%;
                          @media screen and (max-width: 450px) {
                            font-size: var(--font-size-2xl);
                            line-height: 1.313rem;
                          }
                        `}
                      >
                        🙋
                      </div>
                    </div>
                  </div>
                  <div
                    className={css`
                      align-self: stretch;
                      position: relative;
                      font-size: var(--font-size-sm-8);
                      line-height: 100%;
                      font-family: var(--font-alexandria);
                      color: var(--color-indigo);
                      text-align: center;
                      display: inline-block;
                      min-width: 7.688rem;
                    `}
                  >
                    Interested People
                  </div>
                </div>
              </div>
              <div
                className={css`
                  flex: 1;
                  display: flex;
                  flex-direction: row;
                  align-items: flex-start;
                  justify-content: flex-start;
                  min-width: 12.25rem;
                  row-gap: 20px;
                  text-align: left;
                  font-size: var(--font-size-39xl);
                  color: var(--wwwgetminjiapp-black);
                  font-family: var(--font-inter);
                  @media screen and (max-width: 450px) {
                    flex-wrap: wrap;
                  }
                `}
              >
                <div
                  className={css`
                    display: flex;
                    flex-direction: column;
                    align-items: flex-end;
                    justify-content: flex-start;
                    gap: var(--gap-11xs-9);
                    @media screen and (max-width: 450px) {
                      flex: 1;
                    }
                  `}
                >
                  <div
                    className={css`
                      align-self: stretch;
                      height: 8.131rem;
                      position: relative;
                    `}
                  >
                    <div
                      className={css`
                        position: absolute;
                        top: 0rem;
                        left: 0rem;
                        border-radius: 50%;
                        background-color: var(--color-cornsilk-200);
                        width: 100%;
                        height: 100%;
                        z-index: 1;
                      `}
                    />
                    <div
                      className={css`
                        position: absolute;
                        top: 2.231rem;
                        left: 1.519rem;
                        line-height: 100%;
                        z-index: 2;
                        @media screen and (max-width: 450px) {
                          font-size: var(--font-size-4xl);
                          line-height: 2.875rem;
                        }
                      `}
                    >
                      <span className={css``}>🕵</span>
                      <span
                        className={css`
                          font-size: var(--font-size-10xl);
                        `}
                      >
                        ✅
                      </span>
                    </div>
                  </div>
                  <div
                    className={css`
                      align-self: stretch;
                      display: flex;
                      flex-direction: row;
                      align-items: flex-start;
                      justify-content: flex-end;
                      padding: 0rem var(--padding-3xs) 0rem var(--padding-xs);
                      text-align: center;
                      font-size: var(--font-size-5xs-9);
                      color: var(--color-gold-100);
                      font-family: var(--font-alexandria);
                    `}
                  >
                    <div
                      className={css`
                        align-self: stretch;
                        flex: 1;
                        border-radius: var(--br-lgi-6);
                        background-color: var(--color-cornsilk-100);
                        border: 0.7px solid var(--color-gold-100);
                        display: flex;
                        flex-direction: row;
                        align-items: flex-start;
                        justify-content: flex-start;
                        padding: var(--padding-6xs) var(--padding-3xs)
                          var(--padding-6xs) var(--padding-xs);
                        z-index: 1;
                      `}
                    >
                      <div
                        className={css`
                          flex: 1;
                          position: relative;
                          line-height: 100%;
                        `}
                      >
                        Proof Of Mechanisim
                      </div>
                      <div
                        className={css`
                          height: 0.813rem;
                          width: 3.538rem;
                          border-radius: var(--br-xl);
                          border: 0.5px solid var(--wwwgetminjiapp-black);
                          box-sizing: border-box;
                          display: none;
                          flex-direction: row;
                          align-items: center;
                          justify-content: center;
                          padding: var(--padding-11xs-5) var(--padding-12xs);
                          text-align: left;
                          font-size: var(--font-size-6xs-5);
                          color: var(--wwwgetminjiapp-black);
                        `}
                      >
                        <div
                          className={css`
                            position: relative;
                            line-height: 100%;
                          `}
                        >
                          REPUTATION
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className={css`
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    justify-content: flex-start;
                    padding: var(--padding-36xl) 0rem 0rem;
                    box-sizing: border-box;
                    min-width: 7.125rem;
                    margin-left: -0.238rem;
                    text-align: center;
                    font-size: var(--font-size-5xs);
                    color: var(--color-limegreen-100);
                    font-family: var(--font-alexandria);
                    @media screen and (max-width: 450px) {
                      margin-left: 0;
                    }
                  `}
                >
                  <div
                    className={css`
                      align-self: stretch;
                      display: flex;
                      flex-direction: row;
                      align-items: flex-start;
                      justify-content: flex-start;
                      position: relative;
                    `}
                  >
                    <img
                      className={css`
                        height: 2.5rem;
                        width: 20.925rem;
                        position: absolute;
                        margin: 0 !important;
                        top: 4.438rem;
                        left: -14.312rem;
                        object-fit: contain;
                      `}
                      alt=""
                      src="/slider-4@2x.png"
                    />
                    <div
                      className={css`
                        height: 15.206rem;
                        width: 19.525rem;
                        position: absolute;
                        margin: 0 !important;
                        bottom: -6.775rem;
                        left: -13.687rem;
                      `}
                    >
                      <div
                        className={css`
                          position: absolute;
                          top: 0rem;
                          left: 0rem;
                          width: 100%;
                          height: 100%;
                        `}
                      >
                        <div
                          className={css`
                            position: absolute;
                            top: 0rem;
                            left: 0rem;
                            width: 100%;
                            height: 100%;
                          `}
                        >
                          <img
                            className={css`
                              position: absolute;
                              top: 0rem;
                              left: 0rem;
                              width: 100%;
                              height: 100%;
                              object-fit: contain;
                            `}
                            alt=""
                            src="/funders1.svg"
                          />
                          <img
                            className={css`
                              position: absolute;
                              top: 9.813rem;
                              left: 6.788rem;
                              border-radius: var(--br-11xl);
                              width: 6.056rem;
                              height: 2.113rem;
                              object-fit: contain;
                              z-index: 1;
                            `}
                            alt=""
                            src="/button-2@2x.png"
                          />
                        </div>
                        <img
                          className={css`
                            position: absolute;
                            top: 4.188rem;
                            left: 5.188rem;
                            width: 9.375rem;
                            height: 0.75rem;
                            z-index: 2;
                          `}
                          alt=""
                          src="/new-funders.svg"
                        />
                        <div
                          className={css`
                            position: absolute;
                            top: 4.875rem;
                            left: 14.25rem;
                            border-radius: var(--br-10xs-3);
                            background-color: var(--background-default-default);
                            border: 0.6px solid var(--border-default-default);
                            box-sizing: border-box;
                            width: 0.625rem;
                            height: 0.688rem;
                            transform: rotate(-90deg);
                            transform-origin: 0 0;
                            z-index: 3;
                          `}
                        />
                      </div>
                      <div
                        className={css`
                          position: absolute;
                          top: 3.688rem;
                          left: 6.813rem;
                          border-radius: var(--br-3xl);
                          background-color: var(--color-honeydew);
                          border: 0.7px solid var(--color-limegreen-100);
                          box-sizing: border-box;
                          width: 6.5rem;
                          height: 1.513rem;
                          display: flex;
                          flex-direction: row;
                          align-items: flex-start;
                          justify-content: flex-start;
                          padding: var(--padding-11xs) var(--padding-10xs);
                          z-index: 3;
                        `}
                      >
                        <div
                          className={css`
                            width: 5.938rem;
                            position: relative;
                            line-height: 112%;
                            display: inline-block;
                            flex-shrink: 0;
                          `}
                        >
                          <p
                            className={css`
                              margin: 0;
                            `}
                          >
                            New People + New
                          </p>
                          <p
                            className={css`
                              margin: 0;
                            `}
                          >
                            Funders
                          </p>
                        </div>
                        <div
                          className={css`
                            height: 0.913rem;
                            width: 3.956rem;
                            border-radius: var(--br-3xl-4);
                            border: 0.6px solid var(--wwwgetminjiapp-black);
                            box-sizing: border-box;
                            display: none;
                            flex-direction: row;
                            align-items: center;
                            justify-content: center;
                            padding: var(--padding-11xs-7) var(--padding-12xs);
                            text-align: left;
                            font-size: var(--font-size-5xs-3);
                            color: var(--wwwgetminjiapp-black);
                          `}
                        >
                          <div
                            className={css`
                              position: relative;
                              line-height: 100%;
                            `}
                          >
                            REPUTATION
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className={css`
                        flex: 1;
                        display: flex;
                        flex-direction: column;
                        align-items: flex-end;
                        justify-content: flex-start;
                        gap: var(--gap-62xl-9);
                        font-size: var(--font-size-sm-8);
                        color: var(--wwwgetminjiapp-black);
                      `}
                    >
                      <div
                        className={css`
                          align-self: stretch;
                          display: flex;
                          flex-direction: row;
                          align-items: flex-start;
                          justify-content: flex-end;
                          padding: 0rem var(--padding-7xs) 0rem 0rem;
                        `}
                      >
                        <div
                          className={css`
                            height: 2.194rem;
                            flex: 1;
                            position: relative;
                          `}
                        >
                          <img
                            className={css`
                              position: absolute;
                              top: 0rem;
                              left: 0rem;
                              width: 100%;
                              height: 100%;
                            `}
                            alt=""
                            src="/rectangle-2-1.svg"
                          />
                          <div
                            className={css`
                              position: absolute;
                              top: 0.656rem;
                              left: 1.875rem;
                              line-height: 100%;
                              display: inline-block;
                              width: 8rem;
                              height: 0.875rem;
                              min-width: 8rem;
                              z-index: 1;
                            `}
                          >
                            🌟 Proof of Activity
                          </div>
                        </div>
                      </div>
                      <div
                        className={css`
                          width: 9.394rem;
                          display: flex;
                          flex-direction: column;
                          align-items: flex-start;
                          justify-content: flex-start;
                          gap: var(--gap-lg);
                          font-size: var(--font-size-5xs-9);
                          color: var(--color-deepskyblue);
                        `}
                      >
                        <div
                          className={css`
                            align-self: stretch;
                            display: flex;
                            flex-direction: row;
                            align-items: flex-start;
                            justify-content: flex-start;
                            padding: 0rem var(--padding-smi) 0rem
                              var(--padding-3xs);
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
                              gap: var(--gap-7xs);
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
                                padding: 0rem var(--padding-3xs);
                              `}
                            >
                              <div
                                className={css`
                                  align-self: stretch;
                                  flex: 1;
                                  border-radius: var(--br-lgi-6);
                                  background-color: var(--color-azure);
                                  border: 0.7px solid var(--color-deepskyblue);
                                  display: flex;
                                  flex-direction: row;
                                  align-items: flex-start;
                                  justify-content: flex-start;
                                  padding: var(--padding-7xs) var(--padding-9xs)
                                    var(--padding-7xs) var(--padding-7xs);
                                `}
                              >
                                <div
                                  className={css`
                                    flex: 1;
                                    position: relative;
                                    line-height: 100%;
                                  `}
                                >
                                  Support Development of Tech
                                </div>
                                <div
                                  className={css`
                                    height: 0.813rem;
                                    width: 3.538rem;
                                    border-radius: var(--br-xl);
                                    border: 0.5px solid
                                      var(--wwwgetminjiapp-black);
                                    box-sizing: border-box;
                                    display: none;
                                    flex-direction: row;
                                    align-items: center;
                                    justify-content: center;
                                    padding: var(--padding-11xs-5)
                                      var(--padding-12xs);
                                    text-align: left;
                                    font-size: var(--font-size-6xs-5);
                                    color: var(--wwwgetminjiapp-black);
                                  `}
                                >
                                  <div
                                    className={css`
                                      position: relative;
                                      line-height: 100%;
                                    `}
                                  >
                                    REPUTATION
                                  </div>
                                </div>
                              </div>
                            </div>
                            <button
                              className={css`
                                cursor: pointer;
                                border: 0.7px solid var(--color-royalblue-100);
                                padding: var(--padding-3xs) var(--padding-9xs)
                                  var(--padding-3xs) var(--padding-7xs);
                                background-color: var(--color-aliceblue-100);
                                align-self: stretch;
                                height: 1.875rem;
                                border-radius: var(--br-lgi-6);
                                box-sizing: border-box;
                                display: flex;
                                flex-direction: row;
                                align-items: flex-start;
                                justify-content: flex-start;
                                z-index: 2;
                              `}
                            >
                              <div
                                className={css`
                                  flex: 1;
                                  position: relative;
                                  font-size: var(--font-size-5xs-9);
                                  line-height: 100%;
                                  font-family: var(--font-alexandria);
                                  color: var(--color-royalblue-100);
                                  text-align: center;
                                `}
                              >{`Govern & Request Funding`}</div>
                              <div
                                className={css`
                                  height: 0.813rem;
                                  width: 3.538rem;
                                  border-radius: var(--br-xl);
                                  border: 0.5px solid
                                    var(--wwwgetminjiapp-black);
                                  box-sizing: border-box;
                                  display: none;
                                  flex-direction: row;
                                  align-items: center;
                                  justify-content: center;
                                  padding: var(--padding-11xs-5)
                                    var(--padding-12xs);
                                `}
                              >
                                <div
                                  className={css`
                                    position: relative;
                                    font-size: var(--font-size-6xs-5);
                                    line-height: 100%;
                                    font-family: var(--font-alexandria);
                                    color: var(--wwwgetminjiapp-black);
                                    text-align: left;
                                  `}
                                >
                                  REPUTATION
                                </div>
                              </div>
                            </button>
                          </div>
                        </div>
                        <div
                          className={css`
                            align-self: stretch;
                            box-shadow: 0px 0px 0px 0.49px
                                rgba(17, 24, 28, 0.08),
                              0px 0.5px 1px -0.49px rgba(17, 24, 28, 0.08),
                              0px 1px 1.9px rgba(17, 24, 28, 0.04);
                            border-radius: var(--br-4xs-1);
                            background-color: var(--background-default-default);
                            border: 0.6px solid var(--color-red);
                            display: flex;
                            flex-direction: column;
                            align-items: flex-start;
                            justify-content: flex-start;
                            padding: var(--padding-smi) var(--padding-smi)
                              var(--padding-6xl) var(--padding-mid);
                            gap: var(--gap-6xs-9);
                            z-index: 2;
                            text-align: left;
                            font-size: var(--font-size-7xl-1);
                            color: var(--wwwgetminjiapp-black);
                            font-family: var(--font-inter);
                          `}
                        >
                          <div
                            className={css`
                              align-self: stretch;
                              display: flex;
                              flex-direction: row;
                              align-items: flex-start;
                              justify-content: flex-start;
                              padding: 0rem var(--padding-14xl) 0rem
                                var(--padding-9xl);
                            `}
                          >
                            <div
                              className={css`
                                flex: 1;
                                box-shadow: 0px 0px 0px 0.49px
                                    rgba(17, 24, 28, 0.08),
                                  0px 0.5px 1px -0.49px rgba(17, 24, 28, 0.08),
                                  0px 1px 1.9px rgba(17, 24, 28, 0.04);
                                border-radius: var(--br-5737xl-4);
                                background-color: var(--color-mistyrose);
                                overflow: hidden;
                                display: flex;
                                flex-direction: row;
                                align-items: flex-start;
                                justify-content: flex-start;
                                padding: var(--padding-mini) var(--padding-smi)
                                  var(--padding-base-4) var(--padding-mini);
                              `}
                            >
                              <div
                                className={css`
                                  height: 3.525rem;
                                  width: 3.525rem;
                                  position: relative;
                                  border-radius: 50%;
                                  background-color: var(
                                    --border-default-default
                                  );
                                  display: none;
                                `}
                              />
                              <div
                                className={css`
                                  flex: 1;
                                  position: relative;
                                  line-height: 100%;
                                  @media screen and (max-width: 450px) {
                                    font-size: var(--font-size-2xl);
                                    line-height: 1.313rem;
                                  }
                                `}
                              >
                                💰
                              </div>
                            </div>
                          </div>
                          <div
                            className={css`
                              align-self: stretch;
                              position: relative;
                              font-size: var(--font-size-sm-8);
                              line-height: 100%;
                              font-family: var(--font-alexandria);
                              color: var(--color-red);
                              text-align: center;
                            `}
                          >
                            Fund the Activity
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrameComponent2;
