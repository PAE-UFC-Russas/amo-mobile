import React, { useState } from 'react';
import RegisterHeader from '../../components/RegisterHeader';
import { Center, FormControl, Input, HStack } from 'native-base';
import DefaultBlueButton from '../../components/DefaultBlueButton';
import styles from './styles';

export default function CheckCode({navigation}) {
    const [error, setError] = useState({
        text: ''
    });
    const [code, setCode] = useState(['','','','','','']);

    const HandleChangeCode = (text, pos) => {
        tempCode = code;
        tempCode[pos] = text;
        setCode(tempCode);
    }

    return (
        <Center
            style={styles.container}
            bgColor="#fff"
        >
            <RegisterHeader>
                Inserir código
            </RegisterHeader>
            <FormControl isInvalid={!!error.text}>
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
                <FormControl.ErrorMessage alignItems="center">
                    {error.text}
                </FormControl.ErrorMessage>
            </FormControl>
            <DefaultBlueButton onPress={()=>navigation.navigate("SelectProfile")}>
                Verificar código
            </DefaultBlueButton>
        </Center>
    );
}