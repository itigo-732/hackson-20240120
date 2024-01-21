import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Linking,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';
import {Header as HeaderRNE, HeaderProps, Icon} from '@rneui/themed';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Image} from 'react-native-elements';

const EditScreen = props => {
  return (
    <SafeAreaProvider>
      <HeaderRNE
        //style={}がなぜか適用されないので直接色指定
        backgroundColor="#91CCF2"
        leftComponent={
          <TouchableOpacity
            /*-------------------------------------------------------------------------------------------------------
                        変更を保存する処理を書く
                        -------------------------------------------------------------------------------------------------------*/
            onPress={() => props.navigation.navigate('TimerList')}>
            <Image
              style={styles.headerIcon}
              source={require('../img/BackIcon.png')}
            />
          </TouchableOpacity>
        }
        centerComponent={{
          text: props.route.params.message,
          style: styles.heading,
        }}
      />
    </SafeAreaProvider>
  );
};

export default EditScreen;

const styles = StyleSheet.create({
  heading: {
    color: '#225A7A',
    fontSize: 22,
    fontWeight: 'bold',
  },
  headerIcon: {
    width: 22,
    height: 22,
  },
});
