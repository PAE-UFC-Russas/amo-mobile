import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerInfo from '../components/DrawerInfo';
import StudentProfile from '../pages/StudentProfile';
import TabNavigation from './TabNavigation';
import { MaterialIcons } from '@expo/vector-icons'; 

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
            <Drawer.Screen name="StudentProfile" component={StudentProfile} options={{
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