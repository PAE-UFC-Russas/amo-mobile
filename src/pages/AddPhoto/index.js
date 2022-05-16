import React, { useState } from 'react';
import { Button, Center, Image } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons'; 
import * as ImagePicker from 'expo-image-picker';
import RegisterHeader from '../../components/RegisterHeader';
import DefaultBlueButton from '../../components/DefaultBlueButton';
import styles from './styles';

export default function AddPhoto({navigation}) {
    const [image, setImage] = useState(null);

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        });

        if(!result.cancelled) {
            setImage(result.uri);
        }
    }

    return (
        <Center
            style={styles.container}
            bgColor="#fff"
        >
            <Center width="5/6">
                <RegisterHeader>
                    Selecione uma foto se quiser!
                </RegisterHeader>
                <Button bgColor="#fff" onPress={pickImage}>
                    <MaterialIcons style={styles.camIcon} name="photo-camera" color="#fff" size={24}/>
                    <Image 
                        size={150} 
                        resizeMode={"contain"} 
                        borderRadius={100} 
                        source={!image?require('../../public/avatar_example.jpg'):{uri: image}} 
                        alt="Foto de perfil"
                    />
                </Button>
            </Center>
            <Center>
                <Button variant="ghost" key="register" 
                    onPress={()=>navigation.navigate('Register')}
                    _text={{
                        color: "defaultBlue",
                        fontWeight: 800
                    }}
                >
                    Pular
                </Button>
                <DefaultBlueButton navigation={navigation} page="navigation">
                    Concluir cadastro
                </DefaultBlueButton>
            </Center>
        </Center>
    );
}