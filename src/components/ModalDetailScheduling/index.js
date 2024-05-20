import React from "react";
import { Button, Text, Modal, View } from "native-base";
import { OpenBrowser } from "../../util/SendEmail";
import { useAuth } from "../../contexts/auth";
import FormateTime from "../../util/FormateTime";
import DateISOToFormated from "../../util/DateISOToFormated";
import { MaterialIcons } from "@expo/vector-icons";

export default function ModalDetailScheduling({
   setOpenModal,
   openModal,
   details,
   subject,
   EditSchedule,
   setConfirmCancelQuest,
}) {
   const { user } = useAuth();
   const HandleOnClose = () => {
      setOpenModal(false);
   };

   const EnableConfirmSchedule = () => {
      if (details.status === "confirmado") return false;

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
         return true;
      } else {
         return false;
      }
   };

   function filterDesc(desc) {
      if (desc.lenght < 27) {
         return desc;
      }
      return `${desc.substring(0, 65)}...`;
   }

   return (
      <Modal isOpen={openModal} onClose={HandleOnClose}>
         <Modal.Content
            bgColor="#fff"
            width="90%"
            borderRadius={14}
            justifyContent={"space-between"}
            padding="4%"
         >
            <View
               flexDirection={"row"}
               alignItems={"center"}
               justifyContent={"space-between"}
            >
               <Text
                  marginLeft={10}
                  fontSize={16}
                  fontWeight="bold"
                  color="#024284"
               >
                  Detalhes do agendamento
               </Text>

               <MaterialIcons
                  color="#024284"
                  size={28}
                  name="close"
                  onPress={HandleOnClose}
                  style={{ marginLeft: 10 }}
               />
            </View>
            <View marginTop={2} width="100%" padding="3%" borderRadius={4}>
               <View marginBottom="2%">
                  <Text fontSize={16} color="#524F4F">
                     Solicitante:
                  </Text>
                  <Text fontWeight={500} fontSize={16}>
                     {details.solicitante.nome_exibicao}
                  </Text>
               </View>
               <View marginBottom="2%">
                  <Text fontSize={16} color="#524F4F">
                     Monitor:
                  </Text>
                  <Text fontWeight={500} fontSize={16}>
                     {subject.monitores.map((item) => {
                        return item.nome_exibicao;
                     })}
                  </Text>
               </View>
               <View marginBottom="2%">
                  <Text fontSize={16} color="#524F4F">
                     Assunto:
                  </Text>
                  <Text fontWeight={"medium"} fontSize={16}>
                     {details.assunto}
                  </Text>
               </View>
               <View marginBottom="2%">
                  <Text fontSize={16} color="#524F4F">
                     Descrição:
                  </Text>
                  <Text fontWeight={"medium"} fontSize={16}>
                     {details.descricao}
                  </Text>
               </View>
               <View marginBottom="2%">
                  <Text fontSize={16} color="#524F4F">
                     Disciplina:
                  </Text>
                  <Text fontWeight={"medium"} fontSize={16}>
                     {subject.nome}
                  </Text>
               </View>
               <View marginBottom="2%">
                  <Text fontSize={16} color="#524F4F">
                     Modelo de monitoria:
                  </Text>
                  <Text fontWeight={"medium"} fontSize={16}>
                     {details.tipo}
                  </Text>
               </View>
               {!details.tipo.startsWith("presencial") && (
                  <View marginBottom="2%">
                     <Text fontSize={16} color="#524F4F">
                        Link:
                     </Text>
                     <Button
                        color="#003459"
                        padding={0}
                        justifyContent="flex-start"
                        variant="link"
                        onPress={() => OpenBrowser(details.link_zoom)}
                     >
                        <Text fontSize={16}>
                           {filterDesc(details.link_zoom)}
                        </Text>
                     </Button>
                  </View>
               )}
               <View alignItems={"center"} flexDirection={"row"}>
                  <View
                     marginRight={2}
                     alignItems={"center"}
                     justifyContent={"center"}
                     flexDirection={"row"}
                  >
                     <Text fontSize={16} color="#524F4F">
                        Data:
                     </Text>
                     <Text fontSize={16}>
                        {DateISOToFormated(details.data)}
                     </Text>
                  </View>
                  <View
                     alignItems={"center"}
                     justifyContent={"center"}
                     flexDirection={"row"}
                  >
                     <Text fontSize={16} color="#524F4F">
                        Inicio:
                     </Text>
                     <Text fontWeight={"medium"} fontSize={15}>
                        {FormateTime(details.data)}
                     </Text>
                  </View>
               </View>
            </View>
            <Button.Group
               width="100%"
               justifyContent="space-around"
               alignSelf="center"
               marginTop={2}
            >
               {details.status !== "cancelado" && (
                  <Button
                     borderRadius={12}
                     backgroundColor="#CC1016"
                     _text={{
                        color: "white",
                        fontWeight: "bold",
                     }}
                     onPress={() =>
                        setConfirmCancelQuest({ open: true, id: details.id })
                     }
                  >
                     Recusar
                  </Button>
               )}
               {EnableConfirmSchedule() && (
                  <Button
                     borderRadius={12}
                     fontWeight={"bold"}
                     _text={{
                        color: "white",
                        fontWeight: "bold",
                     }}
                     backgroundColor="#2599BA"
                     onPress={() => EditSchedule("confirmado")}
                  >
                     Confirmar
                  </Button>
               )}
            </Button.Group>
         </Modal.Content>
      </Modal>
   );
}
