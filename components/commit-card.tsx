import type { NextPage } from "next";
import { css } from "@emotion/css";
import { Button } from "@mui/material";
import { FaCalendar, FaRegCalendar } from "react-icons/fa";

type CommitCardType = {
  id: string;
  avatarUrl: string;
  title: string;
  description: string;
  stakeAmount: string;
  dateRange: string;
  status: "in_progress" | "available" | "upcoming";
  isCommitted: boolean;
};

// Dummy data
export const commitData: CommitCardType[] = [
  {
    id: "1",
    avatarUrl: `bluntdaologobackground.png`,
    title: "Daily Morning Yoga Challenge",
    description: "Join our 10-day morning yoga challenge. Practice mindfulness and flexibility every day for better health and wellness.",
    stakeAmount: "10 USDC",
    dateRange: "April 1-10",
    status: "in_progress",
    isCommitted: true,
  },
  {
    id: "2",
    avatarUrl: `bluntdaologobackground.png`,
    title: "5K Running Challenge",
    description: "Challenge yourself to run 5K every day for a week. Track your progress and compete with others.",
    stakeAmount: "5 USDC",
    dateRange: "April 5-12",
    status: "available",
    isCommitted: false,
  },
  {
    id: "3",
    avatarUrl: "bluntdaologobackground.png",
    title: "30 Days of Meditation",
    description: "Start your meditation journey with this 30-day challenge. Build a daily practice of mindfulness.",
    stakeAmount: "0.15 ETH",
    dateRange: "April 1-30",
    status: "in_progress",
    isCommitted: false,
  },
  {
    id: "4",
    avatarUrl: "bluntdaologobackground.png",
    title: "Weekly Basketball Meetup",
    description: "Join our weekly basketball sessions. Improve your game and meet new players.",
    stakeAmount: "0.08 ETH",
    dateRange: "April 1-30",
    status: "in_progress",
    isCommitted: true,
  },
  {
    id: "5",
    avatarUrl: "bluntdaologobackground.png",
    title: "Daily Swimming Challenge",
    description: "Swim 1km daily for 2 weeks. Perfect your technique and build endurance.",
    stakeAmount: "0.12 ETH",
    dateRange: "April 15-29",
    status: "upcoming",
    isCommitted: false,
  },
  {
    id: "6",
    avatarUrl: "bluntdaologobackground.png",
    title: "Photography Workshop Series",
    description: "Learn photography basics through daily assignments and feedback sessions.",
    stakeAmount: "0.2 ETH",
    dateRange: "April 10-24",
    status: "upcoming",
    isCommitted: false,
  }
];

const CommitCard: NextPage<CommitCardType> = ({ 
  avatarUrl, 
  title, 
  description, 
  stakeAmount, 
  dateRange,
  status,
  isCommitted 
}) => {
  return (
    <div
      className={css`
        width: calc(33.33% - 1.33rem);
        box-shadow: 0px 0px 0px 0.85px rgba(17, 24, 28, 0.08),
          0px 0.8px 1.7px -0.85px rgba(17, 24, 28, 0.08),
          0px 1.7px 3.4px rgba(17, 24, 28, 0.04);
        border-radius: 16px;
        background-color: var(--background-default-default);
        padding: 1.5rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;

        @media screen and (max-width: 768px) {
          width: 100%;
        }
      `}
    >
      <div className={css`
        display: flex;
        justify-content: space-between;
        align-items: center;
      `}>
        <img 
          src={avatarUrl}
          className={css`
            width: 48px;
            height: 48px;
            border-radius: 50%;
            object-fit: cover;
          `}
        />
        <span className={css`
          padding: 4px 12px;
          border-radius: 16px;
          border: 1px solid #F97316;
          color: #F97316;
          background-color: rgba(249, 115, 22, 0.1);
          font-size: 14px;
          font-family: var(--font-hanken-grotesk);
        `}>
          In Progress
        </span>
      </div>

      <div>
        <h3 className={css`
          margin: 0;
          font-family: var(--font-hanken-grotesk);
          font-size: 1.25rem;
          font-weight: 600;
          color: #000;
          margin-bottom: 0.5rem;
        `}>
          {title}
        </h3>
        <p className={css`
          margin: 0;
          color: #6B7280;
          font-size: 0.875rem;
          font-family: var(--font-hanken-grotesk);
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        `}>
          {description}
        </p>
      </div>

      <div className={css`
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
      `}>
        <div>
          <p className={css`
            margin: 0;
            color: #6B7280;
            font-size: 0.875rem;
            font-family: var(--font-hanken-grotesk);
            margin-bottom: 0.5rem;
          `}>Stake</p>
          <p className={css`
            margin: 0;
            font-weight: 600;
            font-size: 0.875rem;
            font-family: var(--font-hanken-grotesk);
            color: #000;
            display: flex;
            align-items: center;
            gap: 0.25rem;
          `}>
            <img 
              src="https://cryptologos.cc/logos/usd-coin-usdc-logo.svg?v=040" 
              alt="USDC"
              className={css`
                width: 16px;
                height: 16px;
              `}
            />
            {stakeAmount}
          </p>
        </div>
        <div>
          <p className={css`
            margin: 0;
            color: #6B7280;
            font-size: 0.875rem;
            font-family: var(--font-hanken-grotesk);
            text-align: right;
          `}>Date</p>
          <p className={css`
            margin: 0;
            font-weight: 600;
            font-size: 0.875rem;
            font-family: var(--font-hanken-grotesk);
            color: #000;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            justify-content: flex-end;
          `}>
            <FaRegCalendar size={14} />
            <span>{dateRange}</span>
          </p>
        </div>
      </div>

      <hr className={css`
        margin: 0 0.1rem;
        border: none;
        height: 2px;
        background-color: #F8F8F8;
      `} />

      <Button
        variant="contained"
        disabled={isCommitted}
        sx={{
          backgroundColor: 'white',
          color: '#000',
          boxShadow: 'none',
          border: '1px solid #E5E7EB',
          borderRadius: '16px',
          textTransform: 'none',
          fontFamily: 'var(--font-hanken-grotesk)',
          fontSize: '0.875rem',
          fontWeight: 500,
          '&:hover': {
            backgroundColor: '#f9fafb',
            boxShadow: 'none',
          },
          '&.Mui-disabled': {
            backgroundColor: 'white',
            color: '#9CA3AF',
          }
        }}
      >
        {isCommitted ? "You're already committed" : "Commit"}
      </Button>
    </div>
  );
};

export default CommitCard;
