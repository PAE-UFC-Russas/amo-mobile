import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    edgeProfile:{
        backgroundColor:'#ddd', 
        paddingHorizontal:'5%',
        paddingVertical:'5%', 
        borderRadius:20, 
        height:'49%'
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
        marginVertical:'20%'
    },

});

export default styles;
