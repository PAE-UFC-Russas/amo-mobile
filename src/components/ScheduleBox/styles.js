import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container:{
        height:100,
        flexDirection:'row', 
        alignItems:'center',
        width:'95%',
        backgroundColor:'whitesmoke',
        borderRadius:15,
        padding:25,
        marginTop:'3%', 
        justifyContent:'center',
        shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,
    },
    box:{
        marginRight: 20,
        marginLeft: 20,
        marginTop: 5,
        width: '100%', 
        height: 100, 
        flexDirection: 'row',
        justifyContent: 'space-between', 
        alignItems: 'center'
    },
    status: {
        width: 10,
        height: 10,
        borderRadius: 100,
        marginLeft: 20
    },
    hourText:{
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    }
});
export default styles;