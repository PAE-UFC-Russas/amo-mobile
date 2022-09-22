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
    const [markEnable, setMarkEnable] = useState(false);
    const { user } = useAuth();
    const toast = useToast();

    const GetImage = async () => {
        const content = await PickImage();
        setMyResponse({...myResponse, content: content})
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

            if(route.params.resposta_correta){
                let data = response.data;

                data.forEach(function(item,i){
                    if(item.id === route.params.resposta_correta){
                      data.splice(i, 1);
                      data.unshift(item);
                    }
                });

                setResponses(data);
            }else{
                setResponses(response.data);
            }
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
        const EnableMark = () => {
            if(user.perfil.cargos.indexOf('monitor') !== -1 && user.perfil.cargos.indexOf('professor') !== -1){
                return true
            }else if(user.perfil.id === route.params.autor.id){
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
                            uri: !route.params.autor.perfil.avatar?null:route.params.autor.perfil.avatar
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
                    <Text fontSize={15} fontWeight='bold'>{route.params.titulo}</Text>
                    <View>
                        <Text style={styles.textDoubt}>{route.params.descricao}</Text>
                        <Text style={styles.textDate}>{DateISOToFormated(route.params.data)}</Text>
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
                    renderItem={(comment)=> <Comments comment={comment.item} correctResponse={route.params.resposta_correta} MarkResponse={MarkResponse} enableMark={markEnable}/>}
                    keyExtractor={comment => comment.id}
                />
            </View>
        </View>
    );
}