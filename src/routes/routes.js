import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from '../pages/SignIn';
import CheckCode from '../pages/CheckCode';
import SignUp from '../pages/SignUp';
import SelectProfile from '../pages/SelectProfile';
import StudentProfile from '../pages/StudentProfile';
import AddPhoto from '../pages/AddPhoto';
import RecoverPassword from '../pages/RecoverPassword';
import ChangePassword from '../pages/ChangePassword';
import RegistrationComplete from '../pages/RegistrationComplete';

const Stack = createNativeStackNavigator();

export default function Routes(){
    return(
        //Rotas - autenticação do usuario
        <Stack.Navigator>
            <Stack.Screen name="SignIn" component={SignIn} options={{headerShown: false}}/>
            <Stack.Screen name="SignUp" component={SignUp} options={{headerShown: false}}/>
            <Stack.Screen name="CheckCode" component={CheckCode} options={{headerShown: false}}/>
            <Stack.Screen name="SelectProfile" component={SelectProfile} options={{headerShown: false}}/>
            <Stack.Screen name="StudentProfile" component={StudentProfile} options={{headerShown: false}}/>
            <Stack.Screen name="AddPhoto" component={AddPhoto} options={{headerShown: false}}/>
            <Stack.Screen name="RecoverPassword" component={RecoverPassword} options={{headerShown: false}}/>
            <Stack.Screen name="ChangePassword" component={ChangePassword} options={{headerShown: false}}/>
            <Stack.Screen name="RegistrationComplete" component={RegistrationComplete} options={{headerShown: false}}/>
        </Stack.Navigator>
    )
}