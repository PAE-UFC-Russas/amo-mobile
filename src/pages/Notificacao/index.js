import React, {useEffect, useState} from 'react';
import { FlatList, View } from 'native-base';
import {ScrollView} from 'react-native';
import { Text } from 'react-native';
import Notifications from '../../components/Notifications';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons'; 
import styles from './styles';

export default function Notificacao({navigation}){
    
    const [temp, setTemp] = useState([])

    const [notifications, setNotifications] = useState([
        {
            id:0,
            remetente: 'Felipe Gomes',
            avatar_remetente: 'https://images.pexels.com/photos/39866/entrepreneur-startup-start-up-man-39866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            mensagem: 'Notificação 1',
            data: Date.now(),
            tipo: 'aluno',
        },
        
        {
            id:1,
            remetente: 'Heron Rodrigues',
            avatar_remetente: 'https://images.pexels.com/photos/837358/pexels-photo-837358.jpeg?cs=srgb&dl=pexels-andrea-piacquadio-837358.jpg&fm=jpg',
            mensagem: 'Notificação 2',
            data: new Date(2022, 7, 18),
            tipo: 'monitor'
        },

        {
            id:2,
            remetente: 'Felipe Cesar',
            avatar_remetente: 'https://images.pexels.com/photos/1709003/pexels-photo-1709003.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            mensagem: 'Notificação 3',
            data: new Date(2022, 7, 18),
            tipo: 'aluno'
        },
        {
            id:3,
            remetente: 'Felipe Cesar',
            avatar_remetente: 'https://images.pexels.com/photos/1709003/pexels-photo-1709003.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            mensagem: 'Notificação 3',
            data: new Date(2022, 8, 18),
            tipo: 'aluno'
        },
        {
            id:4,
            remetente: 'Felipe Cesar',
            avatar_remetente: 'https://images.pexels.com/photos/1709003/pexels-photo-1709003.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            mensagem: 'Notificação 3',
            data: new Date(2022, 8, 20),
            tipo: 'aluno'
        },
        
    ])
    
    useEffect(
        ()=>{
            const now = new Date();
            const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            const lastSunday = new Date(today.setDate(today.getDate()-today.getDay()));
        for(let i =0; i < notifications.length; i++){
            if(notifications[i].data < lastSunday && temp.length < 1){
                setTemp([notifications[i].id])
                break
            }
        }
        },[]
      )

    return(
        <>
            <View style={styles.container}>
                <View>
                    <View style={{flexDirection:"row", justifyContent:"center", alignItems:"center", justifyContent:"space-around"}}>
                <MaterialIcons
                        onPress={()=>navigation.goBack()}
                        color='#52D6FB'
                        size={24}
                        name='arrow-back-ios'
                    />
                        <Text style={styles.textoNotificacao}>Notificação</Text>
                        <FontAwesome5
                            color='#52D6FB'
                            size={20}
                            name='check-double'
                            />
                    </View>
                    <Text style={styles.textoNovasNotificacao}>Você tem {notifications.length} novas Notificacao</Text> 
                </View>
                <View>
                    <Text style={styles.textohoje}>Hoje</Text>
                </View>
                <ScrollView>
                    <FlatList
                        data={notifications}
                        renderItem={(notification)=> <Notifications lastWeek={temp} notification={notification.item}/>}
                        keyExtractor={notification => notification.id}
                    />
                </ScrollView>
                
            </View>
            
        </>
    )
}