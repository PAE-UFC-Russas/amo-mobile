import { createDrawerNavigator } from '@react-navigation/drawer';
import { MaterialIcons } from '@expo/vector-icons'; 
import DrawerInfo from '../components/DrawerInfo';
import Profile from '../pages/Profile';
import TabNavigation from './TabNavigation';

const Drawer = createDrawerNavigator();

export default function DrawerNavigation(){
    return(
        <Drawer.Navigator drawerContent={props => <DrawerInfo {...props}/>} screenOptions={{headerShown: false}}>
            <Drawer.Screen name="Tabforum" component={TabNavigation} options={{
                drawerLabel:"Forum",
                drawerIcon: ({color})=>{
                    return(
                        <MaterialIcons
                            color={color}
                            size={24}
                            name="forum"
                        /> 
                    )
                }
                }}
            />
            <Drawer.Screen name="Profile" component={Profile} options={{
                drawerLabel:"Perfil",
                drawerIcon: ({color})=>{
                    return(
                        <MaterialIcons
                            color={color}
                            size={24}
                            name="person"
                        /> 
                    )
                }}} 
            />
        </Drawer.Navigator>
    )
}