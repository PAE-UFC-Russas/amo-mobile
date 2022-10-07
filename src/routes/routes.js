import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DrawerNavigation from './DrawerNavigation';
import SignIn from '../pages/SignIn';
import CheckCode from '../pages/CheckCode';
import SignUp from '../pages/SignUp';
import StudentProfile from '../pages/StudentProfile';
import AddPhoto from '../pages/AddPhoto';
import RecoverPassword from '../pages/RecoverPassword';
import ChangePassword from '../pages/ChangePassword';
import RegistrationComplete from '../pages/RegistrationComplete';
import SelectCourses from '../pages/SelectCourses';
import SelectMonitoria from '../pages/SelectMonitoria';
import RegisterDoubt from '../pages/RegisterDoubt';
import AnswerQuestion from '../pages/AnswerQuestion';
import About from '../pages/About';
import { useAuth } from '../contexts/auth';
import EditProfile from '../pages/EditProfile';

const Stack = createNativeStackNavigator();

export default  function Routes(){
    const { user } = useAuth();

    return(
        <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name='SignIn' component={SignIn}/>
                <Stack.Screen name='SignUp' component={SignUp}/>
                <Stack.Screen name='CheckCode' component={CheckCode}/>
                <Stack.Screen name='StudentProfile' component={StudentProfile}/>
                <Stack.Screen name='AddPhoto' component={AddPhoto}/>
                <Stack.Screen name='RecoverPassword' component={RecoverPassword}/>
                <Stack.Screen name='ChangePassword' component={ChangePassword}/>
                <Stack.Screen name='RegistrationComplete' component={RegistrationComplete}/>
                <Stack.Screen name='About' component={About}/>
            {
                !!user&& (
                    <>
                        <Stack.Screen name='SelectCourses' component={SelectCourses}/>
                        <Stack.Screen name='SelectMonitoria' component={SelectMonitoria}/>
                        <Stack.Screen name='RegisterDoubt' component={RegisterDoubt}/>
                        <Stack.Screen name='AnswerQuestion' component={AnswerQuestion}/>
                        <Stack.Screen name='ForumDrawer' component={DrawerNavigation}/>
                        <Stack.Screen name='EditProfile' component={EditProfile}/>
                    </>
                )
            }
        </Stack.Navigator>
    )
}