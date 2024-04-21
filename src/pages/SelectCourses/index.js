import React, { useEffect, useState } from "react";
import {
  VStack,
  Center,
  Button,
  Spinner,
  View,
  Image,
  Text,
} from "native-base";
import { useNavigation } from "@react-navigation/native";
import AuthHeader from "../../components/AuthHeader";
import { GetLoginToken } from "../../util/StorageLogin";
import { MaterialIcons } from "@expo/vector-icons";
import api from "../../services/api";
import styles from "./styles";
import { useSubject } from "../../contexts/subject";

export default function SelectCourses() {
  const { navigate, goBack } = useNavigation();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { EditCourse } = useSubject();

  function NavigateToSubjects(item) {
    navigate("SelectSubjects");
    EditCourse(item);
  }

  useEffect(() => {
    async function GetCourses() {
      try {
        setLoading(true);
        const response = await api.get("/cursos/?page=1", {
          headers: {
            Authorization: "Token " + (await GetLoginToken()),
          },
        });
        setLoading(false);
        setCourses(response.data.results);
      } catch (error) {
        console.log(error.response.data);
      }
    }
    GetCourses();
  }, []);

  return (
    <View style={styles.container} bgColor="#fff" safeArea>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <MaterialIcons
          onPress={() => goBack()}
          color="#52D6FB"
          size={24}
          style={styles.backButton}
          name="arrow-back-ios"
        />
        <Center>
          <Image
            alt="Logo AMO"
            source={require("../../assets/logo_lightblue.png")}
            style={{ width: 60, height: 60 }}
          />
        </Center>
      </View>

      <Text
        marginTop={30}
        marginBottom={10}
        fontWeight="bold"
        color="#024284"
        fontSize="md"
      >
        Selecione o curso que a monitoria pertence
      </Text>
      <VStack space="3" alignItems={"center"} width={"100%"}>
        {loading ? (
          <Spinner marginTop="auto" marginBottom="auto" size="lg" />
        ) : (
          courses.map((item, index) => {
            return (
              <Button
                key={index}
                textAlign={"center"}
                bgColor="#0092BB"
                borderRadius="2xl"
                width={"80%"}
                height={60}
                onPress={() => NavigateToSubjects(item)}
                _text={{
                  fontWeight: 800,
                  color: "#fff",
                }}
              >
                {item.nome}
              </Button>
            );
          })
        )}
      </VStack>
    </View>
  );
}
