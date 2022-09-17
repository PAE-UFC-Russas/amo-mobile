import React, { useState, useEffect } from 'react';
import { Avatar, Text, View,  ScrollView , HStack, FlatList } from 'native-base';
import { AntDesign } from '@expo/vector-icons';

export default function Comments({resposta}){

    const [clickHearto, setClickHearto] = useState(false)
    const [ClickCheckcircle, setClickCheckcircle] = useState(false)
    const [ responses, setResponses ] = useState(null);
    const [ myResponse, setMyResponse ] = useState('');

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

    useEffect(()=>{
        GetResponses();
    },[])
    
    return(
        <ScrollView
            backgroundColor={'#DCDCDC'} 
            padding={3} 
            margin={3}
            borderRadius={'15px'} 
        >
            <View style={{flexDirection:'row'}}>
                <Avatar 
                    marginLeft={'5%'}
                    margin={'2%'}
                    bg='tertiaryBlue' 
                    size='md' 
                    source={{
                        uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
                }}
            />
                <Text fontSize={18} fontWeight={'bold'} marginTop={'3%'}>Max</Text>
            </View>
            <View paddingLeft={'5%'} flexDirection={'column'}>
                <Text fontSize={15}>{resposta}</Text>
                <View flexDirection={'row'} paddingRight={'5%'} marginTop={'4%'} justifyContent='space-between'>
                    <HStack space={2}>
                        <AntDesign
                            size={20}
                            name='heart'   
                            color={clickHearto?'red':'grey'}
                            onPress={()=> setClickHearto(!clickHearto)}
                        />
                        <AntDesign 
                            name='checkcircle'
                            size={20} 
                            color={ClickCheckcircle?'green':'grey'}
                            onPress={()=> setClickCheckcircle(!ClickCheckcircle)}
                        />
                    </HStack>
                    <Text fontWeight={'bold'}>27/07/2022</Text>
                </View>
            </View>
        </ScrollView>
    )
}