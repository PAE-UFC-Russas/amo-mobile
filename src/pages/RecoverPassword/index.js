import React, { useState } from "react";
import { Center, Text, View } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { ActivityIndicator } from "react-native";
import AuthHeader from "../../components/AuthHeader";
import DefaultBlueButton from "../../components/DefaultBlueButton";

import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import DefaultFormInput from "../../components/DefaultFormInput";
import api from "../../services/api";
import { GetLoginToken } from "../../util/StorageLogin";

export default function RecoverPassword() {
   const { navigate, goBack } = useNavigation();
   const [loading, setLoading] = useState(false);
   const [inputErros, setInputErros] = useState({
      errosEmail: null,
   });

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
            setStatusSenha("Existem campos em branco!");
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

            if (response.data.erro === "senha atual incorreta") {
               setStatusSenha("senha atual incorreta!");
               setLoading(false);
            } else if (
               response.data.sucesso === "senha alterada com sucesso!"
            ) {
               setLoading(false);
               setStatusSenha("senha alterada com sucesso!");
            } else if (response.data.erro === "senhas não coincidem") {
               setLoading(false);
               setStatusSenha("senhas não coincidem!");
            }
         }
      } catch (error) {
         console.error("Erro ao mudar a senha:", error);
         setLoading(false);
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
            <Text style={{ color: "#52D6FB" }}>{statusSenha}</Text>
            <Text color={"grey"} fontSize={12.5}>
               A senha precisa ter no mínimo 8 caracteres, contendo letras e
               números, sem espaçamento. Ex: 12zay78d
            </Text>
         </Center>

         <DefaultBlueButton onPress={handleCriateNewPassword}>
            {loading ? <ActivityIndicator /> : "Salvar"}
         </DefaultBlueButton>
      </Center>
   );
}
