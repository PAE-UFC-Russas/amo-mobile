import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { View, HStack } from "native-base";
import { Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Notification from "../../components/Notification";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";

export default function Notifications() {
   const { navigate, goBack } = useNavigation();
   const [temp, setTemp] = useState([]);
   const [notifications, setNotifications] = useState([
      {
         id: 0,
         remetente: "Felipe Gomes",
         avatar_remetente:
            "https://images.pexels.com/photos/39866/entrepreneur-startup-start-up-man-39866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
         mensagem:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s.",
         data: Date.now(),
         tipo: "aluno",
      },

      {
         id: 1,
         remetente: "Heron Rodrigues",
         avatar_remetente:
            "https://images.pexels.com/photos/837358/pexels-photo-837358.jpeg?cs=srgb&dl=pexels-andrea-piacquadio-837358.jpg&fm=jpg",
         mensagem: "Notificação 2",
         data: new Date(2022, 7, 18),
         tipo: "monitor",
      },

      {
         id: 2,
         remetente: "Felipe Cesar",
         avatar_remetente:
            "https://images.pexels.com/photos/1709003/pexels-photo-1709003.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
         mensagem: "Notificação 3",
         data: new Date(2022, 7, 18),
         tipo: "aluno",
      },
      {
         id: 3,
         remetente: "Felipe Cesar",
         avatar_remetente:
            "https://images.pexels.com/photos/1709003/pexels-photo-1709003.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
         mensagem: "Notificação 3",
         data: new Date(2022, 8, 18),
         tipo: "aluno",
      },
      {
         id: 4,
         remetente: "Felipe Cesar",
         avatar_remetente:
            "https://images.pexels.com/photos/1709003/pexels-photo-1709003.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
         mensagem: "Notificação 3",
         data: new Date(2022, 8, 20),
         tipo: "aluno",
      },
   ]);

   useEffect(() => {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const lastSunday = new Date(
         today.setDate(today.getDate() - today.getDay())
      );

      for (let i = 0; i < notifications.length; i++) {
         if (notifications[i].data < lastSunday && temp.length < 1) {
            setTemp([notifications[i].id]);
            break;
         }
      }
   }, []);

   return (
      <>
         <View style={styles.container}>
            <View>
               <HStack
                  justifyContent="space-between"
                  width="2/3"
                  safeArea
                  alignItems="center"
               >
                  <MaterialIcons
                     onPress={() => goBack()}
                     color="#52D6FB"
                     size={24}
                     name="arrow-back-ios"
                  />
                  <Text style={styles.title}>Notificações</Text>
               </HStack>
            </View>
            <View style={{ marginTop: "10%" }}>
               <Text style={styles.todayText}>Recente</Text>
            </View>

            <FlatList
               data={notifications}
               renderItem={(notification) => (
                  <Notification
                     lastWeek={temp}
                     notification={notification.item}
                  />
               )}
               keyExtractor={(notification) => notification.id}
               showsVerticalScrollIndicator={false}
            />
         </View>
      </>
   );
}
