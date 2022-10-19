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
            flex={1}
        >
            <Modal.Content 
                padding='1' 
                bgColor='#fff'
                width='80%'
                height='90%'
                borderRadius={15}
            >
            <Center>
                <Text 
                    paddingTop={'4%'}
                    fontSize={17} 
                    fontWeight='bold'
                    color='black'
                >
                    Solicitar agendamento
                </Text>
            </Center>
            <View width='85%' height='54%' alignSelf='center' borderWidth={1} borderColor='grey' borderRadius={5} marginTop='5%' padding={'3%'}>
                <View marginBottom={'2%'}>
                    <Text fontSize={20} color='grey'>Solicitante:</Text>
                    <Text fontSize={15}>Felipe</Text>
                </View>
                
                <View marginBottom={'2%'}>
                    <Text fontSize={20} color='grey'>Monitor:</Text>
                    <Text fontSize={15}>Emanuel Max</Text>
                </View>

                <View marginBottom={'2%'}>
                    <Text fontSize={20} color='grey'>Assunto:</Text>
                    <Text fontSize={15}>Integrais duplas</Text>
                </View>

                <View marginBottom={'2%'}>
                    <Text fontSize={20} color='grey'>Disciplina:</Text>
                    <Text fontSize={15}>Cálculo Vetorial Aplicado</Text>
                </View>

                <View marginBottom={'2%'}>
                    <Text fontSize={20} color='grey'>Tipo:</Text>
                    <Text fontSize={15}>Virtual</Text>
                </View>

                <View marginBottom={'2%'}>
                    <Text fontSize={20} color='grey'>Link:</Text>
                    <Text fontSize={15} color='#003459'>https://meet.google.com/yvr-vzww-jpz</Text>
                </View>
            </View>

            <View width='85%' height='30%' alignSelf='center' borderWidth={1} borderColor='grey' borderRadius={5} marginTop='5%' padding={'3%'}>
                <View marginBottom={'2%'}>
                    <Text fontSize={20} color='grey'>Data:</Text>
                    <Text fontSize={15}>Sexta-Feira 30/09/2022</Text>
                </View>
                
                <View marginBottom={'2%'}>
                    <Text fontSize={20} color='grey'>Inicio:</Text>
                    <Text fontSize={15}>21:00</Text>
                </View>

                <View marginBottom={'2%'}>
                    <Text fontSize={20} color='grey'>Fim:</Text>
                    <Text fontSize={15}>Integrais 21:30</Text>
                </View>
            </View>
            </Modal.Content>
        </Modal>
    )
}