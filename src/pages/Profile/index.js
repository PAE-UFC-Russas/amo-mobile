import React, { useState } from 'react';
import { Center, Text, View, Avatar, Input, Button } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons'; 
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
        <Text marginTop={20} marginLeft={5} fontSize={20}>Editar Perfil</Text>
        <Center>
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
                placeholder='digite sua data de aniversário' 
                fontSize={15} 
                onChangeText={setDataA} 
                value={dataA}
            />
        </View>
        <View 
            display={'flex'} 
            justifyContent={'space-between'} 
            flexDirection={'row'} 
            marginTop={'35%'}
        >
            <Button 
                width={100}
                marginLeft={5}
            >
                Cancelar
            </Button>
            <Button 
                width={100} 
                marginRight={5} 
                onPress={salvar}
            >
                Salvar
            </Button>
        </View>
        </View>
    );
}
