import type { NextPage } from "next";
import { css } from "@emotion/css";

export type UserActionsParentType = {
  className?: string;
};

const UserActionsParent: NextPage<UserActionsParentType> = ({
  className = "",
}) => {
  return (
    <div
      className={[
        css`
          position: absolute;
          top: 44.969rem;
          left: 23.938rem;
          width: 35.013rem;
          height: 5.119rem;
          display: flex;
          flex-direction: row;
          align-items: flex-end;
          justify-content: space-between;
          gap: var(--gap-xl);
          max-width: 100%;
          @media screen and (max-width: 450px) {
            flex-wrap: wrap;
          }
        `,
        className,
      ].join(" ")}
    >
      <div
        className={css`
          width: 9.75rem;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-start;
        `}
      >
        <img
          className={css`
            width: 1.725rem;
            height: 1.531rem;
            position: relative;
          `}
          alt=""
          src="/group-15.svg"
        />
      </div>
      <div
        className={css`
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-end;
          padding: 0rem 0rem var(--padding-3xl-4);
        `}
      >
        <button
          className={css`
            cursor: pointer;
            border: none;
            padding: var(--padding-5xs-5) var(--padding-mini);
            background-color: var(--wwwgetminjiapp-candlelight);
            align-self: stretch;
            border-radius: var(--br-4664xl-1);
            display: flex;
            flex-direction: row;
            align-items: flex-start;
            justify-content: flex-start;
          `}
        >
          <div
            className={css`
              overflow: hidden;
              display: none;
              flex-direction: column;
              align-items: flex-start;
              justify-content: flex-start;
              z-index: 1;
            `}
          >
            <div
              className={css`
                overflow: hidden;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
              `}
            >
              <img
                className={css`
                  width: 0.7rem;
                  height: 0.7rem;
                  position: relative;
                `}
                alt=""
                src="/component-1-2.svg"
              />
            </div>
          </div>
          <div
            className={css`
              flex: 1;
              position: relative;
              font-size: var(--display-1-medium-size);
              line-height: 0.819rem;
              font-weight: 500;
              font-family: var(--font-alexandria);
              color: var(--wwwgetminjiapp-black);
              text-align: center;
            `}
          >
            HOW IT WORKS
          </div>
        </button>
      </div>
      <div
        className={css`
          align-self: stretch;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-start;
        `}
      >
        <img
          className={css`
            width: 2.638rem;
            height: 2.456rem;
            position: relative;
          `}
          alt=""
          src="/group-16.svg"
        />
      </div>
    </div>
  );
};

export default UserActionsParent;
