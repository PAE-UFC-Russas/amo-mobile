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
   Spinner,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import DateISOToFormated from "../../util/DateISOToFormated";
import Comments from "../../components/Comments";
import ButtonGetNextValues from "../../components/ButtonGetNextValues";
import { GetLoginToken } from "../../util/StorageLogin";
import { useAuth } from "../../contexts/auth";
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
   const { user } = useAuth();
   const toast = useToast();

   const PostResponse = async () => {
      try {
         await api.post(
            "/respostas/",
            {
               duvida: doubt.id,
               resposta: myResponse
            },
            {
               headers: {
                  Authorization: "Token " + (await GetLoginToken()),
               },
            }
         );

         //setResponses([...responses, {autor: user, duvida: doubt.id, id: responses.results[responses.results.length-1].id+1, resposta: myResponse, data: new Date().toISOString()}])
         GetResponses()
         toast.show({
            title: "Resposta publicada com sucesso!",
            placement: "bottom",
         });

      } catch (error) {
         console.log(error.response.data);
      }
      setMyResponse("");
   };

   const GetResponses = async (next) => {
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
            setResponses({ ...response.data, results: results });
         } else {
            if (next && responses.next) {
               setResponses({ ...response.data, results: results });
            } else {
               setResponses(response.data);
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
      const EnableMark = async () => {
         try {
            const response = await api.get(
               `/disciplinas/${doubt.disciplina}/`,
               {
                  headers: {
                     Authorization: "Token " + (await GetLoginToken()),
                  },
               }
            );

            const isMonitor = response.data.monitores.find(
               (obj) => obj.id == user.perfil.id
            )
               ? true
               : false;
            const isProfessor = response.data.professores.find(
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
         } catch (error) {
            console.log(error.response.data);
         }
      };

      EnableMark();
      
      if(responses.length < 1){
         GetResponses();
      }
   }, []);

   return (
      <View style={styles.container}>
         <HStack safeArea alignItems="center" >
            <MaterialIcons
               onPress={() => goBack()}
               color="#52D6FB"
               size={24}
               name="arrow-back-ios"
            />
            <Text style={styles.title}>Responder dúvida</Text>
         </HStack>
         <View>
            <HStack>
               <Avatar
                  bg="tertiaryBlue"
                  size="lg"
                  source={{
                     uri: !doubt.autor.perfil.foto
                        ? "https://i.ibb.co/4f1jsPx/Splash-1.png"
                        : doubt.autor.perfil.foto,
                  }}
               />
               <View
                  style={{ justifyContent: "center", alignItems: "flex-start" }}
               >
                  <Text
                     style={{
                        fontSize: 20,
                        marginLeft: "3%",
                        fontWeight: "bold",
                     }}
                  >
                     {doubt.autor.perfil.nome_exibicao}
                  </Text>
                  <Text marginLeft={"5%"}>{doubt.autor.cargos[0]}</Text>
               </View>
            </HStack>
            <View
               marginBottom={3}
               marginTop={3}
               style={{ justifyContent: "space-between" }}
            >
               <Text fontSize={15} fontWeight="bold">
                  {doubt.titulo}
               </Text>
               <View>
                  <Text style={styles.textDoubt}>{doubt.descricao}</Text>
                  <Text style={styles.textDate}>
                     {DateISOToFormated(doubt.data)}
                  </Text>
               </View>
            </View>
            <HStack marginBottom={2} justifyContent={"space-between"}>
               <Input
                  width="80%"
                  placeholder="Comentar"
                  value={myResponse}
                  onChangeText={text => setMyResponse(text)}
               />
               <IconButton
                  onPress={PostResponse}
                  icon={<MaterialIcons name="send" size={24} color="#52D6FB" />}
               />
            </HStack>
            {loading ? (
               <Spinner marginTop="auto" marginBottom="auto" size="lg" />
            ) : (
               <FlatList
                  style={{ height: "58%" }}
                  data={responses.results}
                  keyExtractor={(comment) => comment.id}
                  renderItem={(comment) => (
                     <Comments
                        comment={comment.item}
                        correctResponse={doubt.resposta_correta}
                        MarkResponse={MarkResponse}
                        enableMark={markEnable}
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
         </View>
      </View>
   );
}
