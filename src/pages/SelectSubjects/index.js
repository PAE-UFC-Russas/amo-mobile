import React, { useState, useEffect } from "react";
import { Button, Center, VStack, Input, Spinner } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import AuthHeader from "../../components/AuthHeader";
import { GetLoginToken } from "../../util/StorageLogin";
import api from "../../services/api";
import styles from "./styles";

export default function SelectSubjects({ navigation }) {
   const [loading, setLoading] = useState(true);
   const [subjects, setSubjects] = useState([]);
   const [filterMonitoria, setFilterMonitoria] = useState("");

   useEffect(() => {
      async function GetSubjects() {
         try {
            setLoading(true);
            const response = await api.get(
               `/disciplinas/?pages=1&search=${filterMonitoria}`,
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
         <AuthHeader>Selecione a monitoria</AuthHeader>
         <Input
            placeholder="Pesquisar monitorias..."
            value={filterMonitoria}
            onChangeText={(text) => setFilterMonitoria(text)}
            width="5/6"
            borderRadius="full"
            borderColor="#52D6FB"
            color="#52D6FB"
            marginBottom="2"
            InputLeftElement={
               <MaterialIcons
                  color="#52D6FB"
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
                        bgColor="tertiaryBlue"
                        borderRadius="2xl"
                        width={"80%"}
                        height={60}
                        onPress={() => navigation.navigate("ForumDrawer", item)}
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
