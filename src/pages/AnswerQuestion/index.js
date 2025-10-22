import React, { useEffect, useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  View,
} from "react-native";
import {
  Avatar,
  Text,
  Input,
  HStack,
  Button,
  Spinner,
  VStack,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import DateISOToFormated from "../../util/DateISOToFormated";
import Comments from "../../components/Comments";
import ButtonGetNextValues from "../../components/ButtonGetNextValues";
import { HasBadWords } from "../../util/HasBadWords";
import { GetLoginToken } from "../../util/StorageLogin";
import { useAuth } from "../../contexts/auth";
import { useSubject } from "../../contexts/subject";
import { useCustomToast } from "../../hooks/useCustomToast";
import api from "../../services/api";
import styles from "./styles";

export default function AnswerQuestion({ route }) {
  const { goBack } = useNavigation();
  const showToast = useCustomToast();
  const [loading, setLoading] = useState(true);
  const [responses, setResponses] = useState([]);
  const [myResponse, setMyResponse] = useState("");
  const [doubt, setDoubt] = useState(route.params);
  const [markEnable, setMarkEnable] = useState(false);
  const [page, setPage] = useState(1);
  const { subject } = useSubject();
  const { user } = useAuth();

  const PostResponse = async () => {
    setLoading(true);
    if (myResponse === "") {
      showToast("Atenção", "Existem campos vazios!", "warning");
    }

    if (HasBadWords(myResponse)) {
      setLoading(false);
      showToast("Atenção", "Palavras ofensivas não são permitidas!", "warning");
      return;
    }

    try {
      await api.post(
        "/respostas/",
        {
          duvida: doubt.id,
          resposta: myResponse,
        },
        {
          headers: {
            Authorization: "Token " + (await GetLoginToken()),
          },
        }
      );

      GetResponses();

      showToast("Sucesso", "Resposta publicada com sucesso!", "success");
    } catch (error) {
      console.log(error.response.data);
    } finally {
      setLoading(false);
    }
    setMyResponse("");
  };

  const GetResponses = async (next, reset) => {
    try {
      setLoading(true);

      const nextPage = responses.next ? responses.next.substring(-1) : page + 1;
      const url = `/respostas/?duvida=${doubt.id}&page=${
        next && responses.next ? nextPage : page
      }`;

      const response = await api.get(url, {
        headers: {
          Authorization: "Token " + (await GetLoginToken()),
        },
      });

      let results = response.data.results;

      if (doubt.resposta_correta) {
        const correctAnswerIndex = results.findIndex(
          (item) => item.id === doubt.resposta_correta
        );
        if (correctAnswerIndex !== -1) {
          const [correctAnswer] = results.splice(correctAnswerIndex, 1);
          results.unshift(correctAnswer);
        }
      }

      setResponses({
        ...response.data,
        results: results,
      });

      if (!next || !responses.next || reset) {
        setPage(1);
      } else {
        setPage(page + 1);
      }

      setLoading(false);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const MarkResponse = async (id) => {
    try {
      if (Array.isArray(doubt.resposta_correta) && doubt.resposta_correta.includes(id)) {
        await api.delete(`/duvidas/${doubt.id}/correta/`, {
          headers: {
            Authorization: "Token " + (await GetLoginToken()),
          },
          data: {
            id: id,
          },
        });
        const novasRespostas = doubt.resposta_correta.filter(item => item != id)
        setDoubt({ ...doubt, resposta_correta: novasRespostas });

      } else {
        await api.post(
          `/duvidas/${doubt.id}/correta/`,
          {
            id: id,
          },
          {
            headers: {
              Authorization: "Token " + (await GetLoginToken()),
            },
          }
        );
        const novasRespostas = Array.isArray(doubt.resposta_correta)
        ? [...doubt.resposta_correta, id]
        : [id];
      setDoubt({ ...doubt, resposta_correta: novasRespostas });
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    function EnableMark() {
      const isMonitor =
        subject.monitores.filter((obj) => obj.id == user.perfil.id).length > 0
          ? true
          : false;
      const isProfessor =
        subject.professores.filter((obj) => obj.id == user.perfil.id).length > 0
          ? true
          : false;

      if (isMonitor || isProfessor) {
        setMarkEnable(true);
      } else {
        setMarkEnable(false);
      }
    }

    EnableMark();

    if (responses.length < 1) {
      GetResponses();
    }
  }, []);

  return (
<KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#fff" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      {/* Cabeçalho */}
      <HStack safeArea alignItems="center" paddingX={3} paddingY={2}>
        <MaterialIcons
          onPress={() => goBack()}
          color="#024284"
          size={24}
          name="arrow-back-ios"
        />
        <Text style={styles.title}>Responder dúvida</Text>
      </HStack>

      {/* Conteúdo da tela */}
      <View style={{ flex: 1 }}>
        <FlatList
          data={responses.results}
          keyExtractor={(comment) => comment.id.toString()}
          ListHeaderComponent={
            <>
              <View paddingX={4} paddingBottom={4}>
                <View
                  style={{
                    borderRadius: 10,
                    paddingHorizontal: 12, // espaço lateral extra
                    paddingVertical: 10,
                    backgroundColor: "#fdfdfdff",
                  }}
                >
                  {/* Autor e Data */}
                  <HStack
                    justifyContent="space-between"
                    alignItems="center"
                    marginBottom={3}
                  >
                    <HStack alignItems="center">
                      <Avatar
                        bg="tertiaryBlue"
                        size="lg"
                        source={{
                          uri:
                            doubt.autor.perfil.foto ||
                            "https://i.ibb.co/4f1jsPx/Splash-1.png",
                        }}
                      />
                      <View style={{ marginLeft: 10 }}>
                        <Text
                          style={{
                            fontSize: 16,
                            color: "#024284",
                            fontWeight: "600",
                          }}
                        >
                          {doubt.autor.perfil.nome_exibicao}
                        </Text>
                        <HStack alignItems="center">
                          <MaterialIcons
                            color="#024284"
                            size={14}
                            name="school"
                          />
                          <Text fontSize={12} color="#024284" marginLeft={1}>
                            {DateISOToFormated(doubt.data)}
                          </Text>
                        </HStack>
                      </View>
                    </HStack>
                  </HStack>

                  {/* Título e descrição da dúvida */}
                  <Text fontSize={19} fontWeight="bold" marginBottom={2}>
                    {doubt.titulo}
                  </Text>
                  <Text fontSize={15} color="#333">
                    {doubt.descricao}
                  </Text>
                </View>

                {/* Divisor visual */}
                <View
                  style={{
                    height: 1,
                    backgroundColor: "#ccc",
                    width: "100%",
                    marginVertical: 8,
                  }}
                />

                <Text
                  paddingX={4}
                  style={{
                    fontWeight: "bold",
                    fontSize: 16,
                    color: "#024284",
                    marginBottom: 4,
                  }}
                >
                  Respostas:
                </Text>
              </View>
            </>
          }
          renderItem={({ item }) => (
            <Comments
              comment={item}
              correctResponse={doubt.resposta_correta ?? []}
              MarkResponse={MarkResponse}
              enableMark={markEnable}
              subject={subject}
              GetResponses={GetResponses}
            />
          )}
          ListFooterComponent={
            loading ? (
              <VStack space={4} marginTop={4}>
                <Spinner color="#024284" />
              </VStack>
            ) : (
              responses.next && (
                <ButtonGetNextValues
                  label="respostas"
                  onPress={GetResponses}
                />
              )
            )
          }
        />
      </View>

      {/* === Campo de comentário fixo tipo Instagram === */}
      <HStack
        alignItems="center"
        padding={2}
        borderTopWidth={1}
        borderColor="#ccc"
        bg="white"
      >
        <Avatar
          size="sm"
          bg="tertiaryBlue"
          source={{
            uri: user.perfil.foto || "https://i.ibb.co/4f1jsPx/Splash-1.png",
          }}
        />
        <Input
          flex={1}
          ml={2}
          placeholder="Responda algo..."
          value={myResponse}
          onChangeText={setMyResponse}
          autoFocus
          onSubmitEditing={PostResponse}
          returnKeyType="send"
        />
        <Button ml={2} bg="#307DF1" onPress={PostResponse} disabled={loading}>
          {loading ? <Spinner size="sm" color="#fff" /> : "Enviar"}
        </Button>
      </HStack>
    </KeyboardAvoidingView>
  );
}
