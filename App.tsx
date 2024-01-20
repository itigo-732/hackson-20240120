/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {Button, Text, TextInput, View} from 'react-native';
type Timer_mode = 'work' | 'break';

interface State {
  timeLeft: number;
  isTimerOn: boolean;
  timerMode: Timer_mode;
}
let timerCountInterval = 0;

const secToMMSS = (second: number) => {
  const MM =
    second >= 10 * 60
      ? Math.floor(second / 60).toString()
      : second >= 1 * 60
      ? 0 + Math.floor(second / 60).toString()
      : '00';
  const SS = second % 60 >= 10 ? second % 60 : '0' + (second % 60);
  return MM + ':' + SS;
};
const secToHHMMSS = (second: number) => {
  const HH = Math.floor(second / 3600).toString();
  const MM =
    second >= 600 //sec >= 10min
      ? Math.floor((second % 3600) / 60).toString()
      : second >= 60 //sec >= 1min
      ? 0 + Math.floor((second % 3600) / 60).toString()
      : '00';
  const SS =
    second % 60 >= 10
      ? ((second % 3600) % 60).toString()
      : '0' + (second % 60).toString();
  return HH + ':' + MM + ':' + SS;
};
const App = () => {
  const TIMER_LENGTH = {work: 0, break: 0};
  type TIMER_LENGTH = (typeof TIMER_LENGTH)[keyof typeof TIMER_LENGTH];
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
    setAddTest(test);
    TIMER_LENGTH.work = AddTest * 60;
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
  const [test, setTest] = useState(0);
  const [AddTest, setAddTest] = useState(0);
  const onButtenClick2 = () => {
    console.log(state.timeLeft);
    console.log(state.timeLeft > 3600);
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

  return (
    <>
      <View>
        <Text>
          {state.timeLeft > 3600
            ? secToHHMMSS(state.timeLeft)
            : secToMMSS(state.timeLeft)}
        </Text>
        <Button
          title={state.isTimerOn ? '停止' : '開始'}
          onPress={onButtenClick}
        />
        <Text>{state.timerMode === 'work' ? '作業' : '休憩'}</Text>
        <TextInput
          keyboardType={'number-pad'}
          onChangeText={text => {
            console.log(text);
            setTest(isNaN(text) ? test : text);
          }}
          value={isNaN(test) ? 0 : test.toString()}
          style={{width: 200, height: 44, padding: 8}}
        />
        <Button title={'これ押してみて'} onPress={onButtenClick2} />
        <Text>{AddTest}</Text>
      </View>
    </>
  );
};

export default App;
