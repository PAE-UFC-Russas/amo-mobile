import React, { useState } from "react";
import { Center, VStack, Text } from "native-base";
import AuthHeader from "../../components/AuthHeader";
import DefaultBlueButton from "../../components/DefaultBlueButton";
import DefaultFormInput from "../../components/DefaultFormInput";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import api from "../../services/api";

export default function ChangePassword() {
  const { navigate } = useNavigation();
  const [passwords, setNewPasswords] = useState({
    password: "",
    confirmPassword: "",
  });
  const [inputErros, setInputErros] = useState({
    errosPassword: null,
    errosConfirmPassword: null,
  });

  const InputValidation = async () => {
    let erros = {
      errosPassword: null,
      errosConfirmPassword: null,
    };

    if (passwords.password.length < 8)
      erros.errosPassword = "A senha precisa conter 8 caracteres!";
    else if (!passwords.password.match(/[a-zA-Z]/g))
      erros.errosPassword = "A senha precisa conter pelo menos uma letra!";
    else if (!passwords.password.match(/\d/g))
      erros.errosPassword = "A senha precisa conter pelo menos um número!";
    if (passwords.password !== passwords.confirmPassword)
      erros.errosConfirmPassword = "As senhas devem ser iguais!";
    setInputErros(erros);
    if (!erros.errosPassword && !erros.errosConfirmPassword) {
      try {
        api.post("/redefinir-senha/", {
          activeToken,
          password: passwords.password,
          confirmPassword: passwords.confirmPassword,
        });
        navigate("SignIn");
      } catch (error) {
        setInputErros({
          errosPassword: null,
          errosConfirmPassword: "Erro ao alterar a senha, tente novamente!",
        });
      }
    }

    return null;
  };

  return (
    <Center style={styles.container} bgColor="#fff">
      <Center width="5/6">
        <AuthHeader>Crie uma nova senha</AuthHeader>
        <VStack width="full" space={3}>
          <DefaultFormInput
            type="password"
            placeholder="Senha"
            value={passwords.password}
            setValue={(text) =>
              setNewPasswords({ ...passwords, password: text })
            }
            color="tertiaryBlue"
            error={inputErros.errosPassword}
          />
          <DefaultFormInput
            type="password"
            placeholder="Cofirmar senha"
            color="tertiaryBlue"
            value={passwords.confirmPassword}
            setValue={(text) =>
              setNewPasswords({ ...passwords, confirmPassword: text })
            }
            error={inputErros.errosConfirmPassword}
          />
          <Text style={styles.textInfo}>
            A senha precisa ter no mínimo 8 caracteres, contendo letras e
            números sem espaçamento. Ex: 12zay78d
          </Text>
        </VStack>
      </Center>
      <DefaultBlueButton onPress={InputValidation}>Salvar</DefaultBlueButton>
    </Center>
  );
}
