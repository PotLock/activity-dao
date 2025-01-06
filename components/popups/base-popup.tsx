import { Dialog, IconButton } from '@mui/material';
import { FiX } from 'react-icons/fi';
import { css } from '@emotion/css';

interface BasePopupProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const BasePopup = ({ open, onClose, children }: BasePopupProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: '16px',
          padding: '2rem',
          maxWidth: '440px',
          width: '100%',
        },
      }}
    >
      <IconButton
        onClick={onClose}
        sx={{
          position: 'absolute',
          right: '1rem',
          top: '1rem',
        }}
      >
        <FiX />
      </IconButton>
      {children}
    </Dialog>
  );
};

export default BasePopup;
