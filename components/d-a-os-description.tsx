import type { NextPage } from "next";
import { css } from "@emotion/css";
import { useState, useEffect } from "react";
import { 
  TextField, 
  Checkbox, 
  FormControlLabel, 
  FormGroup, 
  Select, 
  MenuItem, 
  InputLabel, 
  ListItemText, 
  OutlinedInput,
  Button,
  FormControl // Add this import
} from "@mui/material";
import daoData from "../data/daos.json";
import { FaTwitter, FaGithub } from "react-icons/fa";
import CardSkeleton from './card-skeleton';
import { Button as MuiButton } from "@mui/material"; // Rename to avoid conflict

const pastelColors = [
  '#FFB3BA', '#BAFFC9', '#BAE1FF', '#FFFFBA', '#FFDFBA', '#E0BBE4'
];

const Tag = ({ text, color }: { text: string; color: string }) => (
  <span
    className={css`
      display: inline-block;
      padding: 2px 8px;
      margin-right: 4px;
      margin-bottom: 4px;
      border-radius: 12px;
      font-size: 0.75rem;
      background-color: ${color};
      color: #333;
    `}
  >
    {text}
  </span>
);

// Add this type definition
type DAO = {
  name: string;
  icon: string;
  url: string;
  description: string;
  maturity: string[];
  tags: string[];
  twitter?: string; // Add this optional field
  github?: string; // Add this optional field
};

const DAOCard = ({ dao, mode }: { dao: DAO; mode: 'explore' | 'home' }) => {
  const [isHovered, setIsHovered] = useState(false);

  const maturityTags = dao.maturity.slice(-3).reverse();

  return (
    <div
      className={css`
        width: calc(33.33% - 1.33rem); // Set width to 1/3 of container minus gap
        box-shadow: 0px 0px 0px 0.85px rgba(17, 24, 28, 0.08),
          0px 0.8px 1.7px -0.85px rgba(17, 24, 28, 0.08),
          0px 1.7px 3.4px rgba(17, 24, 28, 0.04);
        border-radius: var(--br-sm);
        background-color: var(--background-default-default);
        overflow: hidden;
        flex-shrink: 0;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        padding: var(--padding-11xl) var(--padding-mid) var(--padding-16xl);
        box-sizing: border-box;
        gap: var(--gap-lg);
        max-width: 100%;
        transition: all 0.3s ease;
        ${isHovered && `
          background-color: var(--color-yellow-64);
        `}
        ${mode === 'explore' ? `
          width: calc(50% - 1.33rem); // Wider cards for explore mode
        ` : ''}
        @media screen and (max-width: 768px) {
          width: 100% !important; // Full width on mobile for both modes
        }
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={css`
          align-self: stretch;
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          justify-content: space-between;
          gap: var(--gap-xl);
        `}
      >
        <div
          className={css`
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: flex-start;
            gap: var(--gap-sm);
          `}
        >
          <img
            className={css`
              width: 5.688rem;
              height: 4.563rem;
              object-fit: cover;
            `}
            alt={dao.name}
            src={dao.icon}
          />
          <h1
            className={css`
              margin: 0;
              position: relative;
              font-size: var(--font-size-13xl);
              line-height: 2.738rem;
              font-weight: 500;
              font-family: var(--font-dynapuff);
              color: var(--wwwgetminjiapp-black);
              @media screen and (max-width: 1050px) {
                font-size: var(--font-size-7xl);
                line-height: 2.188rem;
              }
              @media screen and (max-width: 450px) {
                font-size: var(--font-size-lgi);
                line-height: 1.625rem;
              }
              text-align: left; // Justify the name to the left
              margin-bottom: 4px;
            `}
          >
            {dao.name}
          </h1>
          <div
            className={css`
              display: flex;
              flex-wrap: wrap;
              align-items: flex-start;
              justify-content: flex-start;
              gap: 2px;
              margin-bottom: 2px;
            `}
          >
            {maturityTags.map((tag, index) => (
              <Tag key={index} text={tag} color={pastelColors[index % pastelColors.length]} />
            ))}
          </div>
          <div
            className={css`
              display: flex;
              flex-wrap: wrap;
              align-items: flex-start;
              justify-content: flex-start;
              gap: 2px;
            `}
          >
            {dao.tags.map((tag, index) => (
              <Tag key={index} text={tag} color={pastelColors[(index + 3) % pastelColors.length]} />
            ))}
          </div>
        </div>
        <a href={dao.url} target="_blank" rel="noopener noreferrer">
          <img
            className={css`
              height: 2.5rem;
              width: 2.5rem;
              position: relative;
              overflow: hidden;
              flex-shrink: 0;
            `}
            alt="Open in new tab"
            src="/vertical-container.svg"
          />
        </a>
      </div>
      <div
        className={css`
          position: relative;
          font-size: var(--font-size-base);
          line-height: 1.313rem;
          font-family: var(--font-alexandria);
          text-align: left;
          color: var(--wwwgetminjiapp-black);
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          height: 3.939rem; // Set a fixed height for 3 lines
        `}
      >
        {dao.description}
      </div>
      {mode === 'explore' && (
        <div className={css`
          display: flex;
          justify-content: flex-start;
          align-items: center;
          width: 100%;
          margin-top: 1rem;
          gap: 1rem;
        `}> 
          {dao.twitter && (
            <a 
              href={dao.twitter}
              target="_blank" 
              rel="noopener noreferrer"
              className={css`
                color: #1DA1F2;
                display: flex;
                align-items: center;
                text-decoration: none;
                font-size: 0.9rem;
                &:hover {
                  text-decoration: underline;
                }
              `}
            >
              <FaTwitter/>
            </a>
          )}
          {dao.github && (
            <a 
              href={dao.github}
              target="_blank" 
              rel="noopener noreferrer"
              className={css`
                color: #333;
                display: flex;
                align-items: center;
                text-decoration: none;
                font-size: 0.9rem;
                &:hover {
                  text-decoration: underline;
                }
              `}
            >
              <FaGithub />
            </a>
          )}
        </div>
      )}
    </div>
  );
};

// Add this type definition
type DAOsDescriptionType = {
  className?: string;
  mode: 'explore' | 'home';
};

const DAOsDescription: NextPage<DAOsDescriptionType> = ({ className = "" , mode = "explore" }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredDAOs, setFilteredDAOs] = useState(daoData);
  const [selectedMaturity, setSelectedMaturity] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const allMaturityTags = Array.from(new Set(daoData.flatMap(dao => dao.maturity)));
  const allTags = Array.from(new Set(daoData.flatMap(dao => dao.tags)));

  useEffect(() => {
    const filtered = daoData.filter(dao => {
      const matchesSearch = 
        dao.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dao.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesMaturity = selectedMaturity.length === 0 || 
        selectedMaturity.some(tag => dao.maturity.includes(tag));
      
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.some(tag => dao.tags.includes(tag));

      return matchesSearch && matchesMaturity && matchesTags;
    });
    setFilteredDAOs(filtered);
    setIsLoading(false);
  }, [searchTerm, selectedMaturity, selectedTags]);

  const handleSubmitDAO = () => {
    window.open('https://github.com/PotLock/activity-dao/edit/main/data/daos.json', '_blank');
  };

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
            padding-top: 5rem; // Add additional padding for explore mode
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
      {mode === 'home' && (
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
      )}
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
      <div className={css`
        display: flex;
        flex-direction: row;
        gap: 1rem;
        margin-bottom: 2rem;
        align-items: center;
        width: 100%;
      `}>
        <TextField
          style={{ flex: mode === 'explore' ? 5 : 6 }}
          variant="outlined"
          placeholder="Search DAOs"
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
          }}
        />
        <FormControl style={{ flex: 2 }}> 
          <InputLabel>Maturity</InputLabel>
          <Select
            multiple
            value={selectedMaturity}
            onChange={(e) => setSelectedMaturity(typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value)}
            input={<OutlinedInput label="Maturity" />}
            renderValue={(selected) => selected.join(', ')}
          >
            {allMaturityTags.map((tag) => (
              <MenuItem key={tag} value={tag}>
                <Checkbox checked={selectedMaturity.indexOf(tag) > -1} />
                <ListItemText primary={tag} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl style={{ flex: 2 }}>
          <InputLabel>Tags</InputLabel>
          <Select
            multiple
            value={selectedTags}
            onChange={(e) => setSelectedTags(typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value)}
            input={<OutlinedInput label="Tags" />}
            renderValue={(selected) => selected.join(', ')}
          >
            {allTags.map((tag) => (
              <MenuItem key={tag} value={tag}>
                <Checkbox checked={selectedTags.indexOf(tag) > -1} />
                <ListItemText primary={tag} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className={css`
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        margin-bottom: 1rem;
      `}>
        <div className={css`
          font-size: var(--font-size-5xl);
        `}>
          {filteredDAOs.length} of {daoData.length}
        </div>
        {mode === 'explore' && (
          <MuiButton
            variant="contained"
            onClick={handleSubmitDAO}
            sx={{
              backgroundColor: "#facc15",
              color: "#000",
              '&:hover': {
                backgroundColor: "#facc15",
              },
            }}
          >
            Submit DAO
          </MuiButton>
        )}
      </div>
      <div
        className={css`
          align-self: stretch;
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          align-items: flex-start;
          justify-content: flex-start;
          padding: 0rem var(--padding-8xs) 0rem 0rem;
          box-sizing: border-box;
          gap: var(--gap-2xl);
          max-width: 100%;
          text-align: center;
          font-size: var(--font-size-13xl);
          color: var(--wwwgetminjiapp-black);
          font-family: var(--font-dynapuff);
        `}
      >
        {isLoading ? (
          // Display skeleton loaders while loading
          Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className={css`
              width: calc(33.33% - 1.33rem);
              ${mode === 'explore' ? `
                width: calc(50% - 1.33rem);
              ` : ''}
            `}>
              <CardSkeleton />
            </div>
          ))
        ) : filteredDAOs.length > 0 ? (
          filteredDAOs.map((dao, index) => (
            <DAOCard key={index} dao={dao} mode={mode} />
          ))
        ) : (
          <div className={css`
            width: 100%;
            text-align: center;
            font-size: var(--font-size-5xl);
            color: var(--wwwgetminjiapp-black);
            padding: 2rem;
          `}>
            No DAOs found
          </div>
        )}
      </div>
    </div>
  );
};

export default DAOsDescription;