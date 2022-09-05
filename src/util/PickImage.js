import * as ImagePicker from 'expo-image-picker';

export default async function PickImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1
    });

    if(!result.cancelled)
        return result.uri
    else
        return null
}

export async function LaunchCamera(){
    const cam = await ImagePicker.launchCameraAsync();
    
    if(cam.cancelled){
        return null;
    }else{
        return cam;
    }
}