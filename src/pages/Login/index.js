import React, { useState } from 'react';
import { Keyboard, Image } from 'react-native';
import { Center, FormControl, Stack, Input, Button, VStack, Flex } from 'native-base';
import styles from './styles';

export default function Login() {
  const [keyboardIsOpen, setKeyboardIsOpen] = useState(false);

  Keyboard.addListener("keyboardDidShow", () => {
    setKeyboardIsOpen(true);
  });
  Keyboard.addListener("keyboardDidHide", () => {
    setKeyboardIsOpen(false);
  });

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
      <Flex direction="column" width="5/6" height={360} justifyContent="space-between">
        <VStack space={3}>
          <FormControl>
            <Stack mx="4">
              <FormControl.Label _text={{
                color:"#fff"
              }}>Email</FormControl.Label>
              <Input placeholder="Email" variant="rounded" placeholderTextColor="#fff" selectionColor="#fff" color="#fff"/>
            </Stack>
          </FormControl>
          <FormControl>
            <Stack mx="4">
              <FormControl.Label _text={{
                color:"#fff"
              }}>Senha</FormControl.Label>
              <Input type="password" placeholder="Senha" variant="rounded" placeholderTextColor="#fff" selectionColor="#fff" color="#fff"/>
            </Stack>
          </FormControl>
        </VStack>
        <VStack space={3}>
          {!keyboardIsOpen&&
            <>
              <Button variant="ghost" key="forget" _text={{
                color: "#fff",
                fontWeight: 200
              }}>
                Esqueci minha senha
              </Button>
              <Button variant="ghost" key="register" _text={{
                color: "#fff",
                fontWeight: 800
              }}>
                Cadastre-se
              </Button>
            </>
          }
          <Button marginBottom={keyboardIsOpen?70:0} bgColor="#fff" width={80} height={60} _text={{
            fontWeight: 800,
            color: 'defaultBlue'
          }}>
            Entrar
          </Button>
        </VStack >
      </Flex>
    </Center>
  );
}