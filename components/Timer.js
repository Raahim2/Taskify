import React, { useState, useEffect } from 'react';

const Timer = ({ onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [timerType, setTimerType] = useState('Work');


  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 0) {
            clearInterval(interval);
            setIsRunning(false);
            onTimeUp(timerType);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, onTimeUp, timerType]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
      .toString()
      .padStart(2, '0')}`;
  };

  const handleStartPause = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setTimeLeft(25 * 60);
    setIsRunning(false);
  };

  const handleTimerTypeChange = () => {
    setTimerType(timerType === 'Work' ? 'Break' : 'Work');
    setTimeLeft(timerType === 'Work' ? 5 * 60 : 25 * 60); // 5 min break, 25 min work. Adjust as needed.
    setIsRunning(true);
  }


  return (
    <div>
      <h1>{timerType}</h1>
      <p>{formatTime(timeLeft)}</p>
      <button onClick={handleStartPause}>
        {isRunning ? 'Pause' : 'Start'}
      </button>
      <button onClick={handleReset}>Reset</button>
      <button onClick={handleTimerTypeChange}>Switch to {timerType === 'Work' ? 'Break' : 'Work'}</button>
    </div>
  );
};

export default Timer;