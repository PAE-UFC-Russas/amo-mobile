import React from 'react';
import { Text, Modal, HStack , Input, View, Select, Button, Center, VStack } from 'native-base';

export default function ModalAddScheduling({setOpenModal, openModal}){
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
                <Center>
                    <Text 
                        fontSize={17} 
                        fontWeight='bold'
                        color='black'
                    >
                        Solicitar agendamento
                    </Text>
                </Center>

                <VStack 
                    height='90%'
                    paddingHorizontal= '5%'
                    paddingVertical='3%'
                    space={2}
                >
                    <Text>
                        Assunto:
                    </Text>
                    <Input
                        borderColor='grey' 
                        color='#52D6FB' 
                        borderRadius={6} 
                        width='100%' 
                        height='15%'
                        placeholderTextColor='#52D6FB' 
                        placeholder='Digitar assunto aqui'
                    />
                    <Text>
                        Descrição:
                    </Text>
                    <Input
                        borderColor='grey' 
                        color='#52D6FB' 
                        borderRadius={6} 
                        width='100%' 
                        height='15%'
                        placeholderTextColor='#52D6FB' 
                        placeholder='Digite sua dúvida'
                    />
                    <Text>
                        Disciplina:
                    </Text>
                    <Select 
                        placeholder='Seleciona a disciplina' 
                        height={10}
                        width='100%'
                        borderRadius={6} 
                        borderColor='grey'
                        placeholderTextColor='#52D6FB'
                        color='#52D6FB'
                    >
                        <Select.Item label='...' value='...'/>
                        <Select.Item label='...' value='...'/>
                    </Select>

                    <HStack 
                        height='15%'
                        marginVertical='5%'
                        space={5}
                    >
                        <View 
                            width='50%'
                            flexDirection='row'
                            alignItems='center'
                        >
                            <Text paddingRight='5%'>
                                Data:
                            </Text>
                            <Input
                                fontSize={10}
                                borderColor='grey' 
                                color='#52D6FB' 
                                borderRadius={6} 
                                width='70%' 
                                height='50%'
                                placeholderTextColor='#52D6FB' 
                                placeholder='DD/MM/AAAA'
                            />
                        </View>
                        <View 
                            width='50%'
                            flexDirection='row'
                            alignItems='center'
                        >
                            <Text paddingRight='5%'>
                                Horario:
                            </Text>
                            <Input
                                fontSize={10}
                                borderColor='grey' 
                                color='#52D6FB' 
                                borderRadius={6}               
                                width='50%' 
                                height='50%'           
                                placeholderTextColor='#52D6FB' 
                                placeholder='HH:MM'
                            />
                        </View>
                    </HStack>
                    <HStack>
                        <Text paddingRight='5%'>
                            Tipo:
                        </Text>
                        <Select 
                            placeholder='Tipo' 
                            height={8}
                            width='150%'
                            borderRadius={6} 
                            borderColor='grey'
                            placeholderTextColor='#52D6FB'
                            color='#52D6FB'
                        >
                            <Select.Item label='...' value='...'/>
                            <Select.Item label='...' value='...'/>
                        </Select>
                    </HStack>
                    <Button 
                        width='80%'
                        height='9%'
                        borderRadius={16}
                        alignSelf='center' 
                        marginVertical='10%'
                    >
                        Solicitar agendamento
                    </Button>
                </VStack>
            </Modal.Content>
        </Modal>
    )
}