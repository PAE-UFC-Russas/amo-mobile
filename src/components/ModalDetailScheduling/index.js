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

    const isMonitor = subject.monitores.find((obj) => obj.id == user.perfil.id)
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
      <Modal.Content bgColor="#fff" width="90%" borderRadius={14} padding="4%">
        <View
          flexDirection={"row"}
          alignItems={"center"}
          justifyContent={"space-around"}
        >
          <Text marginLeft={10} fontSize={17} fontWeight="bold" color="black">
            Detalhes do agendamento
          </Text>

          <MaterialIcons
            color="black"
            size={32}
            name="close"
            onPress={HandleOnClose}
            style={{ marginLeft: 10 }}
          />
        </View>
        <View
          width="100%"
          padding="3%"
          alignSelf="center"
          borderWidth={1}
          borderColor="grey"
          borderRadius={4}
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
          {!details.tipo.startsWith("presencial") && (
            <View marginBottom="2%">
              <Text fontSize={20} color="grey">
                Link:
              </Text>
              <Button
                color="#003459"
                padding={0}
                justifyContent="flex-start"
                variant="link"
                onPress={() => OpenBrowser(details.link_zoom)}
              >
                <Text fontSize={15}>{filterDesc(details.link_zoom)}</Text>
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
              <Text fontSize={20} color="grey">
                Data:
              </Text>
              <Text fontSize={15}>{DateISOToFormated(details.data)}</Text>
            </View>
            <View
              alignItems={"center"}
              justifyContent={"center"}
              flexDirection={"row"}
            >
              <Text fontSize={20} color="grey">
                Inicio:
              </Text>
              <Text fontSize={15}>{FormateTime(details.data)}</Text>
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
              borderRadius={16}
              backgroundColor="red"
              _text={{
                color: "white",
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
              borderRadius={16}
              backgroundColor="#307DF1"
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
