import { css } from '@emotion/css';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { useState, useEffect } from 'react';

export const ErrorBanner = () => (
  <div className={css`
    background-color: #FEE2E2;
    border: 1px solid #FCA5A5;
    border-radius: 8px;
    padding: 1rem;
    margin-bottom: 1rem;
  `}>
    <div className={css`
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 0.5rem;
    `}>
      <FaTimes className={css`color: #991B1B;`} />
      <h4 className={css`
        color: #991B1B;
        font-weight: 600;
        margin: 0;
      `}>Commit not fulfilled</h4>
    </div>
    <p className={css`
      color: #991B1B;
      font-size: 0.875rem;
      margin: 0;
    `}>
      The commitment period has ended. Since you didn't fulfill the commitment, you cannot claim rewards.
    </p>
  </div>
);

export const SuccessBannerWithTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 1,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds--;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes--;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours--;
            } else {
              hours = 23;
              if (days > 0) {
                days--;
              }
            }
          }
        }

        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={css`
      background-color: #F0FDF4;
      border: 1px solid #86EFAC;
      border-radius: 8px;
      padding: 1rem;
      margin-bottom: 1rem;
    `}>
      <div className={css`
        display: flex;
        align-items: center;
        gap: 0.5rem;
      `}>
        <FaCheck className={css`color: #16A34A;`} />
        <p className={css`
          color: #166534;
          font-size: 0.875rem;
          margin: 0;
        `}>
          Congratulations! You have successfully fulfilled the commitment. You will be able to claim your rewards in{' '}
          <span className={css`font-weight: 600;`}>
            {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
          </span>
        </p>
      </div>
    </div>
  );
};

export const SuccessBanner = () => (
  <div className={css`
    background-color: #F0FDF4;
    border: 1px solid #86EFAC;
    border-radius: 8px;
    padding: 1rem;
    margin-bottom: 1rem;
  `}>
    <div className={css`
      display: flex;
      align-items: center;
      gap: 0.5rem;
    `}>
      <FaCheck className={css`color: #16A34A;`} />
      <p className={css`
        color: #166534;
        font-size: 0.875rem;
        margin: 0;
      `}>
        Congratulations! You have successfully fulfilled the commitment. You can now claim your reward.
      </p>
    </div>
  </div>
);
