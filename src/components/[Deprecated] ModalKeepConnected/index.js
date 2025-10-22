import { Modal, Checkbox } from 'native-base';
import { useAuth } from '../../contexts/auth';
import styles from './styles';

export default function ModalKeepConnected({navigation, open, setOpen, setUser, userLogin, setErros}){
    const { Login } = useAuth();

    const handleOnClose = async () => {
        setOpen(false);
        const response = await Login(userLogin);

        if(response){
            if(response.non_field_errors)
                setErros({errosEmail: 'Email ou senha incorretos'});
            if(response.username)
                setErros({errosEmail: 'Email inválido'});
            if(response.password)
                setErros({errosPassword: 'Senha inválida'});
            return;
        }
        
        navigation.reset({
            index: 0,
            routes: [{ name: "SelectCourses" }],
        });
    }
    
    return (
        <Modal isOpen={open} onClose={handleOnClose} size='full'>
            <Modal.Content padding='5' bgColor='#fff' style={styles.container}>
                <Modal.Body>
                    <Checkbox 
                        size='lg'
                        borderColor='defaultBlue' 
                        defaultIsChecked={userLogin.signed}
                        _text={{
                            color: 'defaultBlue',
                            fontSize: 'lg'
                        }}
                        onChange={()=>setUser({...userLogin, signed: !userLogin.signed})}
                    >
                        Manter conectado
                    </Checkbox>
                </Modal.Body>
            </Modal.Content>
        </Modal>
    )
}