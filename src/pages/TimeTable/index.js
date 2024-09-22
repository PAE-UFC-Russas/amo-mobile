import React, { useEffect, useState } from "react";
import { View, Text, HStack, IconButton, FlatList } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { useAuth } from "../../contexts/auth";
import { GetLoginToken } from "../../util/StorageLogin.js";
import DefaultStagger from "../../components/DefaultStagger";
import ModalMonitoringInfo from "../../components/ModalMonitoringInfo/index.js";
import MonitoringCardInformation from "../../components/MonitoringCardInformation/index.js";
import styles from "./styles.js";
import api from "../../services/api.js";

export default function TimeTable() {
  const { goBack } = useNavigation();
  const { user } = useAuth();
  const [monitorings, setMonitorings] = useState([]);
  const [showModal, setShowModal] = useState(false);

  async function getInformations() {
    try {
      const response = await api.get("/monitorias", {
        headers: {
          Authorization: "Token " + (await GetLoginToken()),
        },
      });
      setMonitorings(response.data);
    } catch (error) {
      console.log("error: ", error);
    }
  }

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
      <FlatList
        data={monitorings}
        renderItem={(monitoring) => (
          <MonitoringCardInformation monitoring={monitoring} />
        )}
      />
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
            <MaterialIcons color="#fff" size={33} name="add-circle-outline" />
          }
          onPress={() => setShowModal(true)}
        />
      </DefaultStagger>
      {showModal && (
        <ModalMonitoringInfo
          openModal={showModal}
          setOpenModal={setShowModal}
        />
      )}
    </View>
  );
}
