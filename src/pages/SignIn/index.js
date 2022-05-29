import React, { useState } from 'react';
import { Keyboard, Image } from 'react-native';
import { Center, Button, VStack, Flex } from 'native-base';
import validator from 'validator';
import ModalKeepConnected from '../../components/ModalKeepConnected';
import DefaultFormInput from '../../components/DefaultFormInput';
import styles from './styles';

export default function SignIn({navigation}) {
  const [keyboardIsOpen, setKeyboardIsOpen] = useState(false);
  const [openKeepConnected, setOpenKeepConnected] = useState(false);
  const [user, setUser] = useState({
    email: '',
    password: '',
    keepConnected: false
  });
  const [inputErros, setInputErros] = useState({
    errosEmail: null,
    errosPassword: null
  });

  const InputValidation = () => {
    let erros = {
      errosEmail: null,
      errosPassword: null
    };

    if(user.email.length < 10 && !validator.isEmail(user.email))
      erros.errosEmail = 'E-mail inválido!';
    if(user.password.length < 8)
      erros.errosPassword = 'A senha precisa conter 8 caracteres!';

    if(!erros.errosEmail && !erros.errosPassword)
      return navigation.navigate("SelectCourses")
      //setOpenKeepConnected(true);
    setInputErros(erros);
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
        source={require('../../assets/logo_name.png')}
        width={500}
        height={500}
      />
      <Flex direction="column" width="5/6" height={360} justifyContent="space-between">
        <VStack space={3}>
          <DefaultFormInput
            label="Email"
            placeholder="" 
            value={user.email} 
            setValue={text=>setUser({...user, email: text})} 
            color="white"
            error={inputErros.errosEmail}
          />
          <DefaultFormInput 
            type="password"
            label="Senha"
            placeholder=""
            value={user.password} 
            setValue={text=>setUser({...user, password: text})} 
            color="white" 
            error={inputErros.errosPassword}
            />
        </VStack>
        <VStack space={3} alignItems="center">
          {!keyboardIsOpen&&
            <>
              <Button 
                variant="ghost" 
                key="forget" 
                onPress={()=>navigation.navigate('RecoverPassword')}
                _text={{
                  color: "#fff",
                  fontWeight: 200
                }}
              >
                Esqueci minha senha
              </Button>
              <Button 
                variant="ghost" 
                key="SignUp" 
                onPress={()=>navigation.navigate('SignUp')}
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
            onPress={()=>{InputValidation()}}
          >
            Entrar
          </Button>
        </VStack >
      </Flex>
      {openKeepConnected&&
        <ModalKeepConnected open={openKeepConnected} setOpen={setOpenKeepConnected} setUser={setUser} user={user}/>
      }
    </Center>
  );
}