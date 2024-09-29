import type { NextPage } from "next";
import { type CSSProperties } from "react";
import { css } from "@emotion/css";

export type FilterType = {
  className?: string;
  flowerLotus?: string;
  buttonText?: string;

  /** Style props */
  propFlex?: CSSProperties["flex"];
  propPadding?: CSSProperties["padding"];
  propBackgroundColor?: CSSProperties["backgroundColor"];
  propColor?: CSSProperties["color"];
};

const Filter: NextPage<FilterType> = ({
  className = "",
  propFlex,
  propPadding,
  propBackgroundColor,
  flowerLotus,
  buttonText,
  propColor,
}) => {
  return (
    <div
      className={[
        css`flex: 0.9659;
display: flex;
flex-direction: row;
align-items: flex-start;
justify-content: flex-start;
padding: 0rem var(--padding-10xs) 0rem 0rem;
text-align: center;
font-size: var(--display-1-medium-size);
color: var(--color-blueviolet);
font-family: var(--font-alexandria);
flex: ${propFlex}
padding: ${propPadding}
`,
        className,
      ].join(" ")}
    >
      <div
        className={css`
          flex: 1;
          border-radius: var(--badges-pill);
          background-color: var(--color-lavender);
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          padding: var(--padding-9xs) var(--padding-6xs) var(--padding-8xs);
          gap: var(--gap-9xs);
          background-color: ${propBackgroundColor};
        `}
      >
        <img
          className={css`
            height: 0.75rem;
            width: 0.75rem;
            position: relative;
          `}
          alt=""
          src={flowerLotus}
        />
        <div
          className={css`
            flex: 1;
            position: relative;
            line-height: 130%;
            color: ${propColor};
          `}
        >
          {buttonText}
        </div>
      </div>
    </div>
  );
};

export default Filter;
