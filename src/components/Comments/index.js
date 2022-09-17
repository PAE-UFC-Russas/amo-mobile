import React, { useState } from 'react';
import { Avatar, Text, View,  ScrollView , HStack } from 'native-base';
import { AntDesign } from '@expo/vector-icons';

export default function Comments({comment}){
    const [clickHearto, setClickHearto] = useState(false)
    const [ClickCheckcircle, setClickCheckcircle] = useState(false)

    const DateISOToFormated = (date) => {
        date = new Date(date);
        const year = date.getFullYear();
        const month = (1 + date.getMonth()).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
    
        return day + '/'+ month + '/' + year;
    }

    return(
        <ScrollView
            backgroundColor='#DCDCDC'
            padding={3} 
            margin={3}
            borderRadius='15px'
        >
            <View style={{flexDirection:'row'}}>
                <Avatar 
                    bg='tertiaryBlue' 
                    size='md' 
                    source={{
                        uri: !comment.autor.perfil.avatar?'':comment.autor.perfil.avatar
                    }}
                />
                <Text marginLeft={3} fontSize={18} fontWeight='bold'>{comment.autor.perfil.nome_exibicao}</Text>
            </View>
            <Text fontSize={15}>{comment.resposta}</Text>
            <View flexDirection='row'  marginTop={5} justifyContent='space-between'>
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
                <Text fontWeight={'bold'}>{DateISOToFormated(comment.data)}</Text>
            </View>
        </ScrollView>
    )
}