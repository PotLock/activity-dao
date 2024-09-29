import type { NextPage } from "next";
import { useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import { css } from "@emotion/css";

export type Select1Type = {
  className?: string;
  iconLeftVisibility?: boolean;
};

const Select1: NextPage<Select1Type> = ({
  className = "",
  iconLeftVisibility = false,
}) => {
  const [selectAnchorEl, setSelectAnchorEl] = useState<HTMLElement | null>(
    null
  );
  const selectOpen = Boolean(selectAnchorEl);
  const handleSelectClick = (event: React.MouseEvent<HTMLElement>) => {
    setSelectAnchorEl(event.currentTarget);
  };
  const handleSelectClose = () => {
    setSelectAnchorEl(null);
  };
  return (
    <div
      className={[
        css`
          width: 11.25rem;
          box-shadow: var(--neutral-bs-small);
          min-height: 2.5rem;
          gap: var(--gap-xl);
        `,
        className,
      ].join(" ")}
    >
      <Button
        className={css``}
        id="button-undefined"
        aria-controls="menu-undefined"
        aria-haspopup="true"
        aria-expanded={selectOpen ? "true" : undefined}
        onClick={handleSelectClick}
        color="primary"
        sx={{
          width: "180",
          height: "100%",
          backgroundColor: "#fff",
          borderRadius: "24px",
        }}
      />
      <Menu
        className={css``}
        anchorEl={selectAnchorEl}
        open={selectOpen}
        onClose={handleSelectClose}
      />
    </div>
  );
};

export default Select1;
