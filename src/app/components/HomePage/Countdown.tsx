// src/app/components/HomePage/Countdown.tsx
import React, { useState, useEffect } from "react";

interface CountdownProps {
  targetDate: Date;
}

const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = +targetDate - +new Date();
    let timeLeft = { hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
      timeLeft = {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
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
    <div className="countdown-timer">
      <span>Ending in:</span>
      <div className="time-box">{formatTime(timeLeft.hours)}</div>:
      <div className="time-box">{formatTime(timeLeft.minutes)}</div>:
      <div className="time-box">{formatTime(timeLeft.seconds)}</div>
    </div>
  );
};

export default Countdown;
