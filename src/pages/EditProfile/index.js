import React, { useEffect, useState } from "react";
import { TouchableOpacity, Image } from "react-native";
import {
  Center,
  Text,
  View,
  Avatar,
  Input,
  Button,
  useToast,
  ScrollView,
  HStack,
  Spinner,
} from "native-base";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import PickImage from "../../util/PickImage";
import { GetLoginToken } from "../../util/StorageLogin";
import { useAuth } from "../../contexts/auth";
import SelectForProfilePage from "../../components/SelectForProfilePage";
import DefaultSelect from "../../components/DefaultSelect";
import api from "../../services/api";
import styles from "./styles";
import {
  EditProfilePerApi,
  EditProfilePerFormData,
} from "../../util/EditProfileSchema";
import { useSubject } from "../../contexts/subject";

export default function EditProfile() {
  const [courses, setCourses] = useState([]);
  const [years, setYears] = useState([]);
  const { user, EditUser } = useAuth();
  const [profile, setProfile] = useState({
    nome_exibicao: user.perfil.nome_exibicao,
    entrada: user.perfil.entrada,
    curso: user.perfil.curso,
    foto: null,
    matricula: user.perfil.matricula,
    cargos: user.perfil.cargos,
  });
  const [enviar, setEnviar] = useState(false);
  const { goBack } = useNavigation();
  const toast = useToast();
  const { course } = useSubject();

  const GetYearsPerSemester = () => {
    let tempYears = [];
    for (let i = 0; i < years.length; i++) {
      tempYears.push(years[i] + ".1");
      tempYears.push(years[i] + ".2");
    }
    return tempYears;
  };

  const GetImage = async () => {
    const avatar = await PickImage();
    setProfile({ ...profile, foto: avatar });
  };

  const Save = async () => {
    if (!profile.nome_exibicao || profile.curso === -1 || !profile.entrada) {
      toast.show({
        title: "Não deixe nenhum campo em branco!",
        placement: "bottom",
      });
    } else {
      setEnviar(true);
      const response =
        profile.foto != null
          ? await EditProfilePerFormData(profile)
          : await EditProfilePerApi(profile);
      if (response.success) {
        EditUser(response.user);
        toast.show({
          title: "Dados cadastrados com sucesso!",
          placement: "bottom",
        });
        goBack();
      } else {
        toast.show({
          title: "Erro, verifique sua internet!",
          placement: "bottom",
        });
      }
    }
    setEnviar(false);
  };

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    let tempYears = [];
    for (let i = 2015; i <= currentYear; i++) {
      tempYears.push(i);
    }

    setYears(tempYears);
    async function GetCourses() {
      try {
        const response = await api.get("/cursos/", {
          headers: {
            Authorization: "Token " + (await GetLoginToken()),
          },
        });
        const listCourses = response.data.results;

        if (typeof profile.curso === "string") {
          const result = listCourses.filter((e) => e.nome == profile.curso)[0]
            .id;
          setProfile({ ...profile, curso: result });
        }
        setCourses(listCourses);
      } catch (error) {
        console.log(error.response.data);
      }
    }
    GetCourses();
  }, []);

  return (
    <View style={styles.container}>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          marginTop: 25,
        }}
      >
        <MaterialIcons
          onPress={() => goBack()}
          color="#024284"
          size={24}
          style={styles.backButton}
          name="arrow-back-ios"
        />
        <Center>
          <Text
            marginTop={30}
            marginBottom={10}
            fontWeight="bold"
            color="#024284"
            fontSize="lg"
          >
            Editar perfil
          </Text>
        </Center>
      </View>

      <Center>
        <TouchableOpacity onPress={() => GetImage()}>
          {profile.foto ? (
            <Image
              source={{ uri: profile.foto }}
              style={{
                width: 100,
                height: 100,
                margin: 5,
                borderRadius: 100,
              }}
            />
          ) : (
            <Avatar
              alignSelf="center"
              bg="tertiaryBlue"
              margin={5}
              size="xl"
              source={{
                uri:
                  user.perfil.foto.length > 0
                    ? user.perfil.foto
                    : "https://i.ibb.co/4f1jsPx/Splash-1.png",
              }}
            />
          )}
          <View style={styles.avatarBadge}>
            <FontAwesome5 color="#fff" size={16} name="pen" />
          </View>
        </TouchableOpacity>
      </Center>
      <View style={styles.edgeProfile}>
        <View
          style={{
            width: 120,
            backgroundColor: "#024284",
            height: 30,
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
            marginTop: 15,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: "#002B57",
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            {profile.cargos[0].charAt(0).toUpperCase() +
              profile.cargos[0].slice(1)}
          </Text>
        </View>
        <View style={{ padding: 10 }} marginBottom={20}>
          <View>
            <Text marginTop={1} fontSize={18}>
              Nome de exibição:
            </Text>
            <View style={{ padding: 5 }}>
              <Input
                borderColor={"#99B3CD"}
                placeholder="Digite seu nome de exibição"
                fontSize={15}
                onChangeText={(text) =>
                  setProfile({ ...profile, nome_exibicao: text })
                }
                value={profile.nome_exibicao}
                variant="outline"
                borderRadius={15}
                color={"#99B3CD"}
              />
            </View>
          </View>
          <View>
            <Text marginTop={1} fontSize={18}>
              Curso:
            </Text>
            <View style={{ padding: 5 }}>
              <SelectForProfilePage
                borderWidth={1}
                borderColor={"#99B3CD"}
                items={courses}
                placeholder={course.nome}
                setValue={(itemValue) =>
                  setProfile({
                    ...profile,
                    curso: courses.filter((e) => e.id == itemValue)[0].id,
                  })
                }
                color={"#99B3CD"}
              />
            </View>
          </View>
          <View>
            <Text marginTop={1} fontSize={18}>
              Entrada:
            </Text>
            <View style={{ padding: 5 }}>
              <DefaultSelect
                borderColor={"#99B3CD"}
                borderWidth={1}
                placeholder="Ano de entrada"
                items={GetYearsPerSemester()}
                value={profile.entrada}
                setValue={(itemValue) =>
                  setProfile({ ...profile, entrada: itemValue })
                }
                color="#99B3CD"
              />
            </View>
          </View>
        </View>
      </View>
      {courses.length > 0 ? (
        <>
          <View style={styles.buttons}>
            <Button
              borderWidth={2}
              borderColor="#024284"
              variant="outline"
              borderRadius={10}
              width={100}
              _text={{
                color: "#2599BA",
              }}
              onPress={() => goBack()}
            >
              Cancelar
            </Button>
            <Button
              bgColor="#2599BA"
              borderRadius={10}
              width={100}
              onPress={Save}
            >
              Salvar
            </Button>
          </View>
          <View
            height={10}
            width={"100%"}
            marginTop={10}
            justifyContent={"center"}
            alignItems={"center"}
          >
            {enviar && <Spinner accessibilityLabel="Carregando cursos" />}
          </View>
        </>
      ) : (
        <Spinner accessibilityLabel="Carregando cursos" />
      )}
    </View>
  );
}
