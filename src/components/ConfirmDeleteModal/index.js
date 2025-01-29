import { AlertDialog, Button } from "native-base";

export default function ConfirmDeleteModal({
  confirmDeleteQuest,
  setOpen,
  DeleteQuestion,
}) {
  return (
    <AlertDialog
      isOpen={confirmDeleteQuest.open}
      onClose={() => setOpen({ ...confirmDeleteQuest, open: false })}
    >
      <AlertDialog.Content>
        <AlertDialog.CloseButton />
        <AlertDialog.Header>Deletar</AlertDialog.Header>
        <AlertDialog.Body>Tem certeza que deseja apagar?</AlertDialog.Body>
        <AlertDialog.Footer>
          <Button.Group space={2}>
            <Button
              variant="unstyled"
              colorScheme="coolGray"
              onPress={() => setOpen({ ...confirmDeleteQuest, open: false })}
            >
              Cancelar
            </Button>
            <Button colorScheme="danger" onPress={() => DeleteQuestion()}>
              Apagar
            </Button>
          </Button.Group>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  );
}
