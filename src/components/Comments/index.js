import React from "react";
import { Avatar, Text, View, ScrollView, HStack } from "native-base";
import { AntDesign } from "@expo/vector-icons";
import DateISOToFormated from "../../util/DateISOToFormated";

export default function Comments({
   comment,
   MarkResponse,
   correctResponse,
   enableMark,
}) {

   return (
      <ScrollView
         backgroundColor="#DCDCDC"
         padding="2%"
         margin={2}
         borderRadius={10}
         borderWidth={1}
         borderColor={correctResponse === comment.id ? "green" : "grey"}
         marginBottom={3}
      >
         <View style={{ flexDirection: "row" }}>
            <Avatar
               bg="tertiaryBlue"
               size="md"
               source={{
                  uri: !comment.autor.perfil.foto
                     ? "https://i.ibb.co/4f1jsPx/Splash-1.png"
                     : comment.autor.perfil.foto,
               }}
            />
            <Text marginLeft={3} fontSize={18} fontWeight="bold">
               {comment.autor.perfil.nome_exibicao}
            </Text>
         </View>
         <Text fontSize={15}>{comment.resposta}</Text>
         <View
            flexDirection="row"
            marginTop="5%"
            justifyContent="space-between"
         >
            <HStack space={2}>
               {enableMark && (
                  <AntDesign
                     name="checkcircle"
                     size={20}
                     color={correctResponse === comment.id ? "green" : "grey"}
                     onPress={() => MarkResponse(comment.id)}
                  />
               )}
            </HStack>
            <Text fontWeight="bold">{DateISOToFormated(comment.data)}</Text>
         </View>
      </ScrollView>
   );
}
