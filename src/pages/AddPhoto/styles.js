import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        color: '#fff',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 40, 
        paddingBottom: 40
    },
    camIcon:{
        position: 'absolute',
        zIndex: 5,
        right: 100,
        backgroundColor: '#52D6FB',
        borderRadius: 25,
        padding: 10
    }
});

export default styles;