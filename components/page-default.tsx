import type { NextPage } from "next";
import PageMaster from "./page-master";
import { css } from "@emotion/css";

export type PageDefaultType = {
  className?: string;
  num?: string;
  showIcCaratRight?: boolean;
  num1?: boolean;
  propAlignSelf?: string;
  propFlex?: string;
  propBackgroundColor?: string;
  propBorder?: string;
  propOpacity?: string;
  propWidth?: string;
  propFontWeight?: string;
  propFontFamily?: string;
  propColor?: string;
  propMinWidth?: string;
};

const PageDefault: NextPage<PageDefaultType> = ({
  className = "",
  num,
  showIcCaratRight,
  num1,
  propAlignSelf,
  propFlex,
  propBackgroundColor,
  propBorder,
  propOpacity,
  propWidth,
  propFontWeight,
  propFontFamily,
  propColor,
  propMinWidth,
}) => {
  return (
    <div
      className={[
        css`
          align-self: stretch;
          flex: 1;
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          justify-content: flex-start;
        `,
        className,
      ].join(" ")}
    >
      <PageMaster
        propAlignSelf={propAlignSelf}
        propFlex={propFlex}
        propBackgroundColor={propBackgroundColor}
        propBorder={propBorder}
        propOpacity={propOpacity}
        icCaratRight="/ic--carat--left.svg"
        showIcCaratRight={showIcCaratRight}
        num={num}
        num1={num1}
        propWidth={propWidth}
        propFontWeight={propFontWeight}
        propFontFamily={propFontFamily}
        propColor={propColor}
        propMinWidth={propMinWidth}
      />
    </div>
  );
};

export default PageDefault;
