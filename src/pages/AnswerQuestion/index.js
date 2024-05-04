import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import {
  Avatar,
  Text,
  Input,
  HStack,
  View,
  useToast,
  IconButton,
  InputGroup,
  Spinner,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import DateISOToFormated from "../../util/DateISOToFormated";
import { HasBadWords } from "../../util/HasBadWords";
import Comments from "../../components/Comments";
import ButtonGetNextValues from "../../components/ButtonGetNextValues";
import { GetLoginToken } from "../../util/StorageLogin";
import { useAuth } from "../../contexts/auth";
import { useSubject } from "../../contexts/subject";
import api from "../../services/api";
import styles from "./styles";

export default function AnswerQuestion({ route }) {
  const { goBack } = useNavigation();
  const [loading, setLoading] = useState(true);
  const [responses, setResponses] = useState([]);
  const [myResponse, setMyResponse] = useState("");
  const [doubt, setDoubt] = useState(route.params);
  const [markEnable, setMarkEnable] = useState(false);
  const [page, setPage] = useState(1);
  const { subject } = useSubject();
  const { user } = useAuth();
  const toast = useToast();

  const PostResponse = async () => {
    if (myResponse === "") {
      toast.show({
        title: "Campo responder não pode estar vazio",
        placement: "bottom",
      });
    }

    if (HasBadWords(myResponse)) {
      toast.show({
        title: "Palavras ofensivas não são permitidas!",
        placement: "bottom",
      });
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
      toast.show({
        title: "Resposta publicada com sucesso!",
        placement: "bottom",
      });
    } catch (error) {
      console.log(error.response.data);
    }
    setMyResponse("");
  };

  const GetResponses = async (next, reset) => {
    try {
      setLoading(true);
      let url = `/respostas/?duvida=${doubt.id}&page=${page}`;
      let results = [];

      if (next && responses.next) {
        url = `/respostas/?duvida=${doubt.id}&page=${
          responses.next ? responses.next.substring(-1) : page + 1
        }`;
        setPage(page + 1);
      }

      const response = await api.get(url, {
        headers: {
          Authorization: "Token " + (await GetLoginToken()),
        },
      });

      results = !responses.results
        ? response.data.results
        : [...responses.results, ...response.data.results];

      if (doubt.resposta_correta) {
        results.forEach(function (item, i) {
          if (item.id === doubt.resposta_correta) {
            results.splice(i, 1);
            results.unshift(item);
          }
        });
        if (reset) {
          setResponses(response.data);
          setPage(1);
        } else {
          setResponses({ ...response.data, results: results });
        }
      } else {
        if (next && responses.next && !reset) {
          setResponses({ ...response.data, results: results });
        } else {
          setResponses(response.data);
          setPage(1);
        }
      }
      setLoading(false);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const MarkResponse = async (id) => {
    try {
      if (id === doubt.resposta_correta) {
        await api.delete(`/duvidas/${doubt.id}/correta/`, {
          headers: {
            Authorization: "Token " + (await GetLoginToken()),
          },
          data: {
            id: id,
          },
        });
        setDoubt({ ...doubt, resposta_correta: null });
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
        setDoubt({ ...doubt, resposta_correta: id });
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    function EnableMark() {
      const isMonitor = subject.monitores.find(
        (obj) => obj.id == user.perfil.id
      )
        ? true
        : false;
      const isProfessor = subject.professores.find(
        (obj) => obj.id == user.perfil.id
      )
        ? true
        : false;

      if (isMonitor || isProfessor) {
        setMarkEnable(true);
      } else if (user.perfil.id === doubt.autor.id) {
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
    <View style={styles.container}>
      <HStack safeArea alignItems="center">
        <MaterialIcons
          onPress={() => goBack()}
          color="#024284"
          size={24}
          name="arrow-back-ios"
        />
        <Text style={styles.title}>Responder dúvida</Text>
      </HStack>
      <View marginTop={60} flex={1}>
        {loading ? (
          <Spinner marginTop="auto" marginBottom="auto" size="lg" />
        ) : (
          <>
            <View
              flexDirection={"row"}
              width={"100%"}
              justifyContent={"space-between"}
            >
              <View
                flexDirection={"row"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <View
                  style={{
                    borderBottomWidth: 2,
                    borderBottomColor: "#34689C",
                    width: 200,
                    position: "absolute",
                    bottom: 15,
                  }}
                />
                <Avatar
                  bg="tertiaryBlue"
                  size="lg"
                  source={{
                    uri: !doubt.autor.perfil.foto
                      ? "https://i.ibb.co/4f1jsPx/Splash-1.png"
                      : doubt.autor.perfil.foto,
                  }}
                />
                <View flexDirection={"row"} alignItems={"center"}>
                  <Text
                    style={{
                      fontSize: 16,
                      marginLeft: 5,
                      color: "#024284",
                      fontWeight: "600",
                    }}
                  >
                    {doubt.autor.perfil.nome_exibicao}
                  </Text>
                  <MaterialIcons
                    color="#024284"
                    size={14}
                    name="school"
                    marginLeft={3}
                  />
                </View>
              </View>
              <View alignItems={"center"} justifyContent={"center"}>
                <Text style={styles.textDate}>
                  {DateISOToFormated(doubt.data)}
                </Text>
              </View>
            </View>
            {/* <Text color={"#002B57"} marginLeft={"5%"}>
                           {office}
                        </Text> */}

            <View marginTop={8}>
              <Text fontSize={16} fontWeight="bold">
                {doubt.titulo}
              </Text>
              <View>
                <Text style={styles.textDoubt}>{doubt.descricao}</Text>
              </View>
            </View>

            <View>
              <InputGroup
                width="100%"
                borderColor="#34689C"
                borderWidth={2}
                borderRadius={10}
              >
                <Input
                  variant={"outline"}
                  borderRadius={10}
                  width={"85%"}
                  borderWidth={0}
                  color={"#524F4F"}
                  placeholder="Comentar"
                  value={myResponse}
                  onChangeText={(text) => setMyResponse(text)}
                />
                <IconButton
                  icon={<MaterialIcons name="send" size={24} color="#34689C" />}
                  onPress={PostResponse}
                />
              </InputGroup>
            </View>
            <FlatList
              style={{ height: "68%" }}
              data={responses.results}
              keyExtractor={(comment) => comment.id}
              renderItem={(comment) => (
                <Comments
                  comment={comment.item}
                  correctResponse={doubt.resposta_correta}
                  MarkResponse={MarkResponse}
                  enableMark={markEnable}
                  subject={subject}
                  GetResponses={GetResponses}
                />
              )}
              ListFooterComponent={
                responses.next && (
                  <ButtonGetNextValues
                    label="respostas"
                    onPress={GetResponses}
                  />
                )
              }
            />
          </>
        )}
      </View>
    </View>
  );
}
