import { Text } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons'; 

export default function ForumHeader(){
    return {
            headerBackVisible: false,
            headerLeft: () => (
                <MaterialIcons
                    onPress={() => alert('Menu hamburger!')}
                    color="#52D6FB"
                    size={32}
                    name="menu"
                />
            ),
            headerTitle: () => <Text fontWeight="bold" fontSize="sm" color="tertiaryBlue">Fórum</Text>,
            headerTitleAlign: "center",
            headerRight: () => (
                <MaterialIcons
                    onPress={() => alert('Barra de pesquisa!')}
                    color="#52D6FB"
                    size={32}
                    name="search"
                />
            )
        }
}