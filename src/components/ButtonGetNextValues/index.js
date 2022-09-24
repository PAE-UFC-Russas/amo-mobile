import { Button, Text, Box } from 'native-base';
import { AntDesign } from '@expo/vector-icons'; 

export default function ButtonGetNextValues({label, onPress}){
        return (
            <Button variant='ghost' marginY={3} onPress={()=>onPress(true)}>
                <Box flexDirection='row' alignItems='center' justifyContent='space-between'>
                    <AntDesign name='pluscircle' size={32} color='#52D6FB'/>
                    <Text marginLeft={3}>
                        Carregar mais {label}
                    </Text>
                </Box>
            </Button>
        )
}
