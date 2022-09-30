import { IconButton, Menu, Text } from 'native-base';
import { Entypo } from '@expo/vector-icons'; 
import api from '../../services/api';
import { GetLoginToken } from '../../util/StorageLogin';

export default function ForumQuestionMenu({id}){
    const DeleteQuestion = async () => {
        try{
          await api.delete(`/duvidas/${id}/`, {
            headers: {
              'Authorization': 'Token ' + await GetLoginToken()
            }
          });
        }catch(error){
          console.log(error.response);
        }
    }

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
            <Menu.Item onPress={()=>DeleteQuestion()}>
                <Text>
                    Deletar pergunta
                </Text>
            </Menu.Item>
        </Menu>
    )
}