import type { NextPage } from "next";
import { Button } from "@mui/material";
import { css } from "@emotion/css";

export type DAOsHeaderType = {
  className?: string;
};

const DAOsHeader: NextPage<DAOsHeaderType> = ({ className = "" }) => {
  return (
    <div
      className={[
        css`
          align-self: stretch;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-start;
          gap: var(--gap-3xs);
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
          align-self: stretch;
          height: 1.813rem;
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          justify-content: flex-start;
          padding: 0rem var(--padding-517xl);
          box-sizing: border-box;
        `}
      >
        <Button
          className={css`
            align-self: stretch;
            flex: 1;
            white-space: nowrap;
            min-width: fit-content;
          `}
          disableElevation
          variant="contained"
          sx={{
            textTransform: "none",
            color: "#000",
            fontSize: "12px",
            background: "#facc15",
            borderRadius: "4683.1px",
            padding: "6px 16px",
            "&:hover": {
              background: "#facc15",
              boxShadow: "none",
            },
            "&:active": {
              background: "#facc15",
              boxShadow: "none",
            },
            "&:focus": {
              background: "#facc15",
              boxShadow: "none",
            },
            cursor: "default",
          }}
        >
          DAOs
        </Button>
      </div>
      <h1
        className={css`
          margin: 0;
          align-self: stretch;
          position: relative;
          font-size: inherit;
          line-height: 3.844rem;
          font-weight: 600;
          font-family: inherit;
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
        Real-Life Activity DAOs 🌟
      </h1>
      <h3
        className={css`
          margin: 0;
          align-self: stretch;
          position: relative;
          font-size: var(--font-size-5xl);
          line-height: 2.469rem;
          font-weight: 400;
          font-family: var(--font-hanken-grotesk);
          @media screen and (max-width: 450px) {
            font-size: var(--font-size-lgi);
            line-height: 2rem;
          }
        `}
      >
        Browse the most up to date directory of different activity DAOs and get
        moving today!
      </h3>
    </div>
  );
};

export default DAOsHeader;
