/** @jsxImportSource @emotion/react */
import React from 'react';
import { css, keyframes } from '@emotion/react';

const scrollAnimation = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    // Adjusted to -50% for smoother looping with two sets of emojis
    transform: translateX(-50%);
  }
`;

const surfAnimation = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    // Reduced vertical movement
    transform: translateY(-5px);
  }
`;

const EmojiTicker: React.FC = () => {
  const emojis = [
    '🏃‍♂️', '🏋️‍♀️', '🚴‍♂️', '🏊‍♀️', '🧘‍♂️', '🤸‍♀️', '🏄‍♂️', '🎳', '🏓', '🥾', '🧗‍♀️', '🤾‍♂️', '🏌️‍♀️', '🏂', '🤼‍♂️', '🤹‍♀️', '🎭',
    // Added more food emojis
    '🍳', '🥗', '🍽️', '🍕', '🍔', '🍣', '🍜', '🍖', '🥩', '🥑', '🍇', '🍓',
    // Added more activity and sports emojis
    '⚽️', '🏀', '🏈', '⚾️', '🎾', '🏐', '🏉', '🥏', '🎱', '🪀', '🏸', '🏒', '🥍', '🏹', '🛹', '🛼', '⛸️', '🎿'
  ];

  return (
    <div
      css={css`
        width: 100%;
        overflow: hidden;
        background-color: transparent;
        padding: 10px 0;
        position: relative;
        // Removed border styles
      `}
    >
      <div
        css={css`
          display: flex;
          white-space: nowrap;
          animation: ${scrollAnimation} 30s linear infinite;
        `}
      >
        {/* Repeated emojis array twice for smoother wrapping */}
        {[...emojis, ...emojis].map((emoji, index) => (
          <span
            key={index}
            css={css`
              font-size: 2rem;
              margin: 0 15px;
              display: inline-block;
              // Adjusted animation duration and reduced vertical movement
              animation: ${surfAnimation} 1.5s ease-in-out infinite;
              animation-delay: ${index * 0.1}s;
            `}
          >
            {emoji}
          </span>
        ))}
      </div>
    </div>
  );
};

export default EmojiTicker;