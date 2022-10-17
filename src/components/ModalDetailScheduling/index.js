import React from 'react';
import { Text, Modal, HStack , Input, View, Select, Button, Center, VStack } from 'native-base';

export default function ModalDetailScheduling({setOpenModal, openModal}){
    const HandleOnClose = () =>{
        setOpenModal(false)
    }

    return(
        <Modal 
            isOpen={openModal} 
            onClose={HandleOnClose} 
            marginTop='5%'
        >
            <Modal.Content 
                padding='1' 
                bgColor='#fff'
                width='80%'
                height='70%'
                borderRadius={15}
            >
                    <Text 
                        fontSize={17} 
                        fontWeight='bold'
                        color='black'
                    >
                        Solicitar agendamento
                    </Text>
                    <Button 
                        width='80%'
                        height='9%'
                        borderRadius={16}
                        alignSelf='center' 
                        marginVertical='10%'
                    >
                        Solicitar agendamento
                    </Button>
            </Modal.Content>
        </Modal>
    )
}