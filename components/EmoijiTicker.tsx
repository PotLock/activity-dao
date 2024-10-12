/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { css, keyframes } from '@emotion/react';
import interestsData from "../data/interests.json";
import { useRouter } from 'next/router';

const scrollAnimation = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
`;

const surfAnimation = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
`;

const EmojiTicker: React.FC = () => {
  const [hoveredActivity, setHoveredActivity] = useState<string | null>(null);
  const router = useRouter();

  const handleEmojiClick = (idSlug: string) => {
    router.push(`/interest/${idSlug}`);
  };

  return (
    <div
      css={css`
        width: 100%;
        overflow: hidden;
        background-color: transparent;
        padding: 10px 0;
        position: relative;
      `}
    >
      <div
        css={css`
          display: flex;
          white-space: nowrap;
          animation: ${scrollAnimation} 30s linear infinite;
        `}
      >
        {/* Repeated interests array twice for smoother wrapping */}
        {[...interestsData, ...interestsData].map((interest, index) => (
          <span
            key={index}
            css={css`
              font-size: 2rem;
              margin: 0 15px;
              display: inline-block;
              animation: ${surfAnimation} 1.5s ease-in-out infinite;
              animation-delay: ${index * 0.1}s;
              cursor: pointer;
              position: relative;
            `}
            onClick={() => handleEmojiClick(interest.id_slug)}
            onMouseEnter={() => setHoveredActivity(interest.activity)}
            onMouseLeave={() => setHoveredActivity(null)}
          >
            {interest.emoji}
            {hoveredActivity === interest.activity && (
              <span
                css={css`
                  position: absolute;
                  left: 0%;
                  transform: translateX(50%);
                  background: white;
                  border: 1px solid black;
                  padding: 5px;
                  border-radius: 5px;
                  font-size: 0.8rem;
                  white-space: nowrap;
                  z-index: 10000000;
                `}
              >
                {interest.activity}
              </span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
};

export default EmojiTicker;
