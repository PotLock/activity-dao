import BasePopup from './base-popup';
import { Button } from '@mui/material';
import { css } from '@emotion/css';

interface ConfirmCommitmentPopupProps {
  open: boolean;
  onClose: () => void;
}

const ConfirmCommitmentPopup = ({ open, onClose }: ConfirmCommitmentPopupProps) => {
  return (
    <BasePopup open={open} onClose={onClose}>
      <h2 className={css`
        text-align: center;
        margin-bottom: 1rem;
        font-size: 1.5rem;
        font-weight: 600;
      `}>Confirm Commitment</h2>

      <div className={css`margin-bottom: 1rem;`}>
        <p className={css`
          color: #6B7280;
          margin-bottom: 0.5rem;
        `}>Event</p>
        <p className={css`
          font-weight: 500;
          font-size: 1.125rem;
        `}>Web3 Meetup in Paris</p>
      </div>

      <hr className={css`
        border: none;
        border-top: 1px solid #E5E7EB;
        margin: 1rem 0;
      `} />

      <p className={css`
        color: #6B7280;
        margin-bottom: 0.75rem;
        font-size: 0.875rem;
      `}>Amount Breakdown</p>

      <div className={css`
        background-color: #F3F4F6;
        padding: 1rem;
        border-radius: 8px;
        margin-bottom: 1.5rem;
        font-size: 0.875rem;
      `}>
        <div className={css`
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.5rem;
        `}>
          <span>Deposit Amount</span>
          <span>120 USDC</span>
        </div>
        <div className={css`
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.5rem;
        `}>
          <span>Protocol Fees</span>
          <span>+0.14 USDC</span>
        </div>
        <div className={css`
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.5rem;
        `}>
          <span>Creator Fees</span>
          <span>-1.2 USDC</span>
        </div>
        <hr className={css`
          border: none;
          border-top: 1px solid #E5E7EB;
          margin: 0.5rem 0;
        `} />
        <div className={css`
          display: flex;
          justify-content: space-between;
          font-weight: 500;
        `}>
          <span>Total</span>
          <span>119.2 USDC</span>
        </div>
      </div>

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
        Confirm Commitment
      </Button>
    </BasePopup>
  );
};

export default ConfirmCommitmentPopup;
