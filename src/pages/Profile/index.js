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
      if (!subject || !user || !user.perfil) return "Aluno";

      const isMonitor = subject.monitores?.some((obj) => obj.id === user.perfil.id) || false;
      const isProfessor = subject.professores?.some((obj) => obj.id === user.perfil.id) || false;

      if (isMonitor) return "Monitor";
      if (isProfessor) return "Professor";
      return "Aluno";
   }

   const office = getCurrentOffice(subject, user);
   console.log(user)
   return (
      <View style={styles.container}>
         {/* Avatar */}
         <Center mt={5}>
            <Avatar
               bg="tertiaryBlue"
               size="xl"
               source={
                  profile.foto
                     ? { uri: profile.foto }
                     : { uri: "https://i.ibb.co/4f1jsPx/Splash-1.png" }
               }
            />
         </Center>

         {/* Info Card */}
         <View style={styles.infoCard}>
            {/* Cargo Badge */}
            <View
               style={{
                  width: 120,
                  backgroundColor: "#024284",
                  height: 30,
                  borderTopRightRadius: 10,
                  borderBottomRightRadius: 10,
                  marginTop: 6,
                  marginBottom: 6,
                  marginLeft: 0,
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
                  {office}
                  
               </Text>
            </View>
            

            {/* Informações */}
            <View style={styles.infoRow}>
               <Text style={styles.infoLabel}>Monitoria</Text>
               <Text style={styles.infoValue}>{subject?.nome ?? "Nenhuma"}</Text>
            </View>
            <View style={styles.infoRow}>
               <Text style={styles.infoLabel}>Nome de exibição</Text>
               <Text style={styles.infoValue}>{profile.nome_exibicao}</Text>
            </View>
            <View style={styles.infoRow}>
               <Text style={styles.infoLabel}>Curso</Text>
               <Text style={styles.infoValue}>{profile.curso}</Text>
            </View>
            <View style={styles.infoRow}>
               <Text style={styles.infoLabel}>Entrada</Text>
               <Text style={styles.infoValue}>{profile.entrada}</Text>
            </View>
            {/* <View style={styles.infoRow}>
               <Text style={styles.infoLabel}>Matrícula</Text>
               <Text style={styles.infoValue}>{profile.matricula}</Text>
            </View> */}
         </View>

         {/* Buttons */}
         <Center style={styles.buttonsContainer}>
            <Button
               style={styles.primaryButton}
               onPress={() => navigate("EditProfile")}
            >
               Editar dados
            </Button>
            <Button
               variant="unstyled"
               mt={2}
               onPress={() => navigate("RecoverPassword")}
            >
               <Text style={styles.linkButton}>Alterar senha</Text>
            </Button>
         </Center>
      </View>
   );
}
