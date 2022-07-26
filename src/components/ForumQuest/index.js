import React, { useState } from 'react';
import { View } from 'react-native';
import { Avatar, Box, HStack, Text, Image } from 'native-base';
import ForumQuestionMenu from '../ForumQuestionMenu';
import { AntDesign } from '@expo/vector-icons'; 
import { EvilIcons } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 

export default function ForumQuest(quest, handleLikeButton, navigation, showMenu, setShowMenu){
    const DateFormated = (date) => {
        return `${date.getDay()} de dezembro de 2016` 
    }

    return(
        <Box marginTop="3" width="5/6">
            <HStack space="2">
                <Avatar 
                    bg="tertiaryBlue" 
                    size="md" 
                    source={{
                        uri: quest.user.avatar
                    }}
                />
                <View>
                    <HStack justifyContent="space-between">
                        <Text fontWeight="extrabold">
                            {quest.user.name}
                        </Text>
                        <ForumQuestionMenu/>
                    </HStack>
                    <Text fontWeight="semibold">
                        {quest.title.substring(0, 64)}
                    </Text>
                    <Text fontWeight="light">
                        {quest.desc.substring(0, 128)}
                    </Text>
                    {
                        quest.content?
                        <Image width={240} height={140} alt="Conteúdo da dúvida" source={{
                                uri: quest.content
                            }}
                        />:<></>
                    }
                    <HStack marginTop="1" justifyContent="space-between">
                        <Box flexDirection="row">
                            <AntDesign
                                onPress={() => handleLikeButton(quest.id)}
                                color={quest.liked?"#f00":"#808080"}
                                size={20}
                                name={quest.liked?"heart":"hearto"}
                                style={{marginRight: 5}}
                            />
                            <EvilIcons
                                color="#808080"
                                size={24}
                                name="comment"
                                onPress={() => navigation.navigate("AnswerQuestion")}
                            />
                        </Box>
                        <Text fontSize="xs" fontWeight="thin">
                            {DateFormated(quest.date)}
                        </Text>
                    </HStack>  
                </View>
            </HStack>
        </Box>
    )
};