// import { StatusBar } from 'expo-status-bar';
import React from 'react';
// import { StyleSheet, View } from 'react-native';
// import { Text, Input, Button } from 'react-native-elements';
// import Icon from 'react-native-vector-icons/FontAwesome';
import { createStackNavigator  } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './src/screens/Login';
import Home from './src/screens/Home';
import Teste from './src/screens/Teste';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator >
      <Stack.Screen name="Login" component={Login} options={{headerShown:false}} />
      <Stack.Screen name="Teste" component={Teste} options={{headerShown:false}} />
      <Stack.Screen name="Home" component={Home} options={{headerShown:false}} />
    </Stack.Navigator>
  );
}
// options={{headerShown:false}}


export default function App() {
  return (
    <NavigationContainer >
      <MyStack />
    </NavigationContainer>
  );
  }
