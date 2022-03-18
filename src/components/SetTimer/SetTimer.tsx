import { MouseEvent } from 'react';
import classes from './SetTimer.module.css';

const SetTimer: React.FC<{
  title: string;
  length: number;
  click: (e: MouseEvent) => void;
}> = props => {
  return (
    <div className={classes.SetTimer}>
      <h3>Set {props.title} length</h3>
      <h2>
        <i
          className={`fas fa-caret-up ${props.title}`}
          onClick={props.click}
        ></i>
        <span>{props.length + ':00'}</span>
        <i
          className={`fas fa-caret-down ${props.title}`}
          onClick={props.click}
        ></i>
      </h2>
    </div>
  );
};

export default SetTimer;
