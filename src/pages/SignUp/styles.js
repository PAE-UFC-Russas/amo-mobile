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
   textInfo: {
      fontWeight: "200",
   },
   backButton: {
      position: "absolute",
      top: 70,
      left: 35,
      zIndex: 1,
   },
});

export default styles;
