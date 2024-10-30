import React, { useEffect, useState, useRef } from 'react';
import { css, keyframes } from '@emotion/css';
import { motion } from 'framer-motion';

const rainbow = keyframes`
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
`;

const LoadingAnimation: React.FC = () => {
  const [loadedLetters, setLoadedLetters] = useState(0);
  const [isFullHourglass, setIsFullHourglass] = useState(true);
  const animationRef = useRef<number>();
  const emojisRef = useRef<Array<{ x: number; y: number; vx: number; vy: number; emoji: string }>>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const word = 'ActivityDAOs';
  const letters = word.split('');
  const activityEmojis = ['🏃‍♂️', '🚴‍♀️', '🏋️‍♂️', '🧘‍♀️', '🏊‍♂️', '🎣', '🏕️', '⚽', '🏀','🛹'];

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


    emojisRef.current = [...Array(2)].flatMap(() => 
      activityEmojis.map(emoji => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        emoji: emoji
      }))
    );

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      emojisRef.current.forEach(emoji => {
        emoji.x += emoji.vx;
        emoji.y += emoji.vy;

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
    }, 150);

    const hourglassInterval = setInterval(() => {
      setIsFullHourglass((prev) => !prev);
    }, 1000);

    return () => {
      clearInterval(letterInterval);
      clearInterval(hourglassInterval);
      cancelAnimationFrame(animationRef.current!);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className={css`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100vh;
        background-color: var(--background-default-default);
      `}
    >
      <motion.h1
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={css`
          font-family: var(--font-dynapuff);
          color: var(--wwwgetminjiapp-black);
          text-align: center;
          margin-bottom: 2rem;
          
          @media screen and (max-width: 768px) {
            font-size: 1.5rem;
          }
          
          @media screen and (max-width: 480px) {
            font-size: 1.2rem;
          }
        `}
      >
      </motion.h1>
      
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ 
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
        className={css`
          width: 40px;
          height: 40px;
          border: 3px solid var(--wwwgetminjiapp-candlelight);
          border-top: 3px solid transparent;
          border-radius: 50%;
          
          @media screen and (max-width: 480px) {
            width: 30px;
            height: 30px;
          }
        `}
      />
    </motion.div>
  );
};

export default LoadingAnimation;
