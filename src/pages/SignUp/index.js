import React, { useState } from "react";
import { Center, VStack, Text, View, Image } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import validator from "validator";
import { useAuth } from "../../contexts/auth";
import AuthHeader from "../../components/AuthHeader";
import DefaultBlueButton from "../../components/DefaultBlueButton";
import DefaultFormInput from "../../components/DefaultFormInput";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";

import {
   ActivityIndicator,
   TouchableOpacity,
   KeyboardAvoidingView,
   Platform,
} from "react-native";

export default function Register() {
   const { goBack, navigate } = useNavigation();
   const [loading, setLoading] = useState(false);
   const [newUser, setNewUser] = useState({
      email: "",
      password: "",
      confirmPassword: "",
   });
   const [inputErros, setInputErros] = useState({
      errosEmail: null,
      errosPassword: null,
      errosConfirmPassword: null,
   });
   const { Register } = useAuth();

   async function InputValidation() {
      setLoading(true);
      setInputErros({
         errosEmail: null,
         errosPassword: null,
         errosConfirmPassword: null,
      });
      let erros = {
         errosEmail: null,
         errosPassword: null,
         errosConfirmPassword: null,
      };
      try {
         if (newUser.email.length < 10 && !validator.isEmail(newUser.email))
            erros.errosEmail = "E-mail inválido!";
         if (newUser.password.length < 8)
            erros.errosPassword =
               "A senha precisa conter no minimo 8 caracteres!";
         else if (!newUser.password.match(/[a-zA-Z]/g))
            erros.errosPassword =
               "A senha precisa conter pelo menos uma letra!";
         else if (!newUser.password.match(/\d/g))
            erros.errosPassword =
               "A senha precisa conter pelo menos um número!";
         if (newUser.password !== newUser.confirmPassword)
            erros.errosConfirmPassword = "As senhas devem ser iguais!";
         setInputErros(erros);
         if (
            !erros.errosEmail &&
            !erros.errosPassword &&
            !erros.errosConfirmPassword
         ) {
            setLoading(true);
            const response = await Register(newUser);

            if (response === null) {
               navigate("CheckCode", { register: true });
            } else {
               setInputErros({
                  ...inputErros,
                  errosEmail: "Endereço de email já está em uso!",
               });
            }
            setLoading(false);
         }
         setLoading(false);
      } catch (error) {
         console.log(error);
      } finally {
         setLoading(false);
      }
   }

   return (
      <KeyboardAvoidingView
         style={{ flex: 1 }}
         behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
         <View style={styles.container} bgColor="#fff" safeArea>
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
                  color="#024284"
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
            <Center width="5/6">
               <Text
                  marginBottom={5}
                  fontWeight="bold"
                  color="#024284"
                  fontSize="md"
               >
                  Cadastre-se
               </Text>
               <VStack width="full" space={3}>
                  <DefaultFormInput
                     placeholder="Email"
                     value={newUser.email}
                     setValue={(text) =>
                        setNewUser({ ...newUser, email: text })
                     }
                     color="#024284"
                     error={inputErros.errosEmail}
                  />
                  <DefaultFormInput
                     type="password"
                     placeholder="Senha"
                     value={newUser.password}
                     setValue={(text) =>
                        setNewUser({ ...newUser, password: text })
                     }
                     color="#024284"
                     error={inputErros.errosPassword}
                  />
                  <DefaultFormInput
                     type="password"
                     placeholder="Cofirmar senha"
                     color="#024284"
                     value={newUser.confirmPassword}
                     setValue={(text) =>
                        setNewUser({ ...newUser, confirmPassword: text })
                     }
                     error={inputErros.errosConfirmPassword}
                  />
                  <Text style={styles.textInfo}>
                     A senha precisa ter no mínimo 8 caracteres, contendo letras
                     e números sem espaçamento. Ex: 12cay78d
                  </Text>
               </VStack>
            </Center>
            <VStack alignItems={"center"}>
               <DefaultBlueButton
                  color={"#024284"}
                  bgColor={"#2599BA"}
                  loading={loading}
                  onPress={InputValidation}
               >
                  {loading ? <ActivityIndicator /> : "Avançar"}
               </DefaultBlueButton>
               <TouchableOpacity
                  style={{ marginBottom: 16 }}
                  onPress={() => navigate("SignUpTeacher")}
               >
                  <Text
                     style={{
                        textDecorationLine: "underline",
                        marginTop: 30,
                        color: "#024284",
                     }}
                  >
                     CADASTRE-SE COMO PROFESSOR
                  </Text>
               </TouchableOpacity>
            </VStack>
         </View>
      </KeyboardAvoidingView>
   );
}
