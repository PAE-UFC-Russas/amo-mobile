import { IconButton, Menu, Text } from "native-base";
import { Entypo } from "@expo/vector-icons";
import { useAuth } from "../../contexts/auth";

export default function DotsMenu({
  setConfirmDelete,
  setConfirmReport,
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
          <Text>Deletar comentário</Text>
        </Menu.Item>
      )}
      <Menu.Item onPress={() => setConfirmReport({ open: true, id: id })}>
        <Text>Denunciar comentário</Text>
      </Menu.Item>
    </Menu>
  );
}
