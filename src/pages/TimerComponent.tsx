import { useState, useEffect } from 'react';

export const TimerComponent = ({ isRunning }: { isRunning: boolean}) => {
    const [gameTime, setGameTime] = useState(0);
    
    useEffect(() => {
      if (!isRunning) {
        return;
      }

      setGameTime(0);
      const startAt = Date.now();
      const intervalId = window.setInterval(() => {
        setGameTime(Date.now() - startAt);
      }, 50);

      return () => window.clearInterval(intervalId);
    }, [isRunning]);

    const seconds = gameTime / 1000;
    const whole = Math.floor(seconds);
    const mm = String(Math.floor(whole / 60)).padStart(2, "0");
    const ss = String(whole % 60).padStart(2, "0");
    const cs = String(Math.floor((seconds % 1) * 100)).padStart(2, "0");
    
    return <div>{mm}:{ss}.{cs}</div>;
  };
  
