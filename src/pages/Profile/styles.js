import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        color: '#fff',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 5,
    },
    edgeProfile:{
        backgroundColor:'#ddd', 
        paddingHorizontal:'5%',
        paddingVertical:'5%', 
        borderRadius:20, 
        height:'60%'
    },
    avatarBadge: {
        position: 'absolute',
        backgroundColor: '#52D6FB',
        borderRadius: 50,
        padding: 7,
        right: 20,
        bottom: 12
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical:'10%'
    },

});

export default styles;
