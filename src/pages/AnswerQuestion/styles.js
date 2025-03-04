import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: "space-around",
  },
  title: {
    fontSize: 20,
    color: "#024284",
    fontFamily: "Roboto",
    textAlign: "center",
    marginLeft: "20%",
    fontWeight: "bold",
  },
  textDoubt: {
    fontSize: 16,
    marginBottom: 12,
  },
  textDate: {
    alignSelf: "flex-end",
    marginRight: 15,
  },
});

export default styles;
