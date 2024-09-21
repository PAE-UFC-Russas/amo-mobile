import React from "react";
import api from "../../services/api";
import { View, Text, HStack, IconButton } from "native-base";

import { MaterialIcons } from "@expo/vector-icons";

import DefaultStagger from "../../components/DefaultStagger";
import styles from "./styles.js";

export default function TimeTable() {
  const buscarDados = async () => {
    const response = await api.get("");
    const data = await response.json();
    console.log(data);
  };

  return (
    <View style={styles.container}>
      <HStack
        justifyContent="space-evenly"
        width="100%"
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

        <MaterialIcons
          onPress={() => {
            goBack();
          }}
          color="#024284"
          size={24}
          name="arrow-back-ios"
        />
      </HStack>

      <View
        style={{
          justifyContent: "center",
          alignItems: "flex-start",
          height: "80%",
        }}
      >
        <Text>
          O titulo deve conter palavras chaves, ex: equação do segundo grau
        </Text>
        <Text>A descrição deve conter até 500 caracteres</Text>
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
