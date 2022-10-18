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
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 11,
        },
        shadowOpacity: 0.55,
        shadowRadius: 14.78,
        elevation: 22,  
    },
    box:{
        marginRight: 20,
        marginLeft: 20,
        width:'100%', 
        height:100, 
        justifyContent:'center', 
        marginTop:5, 
    },
    status: {
        width: 15,
        height: 15,
        borderRadius: 100,
        marginLeft: 20
    }
});
export default styles;