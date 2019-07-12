import React, { Component } from 'react';
import styles from './Timer.css';

class Timer extends Component {
  state = {
    timer: 0
  };
  componentDidMount() {
    setInterval(() => {
      this.setState({
        timer: this.state.timer + 1
      });
    }, 1000);
    console.log('Mounted');
  }
  render() {
    return <p className={styles.container}>{this.state.timer}</p>;
  }
}

export default Timer;
