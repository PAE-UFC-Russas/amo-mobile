import React from 'react';
import { Avatar, Text,  Input, HStack, View, VStack, ScrollView } from 'native-base';
import styles from './styles';
import Comments from '../../components/Comments';
import { MaterialIcons } from '@expo/vector-icons'; 

export default function AnswerQuestion({navigation}) {
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
                    fontWeight='bold'
                    fontSize='15'
                />
                <View marginTop={10} marginLeft={5}>
                    <Comments/>
                    <Comments/>
                    <Comments/>
                </View>        
            </View>
        </View>
    );
}