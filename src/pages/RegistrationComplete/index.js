import React from 'react';
import { Center, Text } from 'native-base';
import AuthHeader from '../../components/AuthHeader';
import DefaultBlueButton from '../../components/DefaultBlueButton';
import styles from './styles';


export default function RegistrationComplete({navigation}){
    return(
        <Center style={styles.container}>
            <AuthHeader/>
            <Text 
                color='defaultBlue' 
                width='1/2' 
                textAlign='center' 
                fontSize={16}
            >
                Obrigado(a)! Cadastro concluido com sucesso!
            </Text>
            <DefaultBlueButton 
                onPress={()=>navigation.navigate('SignIn')}
            >
                Login
            </DefaultBlueButton>
        </Center>
    )
}
