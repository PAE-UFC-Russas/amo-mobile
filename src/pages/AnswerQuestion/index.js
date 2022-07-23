import React from 'react';
import { Avatar, Box, Button, Text, Select, Input, HStack, TextArea, Image, View, Center, VStack, TextInput, } from 'native-base';
import styles from './styles';
import Comments from '../../components/Comments';
import { MaterialIcons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 

export default function AnswerQuestion({navigation}) {
    return (
        <View style={styles.container}>
            <View style={styles.header}>   
                <MaterialIcons
                    onPress={()=>navigation.goBack()}
                    color="#52D6FB"
                    size={24}
                    name="arrow-back-ios"
                    style={{marginLeft:20}}
                /> 
                <Text style={styles.title}>Responder dúvida</Text>
               
            </View>
            <HStack paddingX={10} space={20} width={'lg'} >
                <VStack>
                    <Text style={{fontSize:20,}}>Max</Text>
                    <Avatar 
                        bg="tertiaryBlue" 
                        size="md" 
                        source={{
                            uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                        }}
                        />
                </VStack>

                <VStack justifyContent="center" flexWrap={'wrap'}>
                    <Text style={{ fontSize:20}}>Equação do segundo grau</Text>
                    <Text style={{ fontSize:15}}>
                        Como fasso pra resolver a seguinte equação: 5x + 3x + 2?
                    </Text>
                </VStack>
                        </HStack>        
                <View>

                   <Input placeholder="Comentar"/>
                    <Comments/>
                    <Comments/>
                    <Comments/>

                </View>
                
        </View>
    );
}