import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    color: "#fff",
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
    left: 35,
    zIndex: 1,
  },
  edgeProfile: {
    justifyContent: "space-between",
    borderRadius: 20,
    maxWidth: "100%",
    marginTop: 10,
    backgroundColor: "#E5EBF2",
    elevation: 5,
  },
});

export default styles;
