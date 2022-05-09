import React from 'react';
import { Image, Text } from 'react-native';
import { Center } from 'native-base';
import styles from './styles';

export default function Login() {
  return (
    <Center
      style={styles.container}
      bg={{
        linearGradient: {
          colors: ["tertiaryBlue", "defaultBlue"]
        }
      }}
    > 
      <Image
        source={require('../../public/logo_name.png')}
        width={500}
        height={500}
      />
    </Center>
  );
}