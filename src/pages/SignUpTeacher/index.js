import React, { useState } from "react";
import { Center, Text, View, Image } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

import DefaultBlueButton from "../../components/DefaultBlueButton";

import styles from "./styles";
import { useNavigation } from "@react-navigation/native";

import { SendEmailSignUpTeacher } from "../../util/SendEmail";

export default function SignUpTeacher() {
  const { navigate, goBack } = useNavigation();
  const [inputErros, setInputErros] = useState({
    errosEmail: null,
  });

  const handleRecoverPassword = () => {
    const response = SendEmailSignUpTeacher();
    if (typeof response === "string") {
      setInputErros({ errosEmail: response });
    }
  };

  return (
    <Center style={styles.container} bgColor="#fff" safeArea>
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
        <Text marginBottom={20} fontWeight="bold" color="#024284" fontSize="lg">
          Cadastro do Professor
        </Text>
        <View
          style={{
            justifyContent: "flex-start",
            alignItems: "flex-start",
            height: "50%",
            alignItems: "flex-start",
          }}
        >
          <Text
            style={{
              color: "#024284",
              fontSize: 16,
              textAlign: "center",
            }}
          >
            Olá Docente, bem vindo(a) ao AMO!
          </Text>
          <Text style={{ color: "#024284", fontSize: 16, marginTop: 18 }}>
            Para dar continuidade ao cadastro, envie um email para o endereço
            paeufcrussas@gmail.com com as seguintes informações:
          </Text>
          <Text style={{ color: "#024284", fontSize: 16, marginTop: 18 }}>
            NOME
          </Text>
          <Text style={{ color: "#024284", fontSize: 16, marginTop: 18 }}>
            SIAPE
          </Text>
        </View>
      </Center>
      <Text style={{ color: "#024284", fontSize: 20, marginTop: 18 }}>
        {inputErros.errosEmail}
      </Text>
      <DefaultBlueButton onPress={handleRecoverPassword}>
        Mandar email
      </DefaultBlueButton>
    </Center>
  );
}
