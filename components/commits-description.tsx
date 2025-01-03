import type { NextPage } from "next";
import { css } from "@emotion/css";
import { useState } from "react";
import { 
  TextField, 
  Select, 
  MenuItem, 
  InputLabel,
  FormControl,
  Button,
  ButtonGroup,
} from "@mui/material";
import CommitCard, { commitData } from './commit-card';
import { FiPlus } from 'react-icons/fi';

export type CommitsDescriptionType = {
  className?: string;
  mode?: "explore" | "home";
};

const CommitsDescription: NextPage<CommitsDescriptionType> = ({ className = "", mode = "explore" }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("most_recent");
  const [selectedTab, setSelectedTab] = useState("all");

  return (
    <div
      className={[
        css`
          align-self: stretch;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-start;
          gap: var(--gap-23xl);
          max-width: 100%;
          text-align: left;
          font-size: var(--font-size-5xl);
          color: var(--color-azure-47);
          font-family: var(--font-alexandria);
          ${mode === 'explore' ? `
            padding-top: 5rem;
          ` : ''}
        `,
        className,
      ].join(" ")}
    >
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
          Commitments for Activities ⭐
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
          Browse the most up to date directory of different activity DAOs and get moving today!
        </h3>
      </div>

      {/* Filter Button Group */}
      <div className={css`
        display: flex;
        justify-content: center;
        width: 100%;
        margin-bottom: 1rem;
      `}>
        <ButtonGroup 
          variant="outlined" 
          sx={{
            backgroundColor: '#f5f5f5',
            borderRadius: '25px',
            '& .MuiButton-root': {
              border: 'none',
              color: '#666',
              textTransform: 'none',
              px: 4,
              py: 1.5,
              backgroundColor: '#f5f5f5',
              '&:first-of-type': {
                borderTopLeftRadius: '25px !important',
                borderBottomLeftRadius: '25px !important',
                borderTopRightRadius: '0 !important',
                borderBottomRightRadius: '0 !important',
              },
              '&:last-of-type': {
                borderTopRightRadius: '25px !important',
                borderBottomRightRadius: '25px !important',
                borderTopLeftRadius: '0 !important',
                borderBottomLeftRadius: '0 !important',
              },
              '&:not(:first-of-type):not(:last-of-type)': {
                borderRadius: '0 !important',
              },
              '&:hover': {
                border: 'none',
                backgroundColor: 'rgba(0, 0, 0, 0.08)',
              },
              '&.active': {
                backgroundColor: '#facc15',
                color: '#000',
                border: 'none',
                '&:hover': {
                  backgroundColor: '#facc15',
                  border: 'none',
                },
              },
            },
            '& .MuiButtonGroup-grouped:not(:last-of-type)': {
              borderRight: 'none',
            },
          }}
        >
          <Button 
            className={selectedTab === "all" ? "active" : ""} 
            onClick={() => setSelectedTab("all")}
          >
            All
          </Button>
          <Button 
            className={selectedTab === "ongoing" ? "active" : ""} 
            onClick={() => setSelectedTab("ongoing")}
          >
            Ongoing
          </Button>
          <Button 
            className={selectedTab === "upcoming" ? "active" : ""} 
            onClick={() => setSelectedTab("upcoming")}
          >
            Upcoming
          </Button>
        </ButtonGroup>
      </div>

      {/* Search and Filter Section */}
      <div className={css`
        display: flex;
        flex-direction: row;
        gap: 1rem;
        margin-bottom: 2rem;
        align-items: center;
        width: 100%;
      `}>
        <TextField
          style={{ flex: 4 }}
          size="small"
          variant="outlined"
          placeholder="Search commits"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <img
                width="16px"
                height="16px"
                src="/search.svg"
                style={{ marginRight: "8px" }}
              />
            ),
            sx: {
              borderRadius: '25px',
              height: '44px',
            }
          }}
        />
        <FormControl style={{ flex: 2 }}>
          <Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            size="small"
            displayEmpty
            sx={{
              borderRadius: '25px',
              height: '44px',
            }}
          >
            <MenuItem disabled value="">
              <em>Sort By</em>
            </MenuItem>
            <MenuItem value="most_recent">Most Recent</MenuItem>
            <MenuItem value="stake_high">Stake Amount (High to Low)</MenuItem>
            <MenuItem value="stake_low">Stake Amount (Low to High)</MenuItem>
            <MenuItem value="my_commits">My Commits</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="contained"
          href="/commits/create"
          startIcon={<FiPlus size={16} strokeWidth={2} />}
          sx={{
            flex: 1,
            borderRadius: '25px',
            textTransform: 'none',
            backgroundColor: '#facc15',
            color: '#000',
            border: 'none',
            boxShadow: 'none',
            whiteSpace: 'nowrap',
            height: '44px',
            '&:hover': {
              backgroundColor: '#f59e0b',
              boxShadow: 'none',
            },
          }}
        >
          Create Commit
        </Button>
      </div>

      <div className={css`
        display: flex;
        flex-wrap: wrap;
        gap: 2rem;
        width: 100%;
        margin-top: 2rem;
      `}>
        {commitData.map((commit) => (
          <CommitCard key={commit.id} {...commit} />
        ))}
      </div>
    </div>
  );
};

export default CommitsDescription;
