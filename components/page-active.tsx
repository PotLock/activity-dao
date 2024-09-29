import type { NextPage } from "next";
import PageMaster from "./page-master";
import { css } from "@emotion/css";

export type PageActiveType = {
  className?: string;
};

const PageActive: NextPage<PageActiveType> = ({ className = "" }) => {
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
        propAlignSelf="stretch"
        propFlex="1"
        propBackgroundColor="#fff"
        propBorder="1px solid #ffc304"
        propOpacity="unset"
        icCaratRight="/ic--carat--left.svg"
        showIcCaratRight={false}
        num="1"
        num1
        propWidth="1.563rem"
        propFontWeight="bold"
        propFontFamily="'SF Pro Text'"
        propColor="#ffc304"
        propMinWidth="unset"
      />
    </div>
  );
};

export default PageActive;
