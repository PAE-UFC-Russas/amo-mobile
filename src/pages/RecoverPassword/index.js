import React, { useState } from "react";
import { Center, Text, View, Image } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import DefaultBlueButton from "../../components/DefaultBlueButton";
import { useCustomToast } from "../../hooks/useCustomToast";
import DefaultFormInput from "../../components/DefaultFormInput";
import api from "../../services/api";
import { GetLoginToken } from "../../util/StorageLogin";
import styles from "./styles";

export default function RecoverPassword() {
  const { goBack } = useNavigation();
  const showToast = useCustomToast();
  const [loading, setLoading] = useState(false);
  const [senhaDados, setSenhaDados] = useState({
    senhaAtual: "",
    novaSenha: "",
    confirmarSenha: "",
  });
  const [statusSenha, setStatusSenha] = useState("");

  const handleCriateNewPassword = async () => {
    setLoading(true);
    try {
      if (
        senhaDados.senhaAtual.length === 0 ||
        senhaDados.novaSenha.length === 0 ||
        senhaDados.confirmarSenha.length === 0
      ) {
        showToast("Aviso", "Existem campos em branco!", "warning");
        setLoading(false);
      } else {
        const response = await api.post(
          "/usuario/eu/mudar/",
          {
            senha_velha: senhaDados.senhaAtual,
            senha_nova: senhaDados.novaSenha,
            confirma: senhaDados.confirmarSenha,
          },
          {
            headers: {
              Authorization: "Token " + (await GetLoginToken()),
            },
          }
        );
        if (response.data.sucesso.length > 0) {
          showToast("Successo", "Senha alterada com sucesso!", "success");
          goBack();
        }
      }
    } catch (error) {
      setStatusSenha(error.response.data.erro);
      showToast("Erro",error.response.data.erro, "error");
      setLoading(false);
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

      <Center width="5/6" gap={4}>
        <Text marginBottom={10} fontWeight="bold" color="#024284" fontSize="md">
          Crie uma nova senha
        </Text>
        <DefaultFormInput
          width="100%"
          height="100%"
          color={"#024284"}
          placeholder={"Senha atual"}
          value={senhaDados.senhaAtual}
          setValue={(text) =>
            setSenhaDados({ ...senhaDados, senhaAtual: text })
          }
        />
        <DefaultFormInput
          width="100%"
          height="100%"
          color={"#024284"}
          placeholder={"Nova senha"}
          value={senhaDados.novaSenha}
          setValue={(text) => setSenhaDados({ ...senhaDados, novaSenha: text })}
        />
        <DefaultFormInput
          width="100%"
          height="100%"
          color={"#024284"}
          placeholder={"Confirmar senha"}
          value={senhaDados.confirmarSenha}
          setValue={(text) =>
            setSenhaDados({ ...senhaDados, confirmarSenha: text })
          }
        />

        <Text fontWeight={200}>
          A senha precisa ter no mínimo 8 caracteres, contendo letras e números,
          sem espaçamento. Ex: 12zay78d
        </Text>
      </Center>
      <DefaultBlueButton
        bgColor={"#2599BA"}
        onPress={handleCriateNewPassword}
        disabled={loading}
      >
        {loading ? <ActivityIndicator /> : "Salvar"}
      </DefaultBlueButton>
    </Center>
  );
}
