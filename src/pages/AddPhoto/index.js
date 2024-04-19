import React, { useState } from "react";
import { Platform } from "react-native";
import { Button, Center, Image, Text, useToast, View } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { GetLoginToken } from "../../util/StorageLogin";
import AuthHeader from "../../components/AuthHeader";
import { ActivityIndicator } from "react-native";
import DefaultBlueButton from "../../components/DefaultBlueButton";
import styles from "./styles";

export default function AddPhoto() {
   const { navigate, goBack } = useNavigation();
   const [image, setImage] = useState(null);
   const [imageError, setImageError] = useState(null);
   const toast = useToast();

   const [loading, setLoading] = useState(false);

   const PickImage = async () => {
      const result = await ImagePicker.launchImageLibraryAsync({
         mediaTypes: ImagePicker.MediaTypeOptions.All,
         allowsEditing: true,
         aspect: [4, 3],
         quality: 1,
      });

      if (!result.canceled) {
         setImage(result.assets[0].uri);
      }
   };

   const validation = async () => {
      setLoading(true);
      if (!image) {
         toast.show({
            title: "Insira uma imagem de perfil ou pule esta etapa!",
            placement: "top",
         });
         setLoading(false);
      } else {
         const formData = new FormData();
         const randomNumberForPhoto = Math.floor(
            Math.random() * (1000000 - 1) + 1
         );

         formData.append("foto", {
            uri: Platform.OS === "ios" ? image.replace("file://", "") : image,
            name: image.substring(10, 20) + randomNumberForPhoto + "foto.jpg",
            fileName:
               image.substring(10, 20) + randomNumberForPhoto + "foto.jpg",
            type: "image/jpeg",
         });

         try {
            setLoading(true);
            await fetch("https://amo-backend.onrender.com/usuario/eu/", {
               method: "PATCH",
               headers: {
                  Authorization: "Token " + (await GetLoginToken()),
                  "Content-Type": "multipart/form-data",
               },
               body: formData,
            });

            navigate("RegistrationComplete");
            setLoading(false);
         } catch (error) {
            toast.show({
               title: "Erro, verifique sua internet!",
               placement: "bottom",
            });
            console.log(error);
            setLoading(false);
         }
      }
   };

   return (
      <Center style={styles.container} bgColor="#fff">
         <View
            style={{
               width: "100%",
               flexDirection: "row",
               justifyContent: "space-around",
               alignItems: "center",
            }}
         >
            <MaterialIcons
               onPress={() => goBack()}
               color="#52D6FB"
               size={24}
               style={styles.backButton}
               name="arrow-back-ios"
            />
            <Center>
               <Image
                  alt="Logo AMO"
                  source={require("../../assets/logo_lightblue.png")}
                  style={{ width: 60, height: 60 }}
               />
            </Center>
         </View>
         <View style={{ marginBottom: 30 }}>
            <Text fontWeight="bold" color="#024284" fontSize="lg">
               Selecione uma foto se quiser!
            </Text>

            <Button bgColor="#fff" onPress={PickImage}>
               <MaterialIcons
                  style={styles.camIcon}
                  name="photo-camera"
                  color="#fff"
                  size={24}
               />
               <Image
                  size={150}
                  resizeMode={"contain"}
                  borderRadius={100}
                  source={
                     !image
                        ? require("../../assets/avatar_example.jpg")
                        : { uri: image }
                  }
                  alt="Foto de perfil"
               />
            </Button>
         </View>
         <View style={{ marginBottom: 50 }}>
            <Center>
               <Button
                  variant="ghost"
                  key="register"
                  onPress={() => navigate("RegistrationComplete")}
                  _text={{
                     color: "defaultBlue",
                     fontWeight: 800,
                  }}
               >
                  Pular
               </Button>
               <DefaultBlueButton bgColor={"#2599BA"} onPress={validation}>
                  {loading ? <ActivityIndicator /> : "Concluir cadastro"}
               </DefaultBlueButton>
            </Center>
         </View>
      </Center>
   );
}
