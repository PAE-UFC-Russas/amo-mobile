import React, { useEffect, useState } from 'react';
import { Avatar, Text,  Input, HStack, View, Button, FlatList} from 'native-base';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import Comments from '../../components/Comments';
import { GetLoginToken } from '../../util/StorageLogin';
import { AntDesign } from '@expo/vector-icons';
import api from '../../services/api';
import styles from './styles';


export default function AnswerQuestion({navigation, autor, quest }) {
    const [ responses, setResponses ] = useState(null);
    const [ myResponse, setMyResponse ] = useState('');

    const PostResponse = async ()=>{
        try{
            await api.post('/respostas/', {
                'duvida': resposta.titulo,
                'resposta': myResponse,
                'autor': route.params.id 
            },
            {
                headers: {
                    'Authorization': 'Token ' + await GetLoginToken()
                },
            });
        }catch(error){
            console.log(error.response.data)
        }
        console.log(myResponse)
    }   

    

    const GetResponses = async () => {
        try{
            const response = await api.get(`/respostas/${id}/`, {
                headers: {
                    'Authorization': 'Token ' + await GetLoginToken()
                }
            });
            setResponses(response.data);
        }catch(error){
            console.log(error.response.data)
        }
    }  
    
    const PutResponse = async () => {
        try{
            const response = await api.put(`/respostas/${id}/`, {
                headers: {
                    'Authorization': 'Token ' + await GetLoginToken()
                }
            });
        }catch(error){
            console.log(error.response.data)
        }
    } 
    

    useEffect(()=>{
        GetResponses();
    },[])

    return ( 
        <View style={styles.container}>
           <HStack marginLeft={'7%'}>
                <MaterialIcons
                    onPress={()=> navigation.goBack()}
                    color='#52D6FB'
                    size={24}
                    name='arrow-back-ios'
                />
                <Text style={styles.title}>Responder dúvida</Text>
            </HStack>

            <View style={{paddingTop: '10%'}}>
                <HStack>
                    <Avatar 
                        bg='tertiaryBlue' 
                        size='md' 
                        source={{
                            uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
                        }}
                        style={{marginLeft: '8%'}}
                    />
                        <Text 
                            style={{
                                fontSize:20, 
                                marginLeft: '3%', 
                                marginTop: '1%',
                                fontWeight:'bold'
                            }}
                        >
                            Max
                        </Text>
                </HStack>
                <View style={styles.BorderDoubt}>
                    <Text fontSize={15} fontWeight={'bold'} >Equação do segundo grau:</Text>
                    <Text style={styles.doubt}>Como faço para resolver a seguinte equação: 5x + 3x + 2?</Text>
                </View>
                <View 
                    justifyContent='center' 
                    alignItems='center' 
                    paddingBottom={5}
                >
                    <Text 
                        marginLeft='70%' 
                        fontWeight='bold'
                    >
                        27/07/2022
                    </Text>
                </View>
        
                <Input 
                    marginLeft={8}
                    width='88%'  
                    placeholder='Comentar'    
                    fontSize='15'
                    onChangeText={(text)=> setMyResponse(text)}

                />
                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                    <View style={{justifyContent:"center", alignItems:"center"}}>
                        <FontAwesome name="photo" size={25} color="#52D6FB" style={{justifyContent:'center', marginTop:'10%'}} />    
                    </View>
                    <View>
                        <Button 
                            style={{alignSelf:'center', marginTop:'3%', marginLeft:'5%'}}
                            bgColor='#52D6FB' 
                            borderRadius='2xl' 
                            width={40} 
                            height={10} 
                            onPress={PostResponse} 
                            _text={{
                                fontWeight: 800,
                                color: '#fff',
                            }}

                        >add

                        </Button>
                    </View>
                </View>
            
        <View>
            {/* <FlatList
                data={}
                renderItem={(Comments)=> <Comments/>}
                keyExtractor={Comments => Comments.id}
            />    */}
            
        </View>
            <Comments/>
            <Comments/>
            </View>
        </View>
    );
}