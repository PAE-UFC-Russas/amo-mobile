import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Center, Text, View, Avatar, Input, Button, useToast } from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons'; 
import PickImage from '../../util/PickImage';
import { GetLoginToken } from '../../util/StorageLogin';
import api from '../../services/api';
import { useAuth } from '../../contexts/auth';
import SelectForProfilePage from '../../components/SelectForProfilePage';
import DefaultSelect from '../../components/DefaultSelect';
import styles from './styles';

export default function Profile({navigation}) {
    const toast = useToast();
    const GetYearsPerSemester = () => {
        let tempYears = [];
        for(let i = 0; i < years.length; i++){
            tempYears.push(years[i] + '.1');
            tempYears.push(years[i] + '.2');
        }
        return tempYears;
    }
    const [courses, setCourses] = useState([]);
    const [years, setYears] = useState([]);
    const { user, IsConnected } = useAuth();
    const [profile, setProfile] = useState({
        nome_exibicao: user.perfil.nome_exibicao,
        entrada: user.perfil.entrada,
        curso: user.perfil.curso,
    });

    const GetImage = async () => {
        const avatar = await PickImage();
        setProfile({...profile, avatar: avatar});
    }

    const Save = async () => {
        if(!profile.nome_exibicao || !profile.curso || !profile.entrada){
            toast.show({
                title: 'Não deixe nenhum campo em branco!',
                placement: 'bottom'
            });
        }else{
            try{
                const response = await api.patch('/usuario/eu/', 
                    {
                        'perfil': profile
                    }, 
                    {
                        headers: {
                            'Authorization': 'Token ' + await GetLoginToken()
                        }
                    }  
                );
                IsConnected();
                toast.show({
                    title: 'Dados cadastrados com sucesso!',
                    placement: 'bottom'
                });
            }catch(error){
                toast.show({
                    title: 'Erro, verifique sua internet!',
                    placement: 'bottom'
                });
                console.log(error.response.data);
            }
        }
    }

    useEffect(()=>{
        const currentYear = new Date().getFullYear();
        let tempYears = [];
        for(let i = 2015; i <= currentYear; i++){
            tempYears.push(i);
        }

        setYears(tempYears);
        async function GetCourses(){
            try{
                const response = await api.get('/cursos/', {
                    headers: {
                        'Authorization': 'Token ' + await GetLoginToken()
                    }
                });
                const listCourses = response.data.results;

                setCourses(listCourses);
            }catch(error){
                console.log(error.response.data);
            }
        }
        GetCourses();
    }, [])

    return ( 
        <View>
            <Text marginTop={7} alignSelf='center' fontSize={25}>Editar Perfil</Text>
            <Center>
                <TouchableOpacity onPress={()=>GetImage()}>
                    <Avatar 
                        alignSelf='center' 
                        bg='tertiaryBlue' 
                        margin={5}
                        size='xl'
                        source={{
                            uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
                        }}
                    />
                    <View style={styles.avatarBadge}>
                        <FontAwesome5
                            color='#fff'
                            size={16}
                            name='pen'
                        />
                    </View>
                </TouchableOpacity>
            </Center>
            <View style={styles.edgeProfile}>
                <Text
                    marginTop={5} 
                    fontSize={15} 
                >
                    Nome de exibição
                </Text>
                <Input 
                    _text={{
                        color: 'green',
                        fontSize:12
                    }}
                    borderWidth={1}
                    borderColor='black'
                    placeholder='Digite seu nome de exibição' 
                    fontSize={15}
                    onChangeText={text=>setProfile({...profile, nome_exibicao: text})} 
                    value={profile.nome_exibicao}
                    variant='outline'
                    borderRadius={15}
                    backgroundColor='#fff'
                />
                <Text
                    marginTop={5} 
                    fontSize={15} 
                >
                    Curso
                </Text>
                <SelectForProfilePage
                    backgroundColor='white' 
                    style={{color:'black', backgroundColor:'white'}}
                    placeholder='Escolha seu curso' 
                    items={courses}
                    setValue={itemValue => setProfile({...profile, curso: courses.filter(e => e.id == itemValue)[0].id})} 
                    color='black'
                />

                <Text 
                    marginTop={5} 
                    fontSize={15}
                >
                    Entrada
                </Text>
                <DefaultSelect
                    style={{color:'black', backgroundColor:'white'}}
                    backgroundColor='white'
                    placeholder='Ano de entrada' 
                    items={GetYearsPerSemester()}
                    value={profile.entrada} 
                    setValue={itemValue => setProfile({...profile, entrada: itemValue})} 
                    color='black'                     
                />
            </View>
            <View style={styles.buttons}>
                <Button 
                    borderWidth={2} 
                    borderColor='#52D6FB' 
                    variant='outline' 
                    borderRadius={10} 
                    width={100} 
                    _text={{
                    color: '#4B4A4A',
                }}onPress={() => navigation.goBack()}>
                    Cancelar
                </Button>
                <Button bgColor='#52D6FB' borderRadius={10} width={100} onPress={Save}>
                    Salvar
                </Button>
            </View>
        </View>
    );
}
