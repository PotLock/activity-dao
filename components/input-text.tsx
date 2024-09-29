import type { NextPage } from "next";
import { css } from "@emotion/css";

export type InputTextType = {
  className?: string;
  badgeVisibility?: boolean;
  iconRightVisibility?: boolean;
  buttonVisibility?: boolean;
  iconLeftVisibility?: boolean;
};

const InputText: NextPage<InputTextType> = ({
  className = "",
  badgeVisibility = false,
  iconRightVisibility = false,
  buttonVisibility = false,
  iconLeftVisibility = true,
}) => {
  return (
    <div
      className={[
        css`
          flex: 1;
          box-shadow: var(--neutral-bs-small);
          border-radius: var(--default-gaps-default-paddings-pd-medium);
          background-color: var(--background-default-default);
          border: 1px solid var(--inputs-select-borders-br-color-1);
          box-sizing: border-box;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: flex-start;
          padding: var(--padding-2xs) var(--padding-base);
          min-width: 3.5rem;
          min-height: 2.625rem;
          max-width: 100%;
          text-align: left;
          font-size: var(--display-1-medium-size);
          color: var(--inputs-select-text-text-neutral);
          font-family: var(--display-1-medium);
        `,
        className,
      ].join(" ")}
    >
      <div
        className={css`
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: flex-start;
          gap: var(--gap-9xs);
        `}
      >
        {iconLeftVisibility && (
          <img
            className={css`
              height: 0.813rem;
              width: 0.813rem;
              position: relative;
            `}
            alt=""
            src="/line-roundedsearch-1.svg"
          />
        )}
        <div
          className={css`
            position: relative;
            line-height: 130%;
          `}
        >
          Search
        </div>
      </div>
      {iconRightVisibility && (
        <img
          className={css`
            height: 0.75rem;
            width: 0.75rem;
            position: relative;
          `}
          alt=""
          src="/line-roundedsearch.svg"
        />
      )}
      {buttonVisibility && (
        <div
          className={css`
            height: 2rem;
            box-shadow: var(--button-primary);
            border-radius: var(--buttons-regular);
            background-color: var(--buttons-background-primary-gradient);
            border: 1px solid var(--buttons-background-primary-gradient);
            box-sizing: border-box;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            padding: var(--padding-7xs) var(--padding-mini);
            gap: var(--buttons-gaps-gap-small);
            color: var(--background-default-default);
          `}
        >
          <img
            className={css`
              height: 0.75rem;
              width: 0.75rem;
              position: relative;
              display: none;
            `}
            alt=""
            src="/line-roundedsearch1.svg"
          />
          <div
            className={css`
              position: relative;
              line-height: 130%;
              font-weight: 500;
            `}
          >
            Default
          </div>
          <img
            className={css`
              height: 0.625rem;
              width: 0.625rem;
              position: relative;
            `}
            alt=""
            src="/line-roundedarrow-rigth-1.svg"
          />
        </div>
      )}
      {badgeVisibility && (
        <div
          className={css`
            height: 1.688rem;
            box-shadow: var(--neutral-bs-small);
            border-radius: var(--badges-small);
            background-color: var(--badges-backgrounds-bg-color-2);
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            padding: var(--badges-paddings-pd-small) var(--padding-8xs);
            box-sizing: border-box;
            gap: var(--badges-gaps-gap-small);
            text-align: center;
            color: var(--badges-text-text-dark);
          `}
        >
          <img
            className={css`
              height: 0.688rem;
              width: 0.688rem;
              position: relative;
            `}
            alt=""
            src="/line-roundedcommand.svg"
          />
          <div
            className={css`
              position: relative;
              line-height: 130%;
              font-weight: 500;
            `}
          >
            C
          </div>
          <img
            className={css`
              height: 0.688rem;
              width: 0.688rem;
              position: relative;
              display: none;
            `}
            alt=""
            src="/line-roundedcommand.svg"
          />
        </div>
      )}
    </div>
  );
};

export default InputText;
