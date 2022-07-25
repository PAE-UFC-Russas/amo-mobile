import { Avatar, Center, Text } from "native-base";
import { DrawerItemList, DrawerContentScrollView} from "@react-navigation/drawer";

export default function DrawerInfo(props){

    return (
        <DrawerContentScrollView>
            <Center marginBottom={5}>
                <Avatar 
                    bg="tertiaryBlue" 
                    size="2xl"
                    source={{
                        uri: "https://images.unsplash.com/photo-1546514714-bbedf0abd907?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
                    }}
                    marginBottom={15}
                />
                <Text fontSize="md" fontWeight="bold">Heron</Text>
                <Text fontSize="sm" fontWeight="light">Estrutura de Dados</Text>
            </Center>
            <DrawerItemList {...props}/>
        </DrawerContentScrollView>
    )
}

/*            <Button position="absolute" bottom={0} left={25} variant="link">
                <HStack space={2}>
                    <AntDesign name="arrowleft" size={24} color="#52D6FB"/> 
                    <Text color="#52D6FB">
                        SAIR
                    </Text>
                </HStack>
            </Button>*/