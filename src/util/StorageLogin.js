import AsyncStorage from '@react-native-async-storage/async-storage';

export async function StoreLoginToken(token){
    try {
        await AsyncStorage.setItem('user_token', token);
    } catch (e) {
        console.log('Error', e);
    }
}

export async function DeleteLoginToken(){
    try {
        const token = await AsyncStorage.removeItem('user_token');
        return token;
    } catch (e) {
        console.log('Error', e);
    }
}

export async function GetLoginToken(){
    try {
        const token = await AsyncStorage.getItem('user_token');
        return token;
    } catch (e) {
        console.log('Error', e);
    }
}