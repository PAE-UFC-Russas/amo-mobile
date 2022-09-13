import { IconButton, Menu, Text } from 'native-base';
import { Entypo } from '@expo/vector-icons'; 

export default function ForumQuestionMenu(){
    return (
        <Menu trigger={triggerProps => {
            return <IconButton icon={
                        <Entypo
                            size={24} 
                            name='dots-three-horizontal' 
                            color='black'
                        />
                    }
                    size={6} 
                    accessibilityLabel='opções do comentario' 
                    {...triggerProps}
                />
          }}>
            <Menu.Item>
                <Text>
                    Denunciar pergunta
                </Text>
            </Menu.Item>
            <Menu.Item>
                <Text>
                    Deletar pergunta
                </Text>
            </Menu.Item>
        </Menu>
    )
}