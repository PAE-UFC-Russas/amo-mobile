import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Center, Text, View, Avatar, Input, Button } from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons'; 
import PickImage from '../../util/PickImage';
import styles from './styles';

export default function Profile({navigation}) {
    const [profile, setProfile] = useState({
        name: '',
        nickname: '',
        birthDate: '',
        avatar: ''
    });

    const GetImage = async () => {
        const avatar = await PickImage();
        setProfile({...profile, avatar: avatar});
    }

    const salvar = ()=>{
        alert('campos alterados!')
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
                    placeholder='Digite sua data de nascimento' 
                    fontSize={15} 
                    onChangeText={text => setProfile({...profile, birthDate: text})} 
                    value={profile.birthDate}
                    variant='underlined'
                />
            </View>
            <View style={styles.buttons}>
                <Button borderWidth={2} borderColor='#52D6FB' variant='outline' borderRadius={20} width={100} _text={{
                    color: '#4B4A4A',
                }} onPress={() => navigation.goBack()}>
                    Cancelar
                </Button>
                <Button bgColor='#52D6FB' borderRadius={20} width={100} onPress={salvar}>
                    Salvar
                </Button>
            </View>
        </View>
    );
}
