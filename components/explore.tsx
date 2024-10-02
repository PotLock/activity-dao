import type { NextPage } from "next";
import {
  TextField,
  InputAdornment,
  Icon,
  IconButton,
  Button,
} from "@mui/material";
import { css } from "@emotion/css";

export type ExploreType = { 
  className?: string;
};

const ExploreComponent: NextPage<ExploreType> = ({ className = "" }) => {
  return (
    <header
      className={[
        css`
          width: 89.125rem;
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          justify-content: center;
          padding: 0rem var(--padding-xl) var(--padding-6xl);
          box-sizing: border-box;
          max-width: 100%;
        `,
        className,
      ].join(" ")}
    > 
      <div
        className={css`
          width: 75rem;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          gap: var(--gap-xl);
          max-width: 100%;
        `}
      >
        <div
          className={css`
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            padding: var(--padding-10xs-5) var(--padding-6xs)
              var(--padding-10xs-6);
          `}
        >
          <div
            className={css`
              width: 1.994rem;
              display: flex;
              flex-direction: row;
              align-items: center;
              justify-content: flex-start;
              padding: var(--padding-10xs-3) var(--padding-6xs)
                var(--padding-10xs-2);
              box-sizing: border-box;
            `}
          >
            <img
              className={css`
                height: 1.681rem;
                width: 1.013rem;
                position: relative;
              `}
              loading="lazy"
              alt=""
              src="/-emoji-light-bulb.svg"
            />
          </div>
          <img
            className={css`
              height: 1.569rem;
              width: 10.713rem;
              position: relative;
            `}
            loading="lazy"
            alt=""
            src="/activitydaos.svg"
          />
        </div>
        <TextField
          className={css`
            border: none;
            background-color: transparent;
            width: 28.938rem;
            box-shadow: var(--neutral-bs-small);
            font-family: var(--display-1-medium);
            font-size: var(--ui-small-strong-size);
            color: var(--inputs-select-text-text-neutral);
            min-height: 3rem;
            max-width: 100%;
          `}
          placeholder="Search"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <img width="16px" height="16px" src="/line-roundedsearch.svg" />
            ),
          }}
          sx={{
            "& fieldset": { borderColor: "#f0f2f5" },
            "& .MuiInputBase-root": {
              height: "48px",
              backgroundColor: "#fff",
              paddingLeft: "16px",
              borderRadius: "24px",
              fontSize: "14px",
            },
            "& .MuiInputBase-input": { paddingLeft: "6px", color: "#666f8d" },
            width: "463px",
          }}
        />
        <Button
          className={css`
            height: 2.5rem;
            width: 11.194rem;
          `}
          startIcon={
            <img width="20.8px" height="20.8px" src="/component-1-1.svg" />
          }
          disableElevation
          variant="contained"
          sx={{
            textTransform: "none",
            color: "#000",
            fontSize: "19.5",
            background: "#facc15",
            borderRadius: "8665.8px",
            "&:hover": { background: "#facc15" },
            width: 179.1,
            height: 40,
          }}
        >
          Join Now 
        </Button>
      </div>
    </header>
  );
};

export default ExploreComponent; 