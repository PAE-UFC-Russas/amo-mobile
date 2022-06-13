import React from 'react';
import { View } from 'react-native';
import { Avatar, Box, Button, Center, HStack, Text, IconButton } from 'native-base';
import { AntDesign } from '@expo/vector-icons'; 
import { EvilIcons } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 

export default function ForumQuest(quest){

    return(
        <Box marginTop="3" width="full">
            <HStack space="2">
                <Avatar 
                    bg="tertiaryBlue" 
                    size="md" 
                    source={{
                        uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                    }}
                />
                <View>
                    <HStack width="77%" justifyContent="space-between">
                        <Text fontWeight="extrabold">
                            Name
                        </Text>
                        <Entypo
                            name="dots-three-horizontal" 
                            size={24} 
                            color="black"
                        />
                    </HStack>
                    <Text fontWeight="semibold">
                        Title
                    </Text>
                    <Text fontWeight="light">
                        Desc
                    </Text>
                    <HStack marginTop="1" width="77%" justifyContent="space-between">
                        <Box flexDirection="row">
                            <AntDesign
                                color="#808080"
                                size={20}
                                name="hearto"
                                style={{marginRight: 5}}
                            />
                            <EvilIcons
                                color="#808080"
                                size={24}
                                name="comment"
                            />
                        </Box>
                        <Text fontSize="xs" fontWeight="thin">
                            31 de janeiro de 2022
                        </Text>
                    </HStack>  
                </View>
            </HStack>
        </Box>
    )
};