import React from 'react';
import { View, Avatar, ScrollView } from 'native-base';
import { Text } from 'react-native';

export default function Notification({notification, lastWeek}){
    const DateToString = (date) => {
        date = new Date(date)
        const year = date.getFullYear();
        const month = (1 + date.getMonth()).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
    
        return day + '/' + month + '/' + year;
    }

    return(
        <View>
            <View style={{flexDirection:'row', borderColor:'#52D6FB', borderWidth:1, marginTop: 10, borderRadius:25, alignItems:"center", padding:5, height:130}}>
                <Avatar 
                    bg='tertiaryBlue' 
                    size='lg'
                    source={{
                        uri: notification.avatar_remetente
                    }}
                    marginBottom={10}
                    marginRight={3}
                    alignSelf={"center"}
                    marginTop={5}
                />
                <View style={{margin: 5}} width='4/5'>
                    <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                        <Text style={{fontSize: 18, fontWeight: '600'}}>{notification.remetente}</Text>
                        <Text style={{fontSize: 13, fontWeight: '300', marginRight: 15}}>{DateToString(notification.data)}</Text>
                    </View>
                    <Text style={{fontSize:14}}>{notification.mensagem}</Text>
                    <Text style={{fontSize:13, fontWeight:'200'}}>{notification.tipo}</Text>
                </View>
            </View>
            {lastWeek[0] == notification.id && <Text style={{fontSize:25, color:'#52D6FB', marginTop:'10%'}}>Anteriores</Text>}
        </View>
    )
}