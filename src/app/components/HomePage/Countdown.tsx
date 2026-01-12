// src/app/components/HomePage/Countdown.tsx
import React, { useState, useEffect } from "react";

interface CountdownProps {
  targetDate: Date;
}

// Inline styles for Countdown component following the unified design system
const countdownStyles = `
  .countdown-timer {
    display: flex;
    align-items: center;
    gap: 0;
    font-weight: 600;
    color: white;
    font-size: 0.9rem;
    background: #ff6600;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    white-space: nowrap;
  }

  @media (max-width: 767.98px) {
    .countdown-timer {
      font-size: 0.8rem;
      gap: 0.375rem;
    }
    
    .countdown-time-box {
      padding: 0.2rem 0.4rem;
      font-size: 0.75rem;
      min-width: 24px;
    }
    
    .countdown-label {
      font-size: 0.8rem;
    }
  }

  @media (max-width: 480px) {
    .countdown-timer {
      font-size: 0.75rem;
      gap: 0.25rem;
    }
    
    .countdown-time-box {
      padding: 0.15rem 0.3rem;
      font-size: 0.7rem;
      min-width: 20px;
    }
  }
`;

const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = +targetDate - +new Date();
    let timeLeft = { days: 0, hours: 0, minutes: 0 };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Clear the interval on component unmount
    return () => clearInterval(timer);
  }, [targetDate]);

  // Helper to add a leading zero if the number is less than 10
  const formatTime = (time: number) => time.toString().padStart(2, "0");

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: countdownStyles }} />
      <div className="countdown-timer">
        {timeLeft.days > 0 && <span>{timeLeft.days} Days </span>}
        <span>{formatTime(timeLeft.hours)} Hrs: {formatTime(timeLeft.minutes)} Mins Left</span>
      </div>
    </>
  );
};

export default Countdown;
