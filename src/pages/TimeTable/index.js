import React, { useEffect, useState } from "react";
import { View, Text, HStack, IconButton, FlatList } from "native-base";
import { ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { useAuth } from "../../contexts/auth";
import { GetLoginToken } from "../../util/StorageLogin.js";
import { useSubject } from "../../contexts/subject.js";
import DefaultStagger from "../../components/DefaultStagger";
import ModalMonitoringInfo from "../../components/ModalMonitoringInfo/index.js";
import MonitoringCardInformation from "../../components/MonitoringCardInformation/index.js";
import { useCustomToast } from "../../hooks/useCustomToast";
import styles from "./styles.js";
import api from "../../services/api.js";

const getEndTime = () => {
   const date = new Date();
   date.setHours(date.getHours() + 1);
   return date;
};

export default function TimeTable() {
   const { course, subject } = useSubject();
   const { goBack } = useNavigation();
   const { user } = useAuth();
   const showToast = useCustomToast();
   const [monitorings, setMonitorings] = useState([]);
   const [showModal, setShowModal] = useState({ open: false, id: null });
   const [loading, setLoading] = useState(false);
   const [info, setInfo] = useState({
      hora_inicio: new Date(),
      hora_fim: getEndTime(),
      local: "",
      dia_semana: "0",
      monitor: null,
   });

   async function getInformations() {
      try {
         setLoading(true);
         const response = await api.get("/monitorias", {
            headers: {
               Authorization: "Token " + (await GetLoginToken()),
            },
         });
         setInfo({
            hora_inicio: new Date(),
            hora_fim: getEndTime(),
            local: "",
            dia_semana: "0",
            monitor: null,
         });
         const sortedMonitorings = response.data.results.sort((a, b) => {
            if (a.professor === a.monitor && b.professor !== b.monitor) {
               return -1; // a deve vir antes de b
            } else if (a.professor !== a.monitor && b.professor === b.monitor) {
               return 1; // b deve vir antes de a
            } else {
               return 0; // manter a ordem original
            }
         });
         setMonitorings(sortedMonitorings);
      } catch (error) {
         console.log("error: ", error);
      }
      setLoading(false);
   }

   const handleSave = async (id = null) => {
      setLoading(true);
      try {
         const data = {
            ...info,
            disciplina: subject.id,
            hora_inicio: new Date(info.hora_inicio).toLocaleTimeString(
               "en-US",
               {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
               }
            ),
            hora_fim: new Date(info.hora_fim).toLocaleTimeString("en-US", {
               hour: "2-digit",
               minute: "2-digit",
               hour12: false,
            }),
            professor: subject.professores[0].id,
         };
         if (id) {
            await api.put(`/monitorias/${id}/`, data, {
               headers: {
                  Authorization: "Token " + (await GetLoginToken()),
               },
            });
         } else {
            await api.post("/monitorias/", data, {
               headers: {
                  Authorization: "Token " + (await GetLoginToken()),
               },
            });
         }

         showToast("Sucesso", "Quadro adicionado com sucesso!", "success");
         setShowModal({ open: false, id: null });
         getInformations();
      } catch (error) {
         showToast(
            "Erro",
            "Não foi possível adicionar, tente novamente mais tarde!",
            "error"
         );
         console.log("error: ", error, error?.response?.data);
      }
      setLoading(false);
   };

   const handleDelete = async (id = null) => {
      setLoading(true);
      try {
         await api.delete(`/monitorias/${id}/`, {
            headers: {
               Authorization: "Token " + (await GetLoginToken()),
            },
         });
         showToast("Sucesso", "Quadro deletado com sucesso!", "success");
         setShowModal({ open: false, id: null });
         getInformations();
      } catch (error) {
         showToast(
            "Erro",
            "Não foi possível deletar, tente novamente mais tarde!",
            "error"
         );
         console.log("error: ", error, error.response.data);
      }
   };

   useEffect(() => {
      getInformations();
   }, []);

   return (
      <View style={styles.container}>
         <HStack
            justifyContent="space-evenly"
            width="80%"
            safeArea
            paddingTop={10}
            alignItems="Center"
         >
            <MaterialIcons
               onPress={() => {
                  goBack();
               }}
               color="#024284"
               size={24}
               name="arrow-back-ios"
            />
            <Text style={styles.title}>Quadro de horarios</Text>
         </HStack>
         {loading ? (
            <ActivityIndicator size="large" color="#024284" />
         ) : (
            <>
               <FlatList
                  data={monitorings}
                  renderItem={(monitoring) => (
                     <MonitoringCardInformation
                        monitoring={{ ...monitoring.item, course }}
                        setOpenModal={setShowModal}
                     />
                  )}
               />
               {user?.perfil?.cargos?.includes("monitor") && (
                  <DefaultStagger>
                     <IconButton
                        style={{
                           shadowColor: "#000",
                           shadowOffset: {
                              width: 10,
                              height: 10,
                           },
                           shadowOpacity: 4,
                           shadowRadius: 3.84,
                           elevation: 5,
                        }}
                        variant="solid"
                        borderRadius="full"
                        bgColor="#024284"
                        marginY={12}
                        icon={
                           <MaterialIcons
                              color="#fff"
                              size={33}
                              name="add-circle-outline"
                           />
                        }
                        onPress={() => setShowModal({ open: true, id: null })}
                     />
                  </DefaultStagger>
               )}
               <ModalMonitoringInfo
                  modalInfos={showModal}
                  setOpenModal={setShowModal}
                  info={info}
                  setInfo={setInfo}
                  handleDelete={handleDelete}
                  handleSave={handleSave}
               />
            </>
         )}
      </View>
   );
}
