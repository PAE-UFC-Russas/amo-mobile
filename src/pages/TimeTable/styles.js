import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "grey",
  },
  title: {
    fontSize: 20,
    color: "#024284",
    fontFamily: "Roboto",
    textAlign: "center",
    fontWeight: "bold",
  },
  containerImg: {
    width: "100%",
    flexDirection: "row",
    padding: 20,
    marginTop: 40,
    gap: 10,
  },

  containerData: {
    padding: 30,
  },

  textSimple: {
    fontSize: 16,
    color: "black",
    fontFamily: "Roboto",
  },

  textTitle: {
    fontSize: 18,
    color: "#024284",
    fontFamily: "Roboto",
    fontWeight: "bold",
  },
});

export default styles;
