import React from 'react';
import {View, Text, Button} from 'react-native';

type CountdownComponentProps = {
  leftSec: number;
  active: boolean; // Assuming 'active' is passed as a prop
  handleStart: () => void;
  handleStop: () => void;
  handleReset: () => void;
};

const CountdownComponent: React.FC<CountdownComponentProps> = ({
  leftSec,
  active,
  handleStart,
  handleStop,
  handleReset,
}) => {
  // Assuming secToMMSS is a function defined elsewhere to format seconds into MM:SS
  return (
    <View>
      <Text>{secToMMSS(leftSec)}</Text>
      <View style={{height: 16}} /> {/* This replaces 'module-spacer' */}
      <View>
        <Button onPress={handleStart} disabled={active}>
          START
        </Button>
        <Button onPress={handleStop} disabled={!active}>
          STOP
        </Button>
        <Button onPress={handleReset} disabled={!active}>
          RESET
        </Button>
      </View>
    </View>
  );
};

export default CountdownComponent;
