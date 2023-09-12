import React, { useEffect, useState } from "react";
import { TouchableOpacity, Image } from "react-native";
import {
   Center,
   Text,
   View,
   Avatar,
   Input,
   Button,
   useToast,
   ScrollView,
   HStack,
   Spinner
} from "native-base";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import PickImage from "../../util/PickImage";
import { GetLoginToken } from "../../util/StorageLogin";
import { useAuth } from "../../contexts/auth";
import SelectForProfilePage from "../../components/SelectForProfilePage";
import DefaultSelect from "../../components/DefaultSelect";
import api from "../../services/api";
import styles from "./styles";
import { EditProfilePerApi, EditProfilePerFormData } from "../../util/EditProfileSchema";

export default function EditProfile() {
   const { goBack } = useNavigation();
   const toast = useToast();
   const [courses, setCourses] = useState([]);
   const [years, setYears] = useState([]);
   const { user, EditUser } = useAuth();
   const [profile, setProfile] = useState({
      nome_exibicao: user.perfil.nome_exibicao,
      entrada: user.perfil.entrada,
      curso: user.perfil.curso,
      foto: null
   });

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
         toast.show({
            title: "Não deixe nenhum campo em branco!",
            placement: "bottom",
         });
      } else {
         const response = profile.foto != null?await EditProfilePerFormData(profile):await EditProfilePerApi(profile)
         if(response.success){
            EditUser(response.user)
            toast.show({
               title: "Dados cadastrados com sucesso!",
               placement: "bottom",
            });
            goBack();
         }else{
            toast.show({
               title: "Erro, verifique sua internet!",
               placement: "bottom",
            });
         }
      }
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

            if(typeof profile.curso === "string"){
               const result = listCourses.filter((e) => e.nome == profile.curso)[0].id
               setProfile({...profile, curso: result})
            }
            setCourses(listCourses);
         } catch (error) {
            console.log(error.response.data);
         }
      }
      GetCourses();
   }, []);

   return (
      <View style={styles.container}>
         {
            courses.length > 0 ? (
               <ScrollView>
                  <HStack
                     justifyContent="space-between"
                     alignSelf={"center"}
                     safeArea
                  >
                     <Text alignSelf="center" fontSize={25} color={"#52D6FB"}>
                        {" "}
                        Editar Perfil{" "}
                     </Text>
                  </HStack>
                  <Center justifyContent={"center"} alignItems={"center"}>
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
                                       ? `https://${user.perfil.foto}`
                                       : "https://i.ibb.co/4f1jsPx/Splash-1.png",
                              }}
                           />
                        )}
                        <View style={styles.avatarBadge}>
                           <FontAwesome5 color="#fff" size={16} name="pen" />
                        </View>
                     </TouchableOpacity>
                  </Center>
                  <View>
                     <Text marginTop={2} fontSize={15}>
                        Nome de exibição
                     </Text>
                     <Input
                        color={"#52D6FB"}
                        borderWidth={1}
                        borderColor={"#52D6FB"}
                        placeholder="Digite seu nome de exibição"
                        fontSize={15}
                        onChangeText={(text) =>
                           setProfile({ ...profile, nome_exibicao: text })
                        }
                        value={profile.nome_exibicao}
                        variant="outline"
                        borderRadius={15}
                        backgroundColor="#fff"
                     />

                     <Text marginTop={5} fontSize={15}>
                        Curso
                     </Text>
                     <SelectForProfilePage
                        borderWidth={1}
                        backgroundColor="white"
                        style={{ color: "black", backgroundColor: "white" }}
                        items={courses}
                        value={courses.filter((e) => e.id === profile.curso)[0].nome}
                        placeholder={courses.filter((e) => e.id === profile.curso)[0].nome}
                        setValue={(itemValue) =>
                           setProfile({
                              ...profile,
                              curso: courses.filter((e) => e.id == itemValue)[0].id,
                           })
                        }
                        color="#52D6FB"
                     />
                     <Text marginTop={5} fontSize={15}>
                        Entrada
                     </Text>
                     <DefaultSelect
                        borderWidth={1}
                        style={{ color: "white", backgroundColor: "white" }}
                        backgroundColor="white"
                        placeholder="Ano de entrada"
                        items={GetYearsPerSemester()}
                        value={profile.entrada}
                        setValue={(itemValue) =>
                           setProfile({ ...profile, entrada: itemValue })
                        }
                        color="#52D6FB"
                     />
                  </View>
                  <View style={styles.buttons}>
                     <Button
                        borderWidth={2}
                        borderColor="#52D6FB"
                        variant="outline"
                        borderRadius={10}
                        width={100}
                        _text={{
                           color: "#4B4A4A",
                        }}
                        onPress={() => goBack()}
                     >
                        Cancelar
                     </Button>
                     <Button
                        bgColor="#52D6FB"
                        borderRadius={10}
                        width={100}
                        onPress={Save}
                     >
                        Salvar
                     </Button>
                  </View>
               </ScrollView>
            ):(
               <Spinner accessibilityLabel="Carregando cursos" />
            )
         }
      </View>
   );
}
