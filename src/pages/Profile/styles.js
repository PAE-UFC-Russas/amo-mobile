import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
   container: {
      flex: 1,
      color: "#fff",
      justifyContent: "center",
      alignItems: "center",
   },
   edgeProfile: {
      borderWidth: 1,
      borderColor: "#333333",
      justifyContent: "space-around",
      borderRadius: 20,
      height: "49%",
      width: "85%",
      marginTop: 10,
      backgroundColor: "#E5EBF2",
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
      justifyContent: "center",
      alignItems: "center",
   },
   backButton: {
      position: "absolute",
      top: 25,
      left: 35,
      zIndex: 1,
   },
});

export default styles;
