import type { NextPage } from "next";
import PageMaster from "./page-master";
import { css } from "@emotion/css";

export type PageDisabledType = {
  className?: string;
};

const PageDisabled: NextPage<PageDisabledType> = ({ className = "" }) => {
  return (
    <div
      className={[
        css`
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          justify-content: flex-start;
        `,
        className,
      ].join(" ")}
    >
      <PageMaster
        propAlignSelf="unset"
        propFlex="unset"
        propBackgroundColor="#919eab"
        propBorder="unset"
        propOpacity="0.5"
        icCaratRight="/ic--carat--left.svg"
        showIcCaratRight
        num="1"
        num1={false}
        propWidth="1.5rem"
        propFontWeight="500"
        propFontFamily="'GT America'"
        propColor="#212b36"
        propMinWidth="unset"
      />
    </div>
  );
};

export default PageDisabled;
