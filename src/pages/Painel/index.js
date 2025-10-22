import React, { useState, useEffect } from "react";
import { FlatList } from "react-native";
import { Center, IconButton, Skeleton, Text, Image } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { useCustomToast } from "../../hooks/useCustomToast";
import ForumSearch from "../../components/ForumSearch";
import ForumQuest from "../../components/ForumQuest";
import ButtonGetNextValues from "../../components/ButtonGetNextValues";
import DefaultStagger from "../../components/DefaultStagger";
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal";
import ModalUpdateQuestion from "../../components/ForumQuestUpdateModal";
import { GetLoginToken } from "../../util/StorageLogin";
import api from "../../services/api";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import ReportQuest from "../../components/ReportQuest";
import { useSubject } from "../../contexts/subject";
import StatusModal from "../../components/StatusModal";
import PainelSubjects from "../../components/PainelSubjects";

export default function Painel() {
  const [modalStatus, setModalStatus] = useState({ visible: false, type: 'success', message: '' });
  const [loading, setLoading] = useState(true);
  const showToast = useCustomToast();
  const { subject } = useSubject();
  const { navigate, addListener } = useNavigation();

  function handleNavigation(screen, item) {
    navigate(screen, item);
  }
    const DATA = [
    { id: '1', title: 'First Item' },
    { id: '2', title: 'Second Item' },
    { id: '3', title: 'Third Item' },
    { id: '4', title: 'Fourth Item' },
    { id: '5', title: 'Fifth Item' },
    ];

   return (
    <Center style={styles.container}>
      {DATA.length == 0 ?(
          <Center flex={1} justifyContent="center" alignItems="center" marginBottom={20}>
            <Image
              source={require("../../assets/question.png")}
              alt="question"
              width={250}
              height={250}
            />
            <Text
              fontWeight="bold"
              color="#45BEE6"
              fontSize="lg"
              textAlign="center"
              px={10}
              mt={2}
            >
              Você ainda não assumiu a titularidade de nenhuma disciplina. Mas pode realizar isso no botão abaixo.
            </Text>
          </Center>
      ) : (
        <FlatList
          data={DATA}
          renderItem={(DATA) =>
            PainelSubjects(
              DATA.title,
            )
          }
          keyExtractor={(subject) => subject}
        />
      )}

      <StatusModal
        visible={modalStatus.visible}
        type={modalStatus.type}
        message={modalStatus.message}
        onClose={() => setModalStatus({ ...modalStatus, visible: false })}
      />
    </Center>
  );
}
