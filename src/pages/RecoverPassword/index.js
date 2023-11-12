import React, { useState } from "react";
import { Center, Text, View } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

import AuthHeader from "../../components/AuthHeader";
import DefaultBlueButton from "../../components/DefaultBlueButton";

import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import SendEmailRefactorPassword from "../../util/SendEmail";
import DefaultFormInput from "../../components/DefaultFormInput";

export default function RecoverPassword() {
   const { navigate, goBack } = useNavigation();
   const [inputErros, setInputErros] = useState({
      errosEmail: null,
   });

   const [senhaDados, setSenhaDados] = useState({
      senhaAtual: "",
      novaSenha: "",
      confirmarSenha: "",
   });

   const handleRecoverPassword = () => {
      const response = SendEmailRefactorPassword();
      if (typeof response === "string") {
         setInputErros({ errosEmail: response });
      }
   };

   const handleCriateNewPassword = () => {
      if (
         senhaDados.senhaAtual.length === 0 ||
         senhaDados.novaSenha.length == 0 ||
         senhaDados.confirmarSenha.length === 0
      ) {
         console.log("Existem campos em branco!");
      }
      if (senhaDados.novaSenha != senhaDados.confirmarSenha) {
         console.log("As senhas devem ser iguais!");
      } else {
         console.log("As senhas estao prontas para serem mudadas!");
      }
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
         <AuthHeader>Crie uma nova senha</AuthHeader>
         <Center width="5/6" gap={4}>
            <DefaultFormInput
               width="100%"
               height="100%"
               color={"#52D6FB"}
               placeholder={"Senha atual"}
               value={senhaDados.senhaAtual}
               setValue={(text) =>
                  setSenhaDados({ ...senhaDados, senhaAtual: text })
               }
            ></DefaultFormInput>

            <DefaultFormInput
               width="100%"
               height="100%"
               color={"#52D6FB"}
               placeholder={"Nova senha"}
               value={senhaDados.novaSenha}
               setValue={(text) =>
                  setSenhaDados({ ...senhaDados, novaSenha: text })
               }
            ></DefaultFormInput>
            <DefaultFormInput
               width="100%"
               height="100%"
               color={"#52D6FB"}
               placeholder={"Confirmar senha"}
               value={senhaDados.confirmarSenha}
               setValue={(text) =>
                  setSenhaDados({ ...senhaDados, confirmarSenha: text })
               }
            ></DefaultFormInput>
         </Center>
         <Text style={{ color: "#52D6FB", fontSize: 20, marginTop: 18 }}>
            {inputErros.errosEmail}
         </Text>
         <DefaultBlueButton onPress={handleCriateNewPassword}>
            Salvar
         </DefaultBlueButton>
      </Center>
   );
}
