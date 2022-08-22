import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons'; 

import Forum from '../pages/Forum';
import Notificacao from '../pages/Notificacao';
import Agendamento from '../pages/Agendamento';
import Profile from '../pages/Profile';

const Tab = createBottomTabNavigator();

export default function TabNavigation(){
    return (
        <Tab.Navigator
            screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let iconName = '';

                    if(route.name === 'Forum') {
                        iconName = 'forum';
                    }else if(route.name === 'Agendar') {
                        iconName = 'today';
                    }else if(route.name === 'Notificação') {
                        iconName = 'notifications';
                    }else{
                        iconName = 'person';
                    }

                    return <MaterialIcons
                                color={focused?'#52D6FB':'#808080'}
                                size={28}
                                name={iconName}
                            />
                },
                tabBarActiveTintColor: '#52D6FB',
                tabBarInactiveTintColor: '#808080',
                headerShown: false
            })}
        >
            <Tab.Screen name='Forum' component={Forum} options={{headerShown: true}}/>
            <Tab.Screen name='Agendar' component={Agendamento}/>
            <Tab.Screen name='Notificação' component={Notificacao}/>
            <Tab.Screen name='Profile' component={Profile} options={{tabBarLabel: 'Perfil'}}/>
        </Tab.Navigator>
    )
}