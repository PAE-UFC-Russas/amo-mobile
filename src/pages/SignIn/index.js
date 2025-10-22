import React, { useEffect, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Image,
  ScrollView,
  View,
} from "react-native";
import { Center, Button, VStack, Flex, Text } from "native-base";
import validator from "validator";
import { useAuth } from "../../contexts/auth";
import DefaultFormInput from "../../components/DefaultFormInput";
import styles from "./styles";
import { ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function SignIn() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [keyboardIsOpen, setKeyboardIsOpen] = useState(false);
  const [userLogin, setUserLogin] = useState({ email: "", password: "" });
  const [inputErros, setInputErros] = useState({
    errosEmail: null,
    errosPassword: null,
  });
  const { IsConnected, Login } = useAuth();

  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardDidShow", () =>
      setKeyboardIsOpen(true)
    );
    const hideSub = Keyboard.addListener("keyboardDidHide", () =>
      setKeyboardIsOpen(false)
    );

    async function VerifyLogin() {
      setLoading(true);
      const connected = await IsConnected();
      if (connected) {
        navigation.reset({
          index: 0,
          routes: [{ name: "SelectCourses" }],
        });
      } else if (connected === null) {
        navigation.navigate("StudentProfile");
      }
      setLoading(false);
    }
    VerifyLogin();

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const InputValidation = async () => {
    setLoading(true);
    let erros = { errosEmail: null, errosPassword: null };

    if (userLogin.email.length < 10 || !validator.isEmail(userLogin.email)) {
      erros.errosEmail = "E-mail inválido!";
    }
    if (userLogin.password.length < 8) {
      erros.errosPassword = "A senha precisa conter 8 caracteres!";
    }

    if (!erros.errosEmail && !erros.errosPassword) {
      const response = await Login(userLogin);

      if (response) {
        if (response.erro) {
          navigation.navigate("StudentProfile");
          return;
        }
        if (response.non_field_errors) {
          setLoading(false);
          setInputErros({ errosEmail: "Email ou senha incorretos" });
          return;
        }
        if (response.username) {
          setLoading(false);
          setInputErros({ errosEmail: "Email inválido" });
          return;
        }
        if (response.password) {
          setLoading(false);
          setInputErros({ errosPassword: "Senha inválida" });
          return;
        }
      }
      navigation.reset({
        index: 0,
        routes: [{ name: "SelectCourses" }],
      });
    }
    setLoading(false);
    setInputErros(erros);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Center
          flex={1}
          bg={{
            linearGradient: { colors: ["#52D6FB", "#024284"] },
          }}
        >
          <ScrollView
            style={{ flex: 1, width: "100%" }}
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: "center",
              alignItems: "center",
              paddingBottom: keyboardIsOpen ? 50 : 0,
            }}
            keyboardShouldPersistTaps="handled"
          >
            {/* LOGO */}
            <VStack alignItems="center">
              <Image
                source={require("../../assets/logo_name1.png")}
                style={{
                  width: keyboardIsOpen ? 180 : 230,
                  height: keyboardIsOpen ? 120 : 180,
                  resizeMode: "contain",
                  marginTop: keyboardIsOpen ? 20 : 30,
                  marginBottom: 16,
                }}
              />

              <Text
                style={{
                  fontSize: 22, // 🔹 aumenta a fonte
                  fontWeight: "600",
                  color: "#cbeeffff", // tom moderno e neutro
                  marginTop: -32, //
                  marginBottom: 64, // 🔹 bem próximo da logo
                  textAlign: "center",
                }}
              >
                Ambiente de Monitoria Online
              </Text>
            </VStack>
            {/* CAMPOS */}
            <Flex
              direction="column"
              width="90%"
              p={4}
              bg="white"
              borderRadius={16}
              shadow={4}
              justifyContent="center"
            >
              <VStack space={2}>
                <DefaultFormInput
                  label="E-mail"
                  placeholder="Digite seu e-mail"
                  value={userLogin.email}
                  setValue={(text) =>
                    setUserLogin({ ...userLogin, email: text })
                  }
                  color="#024284"
                  colorFocus="#024284"
                  autoCapitalize="none"
                  error={inputErros.errosEmail}
                />

                <DefaultFormInput
                  label="Senha"
                  type="password"
                  placeholder="Digite sua senha"
                  value={userLogin.password}
                  setValue={(text) =>
                    setUserLogin({ ...userLogin, password: text })
                  }
                  color="#024284"
                  colorFocus="#024284"
                  autoCapitalize="none"
                  error={inputErros.errosPassword}
                />

                <Button
                  alignSelf="flex-end"
                  variant="unstyled"
                  onPress={() =>
                    navigation.navigate("InsertEmailToRecoverPassword")
                  }
                  _text={{
                    color: "#024284",
                    fontSize: "sm",
                    textDecorationLine: "underline",
                  }}
                >
                  Esqueceu a senha?
                </Button>
              </VStack>

              <Button
                mt={4}
                disabled={loading}
                borderRadius={12}
                bgColor="#024284"
                height={50}
                _text={{
                  fontWeight: 700,
                  color: "#fff",
                  fontSize: "md",
                }}
                onPress={InputValidation}
              >
                {loading ? <ActivityIndicator color="#fff" /> : "Entrar"}
              </Button>

              {!keyboardIsOpen && (
                <View style={{ marginTop: 20 }}>
                  <Button
                    variant="ghost"
                    onPress={() => navigation.navigate("SignUp")}
                    _text={{
                      color: "#024284",
                      fontSize: 16,
                      textDecorationLine: "underline",
                      fontWeight: 500,
                    }}
                  >
                    Cadastrar-se
                  </Button>

                  <Button
                    variant="unstyled"
                    onPress={() => navigation.navigate("About")}
                    _text={{
                      color: "#024284",
                      fontWeight: 400,
                      textDecorationLine: "underline",
                    }}
                  >
                    Sobre o aplicativo
                  </Button>
                </View>
              )}
            </Flex>
          </ScrollView>
        </Center>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
