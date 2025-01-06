import BasePopup from './base-popup';
import { Button, FormControl, Select, MenuItem, TextField } from '@mui/material';
import { css } from '@emotion/css';
import { useState } from 'react';

interface AddRewardPoolPopupProps {
  open: boolean;
  onClose: () => void;
}

const AddRewardPoolPopup = ({ open, onClose }: AddRewardPoolPopupProps) => {
  const [selectedToken, setSelectedToken] = useState('usdc');
  const [amount, setAmount] = useState('');

  return (
    <BasePopup open={open} onClose={onClose}>
      <h2 className={css`
        text-align: center;
        margin-bottom: 0.75rem;
        font-size: 1.5rem;
        font-weight: 600;
      `}>Add to Reward Pool</h2>

      <p className={css`
        color: #6B7280;
        margin-bottom: 1rem;
        text-align: center;
        font-size: 0.875rem;
      `}>Select the whitelisted token to select</p>

      <FormControl fullWidth className={css`margin-bottom: 1rem;`}>
        <Select
          value={selectedToken}
          onChange={(e) => setSelectedToken(e.target.value)}
          size="small"
          sx={{ 
            borderRadius: '25px',
            height: '44px',
            '.MuiSelect-select': {
              padding: '8px 16px',
            }
          }}
        >
          <MenuItem value="usdc">USDC</MenuItem>
          <MenuItem value="usdt">USDT</MenuItem>
          <MenuItem value="dai">DAI</MenuItem>
          <MenuItem value="eth">ETH</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        size="small"
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        sx={{
          marginBottom: '1.5rem',
          '& .MuiOutlinedInput-root': {
            borderRadius: '25px',
            height: '44px',
          },
        }}
      />

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
        Add Reward
      </Button>
    </BasePopup>
  );
};

export default AddRewardPoolPopup;
