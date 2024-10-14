import React, { useEffect, useState } from 'react';
import { css, keyframes } from '@emotion/css';

const sparkle = keyframes`
  0% { opacity: 0; }
  50% { opacity: 1; }
  100% { opacity: 0; }
`;

const float = keyframes`
  0% { transform: translate(0, 0); }
  25% { transform: translate(10px, -10px); }
  50% { transform: translate(20px, 0); }
  75% { transform: translate(10px, 10px); }
  100% { transform: translate(0, 0); }
`;

const rainbow = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const LoadingAnimation: React.FC = () => {
  const [loadedLetters, setLoadedLetters] = useState(0);
  const [isFullHourglass, setIsFullHourglass] = useState(true);
  const word = 'ACTIVITIES';

  useEffect(() => {
    const letterInterval = setInterval(() => {
      setLoadedLetters((prev) => (prev < word.length ? prev + 1 : prev));
    }, 300);

    const hourglassInterval = setInterval(() => {
      setIsFullHourglass((prev) => !prev);
    }, 1000);

    return () => {
      clearInterval(letterInterval);
      clearInterval(hourglassInterval);
    };
  }, []);

  const letters = word.split('');
  const activityEmojis = ['🏃‍♂️', '🚴‍♀️', '🏋️‍♂️', '🧘‍♀️', '🏊‍♂️'];
  const hourglassEmoji = isFullHourglass ? '⏳' : '⌛';
  
  const emojis = [
    ...activityEmojis,
    ...Array(activityEmojis.length).fill(hourglassEmoji)
  ];

  return (
    <div
      className={css`
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: var(--background-default-default);
        z-index: 9999;
        overflow: hidden;
      `}
    >
      <div
        className={css`
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
        `}
      >
        {emojis.map((emoji, index) => (
          <span
            key={index}
            className={css`
              position: absolute;
              font-size: 2rem;
              animation: ${float} ${10 + index * 2}s ease-in-out infinite;
              left: ${Math.random() * 100}vw;
              top: ${Math.random() * 100}vh;
            `}
          >
            {emoji}
          </span>
        ))}
      </div>

      <div
        className={css`
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 2;
        `}
      >
        <h1
          className={css`
            font-size: 4rem;
            font-weight: bold;
            font-family: var(--font-dynapuff);
            display: flex;
            background: linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet);
            background-size: 200% auto;
            color: transparent;
            -webkit-background-clip: text;
            background-clip: text;
            animation: ${rainbow} 5s linear infinite;
          `}
        >
          {letters.map((letter, index) => (
            <span
              key={index}
              className={css`
                opacity: ${index < loadedLetters ? 1 : 0};
                animation: ${sparkle} 1.5s infinite;
                animation-delay: ${index * 0.1}s;
              `}
            >
              {letter}
            </span>
          ))}
        </h1>
      </div>
    </div>
  );
};

export default LoadingAnimation;
