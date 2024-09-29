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
  FormControl // Add this import
} from "@mui/material";
import daoData from "../data/daos.json";

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
};

const DAOCard = ({ dao }: { dao: DAO }) => {
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
    </div>
  );
};

// Add this type definition
type DAOsDescriptionType = {
  className?: string;
};

const DAOsDescription: NextPage<DAOsDescriptionType> = ({ className = "" }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredDAOs, setFilteredDAOs] = useState(daoData);
  const [selectedMaturity, setSelectedMaturity] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

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
  }, [searchTerm, selectedMaturity, selectedTags]);

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
        `,
        className,
      ].join(" ")}
    >
      <div className={css`
        display: flex;
        flex-direction: row;
        gap: 1rem;
        margin-bottom: 2rem;
        align-items: center;
        width: 100%; // Make the row stretch full width
      `}>
        <TextField
          style={{ flex: 6 }}
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
        font-size: var(--font-size-5xl);
        margin-bottom: 1rem;
      `}>
        {filteredDAOs.length} of {daoData.length}
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
        {filteredDAOs.length > 0 ? (
          filteredDAOs.map((dao, index) => (
            <DAOCard key={index} dao={dao} />
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