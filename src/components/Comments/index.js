import React, { useState } from "react";
import { Avatar, Text, View, ScrollView, HStack, useToast } from "native-base";
import { AntDesign } from "@expo/vector-icons";
import ConfirmDeleteModal from "../ConfirmDeleteModal";
import ReportQuest from "../ReportQuest";
import DotsMenu from "../DotsMenu";
import { GetLoginToken } from "../../util/StorageLogin";
import api from "../../services/api";
import DateISOToFormated from "../../util/DateISOToFormated";

export default function Comments({
   comment,
   MarkResponse,
   correctResponse,
   enableMark,
   subject,
   GetResponses,
}) {
   const [confirmDelete, setConfirmDelete] = useState({
      id: null,
      open: false,
   });
   const [confirmReport, setConfirmReport] = useState({
      id: null,
      open: false,
   });
   const toast = useToast();
   const isMonitor =
      subject && subject.monitores.some((obj) => obj.id === comment.autor.id);

   const isProfessor = !subject
      ? false
         ? true
         : false
      : subject.professores.find((obj) => obj.id == comment.autor.id);

   const handleDeleteResponse = async () => {
      try {
         await api.delete(`/respostas/${comment.id}/`, {
            headers: {
               Authorization: "Token " + (await GetLoginToken()),
            },
         });
         setConfirmDelete({ open: false, id: null });
         toast.show({
            title: "Resposta deletada com sucesso!",
            placement: "bottom",
         });
         GetResponses(1, true);
      } catch (error) {
         console.log(error);
      }
   };

   const handleReportQuestion = async () => {
      try {
         // await api.delete(`/duvidas/${confirmDeleteQuest.id}/`, {
         //    headers: {
         //       Authorization: "Token " + (await GetLoginToken()),
         //    },
         // });
         setConfirmReport({ open: false, id: null });
         toast.show({
            title: "Dúvida reportada com sucesso!",
            placement: "bottom",
         });
      } catch (error) {
         console.log(error.response);
      }
   };

   return (
      <ScrollView
         backgroundColor={isMonitor || isProfessor ? "#C1F1C6" : "#E5EBF2"}
         padding="3%"
         margin={2}
         borderRadius={10}
         borderWidth={correctResponse === comment.id ? 1 : 0}
         borderColor={correctResponse === comment.id ? "#C1F1C6" : ""}
      >
         <View
            style={{
               flexDirection: "row",
               justifyContent: "space-between",
               marginBottom: 2,
            }}
         >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
               <Avatar
                  bg="tertiaryBlue"
                  size="md"
                  source={{
                     uri: !comment.autor.perfil.foto
                        ? "https://i.ibb.co/4f1jsPx/Splash-1.png"
                        : comment.autor.perfil.foto,
                  }}
               />
               <Text marginLeft={3} fontSize={18} fontWeight="bold">
                  {comment.autor.perfil.nome_exibicao}
               </Text>
            </View>
            <DotsMenu
               setConfirmDelete={setConfirmDelete}
               setConfirmReport={setConfirmReport}
               author={comment.autor.id}
               id={comment.id}
            />
         </View>
         <Text fontSize={15}>{comment.resposta}</Text>
         <View
            flexDirection="row"
            marginTop="5%"
            justifyContent="space-between"
         >
            <HStack space={2}>
               {enableMark && (
                  <>
                     <AntDesign
                        name="checkcircle"
                        size={20}
                        color={
                           correctResponse === comment.id ? "green" : "grey"
                        }
                        onPress={() => MarkResponse(comment.id)}
                     />
                     <Text>
                        {correctResponse === comment.id &&
                           "Confirmado pelo monitor"}
                     </Text>
                  </>
               )}
            </HStack>
            <Text fontSize="xs" fontWeight="400">
               {DateISOToFormated(comment.data)}
            </Text>
         </View>
         <ConfirmDeleteModal
            confirmDeleteQuest={confirmDelete}
            setOpen={setConfirmDelete}
            DeleteQuestion={handleDeleteResponse}
         />
         <ReportQuest
            reportQuestion={confirmReport}
            setReportQuestion={setConfirmReport}
            handleReportQuestion={handleReportQuestion}
         />
      </ScrollView>
   );
}
