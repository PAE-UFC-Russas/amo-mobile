import React, { useState } from "react";
import { View } from "react-native";
import { Button, Text, Input, HStack, TextArea, useToast } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { GetLoginToken } from "../../util/StorageLogin";
import api from "../../services/api";
import OnDeleteModal from "../../components/OnDeleteModal";
import styles from "./styles";

export default function RegisterDoubt({ route }) {
   const { goBack, navigation } = useNavigation();
   const [openModal, setOpenModal] = useState(false);
   const [question, setQuestion] = useState({
      titulo: "",
      descricao: "",
   });
   const toast = useToast();

   const PostQuestion = async () => {
      if (question.titulo.length > 0 && question.descricao.length > 0) {
         try {
            await api.post(
               "/duvidas/",
               {
                  titulo: question.titulo,
                  descricao: question.descricao,
                  disciplina: route.params.id,
               },
               {
                  headers: {
                     Authorization: "Token " + (await GetLoginToken()),
                  },
               }
            );

            toast.show({
               title: "Dúvida publicada com sucesso!",
               placement: "bottom",
            });

            goBack();
         } catch (error) {
            console.log(error.response.data);
            toast.show({
               title: "Erro ao publicar dúvida!",
               placement: "bottom",
            });
            return error.response.data;
         }
      } else {
         toast.show({
            title: "Titulo e descrição obrigatórios, preencha-os!",
            placement: "bottom",
         });
      }
   };

   return (
      <View flex={1} padding={20} justifyContent="space-between">
         <View>
            <HStack justifyContent="space-between" width="2/3" safeArea>
               <MaterialIcons
                  onPress={() => {
                     goBack();
                  }}
                  color="#52D6FB"
                  size={24}
                  name="arrow-back-ios"
               />
               <Text style={styles.title}>Cadastrar dúvida</Text>
            </HStack>
            <View
               style={{
                  justifyContent: "center",
                  alignItems: "flex-start",
                  height: "80%",
               }}
            >
               <Input
                  borderWidth={3}
                  size="md"
                  borderColor="#024284"
                  borderRadius={10}
                  marginTop={5}
                  width="90%"
                  maxLength={150}
                  color="#024284"
                  marginLeft={5}
                  placeholderTextColor="#024284"
                  onChangeText={(text) =>
                     setQuestion({ ...question, titulo: text })
                  }
                  placeholder="Insira um titulo"
               />
               <Text style={styles.descriptionTitle}>
                  O titulo deve conter palavras chaves, ex: equação do segundo
                  grau
               </Text>
               <TextArea
                  borderWidth={3}
                  size="md"
                  borderColor="#024284"
                  color="#024284"
                  maxLength={500}
                  borderRadius={10}
                  marginLeft={5}
                  width="90%"
                  h={200}
                  marginTop={7}
                  placeholderTextColor="#024284"
                  onChangeText={(text) =>
                     setQuestion({ ...question, descricao: text })
                  }
                  placeholder="Insira um descrição"
               />
               <Text style={styles.description}>
                  A descrição deve conter até 500 caracteres
               </Text>
            </View>
         </View>
         <HStack width="full">
            <Button
               style={{
                  width: "30%",
                  borderRadius: 30,
                  position: "absolute",
                  end: 0,
                  bottom: 30,
               }}
               onPress={PostQuestion}
            >
               Publicar
            </Button>
         </HStack>
         {openModal && (
            <OnDeleteModal
               setOpenModal={setOpenModal}
               openModal={openModal}
               navigation={navigation}
            />
         )}
      </View>
   );
}
