import React, { useState } from "react";
import {
  Text,
  Modal,
  HStack,
  Input,
  Select,
  Button,
  Center,
  Spinner,
  VStack,
  TextArea,
} from "native-base";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import FormateTime from "../../util/FormateTime";
import DateISOToFormated from "../../util/DateISOToFormated";
import { useCustomToast } from "../../hooks/useCustomToast";

export default function ModalAddScheduling({
  setOpenModal,
  openModal,
  PostNewSchedule,
  setNewSchedule,
  newSchedule,
}) {
  const [showDate, setShowDate] = useState({ active: false, type: "date" });
  const [loading, setLoading] = useState(false);
  const showToast = useCustomToast();

  const HandleOnClose = () => {
    setOpenModal(false);
  };

  const HandlePostNewSchedule = async () => {
    setLoading(true);

    if (newSchedule.assunto.length <= 3 || newSchedule.descricao.length <= 3) {
      showToast(
        "Erro",
        "Assunto e descrição devem ter mais de 3 caracteres",
        "error"
      );
    } else {
      const status = await PostNewSchedule();

      if (status === 201) {
        showToast("Sucesso", "Agendamento realizado com sucesso!", "success");
      } else if (status === 409) {
        showToast(
          "Atenção",
          "Já existe um agendamento para esse horário!",
          "warning"
        );
      } else {
        showToast(
          "Erro",
          "Não foi possível realizar o agendamento, tente novamente mais tarde!",
          "error"
        );
      }
    }

    setLoading(false);
    HandleOnClose();
  };

  return (
    <Modal isOpen={openModal} onClose={HandleOnClose}>
      <Modal.Content
        paddingY="8"
        paddingX="6"
        bgColor="#fff"
        width="90%"
        borderRadius={15}
      >
        <Center>
          <Text fontSize={17} fontWeight="bold" color="black">
            Solicitar agendamento
          </Text>
          <VStack>
            <Text marginTop="4">Assunto</Text>
            <Input
              borderRadius={10}
              maxLength={64}
              width="100%"
              placeholderTextColor="grey"
              placeholder="Digitar assunto aqui"
              onChangeText={(text) => {
                setNewSchedule({ ...newSchedule, assunto: text });
              }}
            />
            <Text marginTop="2">Descrição</Text>
            <TextArea
              borderRadius={10}
              maxLength={96}
              width="100%"
              placeholderTextColor="grey"
              placeholder="Digite a descrição"
              onChangeText={(text) => {
                setNewSchedule({ ...newSchedule, descricao: text });
              }}
            />
            <HStack
              justifyContent="space-between"
              alignItems="center"
              marginTop="2"
            >
              <VStack width="45%">
                <Text>Data</Text>
                <Button
                  fontSize={10}
                  borderRadius={10}
                  variant="outline"
                  width="100%"
                  _text={{
                    color: "black",
                  }}
                  onPress={() => setShowDate({ type: "date", active: true })}
                >
                  {DateISOToFormated(newSchedule.data)}
                </Button>
              </VStack>
              <VStack width="45%">
                <Text>Horario</Text>
                <Button
                  fontSize={10}
                  borderRadius={10}
                  variant="outline"
                  width="100%"
                  _text={{
                    color: "black",
                  }}
                  onPress={() => setShowDate({ type: "time", active: true })}
                >
                  {FormateTime(newSchedule.data)}
                </Button>
              </VStack>
            </HStack>
            <Text marginTop="2">Tipo:</Text>
            <Select
              placeholder="Tipo"
              width="100%"
              borderRadius={10}
              onValueChange={(itemValue) =>
                setNewSchedule({ ...newSchedule, tipo: itemValue })
              }
            >
              <Select.Item label="Presencial" value="presencial" />
              <Select.Item label="Remoto" value="virtual" />
            </Select>
            <Button
              marginTop={8}
              bgColor="#307DF1"
              onPress={HandlePostNewSchedule}
            >
              {/* Solicitar */}
              {loading ? <Spinner size="sm" color="#fff" /> : "Solicitar"}
            </Button>
            {showDate.active && (
              <RNDateTimePicker
                mode={showDate.type}
                value={
                  typeof newSchedule.data === "object"
                    ? newSchedule.data
                    : new Date()
                }
                minimumDate={new Date()}
                onTouchCancel={() =>
                  setShowDate({ ...showDate, active: false })
                }
                onChange={(event, date) => {
                  setShowDate({ ...showDate, active: false });
                  setNewSchedule({ ...newSchedule, data: date });
                }}
              />
            )}
          </VStack>
        </Center>
      </Modal.Content>
    </Modal>
  );
}
