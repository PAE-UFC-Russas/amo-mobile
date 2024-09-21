import React, { useState } from "react";
import api from "../../services/api";
import { View, Text, HStack, IconButton, Avatar, VStack } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../contexts/auth";
import { MaterialIcons } from "@expo/vector-icons";
import DotsMenu from "../../components/DotsMenu";

import DefaultStagger from "../../components/DefaultStagger";
import styles from "./styles.js";

export default function TimeTable() {
  const { navigate, goBack } = useNavigation();
  const { user } = useAuth();

  const [showModal, setShowModal] = useState(false);

  const buscarDados = async () => {
    const response = await api.get("");
    const data = await response.json();
    console.log(data);
  };

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
            console.log("voltou");
          }}
          color="#024284"
          size={24}
          name="arrow-back-ios"
        />
        <Text style={styles.title}>Quadro de horarios</Text>
      </HStack>

      <View style={styles.containerImg}>
        <View>
          <Avatar
            zIndex={1}
            bg="tertiaryBlue"
            size="lg"
            source={{
              uri: null,
            }}
          />
          <View
            style={{
              width: 200,
              borderBottomWidth: 1,
              borderBottomColor: "#024284",
              position: "absolute",
              bottom: 5,
            }}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            padding: 5,
            alignItems: "center",
          }}
        >
          <View>
            <Text style={{ fontSize: 18 }}>Tatina Alves</Text>
            <Text>Professora</Text>
          </View>

          <View style={{ marginLeft: "50%" }}>
            <DotsMenu />
          </View>
        </View>
      </View>

      <View style={styles.containerData}>
        <Text style={styles.textTitle}>Aulas:</Text>
        <Text style={styles.textSimple}>Turma Eng.de Software</Text>
        <Text style={styles.textSimple}>Unidade I bloco A - Sala 5</Text>

        <HStack style={{ justifyContent: "space-between" }}>
          <VStack style={{ marginTop: 10 }}>
            <Text style={styles.textSimple}>Segunda-Feira</Text>
            <Text style={styles.textSimple}>13:30 as 15:30</Text>
          </VStack>
          <VStack style={{ marginTop: 10 }}>
            <Text style={styles.textSimple}>Segunda-Feira</Text>
            <Text style={styles.textSimple}>13:30 as 15:30</Text>
          </VStack>
        </HStack>
      </View>

      <View style={styles.containerData}>
        <Text style={styles.textSimple}>Turma Ciencia da Compotação</Text>
        <Text style={styles.textSimple}>Unidade II, bloco A - Sala 1</Text>

        <HStack style={{ justifyContent: "space-between" }}>
          <VStack style={{ marginTop: 10 }}>
            <Text style={styles.textSimple}>Quinta-Feira</Text>
            <Text style={styles.textSimple}>13:30 as 17:30</Text>
          </VStack>
          <VStack style={{ marginTop: 10 }}>
            <Text style={styles.textSimple}>Segunda-Feira</Text>
            <Text style={styles.textSimple}>13:30 as 15:30</Text>
          </VStack>
        </HStack>
        <VStack style={{ marginTop: 15 }}>
          <Text style={styles.textTitle}>Sala do dicente:</Text>
          <Text style={styles.textSimple}>Unidade II, bloco 2</Text>
        </VStack>
      </View>

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
          onPress={() => navigate("RegisterDoubt")}
        />
      </DefaultStagger>
    </View>
  );
}
