import { Modal, Checkbox } from 'native-base';
import { useAuth } from '../../contexts/auth';
import styles from './styles';

export default function ModalKeepConnected({open, setOpen, setUser, user}){
    const { Login } = useAuth();
    
    return (
        <Modal isOpen={open} onClose={() => {setOpen(false); Login(user)}} size="full">
            <Modal.Content padding="5" bgColor="#fff" style={styles.container}>
                <Modal.Body>
                    <Checkbox 
                        size="lg"
                        borderColor="defaultBlue" 
                        defaultIsChecked={user.keepConnected}
                        _text={{
                            color: "defaultBlue",
                            fontSize: "lg"
                        }}
                        onChange={()=>setUser({...user, keepConnected: !user.keepConnected})}
                    >
                        Manter conectado
                    </Checkbox>
                </Modal.Body>
            </Modal.Content>
        </Modal>
    )
}