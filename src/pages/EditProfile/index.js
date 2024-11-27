import React, { useEffect, useState } from "react";
import { TouchableOpacity, Image, Platform } from "react-native";
import {
   Center,
   Text,
   View,
   Avatar,
   Input,
   Button,
   KeyboardAvoidingView,
   Spinner,
} from "native-base";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import PickImage from "../../util/PickImage";
import { GetLoginToken } from "../../util/StorageLogin";
import { useAuth } from "../../contexts/auth";
import SelectForProfilePage from "../../components/SelectForProfilePage";
import DefaultSelect from "../../components/DefaultSelect";
import api from "../../services/api";
import styles from "./styles";
import { useCustomToast } from "../../hooks/useCustomToast";
import {
   EditProfilePerApi,
   EditProfilePerFormData,
} from "../../util/EditProfileSchema";
import { useSubject } from "../../contexts/subject";

export default function EditProfile() {
   const showToast = useCustomToast();
   const [courses, setCourses] = useState([]);
   const [years, setYears] = useState([]);
   const { user, EditUser } = useAuth();
   const [profile, setProfile] = useState({
      nome_exibicao: user.perfil.nome_exibicao,
      entrada: user.perfil.entrada,
      curso: user.perfil.curso,
      foto: null,
      matricula: user.perfil.matricula,
      cargos: user.perfil.cargos,
   });
   const [enviar, setEnviar] = useState(false);
   const { goBack } = useNavigation();
   const { course } = useSubject();

   const GetYearsPerSemester = () => {
      let tempYears = [];
      for (let i = 0; i < years.length; i++) {
         tempYears.push(years[i] + ".1");
         tempYears.push(years[i] + ".2");
      }
      return tempYears;
   };

   const GetImage = async () => {
      const avatar = await PickImage();
      setProfile({ ...profile, foto: avatar });
   };

   const Save = async () => {
      if (!profile.nome_exibicao || profile.curso === -1 || !profile.entrada) {
         showToast("Atenção", "Existem campos em branco!", "warning");
      } else {
         setEnviar(true);
         const response =
            profile.foto != null
               ? await EditProfilePerFormData(profile)
               : await EditProfilePerApi(profile);
         if (response.success) {
            EditUser(response.user);
            showToast("Sucesso", "Dados editados com sucesso!", "success");
            goBack();
         } else {
            showToast("Erro", "Erro, verifique sua internet!", "error");
         }
      }
      setEnviar(false);
   };

   useEffect(() => {
      const currentYear = new Date().getFullYear();
      let tempYears = [];
      for (let i = 2015; i <= currentYear; i++) {
         tempYears.push(i);
      }

      setYears(tempYears);
      async function GetCourses() {
         try {
            const response = await api.get("/cursos/", {
               headers: {
                  Authorization: "Token " + (await GetLoginToken()),
               },
            });
            const listCourses = response.data.results;

            if (typeof profile.curso === "string") {
               const result = listCourses.filter(
                  (e) => e.nome == profile.curso
               )[0].id;
               setProfile({ ...profile, curso: result });
            }
            setCourses(listCourses);
         } catch (error) {
            console.log(error.response.data);
         }
      }
      GetCourses();
   }, []);

   return (
      <KeyboardAvoidingView
         style={{ flex: 1 }}
         behavior={Platform.OS === "ios" ? "padding" : "height"}
         keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -100}
      >
         <View style={styles.container}>
            <View
               style={{
                  width: "100%",
                  justifyContent: "space-around",
                  alignItems: "center",
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
                  <Text
                     marginBottom={10}
                     fontWeight="bold"
                     color="#024284"
                     fontSize="lg"
                  >
                     Editar perfil
                  </Text>
               </Center>
            </View>

            <Center>
               <TouchableOpacity onPress={() => GetImage()}>
                  {profile.foto ? (
                     <Image
                        source={{ uri: profile.foto }}
                        style={{
                           width: 100,
                           height: 100,
                           margin: 5,
                           borderRadius: 100,
                        }}
                     />
                  ) : (
                     <Avatar
                        alignSelf="center"
                        bg="tertiaryBlue"
                        margin={5}
                        size="xl"
                        source={{
                           uri:
                              user.perfil.foto.length > 0
                                 ? user.perfil.foto
                                 : "https://i.ibb.co/4f1jsPx/Splash-1.png",
                        }}
                     />
                  )}
                  <View style={styles.avatarBadge}>
                     <FontAwesome5 color="#fff" size={16} name="pen" />
                  </View>
               </TouchableOpacity>
            </Center>

            <View style={styles.edgeProfile}>
               <View style={{ padding: 20 }}>
                  <View>
                     <Text marginTop={1} fontSize={18}>
                        Nome de exibição:
                     </Text>
                     <View style={{ padding: 5 }}>
                        <Input
                           borderColor={"black"}
                           borderWidth={1}
                           placeholder="Digite seu nome de exibição"
                           fontSize={15}
                           onChangeText={(text) =>
                              setProfile({ ...profile, nome_exibicao: text })
                           }
                           value={profile.nome_exibicao}
                           borderRadius={15}
                           color={"black"}
                        />
                     </View>
                  </View>
                  <View>
                     <Text marginTop={1} fontSize={18}>
                        Curso:
                     </Text>
                     <View style={{ padding: 5 }}>
                        <SelectForProfilePage
                           borderWidth={1}
                           borderColor={"#99B3CD"}
                           items={courses}
                           placeholder={course.nome}
                           setValue={(itemValue) =>
                              setProfile({
                                 ...profile,
                                 curso: courses.filter(
                                    (e) => e.id == itemValue
                                 )[0].id,
                              })
                           }
                           color={"black"}
                        />
                     </View>
                  </View>
                  <View>
                     <Text marginTop={1} fontSize={18}>
                        Entrada:
                     </Text>
                     <View style={{ padding: 5 }}>
                        <DefaultSelect
                           borderColor={"#99B3CD"}
                           borderWidth={1}
                           placeholder="Ano de entrada"
                           items={GetYearsPerSemester()}
                           value={profile.entrada}
                           setValue={(itemValue) =>
                              setProfile({ ...profile, entrada: itemValue })
                           }
                           color="black"
                        />
                     </View>
                  </View>
               </View>
            </View>

            <>
               <View style={styles.buttons}>
                  <Button
                     variant="outline"
                     borderRadius={10}
                     width={100}
                     _text={{
                        color: "#2599BA",
                     }}
                     onPress={() => goBack()}
                  >
                     Cancelar
                  </Button>
                  <Button
                     bgColor="#2599BA"
                     borderRadius={10}
                     width={100}
                     onPress={Save}
                  >
                     Salvar
                  </Button>
               </View>
               <View
                  height={10}
                  width={"100%"}
                  marginTop={5}
                  justifyContent={"center"}
                  alignItems={"center"}
               >
                  {enviar && <Spinner accessibilityLabel="Carregando cursos" />}
               </View>
            </>
         </View>
      </KeyboardAvoidingView>
   );
}
