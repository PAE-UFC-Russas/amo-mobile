import { IconButton, Menu, Text } from 'native-base';
import { Entypo } from '@expo/vector-icons'; 
import { useAuth } from '../../contexts/auth';

export default function ForumQuestionMenu({DeleteQuestion, id}){
    const { user } = useAuth();
    const privileges = (user.perfil.id === id) || user.perfil.cargos[0] !== 'aluno'?true:false;

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
          }}
        >
            {
                privileges&&
                <Menu.Item onPress={DeleteQuestion}>
                    <Text>
                        Deletar pergunta
                    </Text>
                </Menu.Item>
            }
            <Menu.Item>
                <Text>
                    Denunciar pergunta
                </Text>
            </Menu.Item>
        </Menu>
    )
}