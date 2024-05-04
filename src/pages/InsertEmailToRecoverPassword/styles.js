import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: "#fff",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 40,
    backgroundColor: "#fff",
  },
  Button: {
    backgroundColor: "#52D6FB",
    width: "80%",
    height: 50,
    alignItems: "center",
    borderRadius: 20,
    flexDirection: "row",
    marginTop: 30,
    justifyContent: "center",
  },
  backButton: {
    position: "absolute",
    top: 18,
    left: 35,
    zIndex: 1,
  },
});

export default styles;
