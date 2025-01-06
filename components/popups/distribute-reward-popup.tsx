import { css } from '@emotion/css';
import { Button } from '@mui/material';
import BasePopup from './base-popup';

interface RewardItem {
  logo: string;
  amount: string;
  token: string;
}

interface DistributeRewardPopupProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  rewards: RewardItem[];
  verifiedCount: number;
}

const DistributeRewardPopup = ({ 
  open, 
  onClose, 
  onConfirm, 
  rewards, 
  verifiedCount 
}: DistributeRewardPopupProps) => {
  return (
    <BasePopup open={open} onClose={onClose}>
      <h2 className={css`
        text-align: center;
        margin-bottom: 1rem;
        font-size: 1.5rem;
        font-weight: 600;
      `}>Distribute Reward</h2>

      <p className={css`
        text-align: center;
        color: #6B7280;
        margin-bottom: 2rem;
        font-size: 0.875rem;
      `}>
        Are you sure you want to distribute the rewards? This action cannot be undone.
      </p>

      <div className={css`
        padding: 1rem;
        margin-bottom: 1rem;
      `}>
        {rewards.map((reward, index) => (
          <div
            key={index}
            className={css`
              display: flex;
              align-items: center;
              gap: 0.75rem;
              padding: 0.5rem 0;
              ${index > 0 ? 'border-top: 1px solid #E5E7EB;' : ''}
            `}
          >
            <img 
              src={reward.logo}
              alt={reward.token}
              className={css`
                width: 24px;
                height: 24px;
              `}
            />
            <span className={css`font-weight: 500;`}>
              {reward.amount} {reward.token}
            </span>
          </div>
        ))}
      </div>

      <p className={css`
        text-align: center;
        color: #6B7280;
        margin-bottom: 2rem;
        font-size: 0.875rem;
      `}>
        These rewards will be distributed among {verifiedCount} verified attendees
      </p>

      <div className={css`
        display: flex;
        gap: 1rem;
      `}>
        <Button
          fullWidth
          onClick={onClose}
          sx={{
            backgroundColor: '#F3F4F6',
            color: '#000',
            textTransform: 'none',
            fontWeight: 500,
            padding: '0.75rem',
            borderRadius: '8px',
            boxShadow: 'none',
            '&:hover': {
              backgroundColor: '#E5E7EB',
              boxShadow: 'none',
            },
          }}
        >
          Close
        </Button>
        <Button
          fullWidth
          onClick={onConfirm}
          sx={{
            backgroundColor: '#facc15',
            color: '#000',
            textTransform: 'none',
            fontWeight: 500,
            padding: '0.75rem',
            borderRadius: '8px',
            boxShadow: 'none',
            '&:hover': {
              backgroundColor: '#f59e0b',
              boxShadow: 'none',
            },
          }}
        >
          Confirm Distribution
        </Button>
      </div>
    </BasePopup>
  );
};

// Example usage:
const mockRewards = [
  { logo: "https://cryptologos.cc/logos/usd-coin-usdc-logo.svg?v=040", amount: "20", token: "USDC" },
  { logo: "https://cryptologos.cc/logos/usd-coin-usdc-logo.svg?v=040", amount: "15", token: "USDC" },
  { logo: "https://cryptologos.cc/logos/usd-coin-usdc-logo.svg?v=040", amount: "10", token: "USDC" },
];

export default DistributeRewardPopup;
