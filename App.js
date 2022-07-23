import React from 'react';
import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import AuthContext from './src/contexts/auth';
import { theme } from './src/styles/theme';
import Routes from './src/routes/routes';

const config = {
  dependencies: {
    "linear-gradient": LinearGradient
  }
};

export default function App() {
  return (
      <NativeBaseProvider theme={theme} config={config}>
        <NavigationContainer>
          <AuthContext>
            <Routes/>
            <StatusBar style="light"/>
          </AuthContext>
        </NavigationContainer>
      </NativeBaseProvider>
  );
}
