import React from 'react';
import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { theme } from './src/styles/theme';
import Routes from './src/routes/routes';

const config = {
  dependencies: {
    "linear-gradient": LinearGradient
  }
};

export default function App() {
  return (
    <NavigationContainer>
      <NativeBaseProvider theme={theme} config={config}>
        <Routes/>
        <StatusBar style="light"/>
      </NativeBaseProvider>
    </NavigationContainer>
  );
}
