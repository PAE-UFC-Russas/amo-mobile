import React, { useState } from "react";
import {
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  ScrollView,
  StatusBar,
} from "react-native";
import {
  Center,
  VStack,
  Text,
  Image,
  View,
  HStack,
  Pressable,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import validator from "validator";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../contexts/auth";

import DefaultFormInput from "../../components/DefaultFormInput";
import DefaultBlueButton from "../../components/DefaultBlueButton";
import styles from "./styles";

export default function RegisterTabs() {
  const { goBack, navigate } = useNavigation();
  const { Register, RegisterTeacher } = useAuth();
  const [activeTab, setActiveTab] = useState("aluno");

  const [student, setStudent] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [teacher, setTeacher] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [inputErros, setInputErros] = useState({});

  async function handleSubmit() {
    setLoading(true);
    let erros = {};
    const user = activeTab === "aluno" ? student : teacher;
    
    if (!validator.isEmail(user.email)) {
      erros.errosEmail = "E-mail inválido!";
    }
    console.log(user.email.split("@")[1] !== "ufc.br", activeTab)
    if (activeTab === "professor" && user.email.split("@")[1] !== "ufc.br".trim()) {
      erros.errosEmail = "E-mail institucional precisa conter o domínio '@ufc.br'!";
    }


    if (user.password.length < 8)
      erros.errosPassword = "A senha precisa conter no mínimo 8 caracteres!";
    else if (!user.password.match(/[a-zA-Z]/))
      erros.errosPassword = "A senha precisa conter pelo menos uma letra!";
    else if (!user.password.match(/\d/))
      erros.errosPassword = "A senha precisa conter pelo menos um número!";
    if (user.password !== user.confirmPassword)
      erros.errosConfirmPassword = "As senhas devem ser iguais!";

    setInputErros(erros);

    if (Object.keys(erros).length === 0) {
      const response = activeTab === "aluno" ? await Register(user) : await RegisterTeacher(user);
      console.log(response)
      if (response === null) {
        navigate("CheckCode", { register: true });
      } else {
        setInputErros({ errosEmail: "Endereço de email já está em uso!" });
      }
    }

    setLoading(false);
  }

  const AlunoForm = (
    <VStack space={2}>
      <DefaultFormInput
        placeholder="E-mail"
        value={student.email}
        setValue={(text) => setStudent({ ...student, email: text })}
        color="#024284"
        error={inputErros.errosEmail}
      />
      <DefaultFormInput
        type="password"
        placeholder="Senha"
        value={student.password}
        setValue={(text) => setStudent({ ...student, password: text })}
        color="#024284"
        error={inputErros.errosPassword}
      />
      <DefaultFormInput
        type="password"
        placeholder="Confirmar senha"
        value={student.confirmPassword}
        setValue={(text) =>
          setStudent({ ...student, confirmPassword: text })
        }
        color="#024284"
        error={inputErros.errosConfirmPassword}
      />
      <Text style={styles.textInfo}>* A senha precisa ter no mínimo 8 caracteres.</Text>
      <Text style={styles.textInfo}>* A senha precisa ter letras e números.</Text>
      <Text style={styles.textInfo}>* A senha não pode ter espaçamento.</Text>
    </VStack>
  );

  const ProfessorForm = (
    <VStack space={2}>
      <DefaultFormInput
        placeholder="E-mail institucional"
        // placeholder="Digite seu e-mail institucional"
        value={teacher.email}
        setValue={(text) => setTeacher({ ...teacher, email: text })}
        color="#024284"
        error={inputErros.errosEmail}
      />
      <DefaultFormInput
        placeholder="Senha"
        type="password"
        // placeholder="Escolha uma senha"
        value={teacher.password}
        setValue={(text) => setTeacher({ ...teacher, password: text })}
        color="#024284"
        error={inputErros.errosPassword}
      />
      <DefaultFormInput
        placeholder="Confirmar senha"
        type="password"
        // placeholder="Digite a senha novamente"
        value={teacher.confirmPassword}
        setValue={(text) =>
          setTeacher({ ...teacher, confirmPassword: text })
        }
        color="#024284"
        error={inputErros.errosConfirmPassword}
      />
      <Text style={styles.textInfo}>* A senha precisa ter no mínimo 8 caracteres.</Text>
      <Text style={styles.textInfo}>* A senha precisa ter letras e números.</Text>
      <Text style={styles.textInfo}>* A senha não pode ter espaçamento.</Text>
    </VStack>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : StatusBar.currentHeight || 20}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "flex-start",
            paddingHorizontal: 20,
            paddingBottom: 60, // 🔹 Espaço extra pro botão não sumir
          }}
        >
          {/* HEADER */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: StatusBar.currentHeight || 10,
              marginBottom: 20,
            }}
          >
            <MaterialIcons
              onPress={() => goBack()}
              color="#024284"
              size={24}
              name="arrow-back-ios"
            />
            <Center flex={1}>
              <Image
                alt="Logo AMO"
                source={require("../../assets/logo_lightblue.png")}
                style={{ width: 60, height: 60 }}
                resizeMode="contain"
              />
            </Center>
          </View>

          {/* TÍTULO */}
          <Center mb={4}>
            <Text fontWeight="bold" color="#024284" fontSize="md">
              Cadastro 
            </Text>
          </Center>

          {/* ABAS */}
          <HStack
            mb={5}
            justifyContent="center"
            borderBottomWidth={1}
            borderColor="#ccc"
          >
            {["aluno", "professor"].map((tab) => (
              <Pressable
                key={tab}
                onPress={() => {
                  setActiveTab(tab); 
                  setInputErros({});
                }}
                style={{
                  flex: 1,
                  alignItems: "center",
                  paddingVertical: 10,
                  borderBottomWidth: 3,
                  borderBottomColor:
                    activeTab === tab ? "#024284" : "transparent",
                }}
              >
                <Text
                  fontWeight="bold"
                  fontSize={18}
                  color={activeTab === tab ? "#024284" : "#999"}
                >
                  {tab === "aluno" ? "Sou Aluno" : "Sou Professor"}
                </Text>
              </Pressable>
            ))}
          </HStack>

          {/* FORMULÁRIO FIXO */}
          <View style={{ flex: 1 }}>{activeTab === "aluno" ? AlunoForm : ProfessorForm}</View>

          {/* BOTÃO */}

          <DefaultBlueButton
            color="#024284"
            bgColor="#2599BA"
            loading={loading}
            onPress={handleSubmit}
            height={50}
            _text={{
              fontWeight: 700,
              color: "#fff",
              fontSize: "md",
            }}
          >
            {loading ? <ActivityIndicator color="#024284" /> : "Avançar"}
          </DefaultBlueButton>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
