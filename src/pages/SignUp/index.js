import React, { useState } from 'react';
import { Center, VStack, Text } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons'; 
import validator from 'validator';
import AuthHeader from '../../components/AuthHeader';
import DefaultBlueButton from '../../components/DefaultBlueButton';
import DefaultFormInput from '../../components/DefaultFormInput';
import styles from './styles';

export default function Register({navigation}) {
  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [inputErros, setInputErros] = useState({
    errosEmail: null,
    errosPassword: null,
    errosConfirmPassword: null
  });

  const InputValidation = () => {
    let erros = {
      errosEmail: null,
      errosPassword: null,
      errosConfirmPassword: null
    };

    if(newUser.email.length < 10 && !validator.isEmail(newUser.email))
      erros.errosEmail = "E-mail inválido!";
    if(newUser.password.length < 8)
      erros.errosPassword = "A senha precisa conter 8 caracteres!";
    else if(!newUser.password.match(/[a-zA-Z]/g))
      erros.errosPassword = "A senha precisa conter pelo menos uma letra!";
    else if(!newUser.password.match(/\d/g))
      erros.errosPassword = "A senha precisa conter pelo menos um número!";
    if(newUser.password !== newUser.confirmPassword)
      erros.errosConfirmPassword = "As senhas devem ser iguais!";

    setInputErros(erros);
    if(!erros.errosEmail && !erros.errosPassword && !erros.errosConfirmPassword)
      navigation.navigate("CheckCode", {register: true})
    return null
  }

  return (
    <Center
      style={styles.container}
      bgColor="#fff"
    >
      <MaterialIcons
        onPress={()=>navigation.goBack()}
        color="#52D6FB"
        size={24}
        style={styles.backButton}
        name="arrow-back-ios"
      />
      <Center width="5/6">
        <AuthHeader>
          Cadastra-se
        </AuthHeader>
        <VStack width="full" space={3}>
          <DefaultFormInput 
            placeholder="Email" 
            value={newUser.email} 
            setValue={text=>setNewUser({...newUser, email: text})} 
            color="tertiaryBlue" 
            error={inputErros.errosEmail}
          />
          <DefaultFormInput 
            type="password"
            placeholder="Senha" 
            value={newUser.password} 
            setValue={text=>setNewUser({...newUser, password: text})} 
            color="tertiaryBlue" 
            error={inputErros.errosPassword}
          />
          <DefaultFormInput
            type="password"
            placeholder="Cofirmar senha" 
            color="tertiaryBlue" 
            value={newUser.confirmPassword} 
            setValue={text=>setNewUser({...newUser, confirmPassword: text})} 
            error={inputErros.errosConfirmPassword}
          />
          <Text style={styles.textInfo}>
            A senha precisa ter no mínimo 8 caracteres, contendo letras e números sem espaçamento.
            Ex: 12zay78d
          </Text>
        </VStack>
      </Center>
      <DefaultBlueButton onPress={InputValidation}>
        Avançar
      </DefaultBlueButton>
    </Center>
  );
}
