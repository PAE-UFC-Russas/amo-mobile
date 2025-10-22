import { TouchableOpacity, View, StyleSheet } from "react-native";
import { Avatar, HStack, IconButton, Text } from "native-base";
import { AntDesign, Feather } from "@expo/vector-icons";
import ImageModal from "react-native-image-modal";
import DotsMenu from "../DotsMenu";
import DateISOToFormated from "../../util/DateISOToFormated";

export default function ForumQuest(
   quest,
   handleNavigation,
   PostLike,
   DeleteLike,
   setConfirmDelete,
   setReportQuest,
   setUpdateQuestion,
   monitores,
   professores
) {
   function getCurrentCargo() {
      if (
         quest.autor.cargos.filter(
            (cargo) => cargo.toLowerCase() === "professor"
         ).length > 0 ||
         professores.find((obj) => obj.id == quest.autor.id)
      ) {
         return "(Professor) 🦉";
      } else if (monitores.find((obj) => obj.id == quest.autor.id)) {
         return "(Monitor) 👨‍🏫";
      } else {
         return "";
      }
   }

   function truncateString(str) {
      const maxLength = 200;
      return str.length > maxLength ? str.slice(0, maxLength) + "..." : str;
   }

   return (
      <View
         style={[
            styles.boxWithShadow,
            quest.resposta_correta.length > 0 && styles.boxAnswered,
         ]}
      >
         {/* Header */}
         <View style={styles.headerContainer}>
            {/* Avatar canto superior esquerdo */}
            <Avatar
               bg="tertiaryBlue"
               size="md"
               source={{
                  uri: quest.autor.perfil.foto || null,
               }}
               style={styles.avatar}
            />

            {/* Nome centralizado */}
            <Text
               style={styles.nameText}
               numberOfLines={2}
               ellipsizeMode="tail"
            >
               {quest.autor.perfil.nome_exibicao}
            </Text>

            {/* Três pontinhos canto direito */}
            <View style={styles.menuContainer}>
               <DotsMenu
                  setConfirmDelete={setConfirmDelete}
                  setConfirmReport={setReportQuest}
                  setUpdate={setUpdateQuestion}
                  author={quest.autor.id}
                  id={quest.id}
                  quest={quest}
               />
            </View>
         </View>
         {/* Cargo */}
         <Text style={styles.cargoText}>{getCurrentCargo()}</Text>
         {/* Status Respondida */}




         {/* Corpo */}
         <View style={styles.AnswerContainer}>
            <TouchableOpacity
               onPress={() => handleNavigation("AnswerQuestion", quest)}
            >
               <Text
                  fontWeight="semibold"
                  numberOfLines={2}
                  marginBottom={2}
                  fontSize={14}
                  color={"#002B57"}
               >
                  {quest.titulo}
               </Text>

               

               <Text marginTop={2} fontSize={12} color={"#484849ff"}>
                  {truncateString(quest.descricao)}
               </Text>

               <View style={styles.line} />
            </TouchableOpacity>
         </View>

         {/* Imagem */}
         {!!quest.content && (
            <ImageModal
               resizeMode="contain"
               imageBackgroundColor="#fff"
               alt="Conteúdo da dúvida"
               style={{
                  width: "100%",
                  height: 300,
                  borderRadius: 10,
                  marginTop: 10,
               }}
               source={{
                  uri: quest.content,
               }}
            />
         )}

         {/* Rodapé */}
         {/* Rodapé */}
         <View style={styles.footer}>
            <Text style={styles.dateText}>{DateISOToFormated(quest.data)}</Text>

            {quest.resposta_correta.length > 0 && (
               <View style={styles.answeredBadge}>
                  <Feather name="check-circle" size={14} color="white" />
                  <Text style={styles.answeredText}>Respondida</Text>
               </View>
            )}

            <HStack alignItems="center" space={1}>
               <Text style={styles.iconCount}>{quest.votos}</Text>
               <IconButton
                  onPress={() =>
                     quest.votou ? DeleteLike(quest.id) : PostLike(quest.id)
                  }
                  icon={
                     <AntDesign
                        color={quest.votou > 0 ? "#024284" : "#808080"}
                        size={18}
                        name={quest.votou > 0 ? "like1" : "like2"}
                     />
                  }
                  _pressed={{ opacity: 0.6 }}
               />
               <Text style={styles.iconCount}>{quest.quantidade_comentarios}</Text>
               <IconButton
                  onPress={() => handleNavigation("AnswerQuestion", quest)}
                  icon={<AntDesign color="#808080" size={18} name="message1" />}
                  _pressed={{ opacity: 0.6 }}
               />
            </HStack>
         </View>

      </View>
   );
}

const styles = StyleSheet.create({
   boxWithShadow: {
      width: "90%",
      alignSelf: "center",
      borderRadius: 10,
      backgroundColor: "white",
      marginTop: "5%",
      marginBottom: "2%",
      padding: "3%",
      shadowColor: "#000",
      shadowOffset: { width: 5, height: 5 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 5,
      position: "relative",
   },
   boxAnswered: {
      backgroundColor: "#D6F5D6", // verde claro quando respondida
   },
   headerContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
      marginBottom: 5,
   },
   avatar: {
      position: "absolute",
      left: 0,
      top: 0,
   },
   menuContainer: {
      position: "absolute",
      right: 0,
      top: 0,
   },
   nameText: {
      flex: 1,
      textAlign: "center",
      color: "#002B57",
      fontSize: 15,
      fontWeight: "600",
      marginHorizontal: 40,
      flexWrap: "wrap",
   },
   cargoText: {
      textAlign: "center",
      color: "#555",
      fontSize: 12,
      marginBottom: 5,
   },
   answeredBadge: {
      flexDirection: "row",
      alignSelf: "center",
      backgroundColor: "#2ECC71",
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 20,
      alignItems: "center",
      gap: 6,
      marginBottom: 8,
   },
   answeredText: {
      color: "white",
      fontSize: 12,
      fontWeight: "bold",
   },
   AnswerContainer: {
      marginTop: 5,
   },
   line: {
      borderBottomWidth: 0.5,
      borderColor: "#002B57",
      width: "100%",
      marginVertical: 12,
   },
   footer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 2,
      flexWrap: "wrap", // evita vazamento em telas menores
   },

   dateText: {
      fontSize: 11,
      fontWeight: "400",
      color: "#555",
   },

   answeredBadge: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#2ECC71",
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 20,
      gap: 5,
   },

   answeredText: {
      color: "white",
      fontSize: 11,
      fontWeight: "bold",
   },

   iconCount: {
      fontSize: 12,
      color: "#333",
   },
});
