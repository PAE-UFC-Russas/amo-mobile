import React, { useState } from "react";
import {
  Text,
  Modal,
  Input,
  Button,
  Center,
  VStack,
} from "native-base";
import { useCustomToast } from "../../hooks/useCustomToast";

export default function CommentsModalEdit({
    confirmUpdateComment,
    setUpdateComment,
    UpdateComment,
}) {

  return (
    <Modal isOpen={confirmUpdateComment.open} onClose={() => setUpdateComment({ ...confirmUpdateComment, open: false })}>
      <Modal.Content
        paddingY="8"
        paddingX="6"
        bgColor="#fff"
        width="90%"
        borderRadius={15}
      >
        <Center width="100%">
          <Text fontSize={17} fontWeight="bold" color="black">
            Editar resposta
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
                onChangeText={(text) => setUpdateComment({ ...confirmUpdateComment, resposta: text })}
                placeholder="Edite sua resposta"
                value={confirmUpdateComment.resposta}
            />
            <Button marginTop={8} bgColor="#307DF1" onPress={() => UpdateComment(confirmUpdateComment?.id)}>
                Editar    
            </Button>

          </VStack>
        </Center>
      </Modal.Content>
    </Modal>
  );
}
