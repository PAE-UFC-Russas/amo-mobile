import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    color: "#fff",
    backgroundColor: "#fff",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  addButton: {
    bottom: 25,
    right: 25,
  },
  flatListContainer: {
    width: "90%",
    marginTop: 5,
  },
  avatarBadge: {
    position: "absolute",
    backgroundColor: "#024284",
    borderRadius: 50,
    padding: 7,
    right: 20,
    bottom: 12,
  },
  buttons: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: "20%",
  },
  backButton: {
    position: "absolute",
    top: 30,
    left: 35,
    zIndex: 1,
  },
  edgeProfile: {
    borderWidth: 1,
    borderColor: "#333333",
    justifyContent: "space-between",
    borderRadius: 20,
    width: "85%",
    marginTop: 10,
    backgroundColor: "#E5EBF2",
  },
});

export default styles;
