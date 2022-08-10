import React, { useState } from 'react';
import { Button, Center, Image, Text } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons'; 
import * as ImagePicker from 'expo-image-picker';
import AuthHeader from '../../components/AuthHeader';
import DefaultBlueButton from '../../components/DefaultBlueButton';
import styles from './styles';

export default function AddPhoto({navigation}) {
    const [image, setImage] = useState(null);
    const [imageError, setImageError] = useState(null);

    const PickImage = async () => {
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

    const validation = () => {
        if(!image){
            setImageError('Insira uma imagem de perfil para concluir o cadastro ou pule está etapa!');
        }else{
            navigation.navigate('RegistrationComplete');
        }

    }

    return (
        <Center
            style={styles.container}
            bgColor='#fff'
        >
            <Center width='5/6'>
                <AuthHeader>
                    Selecione uma foto se quiser!
                </AuthHeader>
                <Button bgColor='#fff' onPress={PickImage}>
                    <MaterialIcons style={styles.camIcon} name='photo-camera' color='#fff' size={24}/>
                    <Image 
                        size={150} 
                        resizeMode={'contain'} 
                        borderRadius={100} 
                        source={!image?require('../../assets/avatar_example.jpg'):{uri: image}} 
                        alt='Foto de perfil'
                    />
                </Button>
            </Center>
            <Center>
                <Button 
                    variant='ghost' 
                    key='register' 
                    onPress={()=>navigation.navigate('RegistrationComplete')}
                    _text={{
                        color: 'defaultBlue',
                        fontWeight: 800
                    }}
                >
                    Pular
                </Button>
                <DefaultBlueButton onPress={validation}>
                    Concluir cadastro
                </DefaultBlueButton>
                {
                    imageError&&
                        <Text style={{color: '#f00', fontSize: 12}}>
                            {imageError}
                        </Text>
                }
            </Center>
        </Center>
    );
}