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
          <Text style={styles.textTitle}>Local:</Text>
          <Text style={styles.textSimple}>Unidade II, bloco 2</Text>
        </VStack>
      </View>
    </>
  );
}
