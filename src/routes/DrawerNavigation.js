import { useState, useEffect } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { MaterialIcons } from '@expo/vector-icons'; 
import api from '../services/api';
import DrawerInfo from '../components/DrawerInfo';
import Profile from '../pages/Profile';
import TabNavigation from './TabNavigation';

const Drawer = createDrawerNavigator();

export default function DrawerNavigation(){
    const [ user, setUser ] = useState();

    useEffect(()=>{
        async function GetUser(){
            try{
                const response = await api.get('/usuario/eu/', {
                    headers: {
                        'Authorization': 'Token ' + await GetLoginToken()
                    }
                });
                console.log(response.data)
                setUser(response.data);
            }catch(error){
                console.log(error.response.data)
            }
        }

        GetUser();
    }, [])

    return(
        <Drawer.Navigator drawerContent={props => <DrawerInfo {...props} user={user}/>} screenOptions={{headerShown: false}}>
            <Drawer.Screen name='Tabforum' component={TabNavigation} options={{
                drawerLabel:'Forum',
                drawerIcon: ({color})=>{
                    return(
                        <MaterialIcons
                            color={color}
                            size={24}
                            name='forum'
                        /> 
                    )
                }
                }}
            />
            <Drawer.Screen name='Profile' component={Profile} options={{
                drawerLabel:'Perfil',
                drawerIcon: ({color})=>{
                    return(
                        <MaterialIcons
                            color={color}
                            size={24}
                            name='person'
                        /> 
                    )
                }}} 
            />
        </Drawer.Navigator>
    )
}