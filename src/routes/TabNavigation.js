import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons'; 
import { Text } from 'native-base';
import Forum from '../pages/Forum';
import Schedule from '../pages/Schedule';
import Profile from '../pages/Profile';
import Notifications from '../pages/Notifications'

const Tab = createBottomTabNavigator();

export default function TabNavigation({navigation, route}){
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
            <Tab.Screen name='Forum' initialParams={route.params} component={Forum} options={{
                    headerShown: true,
                    headerLeft: () => (
                        <MaterialIcons
                            onPress={() => navigation.openDrawer()}
                            color='#52D6FB'
                            size={32}
                            name='menu'
                            style={{marginLeft: 10}}
                        />
                    ),
                    headerTitleAlign: 'center',
                    headerTitle: () => <Text fontWeight='bold' fontSize='md' color='tertiaryBlue'>Fórum</Text>,
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
            <Tab.Screen name='Agendar' component={Schedule} options={{
                    headerShown: true,
                    headerTitleAlign: 'center',
                    headerTitle: () => <Text fontWeight='bold' fontSize='md' color='tertiaryBlue'>Agendamento</Text>,
                }} 
            />
            <Tab.Screen name='Notificação' component={Notifications}/>
            <Tab.Screen name='Profile' component={Profile} options={{tabBarLabel: 'Perfil'}}/>
        </Tab.Navigator>
    )
}