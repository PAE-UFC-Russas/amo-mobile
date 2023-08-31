import React, { useState } from "react";
import { Platform } from "react-native";
import { Button, Center, Image, Text, useToast } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { GetLoginToken } from "../../util/StorageLogin";
import AuthHeader from "../../components/AuthHeader";
import { ActivityIndicator } from "react-native";
import DefaultBlueButton from "../../components/DefaultBlueButton";
import styles from "./styles";

export default function AddPhoto() {
   const { navigate } = useNavigation();
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
         setImageError(
            "Insira uma imagem de perfil para concluir o cadastro ou pule esta etapa!"
         );
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
         <Center width="5/6">
            <AuthHeader>Selecione uma foto se quiser!</AuthHeader>
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
         </Center>
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
            <DefaultBlueButton onPress={validation}>
               {loading ? <ActivityIndicator /> : "Concluir cadastro"}
            </DefaultBlueButton>
            {imageError && (
               <Text style={{ color: "#f00", fontSize: 12 }}>{imageError}</Text>
            )}
         </Center>
      </Center>
   );
}
