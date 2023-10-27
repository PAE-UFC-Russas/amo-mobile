import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Center, Text, View, Avatar, Button, ScrollView } from "native-base";
import { useAuth } from "../../contexts/auth";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";

export default function Profile() {
   const { navigate } = useNavigation();
   const { user } = useAuth();
   const profile = {
      nome_exibicao: user.perfil.nome_exibicao,
      entrada: user.perfil.entrada,
      curso: user.perfil.curso,
      foto: user.perfil.foto,
   };
   console.log(user)
   return (
      <ScrollView>
         <Text
            marginTop={10}
            alignSelf="center"
            fontSize={25}
            color={"#52D6FB"}
         >
            Perfil
         </Text>
         <Center>
            <TouchableOpacity>
               <Avatar
                  alignSelf="center"
                  bg="tertiaryBlue"
                  margin={5}
                  size="xl"
                  source={
                     !profile.foto
                        ? {
                              uri: "https://i.ibb.co/4f1jsPx/Splash-1.png",
                          }
                        : {
                             uri: user.perfil.foto
                          }
                  }
               />
            </TouchableOpacity>
         </Center>
         <View style={styles.edgeProfile}>
            <View
               style={{ borderBottomWidth: 1, borderBottomColor: "#52D6FB" }}
            >
               <Text marginTop={2} fontSize={20}>
                  Nome de exibição
               </Text>
               <View style={{ padding: 10 }}>
                  <Text style={{ fontSize: 15 }}>{profile.nome_exibicao}</Text>
               </View>
            </View>
            <View
               style={{ borderBottomWidth: 1, borderBottomColor: "#52D6FB" }}
            >
               <Text marginTop={5} fontSize={20}>
                  Curso
               </Text>
               <View style={{ padding: 10 }}>
                  <Text style={{ fontSize: 15 }}>{profile.curso}</Text>
               </View>
            </View>
            <View>
               <Text marginTop={5} fontSize={20}>
                  Entrada
               </Text>
               <View style={{ padding: 10 }}>
                  <Text style={{ fontSize: 15 }}>{profile.entrada}</Text>
               </View>
            </View>
         </View>
         <View style={styles.buttons}>
            <Button
               bgColor="#52D6FB"
               borderRadius={10}
               width="50%"
               onPress={() => navigate("EditProfile")}
            >
               Editar
            </Button>
         </View>
      </ScrollView>
   );
}
