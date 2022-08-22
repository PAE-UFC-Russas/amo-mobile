import React from 'react';
import { View } from 'native-base';
import { Text } from 'react-native';

export default function Notificacao(){
    const data = [
        {
            remetente: 'Felipe Gomes',
            avatar_remetente: 'https://images.pexels.com/photos/39866/entrepreneur-startup-start-up-man-39866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            mensagem: 'Notificação 1',
            data: new Date()
        },

        {
            remetente: 'Heron Rodrigues',
            avatar_remetente: 'https://images.pexels.com/photos/837358/pexels-photo-837358.jpeg?cs=srgb&dl=pexels-andrea-piacquadio-837358.jpg&fm=jpg',
            mensagem: 'Notificação 2',
            data: new Date()
        },

        {
            remetente: 'Felipe Cesar',
            avatar_remetente: 'https://images.pexels.com/photos/1709003/pexels-photo-1709003.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            mensagem: 'Notificação 3',
            data: new Date()
        },
    ]

    
    return(
        <View>
            <Text>felipe</Text>
        </View>
    )
}