import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container:{
        flex:1,
        height:'100%',
        flexDirection:'row', 
        alignItems:"center",
    },
    box:{
        width:'80%', 
        height:100, 
        backgroundColor:'whitesmoke', 
        padding:20, 
        justifyContent:"center", 
        marginTop:20, 
        marginLeft:30, 
        borderRadius:15,
    },
    status: {
        width: 5,
        height: 5,
        borderRadius: 100
    }
});

export default styles;