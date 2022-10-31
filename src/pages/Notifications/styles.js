import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container:{
        flex: 1,
        paddingTop: 40,
        padding: 20,
        
    },
    title:{
        fontSize: 20,
        color: '#52D6FB',
        fontFamily: 'Roboto',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    textoNotificacao: {
        fontSize:30,
        marginRight:10,
    },
    newNotifications: {
        fontSize: 16,
        fontWeight: '300',
        color: '#000',
        margin: 5,
        marginBottom: 15
    },
    todayText:{
        fontSize: 25,
        marginTop: 15,
        color: '#52D6FB'
    },
    textoNessaSemana:{
        fontSize:25,
        padding:20,
        color:'#52D6FB'
    }
});

export default styles;