import { css } from '@emotion/css';
import { Button } from '@mui/material';
import { FaMobile } from 'react-icons/fa';
import BasePopup from './base-popup';

interface MobileInstructionsPopupProps {
  open: boolean;
  onClose: () => void;
}

const MobileInstructionsPopup = ({ open, onClose }: MobileInstructionsPopupProps) => {
  return (
    <BasePopup open={open} onClose={onClose}>
      <div className={css`
        display: flex;
        justify-content: center;
        margin-bottom: 1.5rem;
      `}>
        <div className={css`
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: #F3F4F6;
          display: flex;
          align-items: center;
          justify-content: center;
        `}>
          <FaMobile size={24} color="#6B7280" />
        </div>
      </div>

      <h2 className={css`
        text-align: center;
        margin-bottom: 1rem;
        font-size: 1.5rem;
        font-weight: 600;
      `}>Use Your Mobile Device</h2>

      <p className={css`
        text-align: center;
        color: #6B7280;
        margin-bottom: 2rem;
        font-size: 0.875rem;
      `}>
        Scan the participant's QR code with your mobile device to verify their attendance
      </p>

      <h3 className={css`
        font-weight: 500;
        margin-bottom: 1rem;
        font-size: 1rem;
      `}>Instructions</h3>

      <div className={css`
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        margin-bottom: 2rem;
      `}>
        {[
          "Open your mobile device's camera app",
          "Point the camera at the participant's QR code",
          "Confirm the verification on your mobile device"
        ].map((step, index) => (
          <div key={index} className={css`
            display: flex;
            gap: 1rem;
            align-items: flex-start;
            font-size: 0.875rem;
            color: #6B7280;
          `}>
            <span className={css`
              font-weight: 500;
              color: #374151;
              min-width: 20px;
            `}>{index + 1}.</span>
            <span>{step}</span>
          </div>
        ))}
      </div>

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
    </BasePopup>
  );
};

export default MobileInstructionsPopup;
