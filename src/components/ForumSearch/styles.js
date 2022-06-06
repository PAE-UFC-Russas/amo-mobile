import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: 100
    },
    dateTimeFilterButton: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#52D6FB',
      borderRadius: 100,
      paddingLeft: 10,
      paddingRight: 10,
      height: 50,
      backgroundColor: '#fff',
      marginLeft: 13,
      marginRight: 13
    }
});

export default styles;