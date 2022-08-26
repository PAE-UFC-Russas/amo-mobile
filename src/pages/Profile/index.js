import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Center, Text, View, Avatar, Input, Button } from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons'; 
import RNDateTimePicker from '@react-native-community/datetimepicker';
import PickImage from '../../util/PickImage';
import api from '../../services/api';
import { useAuth } from '../../contexts/auth';
import styles from './styles';

export default function Profile({navigation}) {
    const { user } = useAuth();
    const [profile, setProfile] = useState({
        nome_completo: user.perfil.nome_completo,
        nome_exibicao: user.perfil.nome_exibicao,
        // data_nascimento: user.perfil.data_nascimento
        data_nascimento: new Date()
    });
    const [showDate, setShowDate] = useState(false);

    const GetImage = async () => {
        const avatar = await PickImage();
        setProfile({...profile, avatar: avatar});
    }

    const DateToString = (date) => {
        const year = date.getFullYear();
        const month = (1 + date.getMonth()).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
    
        return day + '/' + month + '/' + year;
    }

    const Salvar = async () => {
        const response = await api.patch('/usuario/eu/', 
            {
                "perfil": profile
            }, 
            {
                headers: {
                    'Authorization': 'Token ' + token
                }
            }
        );
    }
    
    return ( 
        <View>
            <Text marginTop={10} marginLeft={5} fontSize={25}>Editar Perfil</Text>
            <Center>
                <TouchableOpacity onPress={()=>GetImage()}>
                    <Avatar 
                        marginLeft={30}
                        marginTop={50} 
                        margin={5}
                        bg='tertiaryBlue' 
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
            <View padding={2} margin={3}>
                <Text 
                    fontSize={15}
                >
                    Nome
                </Text>
                <Input 
                    type='text' 
                    placeholder='Digite seu nome' 
                    fontSize={15} 
                    onChangeText={text=>setProfile({...profile, name: text})} 
                    value={profile.name}
                    variant='underlined'
                />
                <Text
                    marginTop={5} 
                    fontSize={15} 
                >
                    Nome de exibição
                </Text>
                <Input 
                    placeholder='Digite seu nome de exibição' 
                    fontSize={15}
                    variant='underlined'
                    onChangeText={text=>setProfile({...profile, nickname: text})} 
                    value={profile.nickname}
                />
                <Text 
                    marginTop={5} 
                    fontSize={15}
                >
                    Data de aniversário
                </Text>
                <Input 
                    type='text' 
                    fontSize={15} 
                    value={DateToString(profile.data_nascimento)}
                    onPressIn={()=>setShowDate(!showDate)}
                    variant='underlined'
                />
                {
                    showDate&&
                    <RNDateTimePicker 
                        mode='date' 
                        value={profile.data_nascimento}
                        minimumDate={new Date(1940, 0, 1)}
                        onTouchCancel={()=>setShowDate(false)}
                        onChange={(event, date) => {setShowDate(false);setPersonalData({...profile, data_nascimento: date})}}
                    />
                }
            </View>
            <View style={styles.buttons}>
                <Button borderWidth={2} borderColor='#52D6FB' variant='outline' borderRadius={20} width={100} _text={{
                    color: '#4B4A4A',
                }} onPress={() => navigation.goBack()}>
                    Cancelar
                </Button>
                <Button bgColor='#52D6FB' borderRadius={20} width={100} onPress={Salvar}>
                    Salvar
                </Button>
            </View>
        </View>
    );
}
