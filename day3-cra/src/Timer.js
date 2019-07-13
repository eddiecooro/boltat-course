import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styles from './Timer.module.css';

function Timer({ step = 1, initialValue = 0, startOnMount = false }) {
  const [timer, setTimer] = React.useState(initialValue);
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
      <TransitionGroup className={`${styles.timerContainer}`}>
        <CSSTransition
          key={timer}
          timeout={750}
          classNames={{
            enter: styles.enter,
            enterActive: styles.enter,
            enterDone: styles.enter,
            exit: styles.exit,
            exitActive: styles.exitActive,
            exitDone: styles.exitDone
          }}>
          <div className={`${styles.animatedContainer}`}>
            <p className={styles.timer}>{timer}</p>
          </div>
        </CSSTransition>
      </TransitionGroup>
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
