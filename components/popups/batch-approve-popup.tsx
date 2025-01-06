import { css } from '@emotion/css';
import { Button, Checkbox } from '@mui/material';
import BasePopup from './base-popup';
import { useState } from 'react';

interface ParticipantData {
  id: string;
  name: string;
  amount: string;
}

interface BatchApprovePopupProps {
  open: boolean;
  onClose: () => void;
  onApprove: (selectedIds: string[]) => void;
}

const BatchApprovePopup = ({ open, onClose, onApprove }: BatchApprovePopupProps) => {
  const mockParticipants: ParticipantData[] = [
    { id: '1', name: 'Alice Johnson', amount: '10 USDC' },
    { id: '2', name: 'Bob Smith', amount: '15 USDC' },
    { id: '3', name: 'Carol White', amount: '12 USDC' },
    { id: '4', name: 'David Brown', amount: '8 USDC' },
  ];

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedIds([]);
    } else {
      setSelectedIds(mockParticipants.map(p => p.id));
    }
    setSelectAll(!selectAll);
  };

  const handleToggleSelect = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) 
        ? prev.filter(pId => pId !== id)
        : [...prev, id]
    );
  };

  return (
    <BasePopup open={open} onClose={onClose}>
      <h2 className={css`
        text-align: center;
        margin-bottom: 1.5rem;
        font-size: 1.5rem;
        font-weight: 600;
      `}>Batch Scanned QR Codes</h2>

      <div className={css`
        margin-bottom: 1.5rem;
      `}>
        <div className={css`
          display: grid;
          grid-template-columns: auto 1fr auto;
          gap: 1rem;
          align-items: center;
          padding: 0.5rem 0;
          color: #6B7280;
          font-size: 0.875rem;
        `}>
          <Checkbox
            checked={selectAll}
            onChange={handleSelectAll}
            size="small"
          />
          <span>Participants</span>
          <span>Amount</span>
        </div>

        <hr className={css`
          border: none;
          border-top: 1px solid #E5E7EB;
          margin: 0.5rem 0;
        `} />

        {mockParticipants.map((participant) => (
          <div
            key={participant.id}
            className={css`
              display: grid;
              grid-template-columns: auto 1fr auto;
              gap: 1rem;
              align-items: center;
              padding: 0.5rem 0;
              font-size: 0.875rem;
            `}
          >
            <Checkbox
              checked={selectedIds.includes(participant.id)}
              onChange={() => handleToggleSelect(participant.id)}
              size="small"
            />
            <span>{participant.name}</span>
            <span>{participant.amount}</span>
          </div>
        ))}
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
          onClick={() => onApprove(selectedIds)}
          disabled={selectedIds.length === 0}
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
            '&.Mui-disabled': {
              backgroundColor: '#F3F4F6',
              color: '#9CA3AF',
            },
          }}
        >
          Approve Selected ({selectedIds.length})
        </Button>
      </div>
    </BasePopup>
  );
};

export default BatchApprovePopup;
