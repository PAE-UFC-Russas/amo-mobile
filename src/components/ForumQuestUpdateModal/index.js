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

export default function ModalUpdateQuestion({
    confirmUpdateQuest,
    setUpdateQuest,
    UpdateQuestion,
}) {
  return (
    <Modal isOpen={confirmUpdateQuest.open} onClose={() => setUpdateQuest({ ...confirmUpdateQuest, open: false })}>
      <Modal.Content
        paddingY="8"
        paddingX="6"
        bgColor="#fff"
        width="90%"
        borderRadius={15}
      >
        <Center width="100%">
          <Text fontSize={17} fontWeight="bold" color="black">
            Atualizar dúvida
          </Text>
          <VStack>
            <Input
                borderWidth={3}
                size="md"
                borderColor="#024284"
                borderRadius={10}
                marginTop={5}
                width="100%"
                maxLength={150}
                color="#024284"
                placeholderTextColor="#024284"
                onChangeText={(text) => setUpdateQuest({ ...confirmUpdateQuest, titulo: text })}
                placeholder="Insira um titulo"
                value={confirmUpdateQuest.titulo}
            />
            <TextArea
                borderWidth={3}
                size="md"
                borderColor="#024284"
                color="#024284"
                maxLength={500}
                borderRadius={10}
                width="100%"
                h={200}
                marginTop={4}
                placeholderTextColor="#024284"
                onChangeText={(text) => setUpdateQuest({ ...confirmUpdateQuest, descricao: text })}
                placeholder="Insira um descrição"
                value={confirmUpdateQuest.descricao}
            />
            <Button marginTop={8} bgColor="#307DF1" onPress={() => UpdateQuestion(confirmUpdateQuest?.id)}>
                Atualizar    
            </Button>

          </VStack>
        </Center>
      </Modal.Content>
    </Modal>
  );
}
