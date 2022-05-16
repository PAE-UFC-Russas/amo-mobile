import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from '../pages/SignIn';
import CheckCode from '../pages/CheckCode';
import SignUp from '../pages/SignUp';
import SelectProfile from '../pages/SelectProfile';
import StudentProfile from '../pages/StudentProfile';
import AddPhoto from '../pages/AddPhoto';

const Stack = createNativeStackNavigator ();

export default function Routes(){
    return(
        //Navegação da autenticação do usuario
        <Stack.Navigator>
            <Stack.Screen name="SignIn" component={SignIn} options={{headerShown: false}}/>
            <Stack.Screen name="SignUp" component={SignUp} options={{headerShown: false}}/>
            <Stack.Screen name="CheckCode" component={CheckCode} options={{headerShown: false}}/>
            <Stack.Screen name="SelectProfile" component={SelectProfile} options={{headerShown: false}}/>
            <Stack.Screen name="StudentProfile" component={StudentProfile} options={{headerShown: false}}/>
            <Stack.Screen name="AddPhoto" component={AddPhoto} options={{headerShown: false}}/>
        </Stack.Navigator>
    )
}