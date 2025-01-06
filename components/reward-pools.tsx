import { css } from '@emotion/css';
import { Button } from '@mui/material';

interface RewardPoolItemProps {
  tokenLogo: string;
  amount: string;
  token: string;
  estimatedGas: string;
  onClaim: () => void;
}

const RewardPoolItem = ({ tokenLogo, amount, token, estimatedGas, onClaim }: RewardPoolItemProps) => (
  <div className={css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background: white;
    border: 1px solid #E5E7EB;
    border-radius: 8px;
    margin-bottom: 0.75rem;
  `}>
    <div className={css`
      display: flex;
      align-items: center;
      gap: 1rem;
    `}>
      <img 
        src={tokenLogo}
        alt={token}
        className={css`
          width: 40px;
          height: 40px;
        `}
      />
      <div>
        <div className={css`
          font-weight: 600;
          margin-bottom: 0.25rem;
        `}>
          {amount} {token}
        </div>
        <div className={css`
          color: #6B7280;
          font-size: 0.75rem;
        `}>
          Est Gas {estimatedGas} ETH
        </div>
      </div>
    </div>

    <Button
      variant="contained"
      sx={{
        backgroundColor: '#F3F4F6',
        color: '#000',
        textTransform: 'none',
        fontWeight: 500,
        padding: '0.5rem 1.5rem',
        borderRadius: '8px',
        boxShadow: 'none',
        '&:hover': {
          backgroundColor: '#E5E7EB',
          boxShadow: 'none',
        },
      }}
    >
      Claim
    </Button>
  </div>
);

const RewardPools = () => {
  const pools = [
    {
      tokenLogo: "https://cryptologos.cc/logos/usd-coin-usdc-logo.svg?v=040",
      amount: "50",
      token: "USDC",
      estimatedGas: "0.00001"
    },
    {
      tokenLogo: "https://cryptologos.cc/logos/usd-coin-usdc-logo.svg?v=040",
      amount: "30",
      token: "USDC",
      estimatedGas: "0.00001"
    },
    {
      tokenLogo: "https://cryptologos.cc/logos/usd-coin-usdc-logo.svg?v=040",
      amount: "20",
      token: "USDC",
      estimatedGas: "0.00001"
    }
  ];

  return (
    <div className={css`
      background: #F9FAFB;
      padding: 1.5rem;
      border-radius: 8px;
      margin-bottom: 2rem;
    `}>
      <h3 className={css`
        font-weight: 600;
        margin: 0 0 1rem 0;
      `}>Available Reward Pools</h3>

      {pools.map((pool, index) => (
        <RewardPoolItem
          key={index}
          tokenLogo={pool.tokenLogo}
          amount={pool.amount}
          token={pool.token}
          estimatedGas={pool.estimatedGas}
          onClaim={() => console.log(`Claiming pool ${index}`)}
        />
      ))}

      <Button
        fullWidth
        variant="contained"
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
        Claim all rewards (Est Gas - 0.0012 ETH)
      </Button>
    </div>
  );
};

export default RewardPools;
