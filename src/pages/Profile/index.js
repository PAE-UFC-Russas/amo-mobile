import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Center, Text, View, Avatar, Button, ScrollView} from 'native-base';
import { useAuth } from '../../contexts/auth';
import styles from './styles';

export default function Profile({navigation}) {
    const { user } = useAuth();
    const [profile, setProfile] = useState({
        nome_exibicao: user.perfil.nome_exibicao,
        entrada: user.perfil.entrada,
        curso: user.perfil.curso,
    });

    return ( 
        <ScrollView>
            <Text 
                marginTop={10} 
                alignSelf='center' 
                fontSize={25}
                color={'#52D6FB'}
            >
                Perfil
            </Text>
            <Center>
                <TouchableOpacity>
                    <Avatar 
                        alignSelf='center' 
                        bg='tertiaryBlue' 
                        margin={5}
                        size='xl'
                        source={{
                            uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
                        }}
                    />
                
                </TouchableOpacity>
            </Center>
            <View style={styles.edgeProfile}>
                <View style={{borderBottomWidth:1, borderBottomColor:'#52D6FB'}}>
                    <Text
                        marginTop={2} 
                        fontSize={20} 
                    >
                        Nome de exibição
                    </Text>
                    <View style={{padding:10}}>
                        <Text style={{fontSize:15}}>{profile.nome_exibicao}</Text>
                    </View>
                </View>
                <View style={{borderBottomWidth:1, borderBottomColor:'#52D6FB'}}>
                    <Text
                        marginTop={5} 
                        fontSize={20} 
                    >
                        Curso
                    </Text>
                    <View style={{padding:10}}>
                        <Text style={{fontSize:15}}>{profile.curso}</Text>
                    </View>
                </View>
                <View>
                    <Text 
                        marginTop={5} 
                        fontSize={20}
                    >
                        Entrada
                    </Text>
                    <View style={{padding:10}}>
                        <Text style={{fontSize:15}}>{profile.entrada}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.buttons}>
                <Button bgColor='#52D6FB' borderRadius={10} width='50%' onPress={()=> navigation.navigate('EditProfile')}>
                    Editar
                </Button>
            </View>
        </ScrollView>
    );
}
