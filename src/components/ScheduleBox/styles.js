import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
   container: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      height: 100,
      backgroundColor: "#fff",
      borderRadius: 15,
      marginTop: "3%",
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 5,
   },
   box: {
      width: "100%",
      height: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 8
   },
   infoArea: {
      flexDirection: "column",
      justifyContent: "flex-start",
      height: "100%",
   },
   status: {
      width: "3%",
      height: "100%",
      backgroundColor:"#FFD749",
      borderTopLeftRadius: 15,
      borderBottomLeftRadius: 15
   },
   typeText: {
      fontSize: 16,
      fontWeight: "bold",
      textAlign: "center"
   }
});
export default styles;
