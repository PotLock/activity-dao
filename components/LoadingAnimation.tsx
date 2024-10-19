import React, { useEffect, useState, useRef } from 'react';
import { css, keyframes } from '@emotion/css';

const rainbow = keyframes`
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
`;

const LoadingAnimation: React.FC = () => {
  const [loadedLetters, setLoadedLetters] = useState(0);
  const animationRef = useRef<number>();
  const emojisRef = useRef<Array<{ x: number; y: number; vx: number; vy: number; emoji: string }>>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const word = 'ActivityDAOs';
  const letters = word.split('');
  const activityEmojis = ['🏃‍♂️', '🚴‍♀️', '🏋️‍♂️', '🧘‍♀️', '🏊‍♂️', '🎣', '🏕️', '⚽', '🏀', '🛹'];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create three instances of each emoji
    emojisRef.current = [...Array(2)].flatMap(() => 
      activityEmojis.map(emoji => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 1,
        vy: (Math.random() - 0.5) * 1,
        emoji: emoji
      }))
    );

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      emojisRef.current.forEach(emoji => {
        emoji.x += emoji.vx;
        emoji.y += emoji.vy;

        // Bounce off edges
        if (emoji.x < 0 || emoji.x > canvas.width) emoji.vx *= -1;
        if (emoji.y < 0 || emoji.y > canvas.height) emoji.vy *= -1;

        ctx.font = '2rem Arial';
        ctx.fillText(emoji.emoji, emoji.x, emoji.y);
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    const letterInterval = setInterval(() => {
      setLoadedLetters((prev) => (prev < word.length ? prev + 1 : prev));
    }, 100);

    return () => {
      clearInterval(letterInterval);
      cancelAnimationFrame(animationRef.current!);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

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
      <canvas
        ref={canvasRef}
        className={css`
          position: absolute;
          top: 0;
          left: 0;
        `}
      />
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
            font-size: 8vw;
            max-font-size: 4rem;
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
                opacity: 1;
                
              `}
            >
              {letter}
            </span>
          ))}
        </h1>
      </div>
      <div
        className={css`
          position: absolute;
          bottom: 20px;
          right: 20px;
          font-size: 2rem;
        `}
      >
        {/* Additional content can go here */}
      </div>
    </div>
  );
};

export default LoadingAnimation;
