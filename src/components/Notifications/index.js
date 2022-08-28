import React from 'react';
import { View, Avatar, ScrollView } from 'native-base';
import { Text } from 'react-native';
import { parse } from 'react-native-svg';


export default function Notifications({notification, lastWeek}){

    console.log(lastWeek)
    const verificar =()=>{

    }

    const DateToString = (date) => {
        date = new Date(date)
        const year = date.getFullYear();
        const month = (1 + date.getMonth()).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
    
        return day + '/' + month + '/' + year;
    }
    console.log(notification.data)

    return(
        <View>
            <View style={{flexDirection:'row', margin:20, borderColor:'blue', borderEndWidth:3}}>
                <View>
                    <Avatar 
                        bg='tertiaryBlue' 
                        size='lg'
                        source={{
                            uri: notification.avatar_remetente
                        }}
                        marginBottom={15}
                    />
                </View>
                <ScrollView style={{margin:10}}>
                    <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
                        <Text style={{fontSize:19, fontWeight:'bold'}}>{notification.remetente}</Text>
                        <Text style={{fontSize:13, fontWeight:'300', marginLeft:10}}>{DateToString(notification.data)}</Text>
                    </View>
                    <Text style={{fontSize:14, fontWeight:'bold'}}>{notification.mensagem}</Text>
                    <Text style={{fontSize:13, fontWeight:'300'}}>{notification.tipo}</Text>
                </ScrollView>

            </View>
            {lastWeek[0] == notification.id && <Text style={{fontSize:25, color:'blue'}}>Semana Passada</Text>}
        </View>
    )
}