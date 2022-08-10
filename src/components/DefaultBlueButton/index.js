import { Button } from 'native-base';

export default function DefaultBlueButton({onPress, children}){

    return (
        <Button 
            bgColor='defaultBlue' 
            borderRadius='2xl' 
            width={80} 
            height={60} 
            onPress={onPress} 
            _text={{
                fontWeight: 800,
                color: '#fff',
            }}
        >
            {children}
        </Button>
    )
}