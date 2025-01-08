import type { NextPage } from "next";
import { css } from "@emotion/css";
import { Button } from "@mui/material";
import { FaCalendar, FaRegCalendar } from "react-icons/fa";
import { useRouter } from 'next/router';

type CommitCardType = {
  id: string;
  avatarUrl: string;
  title: string;
  description: string;
  stakeAmount: number;
  dateRange: [string, string];
  status: "in_progress" | "available" | "upcoming";
  isCommitted?: boolean;
};

// Dummy data
export const commitData: CommitCardType[] = [
  {
    id: "1",
    avatarUrl: "/bluntdaologobackground.png",
    title: "Morning Run Club",
    description: "Join us for daily morning runs blah blah blah blah blah blah blah blah blah blah blah blah blah blah",
    stakeAmount: 0.1,
    dateRange: ["2024-03-01", "2024-03-31"],
    status: "in_progress",
  },
  {
    id: "2",
    avatarUrl: "/bluntdaologobackground.png",
    title: "Weekend Hiking Group",
    description: "Weekly hiking adventures blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah",
    stakeAmount: 0.2,
    dateRange: ["2024-04-01", "2024-04-30"],
    status: "upcoming",
  },
  {
    id: "3",
    avatarUrl: "bluntdaologobackground.png",
    title: "30 Days of Meditation",
    description: "Start your meditation journey with this 30-day challenge. Build a daily practice of mindfulness.",
    stakeAmount: 0.15,
    dateRange: ["2024-04-01", "2024-04-30"],
    status: "in_progress",
    isCommitted: false,
  },
  {
    id: "4",
    avatarUrl: "bluntdaologobackground.png",
    title: "Weekly Basketball Meetup",
    description: "Join our weekly basketball sessions. Improve your game and meet new players.",
    stakeAmount: 0.08,
    dateRange: ["2024-04-01", "2024-04-30"],
    status: "upcoming",
    isCommitted: true,
  },
  {
    id: "5",
    avatarUrl: "bluntdaologobackground.png",
    title: "Daily Swimming Challenge",
    description: "Swim 1km daily for 2 weeks. Perfect your technique and build endurance.",
    stakeAmount: 0.12,
    dateRange: ["2024-04-15", "2024-04-29"],
    status: "upcoming",
    isCommitted: false,
  },
  {
    id: "6",
    avatarUrl: "bluntdaologobackground.png",
    title: "Photography Workshop Series",
    description: "Learn photography basics through daily assignments and feedback sessions.",
    stakeAmount: 0.2,
    dateRange: ["2024-04-10", "2024-04-24"],
    status: "in_progress",
    isCommitted: false,
  }
];

// Add this helper function to get status styles
const getStatusStyles = (status: "in_progress" | "available" | "upcoming") => {
  switch (status) {
    case "in_progress":
      return {
        color: "#F97316",
        borderColor: "#F97316",
        backgroundColor: "rgba(249, 115, 22, 0.1)",
        text: "In Progress"
      };
    case "available":
      return {
        color: "#10B981",
        borderColor: "#10B981",
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        text: "Available"
      };
    case "upcoming":
      return {
        color: "#6366F1",
        borderColor: "#6366F1",
        backgroundColor: "rgba(99, 102, 241, 0.1)",
        text: "Upcoming"
      };
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric' 
  });
};

const CommitCard: NextPage<CommitCardType> = ({ 
  id, 
  avatarUrl, 
  title, 
  description, 
  stakeAmount, 
  dateRange,
  status,
  isCommitted 
}) => {
  const router = useRouter();
  const statusStyles = getStatusStyles(status);

  return (
    <div
      onClick={() => router.push(`/commit/${id}`)}
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
        cursor: pointer;
        transition: transform 0.2s ease;
        &:hover {
          transform: translateY(-2px);
        }

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
          border: 1px solid ${statusStyles.borderColor};
          color: ${statusStyles.color};
          background-color: ${statusStyles.backgroundColor};
          font-size: 14px;
          font-family: var(--font-hanken-grotesk);
        `}>
          {statusStyles.text}
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
        gap: 1rem;
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
            white-space: nowrap;
          `}>
            <FaRegCalendar size={14} />
            <span>{formatDate(dateRange[0])} - {formatDate(dateRange[1])}</span>
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
