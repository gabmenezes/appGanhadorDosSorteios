import React from 'react';
import { createStackNavigator  } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './src/screens/Login';
import Home from './src/screens/Home';
import WebViewInstagram from './src/screens/WebViewInstagram';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator >
      <Stack.Screen name="Login" component={Login} options={{headerShown:false}} />
      <Stack.Screen name="WebView" component={WebViewInstagram} options={{headerShown:false}} />
      <Stack.Screen name="Home" component={Home} options={{headerShown:false}} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer >
      <MyStack />
    </NavigationContainer>
  );
  }
