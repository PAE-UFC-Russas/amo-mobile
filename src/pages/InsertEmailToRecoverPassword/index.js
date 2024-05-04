import React, { useState } from "react";
import { ActivityIndicator } from "react-native";
import { Center, Box, Text, View, Image } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import validator from "validator";
import DefaultBlueButton from "../../components/DefaultBlueButton";
import DefaultFormInput from "../../components/DefaultFormInput";
import api from "../../services/api";
import styles from "./styles";

export default function InsertEmailToRecoverPassword() {
  const { goBack, navigate } = useNavigation();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  async function InputValidation() {
    setLoading(true);
    setError("");
    try {
      if (email.length < 10 && !validator.isEmail(email)) {
        setError("E-mail inválido!");
        return;
      }
      await api.post("/solicitar-redefinicao-senha/", { email });
      navigate("CheckCode", { register: false });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container} bgColor="#fff" safeArea>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          marginTop: 50,
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
      <Box width="5/6">
        <Text
          marginBottom={5}
          fontWeight="bold"
          color="#024284"
          fontSize="md"
          textAlign="center"
        >
          Insira o email que vai receber o código de verificação
        </Text>
        <DefaultFormInput
          placeholder="Email"
          value={email}
          setValue={(text) => setEmail(text)}
          color="#024284"
          error={error}
        />
      </Box>
      <DefaultBlueButton
        color={"#024284"}
        bgColor={"#2599BA"}
        loading={loading}
        onPress={InputValidation}
      >
        {loading ? <ActivityIndicator /> : "Avançar"}
      </DefaultBlueButton>
    </View>
  );
}
