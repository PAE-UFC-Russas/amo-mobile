import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
   container: {
      color: "#fff",
      backgroundColor: "#fff",
      width: "100%",
      height: "100%",
      alignItems: "center",
      justifyContent: "center",
      alignSelf: "center",
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
      backgroundColor: "#52D6FB",
      borderRadius: 50,
      padding: 7,
      right: 20,
      bottom: 12,
   },
   buttons: {
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      marginTop: "20%",
   },
});

export default styles;
