import React, { useState } from 'react';
import { Center, FormControl, Input, HStack, Text } from 'native-base';
import AuthHeader from '../../components/AuthHeader';
import DefaultBlueButton from '../../components/DefaultBlueButton';
import { useAuth } from '../../contexts/auth';
import styles from './styles';

export default function CheckCode({navigation, route}) {
    const [error, setError] = useState();
    const [code, setCode] = useState(['','','','','','']);
    const { Active } = useAuth();

    const HandleChangeCode = (text, pos) => {
        let tempCode = code;
        tempCode[pos] = text;
        setCode(tempCode);
    }

    const CheckinputCode = async () => {
        const inputIsFilled = code.reduce((previousValue, currentValue) => {
            if(currentValue === '')
                return -1
            return 0
        }); 
        
        if(route.params !== undefined && route.params.register && inputIsFilled > -1){
            const codeActivationMessage = await Active(code);
            if(codeActivationMessage === true){
                navigation.navigate("StudentProfile");
            }
            else{
                setError(codeActivationMessage);
            }
        }
        else{
            navigation.navigate("ChangePassword");
        }
    }

    return (
        <Center
            style={styles.container}
            bgColor="#fff"
        >
            <AuthHeader>
                Inserir código
            </AuthHeader>
            <Center>
                <Text
                    fontSize="md"
                    textAlign="center"
                    margin="10"
                >
                    Acabamos de enviar um código para seu email.
                </Text>
                <FormControl isInvalid={!!error}>
                    <HStack style={styles.codeInputs} width="full" space={1}>
                        {code.map((element, index)=>{
                            return <Input
                                key={index}
                                width="12"
                                borderRadius="2xl"
                                textAlign="center"
                                fontSize="sm"
                                placeholderTextColor="tertiaryBlue" 
                                selectionColor="tertiaryBlue" 
                                color="tertiaryBlue"
                                borderColor="tertiaryBlue"
                                keyboardType="numeric"
                                maxLength={1}
                                onChangeText={text => HandleChangeCode(text, index)}
                            />
                        })}
                    </HStack>
                    <FormControl.ErrorMessage marginX={20} alignItems="center">
                        {error}
                    </FormControl.ErrorMessage>
                </FormControl>
            </Center>
            <DefaultBlueButton onPress={CheckinputCode}>
                Verificar código
            </DefaultBlueButton>
        </Center>
    );
}