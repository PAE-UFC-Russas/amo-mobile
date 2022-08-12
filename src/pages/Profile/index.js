import React, { useState } from 'react';
import { Center, Text, View, Avatar, Input, Button } from 'native-base';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons'; 
import styles from './styles';

export default function Profile({navigation}) {

    const salvar = ()=>{
        alert('campos alterados!')
    }
    
    const [nome, setNome] = useState('')
    const [Nezibicao, setNezibicao] = useState('')
    const [dataA, setDataA] = useState('')
    
    return ( 
        <View>
            <MaterialIcons
                onPress={()=>navigation.goBack()}
                color='#52D6FB'
                size={24}
                name='arrow-back-ios'
                style={{marginLeft:'5%', marginTop:50}}
            />
        <Text marginTop={20} marginLeft={5} fontSize={25}>Editar Perfil</Text>
        <Center>
            <View>
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
                        onPress={()=>navigation.goBack()}
                        color='#fff'
                        size={16}
                        name='pen'
                    />
                </View>
            </View>
        </Center>
        <View margin={3}>
            <Text 
                marginLeft={5} 
                fontWeight={'bold'} 
                fontSize={17}
            >
                Nome
            </Text>
            <Input 
                type='text' 
                placeholder='digite seu nome' 
                fontSize={15} 
                onChangeText={setNome} 
                value={nome}
            />

            <Text 
                marginLeft={5} 
                marginTop={5} 
                fontWeight={'bold'} 
                fontSize={17} 
                onChangeText={setNezibicao} 
                value={Nezibicao}
            >
                Nome de exibição
            </Text>
            <Input 
                placeholder='digite seu nome de exibição' 
                fontSize={15}
            />
            <Text 
                marginLeft={5} 
                marginTop={5} 
                fontWeight={'bold'} 
                fontSize={17}
            >
                Data de aniversário
            </Text>
            <Input 
                type='text' 
                placeholder='digite sua data de nascimento' 
                fontSize={15} 
                onChangeText={setDataA} 
                value={dataA}
            />
        </View>
        <View style={styles.buttons}>
            <Button borderWidth={2} borderColor='#52D6FB' variant='outline' borderRadius={20} width={100} _text={{
                color: '#4B4A4A',
            }}>
                Cancelar
            </Button>
            <Button bgColor='#52D6FB' borderRadius={20} width={100} onPress={salvar}>
                Salvar
            </Button>
        </View>
        </View>
    );
}
