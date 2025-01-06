import { css } from '@emotion/css';
import { Button } from '@mui/material';
import BasePopup from './base-popup';

interface ScanQRCodePopupProps {
  open: boolean;
  onClose: () => void;
  onContinue: () => void;
}

const ScanQRCodePopup = ({ open, onClose, onContinue }: ScanQRCodePopupProps) => {
  return (
    <BasePopup open={open} onClose={onClose}>
      <h2 className={css`
        text-align: center;
        margin-bottom: 1rem;
        font-size: 1.5rem;
        font-weight: 600;
      `}>Scan QR Code</h2>

      <p className={css`
        text-align: center;
        color: #6B7280;
        margin-bottom: 2rem;
        font-size: 0.875rem;
      `}>
        Scan the participant's QR code to verify their attendance
      </p>

      <div className={css`
        background: #F3F4F6;
        border-radius: 8px;
        aspect-ratio: 1;
        margin-bottom: 2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #6B7280;
      `}>
        [QR Scanner Component Here]
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
          onClick={onContinue}
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
          Continue
        </Button>
      </div>
    </BasePopup>
  );
};

export default ScanQRCodePopup;
