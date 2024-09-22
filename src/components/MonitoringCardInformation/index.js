import { View, Text, HStack, Avatar, VStack, IconButton } from "native-base";
import { ActivityIndicator } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import styles from "./styles.js";
import { useEffect, useState } from "react";
import api from "../../services/api.js";
import { GetLoginToken } from "../../util/StorageLogin.js";
import { useSubject } from "../../contexts/subject.js";
import { useAuth } from "../../contexts/auth.js";

export default function MonitoringCardInformation({
  monitoring,
  setOpenModal,
}) {
  const { subject } = useSubject();
  const { user } = useAuth();
  const [userMonitor, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const getUser = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/usuario/${monitoring.monitor}`, {
        headers: {
          Authorization: "Token " + (await GetLoginToken()),
        },
      });
      setUser(response.data);
    } catch (error) {
      console.log("error: ", error, error.response.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    getUser();
  }, []);

  if (loading || !userMonitor?.perfil?.id) {
    return <ActivityIndicator size="large" color="#024284" />;
  }

  const isProfessor = subject.professores.find(
    (obj) => obj.id == user.perfil.id
  )
    ? true
    : false;

  return (
    <>
      <View style={styles.containerImg}>
        <View>
          <Avatar
            zIndex={1}
            bg="tertiaryBlue"
            size="lg"
            source={{
              uri: userMonitor?.perfil?.foto,
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
            justifyContent: "space-between",
            width: "75%",
          }}
        >
          <View>
            <Text style={{ fontSize: 18 }}>
              {userMonitor?.perfil?.nome_exibicao}
            </Text>
            <Text>
              {monitoring.professor === monitoring.monitor
                ? "Professor"
                : "Monitor"}
            </Text>
          </View>
          {(user?.perfil?.id === monitoring.monitor || isProfessor) && (
            <IconButton
              icon={
                <MaterialIcons
                  name="mode-edit"
                  size={24}
                  color="white"
                  style={{
                    backgroundColor: "#024284",
                    padding: 12,
                    borderRadius: 50,
                  }}
                />
              }
              onPress={() => setOpenModal({ open: true, id: monitoring.id })}
            />
          )}
        </View>
      </View>
      <View style={styles.containerData}>
        <Text style={styles.textSimple}>{monitoring.course.nome}</Text>
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
