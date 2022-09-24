import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { Avatar, Text,  Input, HStack, View, useToast, IconButton} from 'native-base';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import DateISOToFormated from '../../util/DateISOToFormated';
import Comments from '../../components/Comments';
import { GetLoginToken } from '../../util/StorageLogin';
import { useAuth } from '../../contexts/auth';
import api from '../../services/api';
import PickImage from '../../util/PickImage';
import styles from './styles';

export default function AnswerQuestion({navigation, route}) {
    const [ responses, setResponses ] = useState(null);
    const [ myResponse, setMyResponse ] = useState({content: null, response: ''});
    const [ doubt, setDoubt ] = useState(route.params);
    const [ markEnable, setMarkEnable ] = useState(false);
    const { user } = useAuth();
    const toast = useToast();

    const GetImage = async () => {
        const content = await PickImage();
        setMyResponse({...myResponse, content: content})
    }

    const PostResponse = async ()=>{
        try{
            await api.post('/respostas/', {
                'duvida': doubt.id,
                'resposta': myResponse.response
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
            const idDuvida = doubt.id;
            const response = await api.get(`/respostas/?pages=1&duvida=${idDuvida}`, {
                headers: {
                    'Authorization': 'Token ' + await GetLoginToken()
                }
            });

            if(doubt.resposta_correta){
                let data = response.data.results;

                data.forEach(function(item,i){
                    if(item.id === doubt.resposta_correta){
                      data.splice(i, 1);
                      data.unshift(item);
                    }
                });

                setResponses(data);
            }else{
                setResponses(response.data.results);
            }
        }catch(error){
            console.log(error.response.data)
        }
    }  

    const MarkResponse = async (id) => {
        try{
            if(id === doubt.resposta_correta){
                await api.delete(`/duvidas/${doubt.id}/correta/`, { 
                    headers: {
                        'Authorization': 'Token ' + await GetLoginToken()
                    },
                    data:{
                        id: id
                    }
                });
                setDoubt({...doubt, resposta_correta: null})
            }else{
                await api.post(`/duvidas/${doubt.id}/correta/`, {
                    id: id     
                }, {
                    headers: {
                        'Authorization': 'Token ' + await GetLoginToken()
                    }
                });
                setDoubt({...doubt, resposta_correta: id})
            }
        }catch(error){
            console.log(error.response)
        }
    } 

    useEffect(()=>{   
        const EnableMark = () => {
            if(user.perfil.cargos.indexOf('monitor') !== -1 && user.perfil.cargos.indexOf('professor') !== -1){
                return true
            }else if(user.perfil.id === doubt.autor.id){
                return true
            }else{
                return false
            }
        }

        setMarkEnable(EnableMark());
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
                            uri: !doubt.autor.perfil.avatar?null:doubt.autor.perfil.avatar
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
                        {doubt.autor.perfil.nome_exibicao}
                    </Text>
                </HStack>
                <View marginBottom={3} marginLeft={5}>
                    <Text fontSize={15} fontWeight='bold'>{doubt.titulo}</Text>
                    <View>
                        <Text style={styles.textDoubt}>{doubt.descricao}</Text>
                        <Text style={styles.textDate}>{DateISOToFormated(doubt.data)}</Text>
                    </View>
                </View>
                <HStack marginBottom={2}>
                    <Input 
                        marginLeft={3}
                        width='72'
                        placeholder='Comentar'    
                        onChangeText={(text)=> setMyResponse({...myResponse, response: text})}
                    />
                    <IconButton onPress={GetImage} icon={<FontAwesome name='photo' size={24} color='#52D6FB'/>}/>
                    <IconButton onPress={PostResponse} icon={<MaterialIcons name='send' size={24} color='#52D6FB'/>}/>  
                </HStack>          
                <FlatList
                    style={{height: '75%'}}
                    data={responses}
                    renderItem={(comment)=> <Comments comment={comment.item} correctResponse={doubt.resposta_correta} MarkResponse={MarkResponse} enableMark={markEnable}/>}
                    keyExtractor={comment => comment.id}
                />
            </View>
        </View>
    );
}