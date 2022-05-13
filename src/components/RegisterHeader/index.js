import { Image } from 'react-native';
import { Center, Text } from 'native-base';

export default function RegisterHeader(props){
    return (
        <Center marginBottom="9">
            <Image
                source={require('../../public/logo_lightblue.png')}
                style={{width: 60, height: 60}}
            />
            <Text fontWeight="bold" color="tertiaryBlue" fontSize="md">{props.children}</Text>
        </Center>
    )
}