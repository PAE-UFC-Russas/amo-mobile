import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        color: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 50,
        paddingBottom: 50
    }, 
    title:{
        fontSize:20,
        color:'#52D6FB',
        fontFamily:'Roboto',
        textAlign:'center',
        fontWeight:'bold'
    },
    InputTitle:{
        width:250,
        height:45,
        marginTop:170,
        marginLeft:23,
        borderRadius:15
    },
    InputDesc:{
        width:200,
        height:122,
        marginTop:236,
        marginLeft:23,
        borderRadius:15,
        color:'#52D6FB',
        backgroundColor:'#52D6FB',
        borderColor:'#52D6FB',
        
    }
});

export default styles;