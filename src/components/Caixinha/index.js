import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './styles';
import { HStack, ScrollView } from 'native-base'
import { AntDesign } from '@expo/vector-icons'; 


export default function Caixinha() {
  return (
    <View style={styles.container}>
        <AntDesign name="login" size={24} color="#52D6FB"/>
        <TouchableOpacity style={styles.box}>
                <HStack justifyContent={'space-between'}>
                     <Text style={{fontSize:20}}>Assunto</Text>
                     <Text>07/10/2022</Text>
                 </HStack>
                 <View>
                     <Text>duvida sobre tal pergunta!</Text>
                 </View>
             </TouchableOpacity>
    </View>
  )
}