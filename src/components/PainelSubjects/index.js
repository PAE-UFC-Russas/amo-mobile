import { TouchableOpacity, View, StyleSheet } from "react-native";
import { Avatar, HStack, IconButton, Text } from "native-base";
import { AntDesign, Feather } from "@expo/vector-icons";
import ImageModal from "react-native-image-modal";
import DotsMenu from "../DotsMenu";
import DateISOToFormated from "../../util/DateISOToFormated";

export default function PainelSubjects(
    subject,
) {

    function truncateString(str) {
        const maxLength = 200;
        return str.length > maxLength ? str.slice(0, maxLength) + "..." : str;
    }
    console.log(subject)
    return (
       <Text>{subject}</Text>
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
