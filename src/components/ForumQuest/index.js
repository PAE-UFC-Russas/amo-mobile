import { TouchableOpacity, View } from "react-native";
import { Avatar, Box, HStack, IconButton, Text } from "native-base";
import { AntDesign } from "@expo/vector-icons";
import ImageModal from "react-native-image-modal";
import ForumQuestionMenu from "../ForumQuestionMenu";
import DateISOToFormated from "../../util/DateISOToFormated";

export default function ForumQuest(
  quest,
  navigation,
  PostLike,
  DeleteLike,
  setConfirmDeleteQuest,
  setReportQuest,
  monitores
) {
  function getCurrentCargo() {
    if (
      quest.autor.cargos.filter((cargo) => cargo.toLowerCase() === "professor")
        .length > 0
    ) {
      return "Professor";
    } else {
      if (monitores.find((obj) => obj.id == quest.autor.id)) {
        return "Monitor";
      } else {
        return "Aluno";
      }
    }
  }

  return (
    <Box marginTop="3" width="5/6" justifyContent="space-between">
      <HStack space="2">
        <Avatar
          bg="tertiaryBlue"
          size="md"
          source={{
            uri: !quest.autor.perfil.foto ? null : quest.autor.perfil.foto,
          }}
        />
        <View style={{ width: "100%" }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("AnswerQuestion", quest)}
          >
            <HStack marginBottom={1} justifyContent="space-between">
              <View>
                <Text fontWeight="extrabold">
                  {quest.autor.perfil.nome_exibicao}
                </Text>
                <Text fontWeight="light">{getCurrentCargo()}</Text>
              </View>
              <ForumQuestionMenu
                id={quest.id}
                author={quest.autor.id}
                setConfirmDeleteQuest={setConfirmDeleteQuest}
                setReportQuest={setReportQuest}
              />
            </HStack>
            <Text fontWeight="semibold" numberOfLines={2}>
              {quest.titulo}
            </Text>
            <Text fontWeight="light">{quest.descricao}</Text>
          </TouchableOpacity>
          {!!quest.content && (
            <ImageModal
              resizeMode="contain"
              imageBackgroundColor="#fff"
              alt="Conteúdo da dúvida"
              style={{
                width: 340,
                height: 340,
              }}
              source={{
                uri: quest.content,
              }}
            />
          )}
          <HStack justifyContent="space-between">
            <Box alignItems="center" flexDirection="row">
              <Text>{quest.votos}</Text>
              <IconButton
                bgColor="#fff"
                onPress={() =>
                  quest.votou ? DeleteLike(quest.id) : PostLike(quest.id)
                }
                icon={
                  <AntDesign
                    color={quest.votou > 0 ? "#024284" : "#808080"}
                    size={20}
                    name={quest.votou > 0 ? "like1" : "like2"}
                  />
                }
              />
              <Text marginLeft={3}>{quest.quantidade_comentarios}</Text>
              <IconButton
                onPress={() => navigation.navigate("AnswerQuestion", quest)}
                icon={<AntDesign color="#808080" size={20} name="message1" />}
              />
            </Box>
            <Text fontSize="xs" fontWeight="thin">
              {DateISOToFormated(quest.data)}
            </Text>
          </HStack>
        </View>
      </HStack>
    </Box>
  );
}
