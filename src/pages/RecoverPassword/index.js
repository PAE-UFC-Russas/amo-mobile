import React, { useState } from "react";
import { Center, Text, useToast } from "native-base";
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
   const { goBack } = useNavigation();
   const toast = useToast();
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
            setStatusSenha("Existem campos em branco!");
            setLoading(false)
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
               toast.show({
                  title: "Senha alterada com sucesso!",
                  placement: "bottom",
               });
               goBack()
            } 
         }
      } catch (error) {
         console.error(error.response.data.erro);
         setStatusSenha(error.response.data.erro);
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
            />
            <DefaultFormInput
               width="100%"
               height="100%"
               color={"#52D6FB"}
               placeholder={"Nova senha"}
               value={senhaDados.novaSenha}
               setValue={(text) =>
                  setSenhaDados({ ...senhaDados, novaSenha: text })
               }
            />
            <DefaultFormInput
               width="100%"
               height="100%"
               color={"#52D6FB"}
               placeholder={"Confirmar senha"}
               value={senhaDados.confirmarSenha}
               setValue={(text) =>
                  setSenhaDados({ ...senhaDados, confirmarSenha: text })
               }
            />
            <Text style={{ color: "red" }}>{statusSenha}</Text>
            <Text fontWeight={200}>
               A senha precisa ter no mínimo 8 caracteres, contendo letras e
               números, sem espaçamento. Ex: 12zay78d
            </Text>
         </Center>
         <DefaultBlueButton onPress={handleCriateNewPassword} disabled={loading}>
            {loading ? <ActivityIndicator /> : "Salvar"}
         </DefaultBlueButton>
      </Center>
   );
}
