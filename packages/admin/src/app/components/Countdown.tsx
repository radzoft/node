import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  endDate:number,
  completed?:string,
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ endDate, completed }) => {
  const [timeLeft, setTimeLeft] = useState<number>();

  useEffect(() => {
    const tl = Math.floor((endDate-Date.now())/1000)
    if(tl<0) setTimeLeft(0);
    const timer = setInterval(() => setTimeLeft(tl), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, endDate]);

  if(timeLeft===undefined) return <span></span>;

  return timeLeft>0 ? <span>Resend in <strong>{timeLeft}</strong> seconds.</span>:<span className='font-bold'>Resend code!</span>;
}

export default CountdownTimer;
