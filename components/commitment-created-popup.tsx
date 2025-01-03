import BasePopup from './base-popup';
import { Button } from '@mui/material';
import Image from 'next/image';
import { css } from '@emotion/css';

interface CommitmentCreatedPopupProps {
  open: boolean;
  onClose: () => void;
}

const CommitmentCreatedPopup = ({ open, onClose }: CommitmentCreatedPopupProps) => {
  return (
    <BasePopup open={open} onClose={onClose}>
      <h2 className={css`
        text-align: center;
        margin-bottom: 1rem;
        font-size: 1.5rem;
        font-weight: 600;
      `}>Commitment Created</h2>

      <p className={css`
        text-align: center;
        color: #6B7280;
        margin-bottom: 1.5rem;
      `}>You've successfully joined a commit. Here is your unique QR:</p>

      <div className={css`
        display: flex;
        justify-content: center;
        margin-bottom: 1.5rem;
        background-color: #F3F4F6;
        padding: 1rem;
        border-radius: 8px;
      `}>
        <Image
          src="/dummy-qr.png"
          width={200}
          height={200}
          alt="QR Code"
        />
      </div>

      <p className={css`
        text-align: center;
        color: #6B7280;
        margin-bottom: 2rem;
      `}>Please save this QR code. You'll need to present it for verification at the event.</p>

      <div className={css`
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
      `}>
        <Button
          sx={{
            borderRadius: '25px',
            textTransform: 'none',
            backgroundColor: '#F3F4F6',
            color: '#000',
            padding: '0.75rem',
            '&:hover': {
              backgroundColor: '#E5E7EB',
            },
          }}
        >
          Download PDF
        </Button>
        <Button
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
          onClick={onClose}
        >
          Close
        </Button>
      </div>
    </BasePopup>
  );
};

export default CommitmentCreatedPopup;
