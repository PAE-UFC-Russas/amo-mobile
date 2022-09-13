import React, { useState } from 'react';
import { View } from 'react-native';
import { Avatar, Box, Button, Text, Select, Input, HStack, TextArea, Image, useToast } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons'; 
import { GetLoginToken } from '../../util/StorageLogin';
import api from '../../services/api';
import PickImage, { LaunchCamera } from '../../util/PickImage';
import OnDeleteModal from '../../components/OnDeleteModal';
import styles from './styles';

export default function RegisterDoubt({navigation, route}) {
    const [openModal, setOpenModal] = useState(false)
    const [question, setQuestion] = useState({
        titulo: '',
        descricao: ''
    });
    const [image, setImage] = useState(null);
    const toast = useToast();

    const GetImage = async (type) => {
        const img = type === 'cam'?await LaunchCamera():await PickImage();
        console.log(img)
        setImage(img);
        
    }

    const OnDelete = () => {
        if(question.titulo.length > 0 || question.descricao.length > 0){
            setOpenModal(true)
        }else{
            navigation.goBack()
        }
    }

    const PostQuestion = async () => {
        if(question.titulo.length > 0 || question.descricao.length > 0){
            try{
                await api.post('/duvidas/', {
                    'titulo': question.titulo,
                    'descricao': question.descricao,
                    'disciplina': route.params.id
                },
                {
                    headers: {
                        'Authorization': 'Token ' + await GetLoginToken()
                    },
                });

                toast.show({
                    title: 'Dúvida publicada com sucesso!',
                    placement: 'bottom'
                });

                navigation.goBack();
            }catch(error){
                console.log(error.response.data);
                toast.show({
                    title: 'Erro ao publicar dúvida!',
                    placement: 'bottom'
                });
                return error.response.data
            }
        }else{
            console.log('erro')
        }
    }
    
    return (
        <Box height='full' padding='5' width='full' justifyContent='space-between'>
            <View>
                <HStack justifyContent='space-between' width='64' marginTop='5'>
                    <MaterialIcons
                        onPress={OnDelete}
                        color='#52D6FB'
                        size={24}
                        name='arrow-back-ios'
                    />
                    <Text style={styles.title}>Cadastrar dúvida</Text>
                </HStack>
                <HStack>
                    <Avatar 
                        marginLeft={30}
                        marginTop={50} 
                        marginRight={3}
                        bg='tertiaryBlue' 
                        size='md' 
                        source={{
                            uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
                        }}
                    />
                    <Select 
                        placeholder='Privacidade do Autor' 
                        marginTop={28}
                        height={38}
                        width={190}
                        borderRadius={20} 
                        borderColor='#52D6FB'
                        placeholderTextColor='#52D6FB'
                        color='#52D6FB'
                    >
                        <Select.Item label='Público' value='publico'/>
                        <Select.Item label='Somente para monitores' value='monitores'/>
                    </Select>
                </HStack>
                <View style={{width:'100%'}}>
                    <Input 
                        size='md'
                        borderColor='#52D6FB'
                        borderRadius={20} 
                        marginTop={2} 
                        width='90%'
                        color='#52D6FB' 
                        marginLeft={5}  
                        placeholderTextColor='#52D6FB' 
                        onChangeText={(text)=> setQuestion({...question, titulo:text})}
                        placeholder='Insira um titulo'
                    />
                    <Text style={{fontSize:11, fontFamily:'Roboto', flexWrap:'wrap', width:'80%', marginLeft:35}}>
                        O titulo deve conter palavras chaves, ex: equação do segundo grau
                    </Text>
                    <TextArea 
                        size='md' 
                        borderColor='#52D6FB' 
                        color='#52D6FB' 
                        maxLength={500} 
                        borderRadius={20} 
                        marginLeft={5} 
                        width='90%' 
                        marginTop={2} 
                        height={50} 
                        placeholderTextColor='#52D6FB' 
                        onChangeText={(text)=> setQuestion({...question, descricao:text})} 
                        placeholder='Insira um descrição'
                    />
                    <Text style={{ height:100, fontSize:11, width:230, fontFamily:'Roboto', marginLeft:35}}>
                        A descrição deve conter 500 caracteres
                    </Text>
                </View>
                {
                    image&&
                    <Image 
                        borderRadius={5} 
                        width={400} 
                        height={300} 
                        alt='Conteúdo da dúvida' 
                        source={{
                                uri: image
                            }}
                    />
                }
            </View>
            <HStack width='full' justifyContent='space-between'>
                <HStack space={2}>
                    <MaterialIcons
                        color='#52D6FB'
                        size={32}
                        name='drive-folder-upload'   
                        onPress={()=>GetImage('lib')}
                    />
                    <MaterialIcons
                        color='#52D6FB'
                        size={32}
                        name='add-photo-alternate' 
                        onPress={()=>GetImage('cam')}           
                    />
                </HStack>
                <Button style={{width:'30%', borderRadius:30}} onPress={PostQuestion}>Publicar</Button>
            </HStack>
            {
                openModal && <OnDeleteModal setOpenModal={setOpenModal} openModal={openModal} navigation={navigation} />
            }
        </Box>
    );
}