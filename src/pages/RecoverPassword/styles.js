import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
   container: {
      flex: 1,
      color: "#fff",
      alignItems: "center",
      justifyContent: "space-between",
      paddingBottom: 50,
   },
   backButton: {
      position: "absolute",
      top: 50,
      left: 35,
      zIndex: 1,
      marginTop: 5,
   },
});

export default styles;
