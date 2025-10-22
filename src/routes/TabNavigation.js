import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";
import { Image, Text } from "native-base";
import Forum from "../pages/Forum";
import Schedule from "../pages/Schedule";
import Profile from "../pages/Profile";
import Painel from "../pages/Painel";
import { useAuth } from "../contexts/auth"
const Tab = createBottomTabNavigator();


export default function TabNavigation({ navigation, route }) {
   const { user } = useAuth();
   const profile = {
      nome_exibicao: user.perfil.nome_exibicao,
      entrada: user.perfil.entrada,
      curso: user.perfil.curso,
      foto: user.perfil.foto,
      matricula: user.perfil.matricula,
   };

   console.log(user.perfil.cargos.includes("professor"))
   return (
      <Tab.Navigator
         screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
               let iconName = "";

               if (route.name === "Forum") {
                  iconName = "forum";
               } else if (route.name === "Agendar") {
                  iconName = "today";
               } else if (route.name === "Notificação") {
                  iconName = "notifications";
               } else if (route.name === "Painel do Professor"){
                  iconName = "list";
               }else {
                  iconName = "person";
               }

               return (
                  <MaterialIcons
                     color={focused ? "#024284" : "#808080"}
                     size={40}
                     name={iconName}
                  />
               );
            },
            tabBarActiveTintColor: "#024284",
            tabBarInactiveTintColor: "#808080",
            headerShown: true,
            tabBarStyle: {
               height: 70,
               paddingBottom: 10,
               paddingTop: 10,
               backgroundColor: "#f0f2f8ff", // cor de fundo da barra inferior
            },
         })}
      >
         <Tab.Screen
            name="Forum"
            initialParams={route.params}
            component={Forum}
            options={{
               headerTitleAlign: "center",
               headerTitle: () => (
                  <Text fontWeight="bold" fontSize="md" color="#024284">
                     Fórum
                  </Text>
               ),
               headerLeft: () => (
                  <Image
                     source={require("../assets/logo_lightblue.png")}
                     alt="Logo"
                     size="sm"
                     resizeMode="contain"
                     marginLeft={0}
                  />
               ),
               headerRight: () => (
                  <MaterialIcons
                     onPress={() => navigation.openDrawer()}
                     color="#024284"
                     size={30}
                     name="menu"
                     style={{ marginRight: 10 }}
                  />
               ),
               headerStyle: {
                  backgroundColor: "#f0f2f8ff", // cor de fundo do cabeçalho
               },
            }}
         />
         <Tab.Screen
            name="Agendar"
            component={Schedule}
            initialParams={route.params}
            options={{
               headerTitleAlign: "center",
               headerTitle: () => (
                  <Text fontWeight="bold" fontSize="md" color="#024284">
                     Agendamento
                  </Text>
               ),
               headerLeft: () => (
                  <Image
                     source={require("../assets/logo_lightblue.png")}
                     alt="Logo"
                     size="sm"
                     resizeMode="contain"
                     marginLeft={0}
                  />
               ),
               headerRight: () => (
                  <MaterialIcons
                     onPress={() => navigation.openDrawer()}
                     color="#024284"
                     size={30}
                     name="menu"
                     style={{ marginRight: 10 }}
                  />
               ),
               headerStyle: {
                  backgroundColor: "#f0f2f8ff",
               },
            }}
         />
         {user.perfil.cargos.includes("professor") ? <Tab.Screen
            name="Painel do Professor"
            component={Painel}
            options={{
               tabBarLabel: "Painel do Professor",
               headerTitleAlign: "center",
               headerTitle: () => (
                  <Text fontWeight="bold" fontSize="md" color="#024284">
                     "Painel do Professor"
                  </Text>
               ),
               headerLeft: () => (
                  <Image
                     source={require("../assets/logo_lightblue.png")}
                     alt="Logo"
                     size="sm"
                     resizeMode="contain"
                     marginLeft={0}
                  />
               ),
               headerRight: () => (
                  <MaterialIcons
                     onPress={() => navigation.openDrawer()}
                     color="#024284"
                     size={30}
                     name="menu"
                     style={{ marginRight: 10 }}
                  />
               ),
               headerStyle: {
                  backgroundColor: "#E5EBF2",
               },
            }}
         />:
         false
         }
         <Tab.Screen
            name="Profile"
            component={Profile}
            options={{
               tabBarLabel: "Perfil",
               headerTitleAlign: "center",
               headerTitle: () => (
                  <Text fontWeight="bold" fontSize="md" color="#024284">
                     Perfil
                  </Text>
               ),
               headerLeft: () => (
                  <Image
                     source={require("../assets/logo_lightblue.png")}
                     alt="Logo"
                     size="sm"
                     resizeMode="contain"
                     marginLeft={0}
                  />
               ),
               headerRight: () => (
                  <MaterialIcons
                     onPress={() => navigation.openDrawer()}
                     color="#024284"
                     size={30}
                     name="menu"
                     style={{ marginRight: 10 }}
                  />
               ),
               headerStyle: {
                  backgroundColor: "#E5EBF2",
               },
            }}
         />
      </Tab.Navigator>
   );
}
