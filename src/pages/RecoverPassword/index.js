import React, { useState } from "react";
import { Center, VStack, Text, View } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import validator from "validator";
import AuthHeader from "../../components/AuthHeader";
import DefaultBlueButton from "../../components/DefaultBlueButton";
import DefaultFormInput from "../../components/DefaultFormInput";
import styles from "./styles";
import { Linking } from "react-native";
import { useNavigation } from "@react-navigation/native";

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

   const enviarEmail = () => {
      // Endereço de e-mail para onde o e-mail será enviado
      const destinatario = "paeufcrussas@gmail.com";

      // Assunto do e-mail (opcional)
      const assunto = "Redefinição de senha";

      // Corpo do e-mail (opcional)
      const corpoEmail = "Olá, gostaria de redefinir minha senha.";

      // Crie a URL de e-mail usando o padrão 'mailto:'
      const url = `mailto:${destinatario}?subject=${assunto}&body=${corpoEmail}`;

      // Verifique se o Linking é suportado no dispositivo
      Linking.canOpenURL(url)
         .then((supported) => {
            if (!supported) {
               console.log("Não é possível enviar e-mails neste dispositivo.");
            } else {
               // Abra o cliente de e-mail padrão
               return Linking.openURL(url);
            }
         })
         .catch((err) =>
            console.error("Erro ao abrir o cliente de e-mail:", err)
         );
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
            {/* <VStack width="full" space={3}>
               <DefaultFormInput
                  placeholder="Email"
                  value={email}
                  setValue={(text) => setEmail(text)}
                  color={cor}
                  error={inputErros.errosEmail}
               />
            </VStack> */}
            <View
               style={{
                  justifyContent: "center",
                  alignItems: "center",
                  height: "50%",
               }}
            >
               <Text style={{ color: "#52D6FB", fontSize: 20 }}>
                  Mande um email para a gente!
               </Text>
               <Text style={{ color: "#52D6FB", fontSize: 20, marginTop: 10 }}>
                  paeufcrussas@gmail.com
               </Text>
            </View>
         </Center>
         <DefaultBlueButton onPress={enviarEmail}>
            Mandar email
         </DefaultBlueButton>
      </Center>
   );
}
