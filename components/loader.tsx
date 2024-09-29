import React from 'react';
import { Box, CircularProgress, keyframes } from '@mui/material';

const runningAnimation = keyframes`
  0% { transform: translateX(-20px); }
  50% { transform: translateX(20px); }
  100% { transform: translateX(-20px); }
`;

const bounceAnimation = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const Loader: React.FC = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: '150px',
          height: '100px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularProgress
          size={100}
          thickness={2}
          sx={{
            position: 'absolute',
            color: 'primary.main',
            animation: 'spin 2s linear infinite',
            '@keyframes spin': {
              '0%': {
                transform: 'rotate(0deg)',
              },
              '100%': {
                transform: 'rotate(360deg)',
              },
            },
          }}
        />
        <Box
          sx={{
            fontSize: '48px',
            animation: `${runningAnimation} 2s linear infinite, ${bounceAnimation} 0.5s ease-in-out infinite`,
          }}
        >
          🏃
        </Box>
      </Box>
    </Box>
  );
};

export default Loader;
