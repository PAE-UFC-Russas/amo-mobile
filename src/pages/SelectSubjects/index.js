import React, { useState, useEffect, useCallback } from "react";
import {
   Button,
   Center,
   VStack,
   Input,
   Spinner,
   View,
   Image,
   Text,
   FlatList,
} from "native-base";
import { ScrollView } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { GetLoginToken } from "../../util/StorageLogin";
import api from "../../services/api";
import styles from "./styles";
import { useSubject } from "../../contexts/subject";

export default function SelectSubjects() {
   const [loading, setLoading] = useState(true);
   const [subjects, setSubjects] = useState([]);
   const [filterMonitoria, setFilterMonitoria] = useState("");
   const { navigate, goBack } = useNavigation();
   const { EditSubject, course } = useSubject();

   function handleNavigate(item) {
      navigate("ForumDrawer");
      EditSubject(item);
   }

   const fetchSubjects = useCallback(async () => {
      try {
         setLoading(true);
         const response = await api.get(
            `/disciplinas/?pages=1&search=${filterMonitoria}&cursos=${course.id}`,
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
   }, [filterMonitoria, course.id]);

   useEffect(() => {
      const delayDebounceFn = setTimeout(() => {
         fetchSubjects();
      }, 300);

      return () => clearTimeout(delayDebounceFn);
   }, [filterMonitoria, fetchSubjects]);

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
               color="#024284"
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
            Selecione a monitoria
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
         <ScrollView>
            <VStack
               space="3"
               width="100%"
               alignItems="center"
               justifyContent={"center"}
               marginTop="2%"
            >
               {loading ? (
                  <Spinner marginTop="auto" marginBottom="auto" size="lg" />
               ) : (
                  subjects
                     .sort((a, b) => a.nome.localeCompare(b.nome))
                     .map((item, index) => (
                        <Button
                           key={index}
                           bgColor="#0092BB"
                           borderRadius="2xl"
                           width={"90%"}
                           height={60}
                           onPress={() => handleNavigate(item)}
                           _text={{
                              fontWeight: 800,
                              color: "#fff",
                              textAlign: "center",
                           }}
                        >
                           {item.nome}
                        </Button>
                     ))
               )}
            </VStack>
         </ScrollView>
      </Center>
   );
}
