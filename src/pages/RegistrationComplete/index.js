import React from "react";
import { Center, Text } from "native-base";
import AuthHeader from "../../components/AuthHeader";
import DefaultBlueButton from "../../components/DefaultBlueButton";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";

export default function RegistrationComplete() {
   const { navigate } = useNavigation();
   return (
      <Center style={styles.container}>
         <AuthHeader />
         <Text color="defaultBlue" width="1/2" textAlign="center" fontSize={16}>
            Obrigado(a)! Cadastro concluido com sucesso!
         </Text>
         <DefaultBlueButton onPress={() => navigate("SignIn")}>
            Login
         </DefaultBlueButton>
      </Center>
   );
}
