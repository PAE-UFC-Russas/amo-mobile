import { View } from "react-native";
import { Avatar, Button, Center, HStack, Text } from "native-base";
import { AntDesign } from "@expo/vector-icons";
import {
   DrawerItemList,
   DrawerContentScrollView,
} from "@react-navigation/drawer";
import { useAuth } from "../../contexts/auth";

export default function DrawerInfo(props) {
   const { Logout, user } = useAuth();

   const HandleLogout = () => {
      Logout();
      props.navigation.navigate("SignIn");
   };

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
                          uri: user.perfil.foto
                       }
               }
               marginBottom={15}
            />
            <Text fontSize="md" fontWeight="bold">
               {user.perfil.nome_exibicao}
            </Text>
            <Text fontSize="sm" fontWeight="light">
               {props.monitoria}
            </Text>
         </Center>
         <DrawerItemList {...props} />
         <Button
            alignSelf="flex-start"
            variant="link"
            onPress={() => props.navigation.navigate("SelectSubjects")}
         >
            <HStack space={8} alignItems="center">
               <AntDesign name="book" size={28} color="grey" />
               <Text fontSize={14}>Trocar de disciplina</Text>
            </HStack>
         </Button>
         <View style={{ flex: 1 }} />
         <Button alignSelf="flex-start" variant="link" onPress={HandleLogout}>
            <HStack space={3} alignItems="center">
               <AntDesign name="arrowleft" size={28} color="#52D6FB" />
               <Text fontWeight="bold" fontSize="md" color="#52D6FB">
                  SAIR
               </Text>
            </HStack>
         </Button>
      </DrawerContentScrollView>
   );
}
