import { useCallback, useEffect, useMemo, useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  const isInitialCount = useMemo(() => count === 0, [count]);

  const [isCounterRunning, setIsCounterRunning] = useState(false);

  useEffect(() => {
    let timer;
    if (isCounterRunning) {
      timer = setInterval(() => {
        setCount((prevCount) => prevCount + 1);
      }, 1000);
    }
    return () => {
      if(timer){
        clearInterval(timer);
      }
    };
  }, [isCounterRunning]);

  const onStartPauseOrResumeBtn = useCallback(() => {
    setIsCounterRunning((prevIsCounterRunning) => !prevIsCounterRunning);
  }, []);

  const onClickReset = useCallback(() => {
    setIsCounterRunning(() => false);
    setCount(() => 0);
  }, []);

  const btnText = useMemo(() => {
    return isCounterRunning ? 'Pause' : isInitialCount ? 'Start' : 'Resume'
  }, [isCounterRunning, isInitialCount]);

  return (
    <>
      <div>
        <div>
          Count: <span>{count}</span>
        </div>

        <div>
          <button onClick={onStartPauseOrResumeBtn}>
            {btnText}
          </button>
          <button disabled={isInitialCount} onClick={onClickReset}>
            Reset
          </button>
        </div>
      </div>
    </>
  );
}

export default App;

