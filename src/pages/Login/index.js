import React, { useState } from 'react';
import { Keyboard, Image } from 'react-native';
import { Center, FormControl, Input, Button, VStack, Flex } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons'; 
import ModalKeepConnected from '../../components/ModalKeepConnected';
import styles from './styles';

export default function Login({navigation}) {
  const [keyboardIsOpen, setKeyboardIsOpen] = useState(false);
  const [hiddenPassword, setHiddenPassword] = useState(true);
  const [openKeepConnected, setOpenKeepConnected] = useState(false);
  const [account, setAccount] = useState({
    email: '',
    password: '',
    keepConnected: false
  });
  const [inputErros, setInputErros] = useState({
    errosEmail: null,
    errosPassowrd: null,
    activeEmail: false,
    activePassword: false
  });

  const PasswordVisibility = () => {
    return <MaterialIcons
      onPress={()=>setHiddenPassword(!hiddenPassword)}
      color="#fff"
      size={24}
      style={{marginRight: 10}}
      name={hiddenPassword ? "visibility" : "visibility-off"}/>
  }

  const InputValidation = () => {

  }

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
          <FormControl isInvalid={inputErros.activeEmail}>
            <FormControl.Label _text={{
              color:"#fff"
            }}>Email</FormControl.Label>
            <Input
              variant="rounded" 
              placeholderTextColor="#fff" 
              selectionColor="#fff" 
              color="#fff"
              value={account.email}
              maxLength={255}
              onChangeText={text=>setAccount({...account, email: text})}
            />
            <FormControl.ErrorMessage>
              {inputErros.errosEmail}
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl isInvalid={inputErros.activePassword}>
            <FormControl.Label _text={{
              color:"#fff"
            }}>Senha</FormControl.Label>
            <Input
              type={hiddenPassword?"password":"text"}
              variant="rounded" 
              placeholderTextColor="#fff" 
              selectionColor="#fff" 
              color="#fff"
              InputRightElement={<PasswordVisibility/>}
              value={account.password}
              maxLength={32}
              onChangeText={text=>setAccount({...account, password: text})}
            />
            <FormControl.ErrorMessage>
              {inputErros.errosPassowrd}
            </FormControl.ErrorMessage>
          </FormControl>
        </VStack>
        <VStack space={3} alignItems="center">
          {!keyboardIsOpen&&
            <>
              <Button variant="ghost" key="forget" _text={{
                color: "#fff",
                fontWeight: 200
              }}>
                Esqueci minha senha
              </Button>
              <Button variant="ghost" key="register" 
                onPress={()=>navigation.navigate('Register')}
                _text={{
                  color: "#fff",
                  fontWeight: 800
                }}
              >
                Cadastre-se
              </Button>
            </>
          }
          <Button 
            marginBottom={keyboardIsOpen?70:0} 
            bgColor="#fff" 
            width={80} 
            height={60} 
            _text={{
              fontWeight: 800,
              color: "defaultBlue"
            }}
            onPress={()=>setOpenKeepConnected(true)}
          >
            Entrar
          </Button>
        </VStack >
      </Flex>
      {openKeepConnected&&
        <ModalKeepConnected open={openKeepConnected} setOpen={setOpenKeepConnected} setAccount={setAccount} account={account}/>
      }
    </Center>
  );
}