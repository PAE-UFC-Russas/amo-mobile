import { Modal, Checkbox } from "native-base";
import styles from "./styles";

export default function ModalKeepConnected({open, setOpen, setAccount, account}){
    return (
        <Modal isOpen={open} onClose={() => setOpen(false)} size="full">
            <Modal.Content padding="5" bgColor="#fff" style={styles.container}>
                <Modal.Body>
                    <Checkbox 
                        size="lg"
                        borderColor="defaultBlue" 
                        defaultIsChecked={account.keepConnected}
                        _text={{
                            color: "defaultBlue",
                            fontSize: "lg"
                        }}
                        onChange={()=>setAccount({...account, keepConnected: !account.keepConnected})}
                    >
                        Manter conectado
                    </Checkbox>
                </Modal.Body>
            </Modal.Content>
        </Modal>
    )
}