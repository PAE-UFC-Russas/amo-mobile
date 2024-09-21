import { createDrawerNavigator } from "@react-navigation/drawer";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import DrawerInfo from "../components/DrawerInfo";
import TabNavigation from "./TabNavigation";
import TimeTable from "../pages/TimeTable";

const Drawer = createDrawerNavigator();

export default function DrawerNavigation() {
   return (
      <Drawer.Navigator
         drawerContent={(props) => <DrawerInfo {...props} />}
         screenOptions={{ headerShown: false }}
      >
         <Drawer.Screen
            name="Tabforum"
            component={TabNavigation}
            options={{
               drawerLabel: "Forum",
               drawerIcon: ({ color }) => {
                  return <MaterialIcons color={color} size={24} name="forum" />;
               },
            }}
         />
         <Drawer.Screen
            name="TimeTable"
            component={TimeTable}
            options={{
               drawerLabel: "Quadro de Horários",
               drawerIcon: ({ color }) => {
                  return (
                     <AntDesign color={color} size={24} name="clockcircle" />
                  );
               },
            }}
         />
      </Drawer.Navigator>
   );
}
