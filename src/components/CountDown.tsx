import React, {useEffect, useState} from 'react';

interface State {
  timeLeft: number;
  isTimerOn: boolean;
  timerMode: Timer_mode;
}

type Timer_mode = 'work' | 'break';

const TIMER_LENGTH = {work: 1 * 60, break: 5 * 60} as const;
type TIMER_LENGTH = (typeof TIMER_LENGTH)[keyof typeof TIMER_LENGTH];
let timerCountInterval = 0;
function f() {
  const [state, setState] = useState<State>({
    timeLeft: TIMER_LENGTH.work,
    isTimerOn: false,
    timerMode: 'work',
  });
  useEffect(() => {
    return () => {
      clearInterval(timerCountInterval);
    };
  }, []);
  const onButtenClick = () => {
    setState(state => {
      clearInterval(timerCountInterval);
      if (state.isTimerOn) {
        return {
          ...state,
          timeLeft: TIMER_LENGTH.work,
          timerMode: 'work',
          isTimerOn: false,
        };
      }
      timerCountInterval = setInterval(() => {
        timerCount();
      }, 1000);
      return {...state, isTimerOn: true};
    });
  };
  const timerCount = () => {
    setState(state => {
      if (state.timeLeft <= 0) {
        state = toggleTimerMode(state);
      }
      return {...state, timeLeft: state.timeLeft - 1};
    });
  };

  const toggleTimerMode = (state: State): State => {
    const timeLeft =
      state.timerMode === 'work' ? TIMER_LENGTH.break : TIMER_LENGTH.work;
    const timerMode = state.timerMode === 'work' ? 'break' : 'work';
    return {
      ...state,
      timeLeft: timeLeft,
      timerMode: timerMode,
    };
  };
}
