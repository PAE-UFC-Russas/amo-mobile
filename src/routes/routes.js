import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../pages/Login';
import CheckCode from '../pages/CheckCode';
import Register from '../pages/Register';
import SelectProfile from '../pages/SelectProfile';
import StudentProfile from '../pages/StudentProfile';

const Stack = createNativeStackNavigator ();

export default function Routes(){
    return(
        //Navegação da autenticação do usuario
        <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
            <Stack.Screen name="Register" component={Register} options={{headerShown: false}}/>
            <Stack.Screen name="CheckCode" component={CheckCode} options={{headerShown: false}}/>
            <Stack.Screen name="SelectProfile" component={SelectProfile} options={{headerShown: false}}/>
            <Stack.Screen name="StudentProfile" component={StudentProfile} options={{headerShown: false}}/>
        </Stack.Navigator>
    )
}