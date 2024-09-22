import { View, Text, HStack, Avatar, VStack } from "native-base";
import DotsMenu from "../../components/DotsMenu";
import styles from "./styles.js";

export default function MonitoringCardInformation({ monitoring }) {
  return (
    <>
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
        <Text style={styles.textSimple}>Turma Ciencia da Compotação</Text>
        <HStack style={{ justifyContent: "space-between" }}>
          <VStack style={{ marginTop: 10 }}>
            <Text style={styles.textSimple}>
              {monitoring.dia_semana_display}
            </Text>
            <Text style={styles.textSimple}>
              {monitoring.hora_inicio.substring(0, 5)} as{" "}
              {monitoring.hora_fim.substring(0, 5)}
            </Text>
          </VStack>
        </HStack>
        <VStack style={{ marginTop: 15 }}>
          <Text style={styles.textTitle}>Local:</Text>
          <Text style={styles.textSimple}>{monitoring.local}</Text>
        </VStack>
      </View>
    </>
  );
}
