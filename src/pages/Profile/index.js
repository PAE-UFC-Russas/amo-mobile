import React from "react";
import { Center, Text, View, Avatar, Button } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../contexts/auth";
import { useSubject } from "../../contexts/subject";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "./styles";

export default function Profile() {
   const { navigate, goBack } = useNavigation();
   const { user } = useAuth();
   const { subject } = useSubject();

   const profile = {
      nome_exibicao: user.perfil.nome_exibicao,
      entrada: user.perfil.entrada,
      curso: user.perfil.curso,
      foto: user.perfil.foto,
      matricula: user.perfil.matricula,
   };

   function getCurrentOffice(subject, user) {
      if (!subject || !user || !user.perfil) {
         return "Aluno";
      }

      const isMonitor =
         subject.monitores?.some((obj) => obj.id === user.perfil.id) || false;
      const isProfessor =
         subject.professores?.some((obj) => obj.id === user.perfil.id) || false;

      if (isMonitor) return "Monitor";
      if (isProfessor) return "Professor";
      return "Aluno";
   }

   return (
      <View style={styles.container}>
         <View
            style={{
               width: "100%",
               flexDirection: "row",
               justifyContent: "space-around",
               marginBottom: 30,
            }}
         >
            <MaterialIcons
               onPress={() => goBack()}
               color="#024284"
               size={24}
               style={styles.backButton}
               name="arrow-back-ios"
            />
            <Center>
               <Text fontWeight="bold" color="#024284" fontSize="lg">
                  Perfil
               </Text>
            </Center>
         </View>

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
                       uri: user.perfil.foto,
                    }
            }
         />

         <View style={styles.edgeProfile}>
            <View
               style={{
                  width: 120,
                  backgroundColor: "#024284",
                  height: 30,
                  borderTopRightRadius: 10,
                  borderBottomRightRadius: 10,
                  marginTop: 15,
                  alignItems: "center",
                  justifyContent: "center",
               }}
            >
               <Text
                  style={{
                     color: "white",
                     fontWeight: "bold",
                     fontSize: 16,
                  }}
               >
                  {/* {getCurrentOffice()} */}
                  {user.perfil.cargos[0]}
               </Text>
            </View>

            <View style={{ padding: 10 }}>
               <View>
                  <Text marginTop={1} fontSize={18}>
                     Monitoria:
                  </Text>
                  <View style={{ padding: 5 }}>
                     <Text style={{ fontSize: 15 }}>{subject.nome}</Text>
                  </View>
               </View>
               <View>
                  <Text marginTop={1} fontSize={18}>
                     Nome de exibição:
                  </Text>
                  <View style={{ padding: 5 }}>
                     <Text style={{ fontSize: 15 }}>
                        {profile.nome_exibicao}
                     </Text>
                  </View>
               </View>
               <View>
                  <Text marginTop={1} fontSize={18}>
                     Curso:
                  </Text>
                  <View style={{ padding: 5 }}>
                     <Text style={{ fontSize: 15 }}>{profile.curso}</Text>
                  </View>
               </View>
               <View>
                  <Text marginTop={1} fontSize={18}>
                     Entrada:
                  </Text>
                  <View style={{ padding: 5 }}>
                     <Text style={{ fontSize: 15 }}>{profile.entrada}</Text>
                  </View>
               </View>
               {/* <View>
                  <Text marginTop={1} fontSize={18}>
                     Matricula:
                  </Text>
                  <View style={{ padding: 5 }}>
                     <Text style={{ fontSize: 15 }}>{profile.matricula}</Text>
                  </View>
               </View> */}
            </View>
         </View>

         <Button
            marginTop={10}
            justifyContent={"center"}
            alignItems={"center"}
            bgColor="#2599BA"
            borderRadius={10}
            width="50%"
            _text={{
               fontWeight: "bold",
            }}
            onPress={() => navigate("EditProfile")}
         >
            Editar dados
         </Button>
         <Button
            variant="unstyled"
            onPress={() => navigate("RecoverPassword")}
            _text={{
               color: "#000",
               fontWeight: 300,
               textDecorationLine: "underline",
               textDecorationStyle: "solid",
               textDecorationColor: "#fff",
            }}
         >
            Alterar senha
         </Button>
      </View>
   );
}
