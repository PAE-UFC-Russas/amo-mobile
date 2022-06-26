import React, { useEffect, useState } from 'react';
import { Keyboard, Image } from 'react-native';
import { Center, Button, VStack, Flex } from 'native-base';
import validator from 'validator';
import { useAuth } from '../../contexts/auth';
import ModalKeepConnected from '../../components/ModalKeepConnected';
import DefaultFormInput from '../../components/DefaultFormInput';
import styles from './styles';

export default function SignIn({navigation}) {
  const [keyboardIsOpen, setKeyboardIsOpen] = useState(false);
  const [openKeepConnected, setOpenKeepConnected] = useState(false);
  const [userLogin, setUserLogin] = useState({
    email: '',
    password: '',
    signed: false,
  });
  const [inputErros, setInputErros] = useState({
    errosEmail: null,
    errosPassword: null
  });
  const { IsConnected } = useAuth();
  

  useEffect(()=>{
    async function VerifyLogin(){
      const connected = await IsConnected();
      if(connected){
        navigation.navigate("SelectCourses");
      }
    }
    VerifyLogin();
  },[])

  const InputValidation = () => {
    let erros = {
      errosEmail: null,
      errosPassword: null
    };

    if(userLogin.email.length < 10 && !validator.isEmail(userLogin.email))
      erros.errosEmail = 'E-mail inválido!';
    if(userLogin.password.length < 8)
      erros.errosPassword = 'A senha precisa conter 8 caracteres!';

    if(!erros.errosEmail && !erros.errosPassword)
      setOpenKeepConnected(true);
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
            value={userLogin.email} 
            setValue={text=>setUserLogin({...userLogin, email: text})} 
            color="white"
            error={inputErros.errosEmail}
          />
          <DefaultFormInput 
            type="password"
            label="Senha"
            placeholder=""
            value={userLogin.password} 
            setValue={text=>setUserLogin({...userLogin, password: text})} 
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
                onPress={()=>navigation.navigate("RecoverPassword")}
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
                onPress={()=>navigation.navigate("SignUp")}
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
        <ModalKeepConnected navigation={navigation} open={openKeepConnected} setOpen={setOpenKeepConnected} setUser={setUserLogin} userLogin={userLogin} setErros={setInputErros}/>
      }
    </Center>
  );
}