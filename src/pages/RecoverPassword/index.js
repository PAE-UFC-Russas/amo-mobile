import React, { useState } from "react";
import { Center, VStack, Text, View } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import validator from "validator";
import AuthHeader from "../../components/AuthHeader";
import DefaultBlueButton from "../../components/DefaultBlueButton";
import DefaultFormInput from "../../components/DefaultFormInput";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import SendEmailRefactorPassword from "../../util/SendEmailRefactorPassword";

export default function RecoverPassword() {
   const [cor, setCor] = useState("tertiaryBlue");
   const { navigate, goBack } = useNavigation();
   const [email, setEmail] = useState("");
   const [inputErros, setInputErros] = useState({
      errosEmail: null,
   });

   const InputValidation = () => {
      let erros = {
         errosEmail: null,
      };

      if (email.length < 10 && !validator.isEmail(email)) setCor("red");
      erros.errosEmail = "E-mail inválido!";

      setInputErros(erros);
      if (!erros.errosEmail) navigate("CheckCode", { register: false });
      return null;
   };

   return (
      <Center style={styles.container} bgColor="#fff" safeArea>
         <MaterialIcons
            onPress={() => goBack()}
            color="#52D6FB"
            size={24}
            style={styles.backButton}
            name="arrow-back-ios"
         />
         <Center width="5/6">
            <AuthHeader>Esqueceu sua senha?</AuthHeader>
            <View
               style={{
                  justifyContent: "center",
                  alignItems: "center",
                  height: "50%",
                  alignItems: "center",
               }}
            >
               <Text
                  style={{
                     color: "#52D6FB",
                     fontSize: 20,
                     textAlign: "center",
                  }}
               >
                  Clique no botão abaixo para receber {"\n"}
                  <Text
                     style={{
                        marginLeft: "auto",
                        marginRight: "auto",
                     }}
                  >
                     instruções e redefinir senha!
                  </Text>
               </Text>
               <Text style={{ color: "#52D6FB", fontSize: 20, marginTop: 18 }}>
                  paeufcrussas@gmail.com
               </Text>
            </View>
         </Center>
         <DefaultBlueButton onPress={SendEmailRefactorPassword}>
            Mandar email
         </DefaultBlueButton>
      </Center>
   );
}
