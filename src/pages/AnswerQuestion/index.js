import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { Avatar, Text,  Input, HStack, View, useToast, IconButton} from 'native-base';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import DateISOToFormated from '../../util/DateISOToFormated';
import Comments from '../../components/Comments';
import { GetLoginToken } from '../../util/StorageLogin';
import api from '../../services/api';
import PickImage from '../../util/PickImage';
import styles from './styles';

export default function AnswerQuestion({navigation, route}) {
    const [ image, setImage ] = useState(null);
    const [ responses, setResponses ] = useState(null);
    const [ myResponse, setMyResponse ] = useState('');
    const toast = useToast();

    const GetImage = async () => {
        const img1 = await PickImage();
        setImage(img1);
    }

    const PostResponse = async ()=>{
        try{
            await api.post('/respostas/', {
                'duvida': route.params.id,
                'resposta': myResponse
            },
            {
                headers: {
                    'Authorization': 'Token ' + await GetLoginToken()
                },
            });

            toast.show({
                title: 'Resposta publicada com sucesso!',
                placement: 'bottom'
            });

            GetResponses();
        }catch(error){
            console.log(error.response.data)
        }
    } 

    const GetResponses = async () => {
        try{
            const idDuvida = route.params.id;
            const response = await api.get(`/respostas/?duvida=${idDuvida}`, {
                headers: {
                    'Authorization': 'Token ' + await GetLoginToken()
                }
            });

            setResponses(response.data);
        }catch(error){
            console.log(error.response.data)
        }
    }  

    const MarkResponse = async (id) => {
        try{
            await api.post(`/duvidas/${route.params.id}/correta/`, {
                id: id     
            }, {
                headers: {
                    'Authorization': 'Token ' + await GetLoginToken()
                }
            });
        }catch(error){
            console.log(error.response)
        }
    } 

    useEffect(()=>{
        GetResponses();
    },[])

    return ( 
        <View style={styles.container}>
           <HStack marginLeft={5}>
                <MaterialIcons
                    onPress={()=> navigation.goBack()}
                    color='#52D6FB'
                    size={24}
                    name='arrow-back-ios'
                />
                <Text style={styles.title}>Responder dúvida</Text>
            </HStack>
            <View marginTop={5}>
                <HStack>
                    <Avatar 
                        bg='tertiaryBlue' 
                        size='md' 
                        source={{
                            uri: !route.params.autor.perfil.avatar?'':route.params.autor.perfil.avatar
                        }}
                        marginLeft={5}
                    />
                    <Text 
                        style={{
                            fontSize:20, 
                            marginLeft: '3%', 
                            fontWeight:'bold'
                        }}
                    >
                        {route.params.autor.perfil.nome_exibicao}
                    </Text>
                </HStack>
                <View marginBottom={3} marginLeft={5}>
                    <Text fontSize={15} fontWeight={'bold'} >{route.params.titulo}</Text>
                    <HStack justifyContent='space-between'>
                        <Text style={styles.textDoubt}>{route.params.descricao}</Text>
                        <Text style={styles.textDate}>{DateISOToFormated(route.params.data)}</Text>
                    </HStack>
                </View>
                <HStack marginBottom={2}>
                    <Input 
                        marginLeft={3}
                        width='72'
                        placeholder='Comentar'    
                        onChangeText={(text)=> setMyResponse(text)}
                    />
                    <IconButton onPress={GetImage} icon={<FontAwesome name='photo' size={24} color='#52D6FB'/>}/>
                    <IconButton onPress={PostResponse} icon={<MaterialIcons name='send' size={24} color='#52D6FB'/>}/>  
                </HStack>            
                <FlatList
                    style={{height: '75%'}}
                    data={responses}
                    renderItem={(comment)=> <Comments correctResponse={route.params.resposta_correta} MarkResponse={MarkResponse} comment={comment.item}/>}
                    keyExtractor={comment => comment.id}
                />
            </View>
        </View>
    );
}