import React, { useState } from 'react';
import { Avatar, Text, View,  ScrollView , HStack } from 'native-base';
import { AntDesign } from '@expo/vector-icons';

export default function Comments(){

    const [clickHearto, setClickHearto] = useState(false)
    const [ClickCheckcircle, setClickCheckcircle] = useState(false)

    return(
        <ScrollView 
            backgroundColor={'#DCDCDC'} 
            width={'95%'} 
            height={'20%'} 
            borderRadius={'15px'} 
            marginTop={'2%'} 
            marginLeft={'1%'}
            overflow={'hidden'}
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
                <Text fontSize={15}>É so usar formul de baskara</Text>
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