import React from "react";
import { Image, View, Text, VStack } from "native-base";
import { TouchableOpacity, Linking } from "react-native";
import { MaterialIcons, EvilIcons } from "@expo/vector-icons";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";

export default function About() {
   const { goBack } = useNavigation();
   return (
      <>
         <View
            backgroundColor="#fff"
            flexDirection="row"
            justifyContent="space-between"
         >
            <MaterialIcons
               onPress={() => goBack()}
               color="#52D6FB"
               size={24}
               name="arrow-back-ios"
               style={{ marginLeft: "5%", marginTop: 50 }}
            />
         </View>
         <View style={styles.container} bgColor="#fff">
            <VStack>
               <Image
                  width={400}
                  height={350}
                  alt="Ilustração da tela about"
                  source={require("../../assets/About_img.png")}
               />
               <View alignItems="center">
                  <Text marginX={8}>
                     Bem-vindo ao nosso aplicativo de monitoria online! Aqui,
                     você pode contar com a ajuda dos monitores para tirar suas
                     dúvidas e aprimorar seu aprendizado. Estamos prontos para
                     ajudá-lo a entender e dominar qualquer assunto. Nosso
                     aplicativo é fácil de usar e muito intuitivo.
                  </Text>
               </View>
            </VStack>
            <View width="100%" alignItems="center">
               <TouchableOpacity
                  onPress={() =>
                     Linking.openURL("https://github.com/PAE-UFC-Russas")
                  }
                  style={styles.Button}
               >
                  <Text
                     color={"#fff"}
                     justifyContent="center"
                     fontWeight="bold"
                  >
                     GitHub
                  </Text>
                  <EvilIcons
                     color="#fff"
                     size={30}
                     name="external-link"
                     style={{ marginLeft: 10 }}
                  />
               </TouchableOpacity>
               <Image
                  width={30}
                  height={60}
                  alt="Identidade Visual UFC"
                  source={require("../../assets/ufc.png")}
                  marginTop={2}
                  marginBottom={5}
               />
            </View>
         </View>
      </>
   );
}
