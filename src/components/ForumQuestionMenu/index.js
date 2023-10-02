import { IconButton, Menu, Text } from "native-base";
import { Entypo } from "@expo/vector-icons";
import { useAuth } from "../../contexts/auth";

export default function ForumQuestionMenu({
   setConfirmDeleteQuest,
   author,
   id,
}) {
   const { user } = useAuth();
   const privileges =
      user.perfil.id === author ||
      user.perfil.cargos.find((item) => item != "aluno")
         ? true
         : false;

   return (
      <Menu
         trigger={(triggerProps) => {
            return (
               <IconButton
                  icon={
                     <Entypo
                        size={24}
                        name="dots-three-horizontal"
                        color="black"
                     />
                  }
                  size={6}
                  accessibilityLabel="opções do comentario"
                  {...triggerProps}
               />
            );
         }}
      >
         {privileges && (
            <Menu.Item
               onPress={() => setConfirmDeleteQuest({ open: true, id: id })}
            >
               <Text>Deletar pergunta</Text>
            </Menu.Item>
         )}
         <Menu.Item>
            <Text>Denunciar pergunta</Text>
         </Menu.Item>
      </Menu>
   );
}
