import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 50,
    paddingBottom: 50,
  },
  title: {
    fontSize: 20,
    color: "#024284",
    fontFamily: "Roboto",
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 25,
    paddingLeft: "35%",
    marginTop: 6,
  },
  descriptionTitle: {
    fontSize: 13,
    fontFamily: "Roboto",
    flexWrap: "wrap",
    width: "80%",
    marginLeft: 35,
  },
  description: {
    height: 100,
    fontSize: 13,
    width: 230,
    fontFamily: "Roboto",
    marginLeft: 35,
  },
  InputTitle: {
    width: 250,
    height: 45,
    marginTop: 170,
    marginLeft: 23,
    borderRadius: 15,
  },
  InputDesc: {
    width: 200,
    height: 122,
    marginTop: 236,
    marginLeft: 23,
    borderRadius: 15,
    color: "#024284",
    backgroundColor: "#024284",
    borderColor: "#024284",
  },
});

export default styles;
