import type { NextPage } from "next";
import { css } from "@emotion/css";
import { useState } from "react";
import { ButtonGroup, Button } from "@mui/material";
import { FaRegCalendar, FaMapMarkerAlt, FaChevronRight } from "react-icons/fa";
import NAVBAR from "../../components/n-a-v-b-a-r";
import Footer from "../../components/Footer";

const CommitDetail: NextPage = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className={css`
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    `}>
      <NAVBAR />
      
      <main className={css`
        flex: 1;
        display: flex;
        justify-content: center;
        padding: 2rem 1rem;
        margin-top: 8rem;
      `}>
        <div className={css`
          max-width: 1024px;
          width: 100%;
          padding: 2rem;
        `}>
          {/* Event Image and Title Section */}
          <div className={css`
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            margin-bottom: 2rem;
          `}>
            <img 
              src="/bluntdaologobackground.png" 
              alt="Event"
              className={css`
                width: 120px;
                height: 120px;
                border-radius: 50%;
                margin-bottom: 1.5rem;
              `}
            />

            <div className={css`
              display: flex;
              justify-content: space-between;
              align-items: center;
              width: 100%;
              margin-bottom: 1.5rem;
            `}>
              <h1 className={css`
                text-align: left;
                font-family: var(--font-hanken-grotesk);
                font-weight: 600;
              `}>
                Daily Morning Yoga Challenge
              </h1>

              <div className={css`
                display: flex;
                gap: 1rem;
                @media (max-width: 768px) {
                  display: none;
                }
              `}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: '#F3F4F6',
                    color: '#000',
                    textTransform: 'none',
                    fontWeight: 500,
                    padding: '0.75rem 2rem',
                    borderRadius: '8px',
                    boxShadow: 'none',
                    minWidth: '140px',
                    '&:hover': {
                      backgroundColor: '#E5E7EB',
                      boxShadow: 'none',
                    },
                  }}
                >
                  Add Reward
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: '#facc15',
                    color: '#000',
                    textTransform: 'none',
                    fontWeight: 500,
                    padding: '0.75rem 2rem',
                    borderRadius: '8px',
                    boxShadow: 'none',
                    minWidth: '140px',
                    '&:hover': {
                      backgroundColor: '#f59e0b',
                      boxShadow: 'none',
                    },
                  }}
                >
                  Commit
                </Button>
              </div>
            </div>

            {/* Creator */}
            <div className={css`
              display: flex;
              align-items: center;
              gap: 0.5rem;
              margin-bottom: 2rem;
            `}>
              <img 
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=1"
                alt="Creator"
                className={css`
                  width: 24px;
                  height: 24px;
                  border-radius: 50%;
                `}
              />
              <span>Created by 0x1234...5678</span>
            </div>
          </div>

          {/* Date and Location */}
          <div className={css`
            display: flex;
            justify-content: space-between;
            margin-bottom: 2rem;
          `}>
            {/* Date Section */}
            <div className={css`
              display: flex;
              gap: 1rem;
            `}>
              <div className={css`
                width: 48px;
                height: 48px;
                border: 1px solid #E5E7EB;
                border-radius: 8px;
                display: flex;
                align-items: center;
                justify-content: center;
              `}>
                <FaRegCalendar size={20} />
              </div>
              <div>
                <div className={css`
                  font-weight: 500;
                  margin-bottom: 0.25rem;
                `}>
                  Monday, April 1st
                </div>
                <div className={css`color: #6B7280;`}>
                  10:00 AM GMT+8
                </div>
              </div>
            </div>

            {/* Location Section */}
            <div className={css`
              display: flex;
              gap: 1rem;
            `}>
              <div className={css`
                width: 48px;
                height: 48px;
                border: 1px solid #E5E7EB;
                border-radius: 8px;
                display: flex;
                align-items: center;
                justify-content: center;
              `}>
                <FaMapMarkerAlt size={20} />
              </div>
              <div>
                <div className={css`
                  font-weight: 500;
                  margin-bottom: 0.25rem;
                  display: flex;
                  align-items: center;
                  gap: 0.5rem;
                `}>
                  477, Lorem ipsum
                  <FaChevronRight size={12} />
                </div>
                <div className={css`color: #6B7280;`}>
                  Street name, City
                </div>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className={css`
            display: flex;
            justify-content: space-between;
            padding: 2rem;
            background: white;
            border-radius: 12px;
            margin-bottom: 2rem;
            box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
            text-align: center;
          `}>
            {/* Deposit Amount */}
            <div>
              <div className={css`
                color: #6B7280;
                font-size: 0.875rem;
                margin-bottom: 0.5rem;
              `}>
                Deposit Amount
              </div>
              <div className={css`
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 0.25rem;
                font-size: 1.125rem;
                font-weight: 600;
                color: #111827;
              `}>
                <img 
                  src="https://cryptologos.cc/logos/usd-coin-usdc-logo.svg?v=040" 
                  alt="USDC"
                  width={20}
                  height={20}
                />
                <span>10 USDC</span>
              </div>
              <div className={css`
                font-size: 0.75rem;
                color: #6B7280;
                margin-top: 0.25rem;
              `}>
                +0.1 USDC protocol fees
              </div>
            </div>

            {/* Vertical Separator */}
            <div className={css`
              width: 1px;
              height: 40px;
              background: #E5E7EB;
              align-self: center;
            `} />

            {/* Participants */}
            <div>
              <div className={css`
                color: #6B7280;
                font-size: 0.875rem;
                margin-bottom: 0.5rem;
              `}>
                Participants
              </div>
              <div className={css`
                font-size: 1.125rem;
                font-weight: 600;
                color: #111827;
              `}>
                23/100
              </div>
            </div>

            {/* Vertical Separator */}
            <div className={css`
              width: 1px;
              height: 40px;
              background: #E5E7EB;
              align-self: center;
            `} />

            {/* Rewards */}
            <div>
              <div className={css`
                color: #6B7280;
                font-size: 0.875rem;
                margin-bottom: 0.5rem;
              `}>
                Rewards
              </div>
              <div className={css`
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 0.25rem;
                font-size: 1.125rem;
                font-weight: 600;
                color: #111827;
              `}>
                <img 
                  src="https://cryptologos.cc/logos/usd-coin-usdc-logo.svg?v=040" 
                  alt="USDC"
                  width={20}
                  height={20}
                />
                <span>0 USDC</span>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className={css`
            margin-bottom: 2rem;
            display: flex;
            justify-content: flex-start;
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
              }}
            >
              <Button 
                className={activeTab === "overview" ? "active" : ""} 
                onClick={() => setActiveTab("overview")}
              >
                Overview
              </Button>
              <Button 
                className={activeTab === "participants" ? "active" : ""} 
                onClick={() => setActiveTab("participants")}
              >
                Participants
              </Button>
            </ButtonGroup>
          </div>

          {/* Tab Content */}
          {activeTab === "overview" ? (
            <div>
              <h3 className={css`
                font-weight: 600;
                margin-bottom: 1rem;
              `}>About Event</h3>
              <p className={css`
                margin-bottom: 2rem;
              `}>
                Join our 10-day morning yoga challenge. Practice mindfulness and flexibility every day for better health and wellness.
              </p>
            </div>
          ) : (
            <div>
              <table className={css`
                width: 100%;
                border-collapse: collapse;
              `}>
                <thead>
                  <tr className={css`
                    border-bottom: 1px solid #E5E7EB;
                  `}>
                    <th className={css`
                      text-align: left;
                      padding: 1rem 0;
                      color: #6B7280;
                      font-weight: 500;
                    `}>Participant</th>
                    <th className={css`
                      text-align: right;
                      padding: 1rem 0;
                      color: #6B7280;
                      font-weight: 500;
                    `}>When Joined</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className={css`
                    border-bottom: 1px solid #E5E7EB;
                  `}>
                    <td className={css`padding: 1rem 0;`}>0x1234...5678</td>
                    <td className={css`
                      text-align: right;
                      padding: 1rem 0;
                      color: #6B7280;
                    `}>2 days ago</td>
                  </tr>
                  {/* Add more rows as needed */}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CommitDetail;
