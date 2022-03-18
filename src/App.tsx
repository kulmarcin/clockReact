import { MouseEvent, useEffect, useState } from 'react';
import classes from './App.module.css';

import SetTimer from './components/SetTimer/SetTimer';
import Timer from './components/Timer/Timer';

function App() {
  const [sessionLength, setSessionLength] = useState(20);
  const [breakLength, setBreakLength] = useState(5);

  const [sessionCounter, setSessionCounter] = useState(sessionLength);
  const [breakCounter, setBreakCounter] = useState(breakLength);

  const [seconds, setSeconds] = useState(0);

  const [isSession, setIsSession] = useState(true);

  const [clicked, setClicked] = useState(false);

  const [actualInterval, setActualInterval] = useState<any>(null);
  const [isRunning, setIsRunning] = useState(false);

  const setTimers = (e: MouseEvent) => {
    const target = e.target as HTMLElement;

    if (target.className.includes('session')) {
      if (target.className.includes('fa-caret-up')) {
        setSessionLength(prev => {
          if (prev > 59) {
            return prev;
          }
          return prev + 1;
        });
        setSessionCounter(prev => {
          if (prev > 59) {
            return prev;
          }
          return prev + 1;
        });
      } else if (target.className.includes('fa-caret-down')) {
        setSessionLength(prev => {
          if (prev < 2) {
            return prev;
          }
          return prev - 1;
        });
        setSessionCounter(prev => {
          if (prev < 2) {
            return prev;
          }
          return prev - 1;
        });
      }
    } else if (target.className.includes('break')) {
      if (target.className.includes('fa-caret-up')) {
        setBreakLength(prev => {
          if (prev > 59) {
            return prev;
          }
          return prev + 1;
        });
        setBreakCounter(prev => {
          if (prev > 59) {
            return prev;
          }
          return prev + 1;
        });
      } else if (target.className.includes('fa-caret-down')) {
        setBreakLength(prev => {
          if (prev < 2) {
            return prev;
          }
          return prev - 1;
        });
        setBreakCounter(prev => {
          if (prev < 2) {
            return prev;
          }
          return prev - 1;
        });
      }
    }
  };

  const counter = () => {
    if (!clicked) {
      setClicked(true);
      setIsRunning(true);
      setActualInterval(setInterval(() => setSeconds(prev => prev - 1), 1000));
    }
  };

  const pause = () => {
    clearInterval(actualInterval);
    setIsRunning(false);
    setClicked(false);
  };

  const stop = () => {
    clearInterval(actualInterval);
    setSessionCounter(sessionLength);
    setBreakCounter(breakLength);
    setSeconds(0);
    setIsSession(true);
    setIsRunning(false);
    setClicked(false);
  };

  useEffect(() => {
    if (isSession) {
      if (seconds < 0) {
        setSessionCounter(prev => prev - 1);
        setSeconds(59);
      }
      if (sessionCounter < 0) {
        setIsSession(false);
        setSeconds(0);
        setSessionCounter(sessionLength);
      }
    } else if (!isSession) {
      if (seconds < 0) {
        setBreakCounter(prev => prev - 1);
        setSeconds(59);
      }
      if (breakCounter < 0) {
        setIsSession(true);
        setSeconds(0);
        setBreakCounter(sessionLength);
      }
    }
  }, [
    seconds,
    sessionCounter,
    sessionLength,
    actualInterval,
    isSession,
    breakCounter
  ]);

  return (
    <div className={classes.App}>
      <h1>Timer Application</h1>
      <div className={classes.Set}>
        <SetTimer title="session" length={sessionLength} click={setTimers} />
        <SetTimer title="break" length={breakLength} click={setTimers} />
      </div>
      <div className={classes.Timer}>
        <Timer
          click={counter}
          isSession={isSession}
          break={breakCounter}
          session={sessionCounter}
          seconds={seconds}
          stop={stop}
          pause={pause}
          isRunning={isRunning}
        />
      </div>
    </div>
  );
}

export default App;
