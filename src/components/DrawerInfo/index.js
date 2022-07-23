import { Avatar, Center, Text } from "native-base";

export default function DrawerInfo(){
    return (
        <Center>
            <Avatar 
                bg="tertiaryBlue" 
                size="md" 
                source={{
                    uri: "https://images.unsplash.com/photo-1546514714-bbedf0abd907?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
                }}
            />
            <Text>Heron</Text>
            <Text>Estrutura de Dados</Text>
        </Center>
    )
}