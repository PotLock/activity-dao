import type { NextPage } from "next";
import { Button } from "@mui/material";
import InputText from "./input-text";
import Select1 from "./select1";
import { css } from "@emotion/css";
import ActivityRow from "./activity-row";
import ActivityRow1 from "./activity-row1";
import BluntDAO from "./blunt-d-a-o";
import daoData from "../data/daos.json"; // add also for explore data
import eventData from "../data/events.json";

export type SearchFilterType = {
  className?: string;
};

const SearchFilter: NextPage<SearchFilterType> = ({ className = "" }) => {
  return (
    <div
      className={[
        css`
          align-self: stretch;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-start;
          gap: var(--gap-25xl);
          max-width: 100%;
          text-align: center;
          font-size: var(--font-size-13xl);
          color: var(--wwwgetminjiapp-black);
          font-family: var(--font-dynapuff);
          @media screen and (max-width: 750px) {
            gap: var(--gap-3xl);
          }
        `,
        className,
      ].join(" ")}
    >
      <form
        className={css`
          margin: 0;
          align-self: stretch;
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          justify-content: space-between;
          max-width: 100%;
          gap: var(--gap-xl);
          @media screen and (max-width: 1200px) {
            flex-wrap: wrap;
            justify-content: center;
          }
        `}
      >
        <div
          className={css`
            width: 62.063rem;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-start;
            gap: var(--gap-xl);
            max-width: 100%;
            @media screen and (max-width: 1050px) {
              flex-wrap: wrap;
            }
          `}
        >
          <InputText
            badgeVisibility
            iconRightVisibility
            buttonVisibility
            iconLeftVisibility
          />
          <Select1 />
        </div>
        <Button
          className={css`
            width: 9.106rem;
          `}
          disableElevation
          variant="contained"
          sx={{
            textTransform: "none",
            color: "#000",
            fontSize: "16",
            background: "#facc15",
            borderRadius: "9332.4px",
            "&:hover": { background: "#facc15" },
            width: 145.7,
          }}
        >
          Submit DAO
        </Button>
      </form>
      <div
        className={css`
          align-self: stretch;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-start;
          gap: var(--gap-21xl);
          max-width: 100%;
          @media screen and (max-width: 750px) {
            gap: var(--gap-xl);
          }
        `}
      >
        <div
          className={css`
            align-self: stretch;
            display: flex;
            flex-direction: row;
            align-items: flex-start;
            justify-content: flex-start;
            flex-wrap: wrap;
            align-content: flex-start;
            gap: 2.5rem 2.943rem;
            max-width: 100%;
            @media screen and (max-width: 750px) {
              gap: var(--gap-5xl);
            }
          `}
        >
          <ActivityRow
            freepikExportojB="/freepikexport20240924165639oj8b-3@2x.png"
            treeGens="TreeGens"
            gamifyReforestationWithTokenized="Gamify reforestation with tokenized mangroves, AI-verified planting, and dynamic Semi-Soulbound NFTs, aiming for transparency, ecological benefits, and a new tree-planting world record."
            buttonText="Outdoor"
            buttonText1="Wellness"
            propFlex="1"
            propFlex1="0.9659"
            propPadding2="unset"
            propPadding3="0rem var(--padding-10xs) 0rem 0rem"
            propBackgroundColor="#f5ebe2"
            propBackgroundColor1="#f1eefe"
            propColor="#a0744a"
            propColor1="#6d39e4"
          />
          <ActivityRow1
            image="/image6@2x.png"
            vrbsDAO="Vrbs DAO"
            buttonText="Outdoor"
            buttonText1="Wellness"
            propFlex="1"
            propFlex1="0.9659"
            propPadding1="unset"
            propPadding2="0rem var(--padding-10xs) 0rem 0rem"
            propBackgroundColor="#f5ebe2"
            propBackgroundColor1="#f1eefe"
            propColor="#a0744a"
            propColor1="#6d39e4"
          />
          <ActivityRow1
            propPadding="0rem var(--padding-158xl) 0rem 0rem"
            image="/image-11@2x.png"
            vrbsDAO="Spa DAO"
            buttonText="Outdoor"
            buttonText1="Wellness"
            propFlex="1"
            propFlex1="0.9659"
            propPadding1="unset"
            propPadding2="0rem var(--padding-10xs) 0rem 0rem"
            propBackgroundColor="#f5ebe2"
            propBackgroundColor1="#f1eefe"
            propColor="#a0744a"
            propColor1="#6d39e4"
          />
          <BluntDAO
            image="/image-21@2x.png"
            smokeDAO="Smoke DAO"
            weMakeSureBluntsGetSmokedPro="We make sure blunts get smoked. Proliferate the funding of seshing blunts and participating via proof of sesh."
            buttonText="Outdoor"
            buttonText1="Wellness"
            propFlex="1"
            propFlex1="0.9659"
            propPadding1="unset"
            propPadding2="0rem var(--padding-10xs) 0rem 0rem"
            propBackgroundColor="#f5ebe2"
            propBackgroundColor1="#f1eefe"
            propColor="#a0744a"
            propColor1="#6d39e4"
          />
          <ActivityRow
            propPadding="0rem 0rem var(--padding-xs)"
            propPadding1="0rem var(--padding-127xl) 0rem 0rem"
            propGap="6px"
            freepikExportojB="/jointslogo-11@2x.png"
            propWidth="6.563rem"
            treeGens="Blunt DAO"
            gamifyReforestationWithTokenized="We make sure blunts get smoked. Proliferate the funding of seshing blunts and participating via proof of sesh."
            buttonText="Outdoor"
            buttonText1="Wellness"
            propFlex="1"
            propFlex1="0.9659"
            propPadding2="unset"
            propPadding3="0rem var(--padding-10xs) 0rem 0rem"
            propBackgroundColor="#f5ebe2"
            propBackgroundColor1="#f1eefe"
            propColor="#a0744a"
            propColor1="#6d39e4"
          />
          <BluntDAO
            propPadding="0rem var(--padding-95xl) 0rem 0rem"
            image="/image-31@2x.png"
            smokeDAO="Waffles DAO"
            propAlignSelf="unset"
            weMakeSureBluntsGetSmokedPro="Waffles dao is a fun place where we make money and teach people to secure profits and be a better trader👨‍💼"
            buttonText="Outdoor"
            buttonText1="Wellness"
            propFlex="1"
            propFlex1="0.9659"
            propPadding1="unset"
            propPadding2="0rem var(--padding-10xs) 0rem 0rem"
            propBackgroundColor="#f5ebe2"
            propBackgroundColor1="#f1eefe"
            propColor="#a0744a"
            propColor1="#6d39e4"
          />
          {daoData.map((dao, index) => (
            dao.name === "Pizza DAO" && (
              <ActivityRow
                key={index}
                freepikExportojB={dao.image}
                treeGens={dao.name}
                gamifyReforestationWithTokenized={dao.description}
                buttonText={dao.tags[0]}
                buttonText1={dao.tags[1]}
                propFlex="1"
                propFlex1="0.9659"
                propPadding2="unset"
                propPadding3="0rem var(--padding-10xs) 0rem 0rem"
                propBackgroundColor="#f5ebe2"
                propBackgroundColor1="#f1eefe"
                propColor="#a0744a"
                propColor1="#6d39e4"
              />
            )
          ))}
          <ActivityRow
            propPadding="0rem 0rem var(--padding-xs)"
            propPadding1="0rem var(--padding-131xl) 0rem 0rem"
            propGap="6px"
            freepikExportojB="/image-108@2x.png"
            propWidth="5.188rem"
            treeGens="Pizza DAO"
            gamifyReforestationWithTokenized="we make sure pizza gets eaten - mechanisms to proliferate the funding of pizza parties powered by Web3"
            buttonText="Outdoor"
            buttonText1="Wellness"
            propFlex="1"
            propFlex1="0.9659"
            propPadding2="unset"
            propPadding3="0rem var(--padding-10xs) 0rem 0rem"
            propBackgroundColor="#f5ebe2"
            propBackgroundColor1="#f1eefe"
            propColor="#a0744a"
            propColor1="#6d39e4"
          />
          <ActivityRow
            propPadding="0rem 0rem var(--padding-xs)"
            propPadding1="0rem var(--padding-101xl) 0rem 0rem"
            propGap="6px"
            freepikExportojB="/image-41@2x.png"
            propWidth="5.188rem"
            treeGens="Hotpot DAO"
            gamifyReforestationWithTokenized="Hotpotdao is a social network that offers frens in crypto to eat Hotpot, making frens from different cultures and backgrounds."
            buttonText="Outdoor"
            buttonText1="Wellness"
            propFlex="1"
            propFlex1="0.9659"
            propPadding2="unset"
            propPadding3="0rem var(--padding-10xs) 0rem 0rem"
            propBackgroundColor="#f5ebe2"
            propBackgroundColor1="#f1eefe"
            propColor="#a0744a"
            propColor1="#6d39e4"
          />
          <BluntDAO
            propPadding="0rem var(--padding-105xl) 0rem 0rem"
            image="/image-51@2x.png"
            smokeDAO="Ramen DAO"
            propAlignSelf="stretch"
            weMakeSureBluntsGetSmokedPro="Community for global web3 founders and builders"
            buttonText="Outdoor"
            buttonText1="Wellness"
            propFlex="1"
            propFlex1="0.9659"
            propPadding1="unset"
            propPadding2="0rem var(--padding-10xs) 0rem 0rem"
            propBackgroundColor="#f5ebe2"
            propBackgroundColor1="#f1eefe"
            propColor="#a0744a"
            propColor1="#6d39e4"
          />
        </div>
        <ActivityRow
          propPadding="0rem 0rem var(--padding-xs)"
          propPadding1="0rem var(--padding-121xl) 0rem 0rem"
          propGap="6px"
          freepikExportojB="/image-6@2x.png"
          propWidth="5.188rem"
          treeGens="Gnars DAO"
          gamifyReforestationWithTokenized="Gnars is a headless brand that empowers action sportspeople with a shared treasury and tools for collective creation. We prefer a world where kids aren’t shilled energy drinks by their heroes. So we’ve formed a DAO to rethink how shredders get paid."
          buttonText="Outdoor"
          buttonText1="Wellness"
          propFlex="1"
          propPadding2="unset"
          propBackgroundColor="#f5ebe2"
          propColor="#a0744a"
        />
      </div>
    </div>
  );
};

export default SearchFilter;