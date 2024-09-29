import type { NextPage } from "next";
import { css } from "@emotion/css";

export type SwitchContainer1Type = {
  className?: string;
};

const SwitchContainer1: NextPage<SwitchContainer1Type> = ({
  className = "",
}) => {
  return (
    <div
      className={[
        css`
          flex: 0.9645;
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
          padding: var(--padding-6xl) var(--padding-13xl) var(--padding-37xl-2);
          box-sizing: border-box;
          gap: var(--gap-lgi-4);
          min-width: 20.25rem;
          max-width: 100%;
          text-align: center;
          font-size: var(--font-size-59xl-3);
          color: var(--color-darkslateblue-300);
          font-family: var(--font-aclonica);
          @media screen and (max-width: 450px) {
            flex: 1;
          }
        `,
        className,
      ].join(" ")}
    >
      <div
        className={css`
          width: 22.994rem;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          justify-content: flex-start;
          gap: var(--gap-12xl-8);
          max-width: 100%;
        `}
      >
        <div
          className={css`
            align-self: stretch;
            height: 13.781rem;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: flex-start;
            gap: var(--gap-lgi);
          `}
        >
          <div
            className={css`
              width: 16.625rem;
              position: relative;
              line-height: 4.219rem;
              display: inline-block;
              @media screen and (max-width: 1050px) {
                font-size: var(--font-size-27xl);
                line-height: 3.375rem;
              }
              @media screen and (max-width: 450px) {
                font-size: var(--font-size-16xl);
                line-height: 2.5rem;
              }
            `}
          >
          </div>
          <div
            className={css`
              align-self: stretch;
              height: 8.344rem;
              display: flex;
              flex-direction: row;
              align-items: flex-start;
              justify-content: flex-end;
            `}
          >
            <img
              className={css`
                height: 8.344rem;
                width: 18.813rem;
                position: relative;
              `}
              loading="lazy"
              alt=""
              src="/switch-container.svg"
            />
          </div>
        </div>
        <div
          className={css`
            display: flex;
            flex-direction: row;
            align-items: flex-start;
            justify-content: flex-end;
            padding: 0rem var(--padding-9xs);
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
            Fund the Acitivity
          </h1>
        </div>
      </div>
      <div
        className={css`
          align-self: stretch;
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          justify-content: flex-start;
          padding: 0rem var(--padding-xl);
          box-sizing: border-box;
          min-height: 6.125rem;
          max-width: 100%;
          font-size: var(--font-size-base-9);
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
          Support and sustain the activities you love by contributing to their
          growth and creating thriving ecosystems.
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
    </div>
  );
};

export default SwitchContainer1;
