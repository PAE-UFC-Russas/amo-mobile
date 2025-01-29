import React, { useState, useEffect, useRef } from "react";
import {
  Center,
  FormControl,
  Input,
  HStack,
  Text,
  Spinner,
  Button,
} from "native-base";
import AuthHeader from "../../components/AuthHeader";
import DefaultBlueButton from "../../components/DefaultBlueButton";
import { useAuth } from "../../contexts/auth";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";
import api from "../../services/api";

export default function CheckCode({ route }) {
  const { navigate } = useNavigation();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [timeToken, setTimeToken] = useState(60);
  const refs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];
  const { Active, Register, user } = useAuth();

  useEffect(() => {
    const timerId = setInterval(() => {
      setTimeToken((prevTimeToken) =>
        prevTimeToken > 0 ? prevTimeToken - 1 : 0
      );
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  const sendRecoverPassword = async () => {
    await api.post("/usuario/solicitar-redefinicao-senha/", {
      email: route.params.email,
    });
  };

  const resendToken = async () => {
    if (timeToken === 0) {
      try {
        if (route?.params !== undefined && route.params.register) {
          await Register({ email: user.email, password: user.password });
        } else if (route.params.email) {
          await sendRecoverPassword();
        }
      } catch (error) {
        console.log(error);
        setError("Erro ao enviar o código, tente novamente mais tarde.");
      } finally {
        setTimeToken(60);
      }
    }
  };

  const TextResendToken = () => {
    if (timeToken > 0) {
      return `Aguarde ${timeToken} segundos para receber o código novamente.`;
    } else {
      return "Receber um novo código";
    }
  };

  const HandleChangeCode = (text, pos) => {
    let tempCode = code;
    tempCode[pos] = typeof text === "string" ? text.toLowerCase() : text;
    setCode(tempCode);

    if (text !== "" && pos < 5) {
      refs[pos + 1].current.focus();
    }
  };

  const handleKeyDown = (index, event) => {
    if (
      event.nativeEvent.key === "Backspace" &&
      code[index] === "" &&
      index > 0
    ) {
      refs[index - 1].current.focus();
    }
  };

  const CheckinputCode = async () => {
    setLoading(true);
    const inputIsFilled = code.reduce((previousValue, currentValue) => {
      if (currentValue === "") return -1;
      return 1;
    });

    if (inputIsFilled > 0) {
      const activeToken = code.toString().replace(/,/g, "");
      if (route.params !== undefined && route.params.register) {
        const codeActivationMessage = await Active(activeToken);

        if (codeActivationMessage === true) {
          navigate("StudentProfile");
        } else {
          setError(codeActivationMessage);
        }
      } else {
        try {
          await api.post("/usuario/verificar-token/", {
            token: activeToken,
          });
          navigate("ChangePassword");
        } catch (error) {
          console.log(error.response);
          setError("Token inválido!");
        }
      }
    } else {
      setError("O campo do código não pode estar vazio!");
    }
    setLoading(false);
  };

  return (
    <Center style={styles.container} bgColor="#fff">
      <AuthHeader>Inserir código</AuthHeader>
      <Center>
        <Text fontSize="md" textAlign="center" margin="10">
          Insira o código que foi enviado para seu email.
        </Text>
        <FormControl isInvalid={!!error}>
          <HStack style={styles.codeInputs} width="full" space={1}>
            {code.map((element, index) => {
              return (
                <Input
                  key={index}
                  width="12"
                  borderRadius="2xl"
                  textAlign="center"
                  fontSize="sm"
                  placeholderTextColor="tertiaryBlue"
                  selectionColor="tertiaryBlue"
                  color="tertiaryBlue"
                  borderColor="tertiaryBlue"
                  maxLength={1}
                  onChangeText={(text) => HandleChangeCode(text, index)}
                  onKeyPress={(e) => handleKeyDown(index, e)}
                  ref={refs[index]}
                />
              );
            })}
          </HStack>
          <FormControl.ErrorMessage marginX={20} alignItems="center">
            {error}
          </FormControl.ErrorMessage>
        </FormControl>
        <Button
          variant="ghost"
          color="tertiaryBlue"
          onPress={() => resendToken()}
        >
          {TextResendToken()}
        </Button>
      </Center>
      <DefaultBlueButton disabled={loading} onPress={CheckinputCode}>
        {loading ? <Spinner size="sm" color="#ffffff" /> : "Enviar"}
      </DefaultBlueButton>
    </Center>
  );
}
