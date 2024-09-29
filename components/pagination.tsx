import type { NextPage } from "next";
import PageDisabled from "./page-disabled";
import PageActive from "./page-active";
import PageDefault from "./page-default";
import PageMaster from "./page-master";
import { css } from "@emotion/css";

export type PaginationType = {
  className?: string;
};

const Pagination: NextPage<PaginationType> = ({ className = "" }) => {
  return (
    <div
      className={[
        css`
          align-self: stretch;
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          justify-content: flex-start;
          gap: var(--gap-5xs);
          text-align: center;
          font-size: var(--ui-small-strong-size);
          color: var(--dark-grey-400);
          font-family: var(--ui-small-strong);
        `,
        className,
      ].join(" ")}
    >
      <PageDisabled />
      <PageActive />
      <PageDefault
        num="2"
        showIcCaratRight={false}
        num1
        propAlignSelf="stretch"
        propFlex="1"
        propBackgroundColor="#fff"
        propBorder="1px solid #dfe3e8"
        propOpacity="unset"
        propWidth="1.563rem"
        propFontWeight="bold"
        propFontFamily="'SF Pro Text'"
        propColor="#1e1e1e"
        propMinWidth="unset"
      />
      <PageDefault
        num="..."
        showIcCaratRight={false}
        num1
        propAlignSelf="stretch"
        propFlex="1"
        propBackgroundColor="#fff"
        propBorder="1px solid #dfe3e8"
        propOpacity="unset"
        propWidth="1.563rem"
        propFontWeight="bold"
        propFontFamily="'SF Pro Text'"
        propColor="#1e1e1e"
        propMinWidth="unset"
      />
      <PageDefault
        num="9"
        showIcCaratRight={false}
        num1
        propAlignSelf="stretch"
        propFlex="1"
        propBackgroundColor="#fff"
        propBorder="1px solid #dfe3e8"
        propOpacity="unset"
        propWidth="1.563rem"
        propFontWeight="bold"
        propFontFamily="'SF Pro Text'"
        propColor="#1e1e1e"
        propMinWidth="unset"
      />
      <PageDefault
        num="10"
        showIcCaratRight={false}
        num1
        propAlignSelf="stretch"
        propFlex="1"
        propBackgroundColor="#fff"
        propBorder="1px solid #dfe3e8"
        propOpacity="unset"
        propWidth="unset"
        propFontWeight="bold"
        propFontFamily="'SF Pro Text'"
        propColor="#1e1e1e"
        propMinWidth="1.563rem"
      />
      <PageMaster
        icCaratRight="/ic--carat--right.svg"
        showIcCaratRight
        num="..."
        num1
      />
    </div>
  );
};

export default Pagination;
