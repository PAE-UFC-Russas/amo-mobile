import React, { useState } from "react";
import { Center, VStack, Text, Spinner } from "native-base";
import { useNavigation } from "@react-navigation/native";
import AuthHeader from "../../components/AuthHeader";
import DefaultBlueButton from "../../components/DefaultBlueButton";
import DefaultFormInput from "../../components/DefaultFormInput";
import { useCustomToast } from "../../hooks/useCustomToast";
import styles from "./styles";
import api from "../../services/api";

export default function ChangePassword(route) {
  const { navigate } = useNavigation();
  const [passwords, setNewPasswords] = useState({
    password: "",
    confirmPassword: "",
  });
  const [inputErros, setInputErros] = useState({
    errosPassword: null,
    errosConfirmPassword: null,
  });
  const [loading, setLoading] = useState(false);
  const showToast = useCustomToast();

  const InputValidation = async () => {
    setLoading(true);
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
        await api.post("/usuario/redefinir-senha/", {
          senha: passwords.password,
        });
        navigate("SignIn");
        showToast(
          "Sucesso",
          "Sua senha foi redefinida com sucesso!",
          "success"
        );
      } catch (error) {
        console.log(route.params);
        setInputErros({
          errosPassword: null,
          errosConfirmPassword: "Erro ao alterar a senha, tente novamente!",
        });
      }
    }
    setLoading(false);
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
            color="#024284"
            error={inputErros.errosPassword}
          />
          <DefaultFormInput
            type="password"
            placeholder="Cofirmar senha"
            color="#024284"
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
      <DefaultBlueButton onPress={InputValidation}>
        {loading ? <Spinner size="sm" color="#ffffff" /> : "Salvar"}
      </DefaultBlueButton>
    </Center>
  );
}
