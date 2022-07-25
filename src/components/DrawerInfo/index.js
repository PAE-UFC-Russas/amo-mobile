import { View } from "react-native";
import { Avatar, Button, Center, HStack, Text } from "native-base";
import { AntDesign } from "@expo/vector-icons"; 
import { DrawerItemList, DrawerContentScrollView} from "@react-navigation/drawer";
import { useAuth } from "../../contexts/auth";

export default function DrawerInfo(props){
    const { Logout } = useAuth();
    return (
        <DrawerContentScrollView contentContainerStyle={{ flex: 1 }}>
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
            <View style={{ flex: 1 }} />
            <Button alignSelf="flex-start" variant="link" onPress={()=>{props.navigation.navigate("SignIn");Logout()}}>
                <HStack space={3} alignItems="center">
                    <AntDesign name="arrowleft" size={28} color="#52D6FB"/> 
                    <Text fontWeight="bold" fontSize="md" color="#52D6FB">
                        SAIR
                    </Text>
                </HStack>
            </Button>
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