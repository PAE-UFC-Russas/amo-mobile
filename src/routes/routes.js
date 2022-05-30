import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons'; 

//Páginas
import SignIn from '../pages/SignIn';
import CheckCode from '../pages/CheckCode';
import SignUp from '../pages/SignUp';
import SelectProfile from '../pages/SelectProfile';
import StudentProfile from '../pages/StudentProfile';
import AddPhoto from '../pages/AddPhoto';
import RecoverPassword from '../pages/RecoverPassword';
import ChangePassword from '../pages/ChangePassword';
import RegistrationComplete from '../pages/RegistrationComplete';
import SelectCourses from '../pages/SelectCourses';
import SelectMonitoria from '../pages/SelectMonitoria';
import Forum from '../pages/Forum';

//Componentes
import ForumHeader from '../components/ForumHeader';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigation(){
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName = '';
                    if (route.name === 'Forum') {
                        iconName = 'home';
                    } else if (route.name === 'Date') {
                        iconName = 'basket';
                    } else if (route.name === 'Notification') {
                        iconName = 'cart';
                    }
                    return <MaterialIcons
                                onPress={() => alert('Barra de pesquisa!')}
                                color={focused?"#52D6FB":"#000"}
                                size={32}
                                name={iconName}
                            />
                },
                tabBarActiveTintColor: "#52D6FB",
                tabBarInactiveTintColor: "gray",
            })}
        >
            <Tab.Screen name="Forum" component={Forum} options={ForumHeader}/>

        </Tab.Navigator>
    )
}

export default function Routes(){
    return(
        //Rotas - Autenticação
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
            <Stack.Screen name="SelectCourses" component={SelectCourses} options={{headerShown: false}}/>
            <Stack.Screen name="SelectMonitoria" component={SelectMonitoria} options={{headerShown: false}}/>
            <Stack.Screen name="TabStack" component={TabNavigation} options={{headerShown: false}}/>
        </Stack.Navigator>
    )
}