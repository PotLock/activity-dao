import React, { useEffect, useState, useRef } from 'react';
import { css, keyframes } from '@emotion/css';

const rainbow = keyframes`
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
`;

const LoadingAnimation: React.FC = () => {
  return (
    <>
    loading</>
  )
}
export default LoadingAnimation;
