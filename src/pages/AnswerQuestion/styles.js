import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
   container: {
      padding: 100,
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
      marginTop: 10,
      marginBottom: 23,
   },
   textDate: {
      alignSelf: "flex-end",
      marginRight: 15,
      color: "#002B57",
      fontWeight: 500,
   },
});

export default styles;
