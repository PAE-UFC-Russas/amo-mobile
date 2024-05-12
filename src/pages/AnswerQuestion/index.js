import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import {
   Avatar,
   Text,
   Input,
   HStack,
   View,
   useToast,
   Spinner,
   Button,
   Skeleton,
   VStack,
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
   const toast = useToast();

   const PostResponse = async () => {
      setLoading(true);
      if (myResponse === "") {
         showToast("Atenção", "Existem campos vazios!", "warning");
      }

      if (HasBadWords(myResponse)) {
         setLoading(false);
         showToast(
            "Atenção",
            "Palavras ofensivas não são permitidas!",
            "warning"
         );
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

         const nextPage = responses.next
            ? responses.next.substring(-1)
            : page + 1;
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
         const isMonitor =
            subject.monitores.filter((obj) => obj.id == user.perfil.id).length >
            0
               ? true
               : false;
         const isProfessor =
            subject.professores.filter((obj) => obj.id == user.perfil.id)
               .length > 0
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
                           {doubt.autor.perfil.nome_exibicao.split(" ")[0]}{" "}
                           {doubt.autor.perfil.nome_exibicao.split(" ")[1]}
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

               <View padding={2} marginTop={2}>
                  <Text fontSize={19} fontWeight="bold" marginBottom={4}>
                     {doubt.titulo}
                  </Text>
                  <View>
                     <Text style={styles.textDoubt}>{doubt.descricao}</Text>
                  </View>
               </View>
               <Input
                  variant="outline"
                  width={"100%"}
                  color={"#524F4F"}
                  placeholder="Comentar"
                  value={myResponse}
                  onChangeText={(text) => setMyResponse(text)}
               />
               <Button
                  marginTop={2}
                  bgColor="#307DF1"
                  onPress={PostResponse}
                  flexDirection="row"
                  disabled={loading}
               >
                  {loading ? <Spinner size="sm" color="#fff" /> : "Enviar"}
               </Button>
               {loading ? (
                  <VStack space={4} marginTop={4}>
                     <Skeleton.Text px="4" />
                     <Skeleton.Text px="4" />
                     <Skeleton.Text px="4" />
                  </VStack>
               ) : (
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
               )}
            </>
         </View>
      </View>
   );
}
