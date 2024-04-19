import React, { useState, useEffect } from "react";
import {
   Button,
   Center,
   VStack,
   Input,
   Spinner,
   View,
   Image,
   Text,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AuthHeader from "../../components/AuthHeader";
import { GetLoginToken } from "../../util/StorageLogin";
import api from "../../services/api";
import styles from "./styles";

export default function SelectSubjects({ route }) {
   const [loading, setLoading] = useState(true);
   const [subjects, setSubjects] = useState([]);
   const [filterMonitoria, setFilterMonitoria] = useState("");
   const { navigate, goBack } = useNavigation();

   useEffect(() => {
      async function GetSubjects() {
         try {
            setLoading(true);
            const response = await api.get(
               `/disciplinas/?pages=1&search=${filterMonitoria}&cursos=${route.params}`,
               {
                  headers: {
                     Authorization: "Token " + (await GetLoginToken()),
                  },
               }
            );

            setLoading(false);
            setSubjects(response.data.results);
         } catch (error) {
            console.log(error.response.data);
         }
      }

      GetSubjects();
   }, [filterMonitoria]);

   return (
      <Center style={styles.container} bgColor="#fff">
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
            marginBottom={7}
            fontWeight="bold"
            color="#024284"
            fontSize="md"
         >
            Selecione o curso que a monitoria pertence:
         </Text>
         <Input
            placeholder="Pesquisar monitorias..."
            value={filterMonitoria}
            onChangeText={(text) => setFilterMonitoria(text)}
            width="5/6"
            borderRadius="full"
            borderColor="#024284"
            color="#024284"
            marginBottom="2"
            borderWidth={2}
            InputLeftElement={
               <MaterialIcons
                  color="#024284"
                  size={32}
                  name="search"
                  style={{ marginHorizontal: 10 }}
               />
            }
         />
         <VStack space="3" width="100%" alignItems="center" marginTop="2%">
            {loading ? (
               <Spinner marginTop="auto" marginBottom="auto" size="lg" />
            ) : (
               subjects.map((item, index) => {
                  return (
                     <Button
                        key={index}
                        bgColor="#0092BB"
                        borderRadius="2xl"
                        width={"80%"}
                        height={60}
                        onPress={() => navigate("ForumDrawer", item)}
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
      </Center>
   );
}
