import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons'; 

import Forum from '../pages/Forum';
import Teste1 from '../pages/Teste1';
import Teste2 from '../pages/Teste2';
import Teste3 from '../pages/Teste3';

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
                                color={focused?"#52D6FB":"#808080"}
                                size={32}
                                name={iconName}
                            />
                },
                tabBarActiveTintColor: "#52D6FB",
                tabBarInactiveTintColor: "#808080",
            })}
        >
            <Tab.Screen name="Forum" component={Forum}/>
            <Tab.Screen name="Agendar" component={Teste1}/>
            <Tab.Screen name="Notificação" component={Teste2}/>
            <Tab.Screen name="Perfil" component={Teste3}/>
        </Tab.Navigator>
    )
}