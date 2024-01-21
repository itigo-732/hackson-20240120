/**
 * @format
 */

import {AppRegistry} from 'react-native';
import 'react-native-gesture-handler';
import {name as appName} from './app.json';
//import App from './src/Test/CanvasTest.tsx';
//import App from './src/Test/CanvasVanillaTest.tsx';
import App from './App';

AppRegistry.registerComponent(appName, () => App);
