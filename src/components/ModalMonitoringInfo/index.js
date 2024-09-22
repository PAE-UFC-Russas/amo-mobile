import React, { useEffect, useState } from "react";
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
} from "native-base";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import FormateTime from "../../util/FormateTime";
import { useCustomToast } from "../../hooks/useCustomToast";
import api from "../../services/api";
import { useSubject } from "../../contexts/subject";
import { GetLoginToken } from "../../util/StorageLogin";

const getEndTime = () => {
  const date = new Date();
  date.setHours(date.getHours() + 1);
  return date;
};

export default function ModalMonitoringInfo({ setOpenModal, openModal }) {
  const { subject } = useSubject();
  const [info, setInfo] = useState({
    hora_inicio: new Date(),
    hora_fim: getEndTime(),
  });
  const [showDate, setShowDate] = useState({
    active: false,
    type: "date",
    start: true,
  });
  const [monitors, setMonitors] = useState([]);
  const [loading, setLoading] = useState(false);
  const showToast = useCustomToast();

  const HandleOnClose = () => {
    setOpenModal(false);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const data = {
        ...info,
        disciplina: subject.id,
        hora_inicio: new Date(info.hora_inicio).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
        hora_fim: new Date(info.hora_fim).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
        professor: subject.professores[0].id,
      };
      await api.post("/monitorias/", data, {
        headers: {
          Authorization: "Token " + (await GetLoginToken()),
        },
      });
      showToast("Sucesso", "Quadro adicionado com sucesso!", "success");
      setOpenModal(false);
    } catch (error) {
      showToast(
        "Erro",
        "Não foi possível adicionar, tente novamente mais tarde!",
        "error"
      );
      console.log("error: ", error, error.response.data);
    }
    setLoading(false);
  };

  const changeTime = (event, date) => {
    setShowDate({ ...showDate, active: false });
    if (showDate.start) {
      setInfo({ ...info, hora_inicio: date });
    } else {
      setInfo({ ...info, hora_fim: date });
    }
  };

  const getData = () => {
    setMonitors(subject.monitores);
  };

  useEffect(() => {
    getData();
  }, []);

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
            Adicionar novo quadro de hórarios
          </Text>
          <VStack>
            <Text marginTop="4">Local</Text>
            <Input
              borderRadius={10}
              maxLength={64}
              width="100%"
              placeholderTextColor="grey"
              placeholder="Digitar o local aqui"
              onChangeText={(text) => {
                setInfo({ ...info, local: text });
              }}
            />
            <HStack
              justifyContent="space-between"
              alignItems="center"
              marginTop="2"
            >
              <VStack width="45%">
                <Text>Hora inicio</Text>
                <Button
                  fontSize={10}
                  borderRadius={10}
                  variant="outline"
                  width="100%"
                  _text={{
                    color: "black",
                  }}
                  onPress={() =>
                    setShowDate({ type: "time", active: true, start: true })
                  }
                >
                  {FormateTime(info.hora_inicio)}
                </Button>
              </VStack>
              <VStack width="45%">
                <Text>Hora fim</Text>
                <Button
                  fontSize={10}
                  borderRadius={10}
                  variant="outline"
                  width="100%"
                  _text={{
                    color: "black",
                  }}
                  onPress={() =>
                    setShowDate({ type: "time", active: true, start: false })
                  }
                >
                  {FormateTime(info.hora_fim)}
                </Button>
              </VStack>
            </HStack>
            <Text marginTop="2">Dia da semana:</Text>
            <Select
              placeholder="Dia da semana"
              width="100%"
              borderRadius={10}
              onValueChange={(itemValue) =>
                setInfo({ ...info, dia_semana: itemValue })
              }
            >
              <Select.Item label="Domingo" value="0" />
              <Select.Item label="Segunda-feira" value="1" />
              <Select.Item label="Terça-feira" value="2" />
              <Select.Item label="Quarta-feira" value="3" />
              <Select.Item label="Quinta-feira" value="4" />
              <Select.Item label="Sexta-feira" value="5" />
              <Select.Item label="Sábado" value="6" />
            </Select>
            <Text marginTop="2">Monitor:</Text>
            <Select
              placeholder="Monitor"
              width="100%"
              borderRadius={10}
              onValueChange={(itemValue) =>
                setInfo({ ...info, monitor: itemValue })
              }
            >
              {monitors.map((monitor) => (
                <Select.Item
                  label={monitor.nome_exibicao}
                  value={monitor.id}
                  key={monitor.id}
                />
              ))}
            </Select>
            <Button marginTop={8} bgColor="#307DF1" onPress={handleSave}>
              {loading ? <Spinner size="sm" color="#fff" /> : "Adicionar"}
            </Button>
            {showDate.active && (
              <RNDateTimePicker
                mode={"time"}
                value={showDate.start ? info.hora_inicio : info.hora_fim}
                minimumDate={new Date()}
                onTouchCancel={() =>
                  setShowDate({ ...showDate, active: false })
                }
                onChange={(event, date) => {
                  changeTime(event, date);
                }}
              />
            )}
          </VStack>
        </Center>
      </Modal.Content>
    </Modal>
  );
}
