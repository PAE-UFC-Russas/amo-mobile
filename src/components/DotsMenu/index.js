import { IconButton, Menu, Text } from "native-base";
import { Entypo } from "@expo/vector-icons";
import { useSubject } from "../../contexts/subject";
import { useAuth } from "../../contexts/auth";

export default function DotsMenu({
  setConfirmDelete,
  setConfirmReport,
  setUpdate,
  author,
  id,
  quest = "none",
  commennts = "none",
}) {
  const { user } = useAuth();
  const { subject } = useSubject();

  const isMonitor = subject.monitores.find((obj) => obj.id == user.perfil.id)
    ? true
    : false;
  const isProfessor = subject.professores.find(
    (obj) => obj.id == user.perfil.id
  )
    ? true
    : false;

  const privileges =
    user.perfil.id === author || isMonitor || isProfessor ? true : false;

  const privilegesUpdate = user.perfil.id == author
  return (
    <Menu
      trigger={(triggerProps) => {
        return (
          <IconButton
            icon={<Entypo size={24} name="dots-three-vertical" color="black" />}
            size={6}
            accessibilityLabel="opções do comentario"
            {...triggerProps}
          />
        );
      }}
    >
      {privileges && (
        <Menu.Item onPress={() => setConfirmDelete({ open: true, id: id })}>
          <Text>Apagar</Text>
        </Menu.Item>
      )}
      <Menu.Item onPress={() => setConfirmReport({ open: true, id: id })}>
        <Text>Denunciar</Text>
      </Menu.Item>
      {privilegesUpdate && (
        <Menu.Item onPress={() => quest != "none" ?
          setUpdate({open: true, 
            id: id, 
            titulo: quest.titulo, 
            descricao: quest.descricao, 
            disciplina: quest.disciplina}) : 
            
            setUpdate({open: true, 
              id: id, 
              resposta: commennts.resposta,
              idDuvida: commennts.duvida,

            })
          }
          
          >
          <Text>Editar</Text>
        </Menu.Item>
      )}
    </Menu>
  );
}
