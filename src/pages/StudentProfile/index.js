import React, { useState } from 'react';
import { Keyboard } from 'react-native';
import { Center, VStack } from 'native-base';
import RegisterHeader from '../../components/RegisterHeader';
import DefaultBlueButton from '../../components/DefaultBlueButton';
import DefaultFormInput from '../../components/DefaultFormInput';
import DefaultSelect from '../../components/DefaultSelect';
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

    const courses = ['Ciência da Computação', 'Engenharia Civil', 'Engenharia Mecânica', 'Engenharia de Produção', 'Engenharia de Software'];
    const currentYear = new Date().getFullYear();
    let years = [];
    for(let i = 2015; i <= currentYear; i++){
        years.push(i);
    }

    const InputValidation = () => {
        let erros = {
            errosUser: null,
            errosName: null,
            errosNickname: null,
            errosEntryear: null,
            errosCourse: null,
            errosBirthdate: null
        };
    
        if(personalData.user.length < 3)
            erros.errosUser = "Usuário inválido!";
        if(personalData.user.length < 3)
            erros.errosName = "Nome inválido!";
        if(personalData.nickname.length < 3)
            erros.errosNickname = "Apelido inválido!";
        if(!personalData.entryYear)
            erros.errosEntryear = "Ano de entrada não pode está vazio!";
        if(!personalData.course)
            erros.errosCourse = "Curso não pode está vazio!";

        setInputErros(erros);
        if(!erros.errosUser && !erros.errosName && !erros.errosNickname && !erros.errosEntryear && !erros.errosCourse && !erros.errosBirthdate)
            return navigation.navigate("CheckCode")
        return null
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
            bgColor="#fff"
        >
            {
                !keyboardIsOpen&&
                <RegisterHeader>
                    Estamos quase lá
                </RegisterHeader>
            }
            <VStack width="5/6" space={3}>
                <DefaultFormInput 
                    placeholder="Nome de usuário" 
                    value={personalData.user} 
                    setValue={text=>setPersonalData({...personalData, user: text})} 
                    color="tertiaryBlue" 
                    error={inputErros.errosUser}
                />
                <DefaultFormInput 
                    maxLength={64}
                    placeholder="Nome completo" 
                    value={personalData.name} 
                    setValue={text=>setPersonalData({...personalData, name: text})} 
                    color="tertiaryBlue" 
                    error={inputErros.errosName}
                />
                <DefaultFormInput
                    placeholder="Apelido" 
                    value={personalData.nickname} 
                    setValue={text=>setPersonalData({...personalData, nickname: text})} 
                    color="tertiaryBlue" 
                    error={inputErros.errosNickname}
                />
                <DefaultSelect
                    placeholder="Ano de entrada" 
                    items={years}
                    value={personalData.entryYear} 
                    setValue={itemValue => setPersonalData({...personalData, entryYear: itemValue})} 
                    color="tertiaryBlue" 
                    error={inputErros.errosEntryear}
                />
                <DefaultSelect
                    placeholder="Escolha seu curso" 
                    items={courses}
                    value={personalData.course} 
                    setValue={itemValue => setPersonalData({...personalData, course: itemValue})} 
                    color="tertiaryBlue" 
                    error={inputErros.errosCourse}
                />
                <DefaultFormInput 
                    placeholder="Data de nascimento" 
                    value={personalData.birthDate} 
                    setValue={text=>setPersonalData({...personalData, birthDate: text})} 
                    color="tertiaryBlue" 
                    error={inputErros.errosBirthdate}
                />
            </VStack>
            {
                !keyboardIsOpen&&
                <DefaultBlueButton onPress={InputValidation}>
                    Próximo
                </DefaultBlueButton>
            }
        </Center>
    );
}