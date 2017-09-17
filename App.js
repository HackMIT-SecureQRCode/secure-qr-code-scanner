import React from 'react';
import {
  AppRegistry,
  Text,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import  Scanner from './Scanner.js';
import Encrypt from './Encrypt.js';

export default App = StackNavigator({
  Home: { screen: Scanner },
  Encrypt: { screen: Encrypt }
});

// if you are using create-react-native-app you don't need this line
AppRegistry.registerComponent('App', () => App);