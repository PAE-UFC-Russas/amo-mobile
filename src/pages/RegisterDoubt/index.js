import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
  StatusBar,
} from "react-native";
import {
  Box,
  Button,
  Text,
  Input,
  TextArea,
  VStack,
  HStack,
  Spinner,
  Center,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSubject } from "../../contexts/subject";
import { GetLoginToken } from "../../util/StorageLogin";
import { HasBadWords } from "../../util/HasBadWords";
import { useCustomToast } from "../../hooks/useCustomToast";
import api from "../../services/api";

export default function RegisterDoubt() {
  const { goBack } = useNavigation();
  const { subject } = useSubject();
  const showToast = useCustomToast();

  const [question, setQuestion] = useState({ titulo: "", descricao: "" });
  const [loading, setLoading] = useState(false);

  async function PostQuestion() {
    if (!question.titulo.trim() || !question.descricao.trim()) {
      showToast("Atenção", "Título e descrição obrigatórios!", "warning");
      return;
    }

    if (HasBadWords(question.titulo, question.descricao)) {
      showToast("Atenção", "Palavras ofensivas não são permitidas!", "warning");
      return;
    }

    setLoading(true);
    try {
      await api.post(
        "/duvidas/",
        {
          titulo: question.titulo.trim(),
          descricao: question.descricao.trim(),
          disciplina: subject.id,
        },
        {
          headers: {
            Authorization: "Token " + (await GetLoginToken()),
          },
        }
      );
      showToast("Sucesso", "Dúvida publicada com sucesso!", "success");
      goBack();
    } catch (err) {
      console.log("PostQuestion error:", err?.response?.data ?? err);
      showToast("Erro", "Erro ao publicar dúvida!", "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              paddingHorizontal: 20,
              paddingBottom: 40,
            }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {/* Header */}
            <HStack
              alignItems="center"
              justifyContent="space-between"
              mb={6}
              mt={2}
            >
              <MaterialIcons
                onPress={goBack}
                color="#024284"
                size={28}
                name="arrow-back-ios"
              />
              <Text
                fontSize="lg"
                fontWeight="bold"
                color="#024284"
                textAlign="center"
                flex={1}
              >
                Descreva sua dúvida
              </Text>
              <Box width={26} />
            </HStack>

            {/* Formulário */}
            <Center>
              <Box w="100%" borderRadius={14} p={2}>
                <VStack space={5}>
                  {/* Campo título */}
                  <Box>
                    <Text
                      fontSize="md"
                      fontWeight="bold"
                      color="#024284"
                      mb={2}
                    >
                      Título da dúvida
                    </Text>
                    <Input
                      placeholder="Título curto e objetivo (ex: Equação do 2º grau)"
                      placeholderTextColor="#9bb0cc"
                      value={question.titulo}
                      onChangeText={(text) =>
                        setQuestion((prev) => ({ ...prev, titulo: text }))
                      }
                      borderRadius={10}
                      borderColor="#99B3CD"
                      borderWidth={1}
                      color="#024284"
                      maxLength={150}
                      fontSize={15}
                    />
                    <Text fontSize="xs" color="gray.600" mt={1}>
                      Use palavras-chave para facilitar buscas (máx. 150
                      caracteres).
                    </Text>
                  </Box>

                  {/* Campo descrição */}
                  <Box>
                    <Text
                      fontSize="md"
                      fontWeight="bold"
                      color="#024284"
                      mb={2}
                    >
                      Descrição detalhada
                    </Text>
                    <TextArea
                      value={question.descricao}
                      onChangeText={(text) =>
                        setQuestion((prev) => ({ ...prev, descricao: text }))
                      }
                      placeholder="Explique sua dúvida com o máximo de detalhes possível..."
                      placeholderTextColor="#9bb0cc"
                      borderRadius={10}
                      borderColor="#99B3CD"
                      borderWidth={1}
                      color="#024284"
                      h={160}
                      maxLength={500}
                      fontSize={15}
                      textAlignVertical="top"
                    />
                    <HStack justifyContent="space-between" mt={1}>
                      <Text fontSize="xs" color="gray.600">
                        Máx. 500 caracteres
                      </Text>
                      <Text fontSize="xs" color="gray.600">
                        {question.descricao.length}/500
                      </Text>
                    </HStack>
                  </Box>

                  {/* Botão */}
                  <HStack justifyContent="flex-end" mt={2}>
                    <Button
                      onPress={PostQuestion}
                      bg="#307DF1"
                      borderRadius={10}
                      isDisabled={loading}
                      leftIcon={
                        loading ? (
                          <Spinner color="#fff" size="sm" />
                        ) : (
                          <MaterialIcons name="send" color="#fff" size={18} />
                        )
                      }
                    >
                      <Text color="#fff" fontWeight="bold">
                        {loading ? "Enviando..." : "Publicar dúvida"}
                      </Text>
                    </Button>
                  </HStack>
                </VStack>
              </Box>
            </Center>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
