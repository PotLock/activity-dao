import BasePopup from './base-popup';
import { Button } from '@mui/material';
import { FaTrophy } from 'react-icons/fa';
import { css } from '@emotion/css';

interface ClaimRewardPopupProps {
  open: boolean;
  onClose: () => void;
}

const ClaimRewardPopup = ({ open, onClose }: ClaimRewardPopupProps) => {
  return (
    <BasePopup open={open} onClose={onClose}>
      <h2 className={css`
        text-align: center;
        margin-bottom: 0.75rem;
        font-size: 1.5rem;
        font-weight: 600;
      `}>Claim Reward</h2>

      <div className={css`
        text-align: center;
      `}>
        <FaTrophy
          size={48}
          color="#facc15"
          className={css`margin-bottom: 0.75rem;`}
        />
        
        <h3 className={css`
          font-size: 2rem;
          font-weight: 600;
          margin-bottom: 0.75rem;
        `}>120 USDC</h3>

        <p className={css`
          color: #6B7280;
          margin-bottom: 1.5rem;
          font-size: 0.875rem;
        `}>Congratulations! You can now claim your reward.</p>

        <Button
          fullWidth
          sx={{
            borderRadius: '25px',
            textTransform: 'none',
            backgroundColor: '#facc15',
            color: '#000',
            padding: '0.75rem',
            '&:hover': {
              backgroundColor: '#f59e0b',
            },
          }}
        >
          Claim Now
        </Button>
      </div>
    </BasePopup>
  );
};

export default ClaimRewardPopup;
