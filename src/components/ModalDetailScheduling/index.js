import React from "react";
import { Button, Text, Modal, View, Center } from "native-base";
import { useAuth } from "../../contexts/auth";
import FormateTime from "../../util/FormateTime";
import DateISOToFormated from "../../util/DateISOToFormated";

export default function ModalDetailScheduling({
   setOpenModal,
   openModal,
   details,
   subjects,
}) {
   const { user } = useAuth();
   const HandleOnClose = () => {
      setOpenModal(false);
   };

   const subject = subjects.filter((item) => {
      return item.id == details.disciplina;
   })[0];

   const EnableConfirmSchedule = () => {
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

   const HandlePostNewSchedule = (action) => {};

   const enableButton = EnableConfirmSchedule();

   function filterDesc(desc) {
      if (desc.lenght < 27) {
         return desc;
      }
      return `${desc.substring(0, 20)}...`;
   }

   return (
      <Modal isOpen={openModal} onClose={HandleOnClose} marginTop="5%" flex={1}>
         <Modal.Content
            padding="1"
            bgColor="#fff"
            width="80%"
            height="90%"
            borderRadius={15}
         >
            <Center>
               <Text
                  paddingTop={"4%"}
                  fontSize={17}
                  fontWeight="bold"
                  color="black"
               >
                  Detalhes do agendamento
               </Text>
            </Center>
            <View
               width="85%"
               padding="3%"
               alignSelf="center"
               borderWidth={1}
               borderColor="grey"
               borderRadius={5}
               marginTop="5%"
            >
               <View marginBottom="2%">
                  <Text fontSize={20} color="grey">
                     Solicitante:
                  </Text>
                  <Text fontSize={15}>{details.solicitante.nome_exibicao}</Text>
               </View>
               <View marginBottom="2%">
                  <Text fontSize={20} color="grey">
                     Monitor:
                  </Text>
                  <Text fontSize={15}>
                     {subject.monitores.map((item) => {
                        return item.nome_exibicao;
                     })}
                  </Text>
               </View>
               <View marginBottom="2%">
                  <Text fontSize={20} color="grey">
                     Assunto:
                  </Text>
                  <Text fontSize={15}>{details.assunto}</Text>
               </View>
               <View marginBottom="2%">
                  <Text fontSize={20} color="grey">
                     Disciplina:
                  </Text>
                  <Text fontSize={15}>{subject.nome}</Text>
               </View>
               <View marginBottom="2%">
                  <Text fontSize={20} color="grey">
                     Tipo:
                  </Text>
                  <Text fontSize={15}>{details.tipo}</Text>
               </View>
               <View marginBottom="2%">
                  <Text fontSize={20} color="grey">
                     Link:
                  </Text>
                  <Text fontSize={15} color="#003459">
                     {" "}
                     {filterDesc("https://meet.google.com/yvr-vzww-jpz")}
                  </Text>
               </View>
            </View>
            <View
               width="85%"
               height="20%"
               alignSelf="center"
               borderWidth={1}
               borderColor="grey"
               borderRadius={5}
               marginY="5%"
               padding="3%"
            >
               <View marginBottom="2%">
                  <Text fontSize={20} color="grey">
                     Data:
                  </Text>
                  <Text fontSize={15}>{DateISOToFormated(details.data)}</Text>
               </View>
               <View marginBottom="2%">
                  <Text fontSize={20} color="grey">
                     Inicio:
                  </Text>
                  <Text fontSize={15}>{FormateTime(details.data)}</Text>
               </View>
            </View>
            <Button.Group
               width="100%"
               justifyContent="space-around"
               alignSelf="center"
            >
               <Button
                  borderRadius={16}
                  backgroundColor="red"
                  _text={{
                     color: "white",
                  }}
                  onPress={HandleOnClose}
               >
                  Cancelar
               </Button>
               <Button
                  borderRadius={16}
                  backgroundColor="#024284"
                  //   onPress={HandlePostNewSchedule}
               >
                  Confirmar
               </Button>
            </Button.Group>
         </Modal.Content>
      </Modal>
   );
}
