import { Modal, Checkbox } from 'native-base';
import { useAuth } from '../../contexts/auth';
import styles from './styles';

export default function ModalKeepConnected({open, setOpen, setUser, user}){
    const { Login } = useAuth();

    const handleOnClose = () => {
        setOpen(false);
        const response = Login(user);
    }

    return (
        <Modal isOpen={open} onClose={handleOnClose} size="full">
            <Modal.Content padding="5" bgColor="#fff" style={styles.container}>
                <Modal.Body>
                    <Checkbox 
                        size="lg"
                        borderColor="defaultBlue" 
                        defaultIsChecked={user.signed}
                        _text={{
                            color: "defaultBlue",
                            fontSize: "lg"
                        }}
                        onChange={()=>setUser({...user, signed: !user.signed})}
                    >
                        Manter conectado
                    </Checkbox>
                </Modal.Body>
            </Modal.Content>
        </Modal>
    )
}