import { AlertDialog, Button } from "native-base";

export default function ConfirmCancelModal({
  confirmCancelModal,
  setOpen,
  DeleteQuestion,
}) {
  return (
    <AlertDialog
      isOpen={confirmCancelModal.open}
      onClose={() => setOpen({ ...confirmCancelModal, open: false })}
    >
      <AlertDialog.Content>
        <AlertDialog.CloseButton />
        <AlertDialog.Header>Cancelar agendamento</AlertDialog.Header>
        <AlertDialog.Body>
          Tem certeza que deseja cancelar o agendamento?
        </AlertDialog.Body>
        <AlertDialog.Footer>
          <Button.Group space={2}>
            <Button
              variant="unstyled"
              colorScheme="coolGray"
              onPress={() => setOpen({ ...confirmCancelModal, open: false })}
            >
              Cancelar
            </Button>
            <Button colorScheme="danger" onPress={() => DeleteQuestion()}>
              Sim
            </Button>
          </Button.Group>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  );
}
