import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerInfo from '../components/DrawerInfo';
import StudentProfile from '../pages/StudentProfile';
import TabNavigation from './TabNavigation';

const Drawer = createDrawerNavigator();

export default function DrawerNavigation(){
    return(
        <Drawer.Navigator drawerContent={props => <DrawerInfo/>} screenOptions={{headerShown: false}}>
            <Drawer.Screen name="Forum" component={TabNavigation}/>
            <Drawer.Screen name="StudentProfile" component={StudentProfile}/>
        </Drawer.Navigator>
    )
}