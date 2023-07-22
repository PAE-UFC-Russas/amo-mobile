import React, { useState } from "react";
import { View } from "react-native";
import {
   Avatar,
   Box,
   Button,
   Text,
   Select,
   Icon,
   Input,
   HStack,
   TextArea,
   Image,
   useToast,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { GetLoginToken } from "../../util/StorageLogin";
import api from "../../services/api";
import PickImage, { LaunchCamera } from "../../util/PickImage";
import OnDeleteModal from "../../components/OnDeleteModal";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../contexts/auth";

export default function RegisterDoubt({ route }) {
   const { user } = useAuth();
   const { navigate, goBack } = useNavigation();
   const [openModal, setOpenModal] = useState(false);
   const [question, setQuestion] = useState({
      titulo: "",
      descricao: "",
   });
   const [image, setImage] = useState(null);
   const toast = useToast();

   const GetImage = async (type) => {
      const img = type === "cam" ? await LaunchCamera() : await PickImage();
      setImage(img);
   };

   const OnDelete = () => {
      if (question.titulo.length > 0 || question.descricao.length > 0) {
         setOpenModal(true);
      } else {
         goBack();
      }
   };

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
            <HStack marginTop={10} alignItems="center">
               <Avatar
                  marginLeft={30}
                  marginRight={3}
                  bg="tertiaryBlue"
                  size="lg"
                  source={
                     !user.perfil.foto
                        ? {
                             uri: "https://i.ibb.co/4f1jsPx/Splash-1.png",
                          }
                        : {
                             uri: `https://${user.perfil.foto}`,
                          }
                  }
               />
               <Select
                  placeholder="Privacidade do Autor"
                  height={38}
                  width={190}
                  borderRadius={10}
                  borderColor="#52D6FB"
                  placeholderTextColor="#52D6FB"
                  color="#52D6FB"
                  _dropdownIcon={
                     <Icon
                        name="arrow-down"
                        type="Entypo"
                        style={{ color: "#52D6FB" }}
                     />
                  }
               >
                  <Select.Item label="Público" value="publico" />
                  <Select.Item
                     label="Somente para monitores"
                     value="monitores"
                  />
               </Select>
            </HStack>
            <View>
               <Input
                  size="md"
                  borderColor="#52D6FB"
                  borderRadius={10}
                  marginTop={5}
                  width="90%"
                  color="#52D6FB"
                  marginLeft={5}
                  placeholderTextColor="#52D6FB"
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
                  size="md"
                  borderColor="#52D6FB"
                  color="#52D6FB"
                  maxLength={500}
                  borderRadius={10}
                  marginLeft={5}
                  width="90%"
                  h={150}
                  marginTop={2}
                  placeholderTextColor="#52D6FB"
                  onChangeText={(text) =>
                     setQuestion({ ...question, descricao: text })
                  }
                  placeholder="Insira um descrição"
               />
               <Text style={styles.description}>
                  A descrição deve conter 500 caracteres
               </Text>
            </View>
            {image && (
               <Image
                  borderRadius={5}
                  width={400}
                  height={300}
                  alt="Conteúdo da dúvida"
                  source={{
                     uri: image,
                  }}
               />
            )}
         </View>
         <HStack width="full" justifyContent="space-between">
            <HStack space={2}>
               <MaterialIcons
                  color="#52D6FB"
                  size={32}
                  name="drive-folder-upload"
                  onPress={() => GetImage("lib")}
               />
               <MaterialIcons
                  color="#52D6FB"
                  size={32}
                  name="add-photo-alternate"
                  onPress={() => GetImage("cam")}
               />
            </HStack>
            <Button
               style={{ width: "30%", borderRadius: 30 }}
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
