import { css } from '@emotion/css';
import { Button } from '@mui/material';
import BasePopup from './base-popup';

interface ResolveCommitPopupProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ResolveCommitPopup = ({ open, onClose, onConfirm }: ResolveCommitPopupProps) => {
  return (
    <BasePopup open={open} onClose={onClose}>
      <h2 className={css`
        text-align: center;
        margin-bottom: 1rem;
        font-size: 1.5rem;
        font-weight: 600;
      `}>Resolve Commit</h2>

      <p className={css`
        text-align: center;
        color: #6B7280;
        margin-bottom: 2rem;
        font-size: 0.875rem;
      `}>
        Are you sure you want to resolve this commit? This action will approve all verified attendees and reject all unverified participants. This action cannot be undone.
      </p>

      <div className={css`
        background: #F9FAFB;
        border: 1px solid #E5E7EB;
        border-radius: 8px;
        padding: 1rem;
        margin-bottom: 2rem;
      `}>
        <div className={css`
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.75rem;
          font-size: 0.875rem;
        `}>
          <span className={css`color: #6B7280;`}>Total Participants</span>
          <span className={css`font-weight: 500;`}>3</span>
        </div>
        <div className={css`
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.75rem;
          font-size: 0.875rem;
        `}>
          <span className={css`color: #6B7280;`}>Verified Attendees</span>
          <span className={css`font-weight: 500;`}>2</span>
        </div>
        <div className={css`
          display: flex;
          justify-content: space-between;
          font-size: 0.875rem;
        `}>
          <span className={css`color: #6B7280;`}>Unverified Attendees</span>
          <span className={css`font-weight: 500;`}>1</span>
        </div>
      </div>

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
          Confirm Resolution
        </Button>
      </div>
    </BasePopup>
  );
};

export default ResolveCommitPopup;
