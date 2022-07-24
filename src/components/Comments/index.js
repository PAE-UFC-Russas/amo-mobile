import React from 'react';
import { Avatar, Box, Button, Text, Select, Input, HStack, TextArea, Image, View, Center, VStack, TextInput, } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons';

export default function Comments(){
    return(
        <View>
            <HStack>
                <Avatar 
                        marginLeft={30}
                        // marginTop={50} 
                        margin={5}
                        bg="tertiaryBlue" 
                        size="md" 
                        source={{
                            uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                        }}
                    />
                <HStack>
                    <VStack margin={5}>
                            <Text fontSize={15} >Max</Text>
                            <Text fontSize={17}>é so usar formula de baskara</Text>
                            <AntDesign
                                // onPress={() => handleLikeButton("")}
                                // color={quest.liked?"#f00":"#808080"}
                                size={20}
                                name='hearto'
                                // style={{marginRight: 5}}
                        />
                    </VStack>
                </HStack>
            </HStack>
        </View>
    )
}