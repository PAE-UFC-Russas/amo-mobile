import { View } from "react-native";
import { Avatar, Button, Center, HStack, Text } from "native-base";
import { AntDesign } from "@expo/vector-icons";
import {
   DrawerItemList,
   DrawerContentScrollView,
} from "@react-navigation/drawer";
import { useAuth } from "../../contexts/auth";
import { useSubject } from "../../contexts/subject";
import { useNavigation } from "@react-navigation/native";

export default function DrawerInfo(props) {
   const { Logout, user } = useAuth();
   const { subject, course } = useSubject();
   const navigation = useNavigation();

   const HandleLogout = () => {
      Logout();
      props.navigation.navigate("SignIn");
   };

   console.log("userDrawer: ", user);

   function getCurrentCargo() {
      if (user.perfil.cargos.includes("professor")) {
         return "Professor 🦉";
      } else if (user.perfil.cargos.includes("monitor")) {
         return "Monitor 👨‍🏫";
      } else {
         return "Aluno 🎓";
      }
   }

   return (
      <DrawerContentScrollView contentContainerStyle={{ flex: 1 }}>
         <Center marginBottom={5}>
            <Avatar
               bg="tertiaryBlue"
               size="2xl"
               source={
                  !user.perfil.foto
                     ? {
                          uri: "https://i.ibb.co/4f1jsPx/Splash-1.png",
                       }
                     : {
                          uri: user.perfil.foto,
                       }
               }
               marginBottom={15}
               marginTop={10}
            />
            <Text fontSize="md" fontWeight="bold">
               {user.perfil.nome_exibicao}
            </Text>
            <View style={{ flexDirection: "row" }}>
               <Text fontSize="sm" fontWeight="light">
                  {}
               </Text>
               <Text style={{ marginLeft: 4 }}>{getCurrentCargo()}</Text>
            </View>
            <Text fontSize="13" marginTop={10} fontWeight="semibold">
               {course.nome}
            </Text>
            <Text fontSize="sm" fontWeight="semibold">
               {subject.monitoria}
            </Text>
         </Center>
         <DrawerItemList {...props} />
         <Button
            alignSelf="flex-start"
            variant="link"
            onPress={() => navigation.navigate("SelectSubjects")}
         >
            <HStack space={8} alignItems="center">
               <AntDesign name="book" size={28} color="grey" />
               <Text fontSize={14}>Trocar de disciplina</Text>
            </HStack>
         </Button>
         <View style={{ flex: 1 }} />
         <Button alignSelf="flex-start" variant="link" onPress={HandleLogout}>
            <HStack space={3} alignItems="center">
               <AntDesign name="close" size={28} color="#024284" />
               <Text fontWeight="bold" fontSize="md" color="#024284">
                  Sair da conta
               </Text>
            </HStack>
         </Button>
      </DrawerContentScrollView>
   );
}
