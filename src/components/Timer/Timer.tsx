import { Fragment } from 'react';
import classes from './Timer.module.css';

const Timer: React.FC<{
  click: () => void;
  seconds: number;
  session: number;
  break: number;
  isSession: boolean;
  stop: () => void;
  pause: () => void;
  isRunning: boolean;
}> = props => {
  return (
    <Fragment>
      <div
        className={classes.Timer}
        style={{
          color: props.session < 1 ? 'red' : props.break < 1 ? 'red' : 'white'
        }}
      >
        {props.isSession ? <h2>Session</h2> : <h2>Break</h2>}
        {props.isSession ? props.session : props.break}:
        {props.seconds < 10 ? '0' + props.seconds : props.seconds}
      </div>
      <div className={classes.Controls}>
        {!props.isRunning ? (
          <i className="fas fa-play" onClick={props.click}></i>
        ) : (
          <i className="fas fa-pause" onClick={props.pause}></i>
        )}{' '}
        <i className="fas fa-sync-alt" onClick={props.stop}></i>
      </div>
    </Fragment>
  );
};

export default Timer;
