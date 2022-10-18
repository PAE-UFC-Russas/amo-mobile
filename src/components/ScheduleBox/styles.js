import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container:{
        flex:1,
        height:100,
        flexDirection:'row', 
        alignItems:"center",
        width:'100%',
        backgroundColor:'whitesmoke',
        borderRadius:15,
        padding:25,
        marginTop:'3%', 
        justifyContent:'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 11,
        },
        shadowOpacity: 0.55,
        shadowRadius: 14.78,
        elevation: 22,  
    },
    box:{
        marginRight:30,
        width:'100%', 
        height:100, 
        padding:20, 
        justifyContent:'center', 
        marginTop:5, 
    },
    status: {
        width: 20,
        height: 20,
        borderRadius: 100
    }
});
export default styles;