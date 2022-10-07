import React from 'react';
import { Center, Text, Button, Modal, HStack } from 'native-base';


export default function ModalScheduling({setOpenModal, openModal, navigation}){
    const HandleOnClose = () =>{
        setOpenModal(false)
    }

    return(
        <Modal 
            isOpen={openModal} 
            onClose={HandleOnClose} 
            size={'lg'} 
            marginTop={10}
        >
            <Modal.Content padding='5' bgColor='#fff' >
                <Center>
                    <Text 
                        fontSize={17} 
                        fontWeight={'bold'}
                    >
                        Deseja deletar pergunta?
                    </Text>
                </Center>
                <Modal.Body height={70} marginTop={10}>
                    <HStack  justifyContent={'space-between'} >
                        <Button 
                            onPress={() => navigation.goBack()} 
                            width={100}
                        >
                            <Text 
                                fontWeight={'bold'} 
                                color={'white'}
                            >
                                Sim
                            </Text>
                        </Button>
                        <Button 
                            onPress={HandleOnClose} 
                            width={100}
                        >
                            <Text 
                                fontWeight={'bold'} 
                                color={'white'}
                            >
                                Não
                            </Text>
                        </Button>
                    </HStack>
                </Modal.Body>
            </Modal.Content>
        </Modal>
    )
}