import React, { useState } from 'react';
import { Image, View } from 'react-native';
import { Center, FormControl, Input, Button, VStack, Text } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons'; 
import styles from './styles';

export default function Register() {
  const [hiddenPassword, setHiddenPassword] = useState({
    password: false,
    confirmPassword: false
  });
  const [newAccount, setNewAccount] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [inputErros, setInputErros] = useState({
    errosEmail: null,
    errosPassowrd: null,
    errosActivePassword: null,
    activeEmail: false,
    activePassword: false,
    activeConfirmPassword: false
  });

  const PasswordVisibility = ({type}) => {
    return <MaterialIcons
      onPress={()=>setHiddenPassword(type === "password"?
        {...hiddenPassword, password: !hiddenPassword.password}
        :
        {...hiddenPassword, confirmPassword: !hiddenPassword.confirmPassword}
      )}
      color="#52D6FB"
      size={24}
      style={{marginRight: 10}}
      name={hiddenPassword[type] ? "visibility" : "visibility-off"}/>
  }

  return (
    <Center
      style={styles.container}
      bgColor="#fff"
    >
      <Center width="5/6">
        <Center marginBottom="9">
          <Image
            source={require('../../public/logo_lightblue.png')}
            style={{width: 60, height: 60}}
          />
          <Text fontWeight="bold" color="tertiaryBlue" fontSize="md">Cadastra-se</Text>
        </Center>
        <VStack width="full" space={3}>
          <FormControl isInvalid={inputErros.activeEmail}>
            <Input
              variant="rounded" 
              placeholderTextColor="tertiaryBlue" 
              placeholder="Email"
              selectionColor="tertiaryBlue" 
              color="tertiaryBlue"
              borderColor="tertiaryBlue"
              value={newAccount.email}
              onChangeText={text=>setNewAccount({...newAccount, email: text})}
            />
            <FormControl.ErrorMessage>
              {inputErros.errosEmail}
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl isInvalid={inputErros.activePassword}>
            <Input
              type={hiddenPassword.password?"password":"text"}
              variant="rounded" 
              placeholderTextColor="tertiaryBlue"
              placeholder="Senha"
              selectionColor="tertiaryBlue"
              color="tertiaryBlue"
              borderColor="tertiaryBlue"
              InputRightElement={<PasswordVisibility type="password"/>}
              value={newAccount.password}
              onChangeText={text=>setNewAccount({...newAccount, password: text})}
            />
            <FormControl.ErrorMessage>
              {inputErros.errosPassowrd}
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl isInvalid={inputErros.activeConfirmPassword}>
            <Input
              type={hiddenPassword.confirmPassword?"password":"text"}
              variant="rounded" 
              placeholderTextColor="tertiaryBlue" 
              placeholder="Confirmar senha"
              selectionColor="tertiaryBlue" 
              color="tertiaryBlue"
              borderColor="tertiaryBlue"
              InputRightElement={<PasswordVisibility type="confirmPassword"/>}
              value={newAccount.confirmPassword}
              onChangeText={text=>setNewAccount({...newAccount, confirmPassword
                : text})}
            />
            <FormControl.ErrorMessage>
              {inputErros.errosActivePassword}
            </FormControl.ErrorMessage>
          </FormControl>
          <Text style={styles.textInfo}>
            A senha precisa ter no mínimo 8 caracteres, contendo letras e números sem espaçamento.
            Ex: 12zay78d
          </Text>
        </VStack>
      </Center>
      <Button bgColor="defaultBlue" borderRadius="2xl" width={80} height={60} _text={{
        fontWeight: 800,
        color: "#fff",
      }}>
        Avançar
      </Button>
    </Center>
  );
}