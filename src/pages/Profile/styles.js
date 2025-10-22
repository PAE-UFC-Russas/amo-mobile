import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "#F5F7FA",
      alignItems: "center",
      justifyContent: "flex-start",
   },
   header: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 20,
      paddingTop: 20,
      paddingBottom: 10,
      backgroundColor: "#fff",
      elevation: 3,
      width: "100%",
   },
   headerTitle: {
      flex: 1,
      textAlign: "center",
      fontSize: 20,
      fontWeight: "bold",
      color: "#024284",
   },
   badge: {
      position: "absolute",
      bottom: -10,
      right: width / 2 - 50,
      backgroundColor: "#024284",
      paddingHorizontal: 12,
      paddingVertical: 4,
      borderRadius: 15,
      elevation: 3,
   },
   badgeText: {
      color: "#fff",
      fontWeight: "bold",
      fontSize: 12,
   },
   infoCard: {
      width: width * 0.9,
      backgroundColor: "#fff",
      borderRadius: 15,
      paddingVertical: 15,
      paddingHorizontal: 20,
      elevation: 3,
      marginTop: 15,
   },
   infoRow: {
      marginBottom: 12,
   },
   infoLabel: {
      fontSize: 14,
      fontWeight: "600",
      color: "#024284",
      marginBottom: 4,
   },
   infoValue: {
      fontSize: 16,
      color: "#333",
      flexWrap: "wrap",
   },
   buttonsContainer: {
      marginTop: 20,
      width: width,
      alignItems: "center",
   },
   primaryButton: {
      backgroundColor: "#2599BA",
      width: "50%",
      borderRadius: 10,
      justifyContent: "center",
   },
   linkButton: {
      color: "#024284",
      textDecorationLine: "underline",
      fontWeight: "500",
   },
});

export default styles;
