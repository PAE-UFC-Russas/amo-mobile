import { View } from 'react-native';
import { Avatar, Box, HStack, Text } from 'native-base';
import ForumQuestionMenu from '../ForumQuestionMenu';
import { AntDesign } from '@expo/vector-icons'; 
import { EvilIcons } from '@expo/vector-icons'; 
import ImageModal from 'react-native-image-modal';

export default function ForumQuest(quest, handleLikeButton, navigation){
    const DateISOToFormated = (date) => {
        date = new Date(date);
        const year = date.getFullYear();
        const month = (1 + date.getMonth()).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
    
        return day + '/'+ month + '/' + year;
    }

    return(
        <Box marginTop='3' width='5/6' justifyContent='space-between'>
            <HStack space='2'>
                <Avatar 
                    bg='tertiaryBlue' 
                    size='md' 
                    source={{
                        uri: !quest.autor.perfil.avatar?'':quest.autor.perfil.avatar
                    }}
                />
                <View style={{width: '100%'}}>
                    <HStack justifyContent='space-between'>
                        <Text fontWeight='extrabold'>
                            {quest.autor.perfil.nome_exibicao}
                        </Text>
                        <ForumQuestionMenu/>
                    </HStack>
                    <Text fontWeight='semibold'>
                        {quest.titulo}
                    </Text>
                    <Text fontWeight='light'>
                        {quest.descricao}
                    </Text>
                    {
                        !!quest.content&&
                            <ImageModal
                                resizeMode='contain'
                                imageBackgroundColor='#fff'
                                alt='Conteúdo da dúvida'
                                style={{
                                    width: 340,
                                    height: 340
                                }}
                                source={{
                                    uri: quest.content,
                                }}
                            />
                    }
                    <HStack marginTop='1' justifyContent='space-between'>
                        <Box flexDirection='row'>
                            <AntDesign
                                onPress={() => handleLikeButton(quest.id)}
                                color={quest.liked?'#f00':'#808080'}
                                size={20}
                                name={quest.liked?'heart':'hearto'}
                                style={{marginRight: 5}}
                            />
                            <EvilIcons
                                color='#808080'
                                size={24}
                                name='comment'
                                onPress={() => navigation.navigate('AnswerQuestion', quest)}
                            />
                        </Box>
                        <Text fontSize='xs' fontWeight='thin'>
                            {DateISOToFormated(quest.data)}
                        </Text>
                    </HStack>  
                </View>
            </HStack>
        </Box>
    )
};