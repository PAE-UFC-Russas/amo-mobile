import React, { useEffect, useState } from "react";
import { Keyboard, Image } from "react-native";
import { Center, Button, VStack, Flex } from "native-base";
import validator from "validator";
import { useAuth } from "../../contexts/auth";
import DefaultFormInput from "../../components/DefaultFormInput";
import styles from "./styles";
import { ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function SignIn() {
   const { navigate } = useNavigation();
   const [loading, setLoading] = useState(false);
   const [keyboardIsOpen, setKeyboardIsOpen] = useState(false);
   const [userLogin, setUserLogin] = useState({
      email: "",
      password: "",
   });
   const [inputErros, setInputErros] = useState({
      errosEmail: null,
      errosPassword: null,
   });
   const { IsConnected, Login } = useAuth();

   useEffect(() => {
      setUserLogin({
         email: "",
         password: "",
      });

      async function VerifyLogin() {
         setLoading(true);
         const connected = await IsConnected();

         if (!connected) {
            if (connected === null) {
               navigate("StudentProfile");
            }
         } else {
            navigate("SelectCourses");
         }
         setLoading(false);
      }

      VerifyLogin();
   }, []);

   const InputValidation = async () => {
      setLoading(true);
      let erros = {
         errosEmail: null,
         errosPassword: null,
      };

      if (userLogin.email.length < 10 && !validator.isEmail(userLogin.email)) {
         setLoading(false);
         erros.errosEmail = "E-mail inválido!";
      }
      if (userLogin.password.length < 8) {
         setLoading(false);
         erros.errosPassword = "A senha precisa conter 8 caracteres!";
      }

      if (!erros.errosEmail && !erros.errosPassword) {
         const response = await Login(userLogin);

         if (response) {
            if (response.erro) {
               navigate("StudentProfile");
            }
            if (response.non_field_errors) {
               setLoading(false);
               setInputErros({ errosEmail: "Email ou senha incorretos" });
               return;
            }
            if (response.username) {
               setLoading(false);
               setInputErros({ errosEmail: "Email inválido" });
               return;
            }
            if (response.password) {
               setLoading(false);
               setInputErros({ errosPassword: "Senha inválida" });
               return;
            }
         }
         navigate("SelectCourses");
      }
      setLoading(false);
      setInputErros(erros);
   };

   Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardIsOpen(true);
   });
   Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardIsOpen(false);
   });

   return (
      <Center
         style={styles.container}
         bg={{
            linearGradient: {
               colors: ["tertiaryBlue", "defaultBlue"],
            },
         }}
      >
         <Image source={require("../../assets/logo_name.png")} />
         <Flex
            direction="column"
            width="5/6"
            height={380}
            justifyContent="center"
         >
            <VStack space={7}>
               <DefaultFormInput
                  placeholder="Email"
                  value={userLogin.email}
                  setValue={(text) =>
                     setUserLogin({ ...userLogin, email: text })
                  }
                  color="white"
                  error={inputErros.errosEmail}
               />
               <DefaultFormInput
                  type="password"
                  placeholder="Senha"
                  value={userLogin.password}
                  setValue={(text) =>
                     setUserLogin({ ...userLogin, password: text })
                  }
                  color="white"
                  error={inputErros.errosPassword}
               />
            </VStack>
            <VStack width={"100%"} space={3} alignItems="center">
               <Button
                  disabled={loading}
                  marginTop={10}
                  marginBottom={keyboardIsOpen ? 70 : 0}
                  borderRadius={20}
                  bgColor="#fff"
                  width={"80%"}
                  height={60}
                  _text={{
                     fontWeight: 800,
                     color: "defaultBlue",
                  }}
                  onPress={() => {
                     InputValidation();
                  }}
               >
                  {loading ? <ActivityIndicator /> : "Entrar"}
               </Button>
               {!keyboardIsOpen && (
                  <Button
                     alignItems={"center"}
                     justifyContent={"center"}
                     variant="ghost"
                     key="SignUp"
                     onPress={() => navigate("SignUp")}
                     _text={{
                        color: "#fff",
                        fontWeight: 300,
                        marginTop: 8,
                        textDecorationLine: "underline",
                        textDecorationStyle: "solid",
                        textDecorationColor: "#fff",
                        justifyContent: "center",
                        alignItems: "center",
                     }}
                  >
                     NÃO POSSUO CADASTRO
                  </Button>
               )}
               {!keyboardIsOpen && (
                  <Button
                     marginBottom={keyboardIsOpen ? 70 : 0}
                     _text={{
                        color: "#fff",
                        fontWeight: 300,
                        textDecorationLine: "underline",
                        textDecorationStyle: "solid",
                        textDecorationColor: "#fff",
                     }}
                     variant="unstyled"
                     onPress={() => {
                        navigate("About");
                     }}
                  >
                     Sobre o aplicativo
                  </Button>
               )}
            </VStack>
         </Flex>
      </Center>
   );
}
