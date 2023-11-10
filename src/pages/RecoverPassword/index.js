import React, { useState } from "react";
import { Center, Text, View } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

import AuthHeader from "../../components/AuthHeader";
import DefaultBlueButton from "../../components/DefaultBlueButton";

import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import SendEmailRefactorPassword from "../../util/SendEmail";

export default function RecoverPassword() {
   const { navigate, goBack } = useNavigation();
   const [inputErros, setInputErros] = useState({
      errosEmail: null,
   });

   const handleRecoverPassword = () => {
      const response = SendEmailRefactorPassword();
      if (typeof response === "string") {
         setInputErros({ errosEmail: response });
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
         <Text style={{ color: "#52D6FB", fontSize: 20, marginTop: 18 }}>
            {inputErros.errosEmail}
         </Text>
         <DefaultBlueButton onPress={handleRecoverPassword}>
            Mandar email
         </DefaultBlueButton>
      </Center>
   );
}
