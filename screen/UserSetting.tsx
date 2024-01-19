import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button} from 'react-native-elements';

export const UserSetting: React.FC = () => {
  return (
    <View style={styles.container}>
      <Button type="clear" title="ログアウト" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
