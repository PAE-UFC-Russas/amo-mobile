import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: "#fff",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 40,
    paddingBottom: 40,
  },
  camIcon: {
    position: "absolute",
    zIndex: 5,
    right: 100,
    backgroundColor: "#024284",
    borderRadius: 25,
    padding: 10,
  },
  backButton: {
    position: "absolute",
    top: 18,
    left: 35,
    zIndex: 1,
  },
});

export default styles;
