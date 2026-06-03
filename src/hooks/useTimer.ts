import { useState, useContext, useEffect } from 'react';


export const useTimer = (isCountingDown: boolean, winner: string) => {
    const [gameTime, setGameTime] = useState(0);
    
    useEffect(() => {
      let interval: NodeJS.Timeout;;
      if (!isCountingDown && !winner) {
        interval = setInterval(() => {
          setGameTime(prev => prev + 0.01);
        }, 10);
      }
      return () => clearInterval(interval);
    }, [isCountingDown, winner]);
    
    return gameTime;
  };