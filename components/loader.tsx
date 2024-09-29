import React from 'react';
import { Box, CircularProgress, keyframes } from '@mui/material';

const runningAnimation = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0); }
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
          width: '100px',
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
          }}
        />
        <Box
          sx={{
            fontSize: '48px',
            animation: `${runningAnimation} 0.5s ease-in-out infinite`,
          }}
        >
          🏃
        </Box>
      </Box>
    </Box>
  );
};

export default Loader;
