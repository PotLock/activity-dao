import type { NextPage } from "next";
import { type CSSProperties } from "react";
import { css } from "@emotion/css";

export type PageMasterType = {
  className?: string;
  icCaratRight?: string;
  showIcCaratRight?: boolean;
  num?: string;
  num1?: boolean;

  /** Style props */
  propAlignSelf?: CSSProperties["alignSelf"];
  propFlex?: CSSProperties["flex"];
  propBackgroundColor?: CSSProperties["backgroundColor"];
  propBorder?: CSSProperties["border"];
  propOpacity?: CSSProperties["opacity"];
  propWidth?: CSSProperties["width"];
  propFontWeight?: CSSProperties["fontWeight"];
  propFontFamily?: CSSProperties["fontFamily"];
  propColor?: CSSProperties["color"];
  propMinWidth?: CSSProperties["minWidth"];
};

const PageMaster: NextPage<PageMasterType> = ({
  className = "",
  propAlignSelf,
  propFlex,
  propBackgroundColor,
  propBorder,
  propOpacity,
  icCaratRight,
  showIcCaratRight,
  num,
  num1,
  propWidth,
  propFontWeight,
  propFontFamily,
  propColor,
  propMinWidth,
}) => {
  return (
    <div
      className={[
        css`align-self: stretch;
flex: 0.75;
border-radius: var(--br-9xs);
background-color: var(--background-default-default);
border: 1px solid var(--color-gainsboro-200);
overflow: hidden;
display: flex;
flex-direction: row;
align-items: flex-start;
justify-content: flex-start;
padding: var(--padding-11xs) var(--padding-10xs);
text-align: center;
font-size: var(--ui-small-strong-size);
color: var(--dark-grey-400);
font-family: var(--ui-small-strong);
align-self: ${propAlignSelf}
flex: ${propFlex}
background-color: ${propBackgroundColor}
border: ${propBorder}
opacity: ${propOpacity}
`,
        className,
      ].join(" ")}
    >
      {showIcCaratRight && (
        <img
          className={css`
            height: 1.5rem;
            width: 1.5rem;
            position: relative;
          `}
          loading="lazy"
          alt=""
          src={icCaratRight}
        />
      )}
      {!num1 && (
        <div
          className={css`width: 1.5rem;
position: relative;
line-height: 1.25rem;
font-weight: 500;
flex-shrink: 0;
width: ${propWidth}
font-weight: ${propFontWeight}
font-family: ${propFontFamily}
color: ${propColor}
min-width: ${propMinWidth}
`}
        >
          {num}
        </div>
      )}
    </div>
  );
};

export default PageMaster;
