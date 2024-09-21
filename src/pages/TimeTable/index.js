import { View, Text } from "react-native";
import React from "react";
import api from "../../services/api";

export default function TimeTable() {
   const buscarDados = async () => {
      const response = await api.get("");
      const data = await response.json();
      console.log(data);
   };

   return (
      <View style={{ justifyContent: "center", alignItems: "center" }}>
         <Text>quadro de horarios</Text>
      </View>
   );
}
