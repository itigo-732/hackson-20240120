/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {View, TouchableNativeFeedback, Text, StyleSheet} from 'react-native';

const Home = props => {
  return (
    <View style={styles.container}>
      <TouchableNativeFeedback>
        <Text style={styles.text}>Press me</Text>
      </TouchableNativeFeedback>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  text: {
    borderWidth: 1,
    padding: 25,
    borderColor: 'red',
    backgroundColor: 'yellow',
    textDecorationColor: 'red',
    color: 'red',
  },
});
