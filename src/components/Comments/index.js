import React from 'react';
import { Avatar, Text, HStack, View, VStack, } from 'native-base';
import { AntDesign } from '@expo/vector-icons';

export default function Comments(){
    return(
        <View>
            <HStack>
                <Avatar 
                    marginLeft={30}
                    margin={5}
                    bg='tertiaryBlue' 
                    size='md' 
                    source={{
                        uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
                    }}
                />
                <HStack>
                    <VStack margin={5}>
                        <Text fontSize={15} >Max</Text>
                        <Text fontSize={17}>é so usar formula de baskara</Text>
                        <AntDesign
                            size={20}
                            name='hearto'
                        />
                        <Text marginLeft={40}>24/07/2022</Text>
                    </VStack>
                </HStack>
            </HStack>
        </View>
    )
}