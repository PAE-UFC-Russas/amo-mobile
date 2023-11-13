import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    edgeProfile:{
        borderWidth:2,
        borderColor:'#52D6FB',
        paddingHorizontal:'5%',
        justifyContent:"center",
        borderRadius:20, 
        height:'49%',
        marginHorizontal:'3%',
        

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
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },

});

export default styles;
