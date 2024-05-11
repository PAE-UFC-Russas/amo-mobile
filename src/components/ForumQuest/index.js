import { TouchableOpacity, View, StyleSheet } from "react-native";
import { Avatar, HStack, IconButton, Text } from "native-base";
import { AntDesign } from "@expo/vector-icons";
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
  monitores
) {
  function getCurrentCargo() {
    if (
      quest.autor.cargos.filter((cargo) => cargo.toLowerCase() === "professor")
        .length > 0
    ) {
      return "";
    } else {
      if (monitores.find((obj) => obj.id == quest.autor.id)) {
        return "";
      } else {
        return "";
      }
    }
  }

  function truncateString(str) {
    const maxLength = 200;

    if (str.length > maxLength) {
      return str.slice(0, maxLength) + "...";
    } else {
      return str;
    }
  }

  return (
    <View style={styles.boxWithShadow}>
      <HStack justifyContent="space-between">
        <HStack>
          <Avatar
            top={-26}
            zIndex={1}
            bg="tertiaryBlue"
            size="lg"
            source={{
              uri: !quest.autor.perfil.foto ? null : quest.autor.perfil.foto,
            }}
          />

          <Text
            fontSize={16}
            fontWeight={400}
            color={"#002B57"}
            paddingLeft="2%"
          >
            {quest.autor.perfil.nome_exibicao.split(" ")[0]}{" "}
            {quest.autor.perfil.nome_exibicao.split(" ")[1]}
          </Text>
          <Text fontWeight="light">{getCurrentCargo()}</Text>
        </HStack>
        <View>
          <DotsMenu
            id={quest.id}
            author={quest.autor.id}
            setConfirmDelete={setConfirmDelete}
            setConfirmReport={setReportQuest}
          />
        </View>
      </HStack>

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

          <View style={styles.line} />

          <Text marginTop={2} fontSize={12} color={"#524F4F"}>
            {truncateString(quest.descricao)}
          </Text>
        </TouchableOpacity>
      </View>
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

      <View style={styles.buttonContainer}>
        <View style={{ paddingTop: "5%" }}>
          <Text fontSize="xs" fontWeight="thin">
            {DateISOToFormated(quest.data)}
          </Text>
        </View>

        <HStack alignItems="center">
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
          <Text>{quest.quantidade_comentarios}</Text>
          <IconButton
            onPress={() => handleNavigation("AnswerQuestion", quest)}
            icon={<AntDesign color="#808080" size={20} name="message1" />}
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
    padding: "2%",
    shadowColor: "#000",
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 7, // Esta propriedade é necessária para Android
  },
  AnswerContainer: {},
  line: {
    borderBottomWidth: 1,
    borderColor: "black", // Cor da linha
    width: "100%", // Largura da linha
    color: "#002B57",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
