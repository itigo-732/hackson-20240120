import React, {useState} from 'react';
import {View} from 'react-native';
import UserInputComponent from 'components/userInput';

const UserInputContainer = (props) => {
  const [inputWorkTime, setInputWorkTime] = useState(25);

  const handleInputWorkTime = (value) => {
    setInputWorkTime(value);
  };

  const callInputValueSet = () => {
    props.inputValueSet(inputWorkTime);
  };

  return (
    <View>
      <UserInputComponent
        handleInputWorkTime={handleInputWorkTime}
        inputWorkTime={inputWorkTime}
        callInputValueSet={callInputValueSet}
      />
    </View>
  );
};

export default UserInputContainer;
