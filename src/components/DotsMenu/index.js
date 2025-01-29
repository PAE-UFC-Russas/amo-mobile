import { IconButton, Menu, Text } from "native-base";
import { Entypo } from "@expo/vector-icons";
import { useSubject } from "../../contexts/subject";
import { useAuth } from "../../contexts/auth";

export default function DotsMenu({
  setConfirmDelete,
  setConfirmReport,
  author,
  id,
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
    </Menu>
  );
}
