/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { View, TouchableNativeFeedback, Text, StyleSheet } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import EditScreen from './src/EditScreen';
import TimerList from './src/TimerList';
import AlarmController from './src/Alarm/AlarmController';
import AlarmTextEditor from './src/Alarm/AlarmTextEditor';

const Stack = createStackNavigator();

const Home = props => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="TimerList" 
        screenOptions={{headerShown: false}}
      >
        <Stack.Screen
          name="TimerList"
          component={TimerList}
        />
        <Stack.Screen
          name="EditScreen"
          component={EditScreen}
        />
        <Stack.Screen
           name="AlarmScreen"
           component={AlarmController}
        />
        <Stack.Screen
           name="AlarmTextEditScreen"
           component={AlarmTextEditor}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Home;
