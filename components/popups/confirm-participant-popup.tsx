import { css } from '@emotion/css';
import { Button } from '@mui/material';
import BasePopup from './base-popup';

interface ConfirmParticipantPopupProps {
  open: boolean;
  onClose: () => void;
  onVerify: () => void;
}

const ConfirmParticipantPopup = ({ open, onClose, onVerify }: ConfirmParticipantPopupProps) => {
  return (
    <BasePopup open={open} onClose={onClose}>
      <h2 className={css`
        text-align: center;
        margin-bottom: 1.5rem;
        font-size: 1.5rem;
        font-weight: 600;
      `}>Confirm Participant</h2>

      <div className={css`
        margin-bottom: 1rem;
      `}>
        <div className={css`
          display: flex;
          justify-content: space-between;
          color: #6B7280;
          font-size: 0.875rem;
          margin-bottom: 0.5rem;
        `}>
          <span>Participant</span>
          <span>Amount</span>
        </div>
        
        <hr className={css`
          border: none;
          border-top: 1px solid #E5E7EB;
          margin: 0.5rem 0;
        `} />

        <div className={css`
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.875rem;
        `}>
          <span>Amichale</span>
          <span>12 USDC</span>
        </div>
      </div>

      <div className={css`
        display: flex;
        gap: 1rem;
        margin-top: 2rem;
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
          onClick={onVerify}
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
          Verify & Approve
        </Button>
      </div>
    </BasePopup>
  );
};

export default ConfirmParticipantPopup;
