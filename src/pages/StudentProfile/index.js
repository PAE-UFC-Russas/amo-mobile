import React, { useState } from 'react';
import { Keyboard } from 'react-native';
import { Center, Select, VStack, FormControl, Input, Button } from 'native-base';
import RegisterHeader from '../../components/RegisterHeader';
import styles from './styles';

export default function StudentProfile({navigation}) {
    const [keyboardIsOpen, setKeyboardIsOpen] = useState(false);
    const [personalData, setPersonalData] = useState({
        user: '',
        name: '',
        nickname: '',
        entryYear: '',
        course: '',
        birthDate: ''
    });

    const [inputErros, setInputErros] = useState({
        errosUser: null,
        errosName: null,
        errosNickname: null,
        errosEntryear: null,
        errosCourse: null,
        errosBirthdate: null
    });

    Keyboard.addListener("keyboardDidShow", () => {
        setKeyboardIsOpen(true);
    });
    Keyboard.addListener("keyboardDidHide", () => {
        setKeyboardIsOpen(false);
    });

    return (
        <Center
            style={styles.container}
            bgColor="#fff"

        >
            {!keyboardIsOpen&&
                <RegisterHeader>
                    Estamos quase lá
                </RegisterHeader>
            }
            
            <VStack width="5/6" space={3}>
                <FormControl isInvalid={inputErros.errosUser?true:false}>
                    <Input
                        variant="rounded" 
                        placeholder="Nome de usuário"
                        placeholderTextColor="tertiaryBlue" 
                        selectionColor="tertiaryBlue" 
                        color="tertiaryBlue"
                        borderColor="tertiaryBlue"
                        value={personalData.user}
                        maxLength={64}
                        onChangeText={text=>setPersonalData({...personalData, user: text})}
                    />
                    <FormControl.ErrorMessage>
                        {inputErros.errosUser}
                    </FormControl.ErrorMessage>
                </FormControl>
                <FormControl isInvalid={inputErros.errosName?true:false}>
                    <Input
                        variant="rounded" 
                        placeholder="Nome completo"
                        placeholderTextColor="tertiaryBlue" 
                        selectionColor="tertiaryBlue" 
                        color="tertiaryBlue"
                        borderColor="tertiaryBlue"
                        value={personalData.name}
                        maxLength={255}
                        onChangeText={text=>setPersonalData({...personalData, name: text})}
                    />
                    <FormControl.ErrorMessage>
                        {inputErros.errosName}
                    </FormControl.ErrorMessage>
                </FormControl>
                <FormControl isInvalid={inputErros.errosNickname?true:false}>
                    <Input
                        variant="rounded" 
                        placeholder="Apelido"
                        placeholderTextColor="tertiaryBlue" 
                        selectionColor="tertiaryBlue" 
                        color="tertiaryBlue"
                        borderColor="tertiaryBlue"
                        value={personalData.nickname}
                        maxLength={255}
                        onChangeText={text=>setPersonalData({...personalData, nickname: text})}
                    />
                    <FormControl.ErrorMessage>
                        {inputErros.errosNickname}
                    </FormControl.ErrorMessage>
                </FormControl>
                <FormControl isInvalid={inputErros.errosEntryear?true:false}>
                    <Input
                        variant="rounded" 
                        placeholder="Ano de entrada"
                        placeholderTextColor="tertiaryBlue" 
                        selectionColor="tertiaryBlue" 
                        color="tertiaryBlue"
                        borderColor="tertiaryBlue"
                        value={personalData.entryYear}
                        onChangeText={text=>setPersonalData({...personalData, entryYear: text})}
                    />
                    <FormControl.ErrorMessage>
                        {inputErros.errosEntryear}
                    </FormControl.ErrorMessage>
                </FormControl>
                <FormControl isInvalid={inputErros.errosCourse?true:false}>
                    <Input
                        variant="rounded" 
                        placeholder="Selecione seu curso"
                        placeholderTextColor="tertiaryBlue" 
                        selectionColor="tertiaryBlue" 
                        color="tertiaryBlue"
                        borderColor="tertiaryBlue"
                        value={personalData.course}
                        onChangeText={text=>setPersonalData({...personalData, course: text})}
                    />
                    <FormControl.ErrorMessage>
                        {inputErros.errosCourse}
                    </FormControl.ErrorMessage>
                </FormControl>
                <FormControl isInvalid={inputErros.errosBirthdate?true:false}>
                    <Input
                        variant="rounded" 
                        placeholder="Data de nascimento"
                        placeholderTextColor="tertiaryBlue" 
                        selectionColor="tertiaryBlue" 
                        color="tertiaryBlue"
                        borderColor="tertiaryBlue"
                        value={personalData.birthDate}
                        onChangeText={text=>setPersonalData({...personalData, birthDate: text})}
                    />
                    <FormControl.ErrorMessage>
                        {inputErros.errosBirthdate}
                    </FormControl.ErrorMessage>
                </FormControl>
            </VStack>
            {
                !keyboardIsOpen&&
                <Button 
                    bgColor="defaultBlue" 
                    borderRadius="2xl" 
                    width={80} 
                    height={60} 
                    onPress={()=>navigation.navigate('CheckCode')} 
                    _text={{
                        fontWeight: 800,
                        color: "#fff",
                    }}
                >
                    Próximo
                </Button>
            }
        </Center>
    );
}