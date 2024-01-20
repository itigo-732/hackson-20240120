import Reactr from 'react';

import {Button, TextInput, View} from 'react-native';

const UserInputComponent: React.FC<UserInputComponentProps> = ({
  handleInputWorkTime,
  inputWorkTime,
  callInputValueSet,
}) => {
  return (
    <View>
      <TextInput
        onChangeText={handleInputWorkTime}
        value={inputWorkTime}
        placeholder="作業時間"
      />
      <Button onPress={callInputValueSet} title="OK" />
    </View>
  );
};
