import React, { useState, useEffect } from "react";
import { Center, FormControl, Input, HStack, Text } from "native-base";
import AuthHeader from "../../components/AuthHeader";
import DefaultBlueButton from "../../components/DefaultBlueButton";
import { useAuth } from "../../contexts/auth";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";

export default function CheckCode({ route }) {
   const { navigate } = useNavigation();
   const [error, setError] = useState();
   const [code, setCode] = useState(["", "", "", "", "", ""]);
   const [timeToken, setTimeToken] = useState(10)
   const [resendToken, setResendToken] = useState(false)
   const { Active } = useAuth();

   useEffect(() => {
      if(resendToken){
         const myInterval = setInterval(() => {
            setTimeToken(prevState => {
               if(prevState > 0){
                  return prevState - 1
               }else{
                  clearInterval(myInterval);
                  setResendToken(false)
                  return 60
               }
            })
         }, 1000);
         
         return () => clearInterval(myInterval);
      }
   }, [resendToken]);

   const HandleChangeCode = (text, pos) => {
      let tempCode = code;
      tempCode[pos] = text;
      setCode(tempCode);
   };

   const CheckinputCode = async () => {
      const inputIsFilled = code.reduce((previousValue, currentValue) => {
         if (currentValue === "") return -1;
         return 1;
      });

      if (inputIsFilled > 0) {
         if (route.params !== undefined && route.params.register) {
            const activeToken = code.toString().replace(/,/g, "");
            const codeActivationMessage = await Active(activeToken);

            if (codeActivationMessage === true) {
               navigate("StudentProfile");
            } else {
               setError(codeActivationMessage);
            }
         } else {
            navigate("ChangePassword");
         }
      } else {
         setError("O campo do código não pode estar vazio!");
      }
   };

   return (
      <Center style={styles.container} bgColor="#fff">
         <AuthHeader>Inserir código</AuthHeader>
         <Center>
            <Text fontSize="md" textAlign="center" margin="10">
               Acabamos de enviar um código para seu email.
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
                           keyboardType="numeric"
                           maxLength={1}
                           onChangeText={(text) =>
                              HandleChangeCode(text, index)
                           }
                        />
                     );
                  })}
               </HStack>
               <FormControl.ErrorMessage marginX={20} alignItems="center">
                  {error}
               </FormControl.ErrorMessage>
            </FormControl>
            <Text color="tertiaryBlue" onPress={()=>setResendToken(true)}>{resendToken?`Aguarde ${timeToken} segundos para receber o código novamente.`:"Receber um novo código"}</Text>
         </Center>
         <DefaultBlueButton disabled={resendToken} onPress={CheckinputCode}>
            Verificar código
         </DefaultBlueButton>
      </Center>
   );
}
