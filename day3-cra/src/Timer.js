import React from 'react';
import styles from './Timer.module.css';

function AnimatedContainer({ prevTimer }) {
  const [mounted, setMounted] = React.useState(false);
  React.useLayoutEffect(() => {
    requestAnimationFrame(() => {
      setMounted(true);
    });
  }, []);
  return (
    <div
      key={prevTimer}
      className={`${styles.animatedContainer} ${
        mounted ? styles.close : styles.open
      }`}>
      <p className={styles.timer}>{prevTimer}</p>
    </div>
  );
}
function Timer({ step = 1, initialValue = 0, startOnMount = false }) {
  const [timer, setTimer] = React.useState(initialValue);
  const prevTimer = React.useMemo(() => timer - step, [timer]);
  let intervalId = React.useRef(null);
  const start = () => {
    if (intervalId.current) return;
    intervalId.current = setInterval(() => {
      setTimer(t => t + step);
    }, 1000);
  };
  const stop = () => {
    clearInterval(intervalId.current);
    intervalId.current = null;
  };
  const reset = () => {
    stop();
    setTimer(initialValue);
  };
  React.useEffect(() => {
    if (startOnMount) {
      start();
    }
  }, []);

  return (
    <div className={styles.container}>
      <div className={`${styles.timerContainer} ${''}`}>
        <div className={`${styles.animatedContainer} ${styles.open}`}>
          <p className={styles.timer}>{timer}</p>
        </div>
        <AnimatedContainer key={String(timer)} prevTimer={prevTimer} />
      </div>
      <div className={styles.buttonsContainer}>
        <button className={styles.button} onClick={start}>
          Start
        </button>
        <button className={styles.button} onClick={stop}>
          Pause
        </button>
        <button className={styles.button} onClick={reset}>
          Reset
        </button>
      </div>
      <p>لطفا کلیک کنید</p>
    </div>
  );
}

export default Timer;
