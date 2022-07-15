import React, { useState, useEffect } from 'react';
import { Keyboard, TouchableOpacity, Text } from 'react-native';
import { Center, VStack } from 'native-base';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import AuthHeader from '../../components/AuthHeader';
import DefaultBlueButton from '../../components/DefaultBlueButton';
import DefaultFormInput from '../../components/DefaultFormInput';
import DefaultSelect from '../../components/DefaultSelect';
import styles from './styles';
import api from '../../services/api';
import { GetLoginToken } from '../../util/StorageLogin';

export default function StudentProfile({navigation}) {
    const [keyboardIsOpen, setKeyboardIsOpen] = useState(false);
    const [showDate, setShowDate] = useState(false);
    const [personalData, setPersonalData] = useState({
        name: '',
        nickName: '',
        registration: '',
        entryYear: '',
        course: {
            id: null,
            nome: '',
            descricao: ''
        },
        birthDate: new Date()
    });
    const [inputErros, setInputErros] = useState({
        errosNickName: null,
        errosName: null,
        errosRegistration: null,
        errosEntryear: null,
        errosCourse: null,
        errosBirthDate: null
    });
    const courses = ["Ciência da Computação", "Engenharia Civil", "Engenharia Mecânica", "Engenharia de Produção", "Engenharia de Software"];
    const currentYear = new Date().getFullYear();
    let years = [];

    for(let i = 2015; i <= currentYear; i++){
        years.push(i);
    }

    useEffect(()=>{
        async function GetCourses(){
            try{
                const response = await api.get('/cursos/', {
                    headers: {
                        'Authorization': 'Token ' + await GetLoginToken()
                    }
                });
                const listCourses = response.data;
                return listCourses
            }catch(error){
                console.log(error.response.data)
            }
        }
        console.log(GetCourses());
    }, [])

    console.log(GetCourses())

    const RenderDate = () => {
        const year = personalData.birthDate.getFullYear();
        const month = (1 + personalData.birthDate.getMonth()).toString().padStart(2, '0');
        const day = personalData.birthDate.getDate().toString().padStart(2, '0');
    
        return day + '/'+ month + '/' + year;
    }

    const InputValidation = () => {
        let erros = {
            errosName: null,
            errosNickname: null,
            errosEntryear: null,
            errosCourse: null,
            errosBirthDate: null
        };

        if(personalData.user.length < 3)
            erros.errosName = "Nome inválido!";
        if(!personalData.nickName)
            erros.errosNickname = "Matricula inválida!";
        if(!personalData.entryYear)
            erros.errosEntryear = "Ano de entrada não pode está vazio!";
        if(!personalData.course.id)
            erros.errosCourse = "Curso não pode está vazio!";
        if(personalData.birthDate.getFullYear() === 2022)
            erros.errosBirthDate = "A data de nascimento não pode está vazia!";

        setInputErros(erros);
        if(!erros.errosUser && !erros.errosName && !erros.errosNickname && !erros.errosEntryear && !erros.errosCourse && !erros.errosBirthDate)
            return navigation.navigate("AddPhoto")
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
                <AuthHeader>
                    Estamos quase lá
                </AuthHeader>
            }
            <VStack width="5/6" space={3}>
                <DefaultFormInput 
                    placeholder="Nome completo" 
                    value={personalData.name} 
                    setValue={text=>setPersonalData({...personalData, name: text})} 
                    color="tertiaryBlue" 
                    error={inputErros.errosName}
                />
                <DefaultFormInput 
                    maxLength={64}
                    placeholder="Nome de exibição" 
                    value={personalData.nickName} 
                    setValue={text=>setPersonalData({...personalData, nickName: text})} 
                    color="tertiaryBlue" 
                    error={inputErros.errosNickName}
                />
                <DefaultFormInput
                    placeholder="Matrícula" 
                    value={personalData.registration} 
                    setValue={text=>setPersonalData({...personalData, registration: text})} 
                    maxLength={6}
                    color="tertiaryBlue" 
                    error={inputErros.errosRegistration}
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
                    value={personalData.course.nome} 
                    setValue={itemValue => setPersonalData({...personalData, course: itemValue})} 
                    color="tertiaryBlue" 
                    error={inputErros.errosCourse}
                />
                <TouchableOpacity 
                    style={styles.dateTimeButton}
                    onPress={()=>setShowDate(true)}
                >
                    <Text style={{color: !inputErros.errosBirthDate?"#52D6FB":"#f00", fontSize: 12}}>
                        {personalData.birthDate.getFullYear()===2022?"Data de nascimento":RenderDate()}
                    </Text>
                </TouchableOpacity>
                {
                    showDate&&
                        <RNDateTimePicker 
                            mode="date" 
                            value={personalData.birthDate}
                            minimumDate={new Date(1940, 0, 1)}
                            onTouchCancel={()=>setShowDate(false)}
                            onChange={(event, date) => {setShowDate(false);setPersonalData({...personalData, birthDate: date})}}
                        />
                }
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