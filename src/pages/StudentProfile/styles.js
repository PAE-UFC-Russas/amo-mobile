import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
   container: {
      flex: 1,
      color: "#fff",
      alignItems: "center",
      justifyContent: "space-between",
      paddingTop: 50,
      paddingBottom: 50,
   },
   dateTimeButton: {
      backgroundColor: "#fff",
      borderWidth: 3,
      borderColor: "#024284",
      borderRadius: 15,
      padding: 13,
   },
   backButton: {
      position: "absolute",
      top: 18,
      left: 35,
      zIndex: 1,
   },
});

export default styles;
