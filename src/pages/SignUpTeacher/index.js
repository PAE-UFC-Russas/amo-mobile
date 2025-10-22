import React, { useState } from "react";
import {
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { Center, VStack, Text, Image, View } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import DefaultFormInput from "../../components/DefaultFormInput";
import DefaultBlueButton from "../../components/DefaultBlueButton";
import { useAuth } from "../../contexts/auth";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";

import { SendEmailSignUpTeacher } from "../../util/SendEmail";

export default function SignUpTeacher() {
  const { navigate, goBack } = useNavigation();
  const [loading, setLoading] = useState(false);

  const [newUser, setNewUser] = useState({
    email: "",
    siape: "",
    password: "",
    confirmPassword: "",
  });
  const [inputErros, setInputErros] = useState({
    errosEmail: null,
    errosPassword: null,
    errosConfirmPassword: null,
  });

  const { SignUpTeacher } = useAuth()

  async function InputValidation() {
    setLoading(true);
    let erros = { errosEmail: null, errosPassword: null, errosConfirmPassword: null };
    if (newUser.email.length < 10 || !validator.isEmail(newUser.email))
      erros.errosEmail = "E-mail inválido!";
    if (newUser.email.split("@")[1] === "ufc.br")
      erros.errosEmail = "E-mail precisa conter o dominio da Instituição '@ufc.br'!";
    
    if (newUser.password.length < 8)
      erros.errosPassword = "A senha precisa conter no mínimo 8 caracteres!";
    else if (!newUser.password.match(/[a-zA-Z]/g))
      erros.errosPassword = "A senha precisa conter pelo menos uma letra!";
    else if (!newUser.password.match(/\d/g))
      erros.errosPassword = "A senha precisa conter pelo menos um número!";
    if (newUser.password !== newUser.confirmPassword)
      erros.errosConfirmPassword = "As senhas devem ser iguais!";
    setInputErros(erros);

    if (!erros.errosEmail && !erros.errosPassword && !erros.errosConfirmPassword) {
      const response = await Register(newUser);
      if (response === null) {
        navigate("CheckCode", { register: true });
      } else {
        setInputErros({ ...inputErros, errosEmail: "Endereço de email já está em uso!" });
      }
    }
    setLoading(false);
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: 20,
            justifyContent: "center",
          }}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header com botão voltar e logo */}
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}>
            <MaterialIcons
              onPress={() => goBack()}
              color="#024284"
              size={24}
              name="arrow-back-ios"
            />
            <Center flex={1}>
              <Image
                alt="Logo AMO"
                source={require("../../assets/logo_lightblue.png")}
                style={{ width: 60, height: 60 }}
              />
            </Center>
          </View>

          {/* Título */}
          <Center>
            <Text
              marginBottom={20}
              fontWeight="bold"
              color="#024284"
              fontSize="md"
            >
              Cadastre-se
            </Text>
          </Center>

          {/* Formulário */}
          <VStack space={3}>
            <DefaultFormInput
              placeholder="E-mail institucional (@ufc.br)"
              autoCapitalize={"none"}
              value={newUser.email}
              setValue={(text) => setNewUser({ ...newUser, email: text })}
              color="#024284"
              error={inputErros.errosEmail}
            />
            <DefaultFormInput
              placeholder="SIAPE"
              autoCapitalize={"none"}
              value={newUser.siape}
              setValue={(text) => setNewUser({ ...newUser, email: text })}
              color="#024284"
              error={inputErros.errosEmail}
            />
            <DefaultFormInput
              type="password"
              placeholder="Senha"
              autoCapitalize={"none"}
              value={newUser.password}
              setValue={(text) => setNewUser({ ...newUser, password: text })}
              color="#024284"
              error={inputErros.errosPassword}
            />
            <DefaultFormInput
              type="password"
              placeholder="Confirmar senha"
              autoCapitalize={"none"}
              value={newUser.confirmPassword}
              setValue={(text) => setNewUser({ ...newUser, confirmPassword: text })}
              color="#024284"
              error={inputErros.errosConfirmPassword}
            />
             <Text style={styles.textInfo}>
              * A senha precisa ter no mínimo 8 caracteres.
            </Text>
            <Text style={styles.textInfo}>
              * A senha precisa ter letras e números.
            </Text>
            <Text>
              * A senha não pode ter espaçamento.
            </Text>
          </VStack>

          {/* Botões */}
          <VStack mt={5} alignItems="center">
            <DefaultBlueButton
              color={"#024284"}
              bgColor={"#2599BA"}
              loading={loading}
              onPress={InputValidation}
            >
              {loading ? <ActivityIndicator color="#024284" /> : "Avançar"}
            </DefaultBlueButton>

          </VStack>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
