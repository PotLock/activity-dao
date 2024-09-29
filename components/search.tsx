import type { NextPage } from "next";
import {
  Select,
  InputLabel,
  MenuItem,
  FormHelperText,
  FormControl,
  InputAdornment,
} from "@mui/material";
import { css } from "@emotion/css";

export type SearchType = {
  className?: string;
};

const Search: NextPage<SearchType> = ({ className = "" }) => {
  return (
    <FormControl
      className={[
        css`
          height: 3.563rem;
          width: 40.813rem;
          font-family: var(--font-inter);
          font-size: var(--font-size-base);
          color: var(--color-azure-47);
          max-width: 100%;
        `,
        className,
      ].join(" ")}
      variant="standard"
      sx={{
        borderColor: "#d9d9d9",
        borderStyle: "SOLID",
        borderTopWidth: "1px",
        borderRightWidth: "1px",
        borderBottomWidth: "1px",
        borderLeftWidth: "1px",
        backgroundColor: "#fff",
        borderRadius: "9999px",
        width: "54.333333333333336%",
        height: "56px",
        m: 0,
        p: 0,
        "& .MuiInputBase-root": {
          m: 0,
          p: 0,
          minHeight: "56px",
          justifyContent: "center",
          display: "inline-flex",
        },
        "& .MuiInputLabel-root": {
          m: 0,
          p: 0,
          minHeight: "56px",
          display: "inline-flex",
        },
        "& .MuiMenuItem-root": {
          m: 0,
          p: 0,
          height: "56px",
          display: "inline-flex",
        },
        "& .MuiSelect-select": {
          m: 0,
          p: 0,
          height: "56px",
          alignItems: "center",
          display: "inline-flex",
        },
        "& .MuiInput-input": { m: 0, p: 0 },
        "& .MuiInputBase-input": {
          color: "#64748b",
          fontSize: 16,
          fontWeight: "Regular",
          fontFamily: "Inter",
          textAlign: "left",
          p: "0 !important",
          marginLeft: "16px",
        },
      }}
    >
      <InputLabel className={css``} color="secondary" />
      <Select
        className={css``}
        color="secondary"
        disableUnderline
        displayEmpty
        IconComponent={() => (
          <img
            width="16px"
            height="16px"
            src="/search.svg"
            style={{ marginRight: "16px" }}
          />
        )}
      >
        <MenuItem className={css``}>Search DAOs</MenuItem>
      </Select>
      <FormHelperText className={css``} />
    </FormControl>
  );
};

export default Search;
