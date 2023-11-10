import React, { useState } from 'react';
import { Text, Modal, HStack , Input, Select, Button, Center, VStack, useToast, TextArea } from 'native-base';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import FormateTime from '../../util/FormateTime';
import DateISOToFormated from '../../util/DateISOToFormated';

export default function ModalAddScheduling({setOpenModal, openModal, PostNewSchedule, setNewSchedule, newSchedule, subjects}){
    const [ showDate, setShowDate ] = useState({active: false, type: 'date'});
    const toast = useToast();

    const HandleOnClose = () =>{
        setOpenModal(false)
    }

    const HandlePostNewSchedule = () => {
        if(newSchedule.assunto.length > 3){
            const postResponse = PostNewSchedule();
            if(postResponse){
                toast.show({
                    title: 'Agendamento realizado com sucesso!',
                    placement: 'bottom'
                });
                HandleOnClose();
            }else{
                toast.show({
                    title: 'Erro ao realizar agendamento, tente novamente mais tarde!',
                    placement: 'bottom'
                });
            }
        }
    }

    return(
        <Modal 
            isOpen={openModal} 
            onClose={HandleOnClose} 
        >
            <Modal.Content 
                paddingY='8' 
                paddingX='6' 
                bgColor='#fff'
                width='90%'
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
                    <VStack>
                        <Text marginTop='4'>
                            Assunto
                        </Text>
                        <Input
                            borderRadius={10}
                            maxLength={64}
                            width='100%' 
                            placeholderTextColor='grey' 
                            placeholder='Digitar assunto aqui'
                            onChangeText={text => {setNewSchedule({...newSchedule, assunto: text})}}
                        />
                        <Text marginTop='2'>
                            Descrição
                        </Text>
                        <TextArea
                            borderRadius={10} 
                            maxLength={96}
                            width='100%' 
                            placeholderTextColor='grey' 
                            placeholder='Digite a descrição'
                            onChangeText={text => {setNewSchedule({...newSchedule, descricao: text})}}
                        />
                        <Text marginTop='2'>
                            Disciplina:
                        </Text>
                        <Select 
                            placeholder='Selecione a disciplina' 
                            width='100%'
                            borderRadius={10} 
                            onValueChange={itemValue => setNewSchedule({...newSchedule, tipo: itemValue})} 
                        >
                            {subjects.map((item, index)=>{
                                return <Select.Item key={index} label={`${item.nome}`} value={`${item.id},${item.nome}`}/>
                            })}
                        </Select>
                        <HStack justifyContent='space-between' alignItems='center' marginTop='2'>
                            <VStack width='45%'>
                                <Text>
                                    Data
                                </Text>
                                <Button
                                    fontSize={10}
                                    borderRadius={10} 
                                    variant='outline'
                                    width='100%'
                                    _text={{
                                        color:'black'
                                    }}
                                    onPress={()=>setShowDate({type: 'date', active: true})}
                                >
                                    {DateISOToFormated(newSchedule.data)}
                                </Button>
                            </VStack>
                            <VStack width='45%'>
                                <Text>
                                    Horario
                                </Text>
                                <Button
                                    fontSize={10}
                                    borderRadius={10} 
                                    variant='outline'
                                    width='100%'
                                    _text={{
                                        color:'black'
                                    }}
                                    onPress={()=>setShowDate({type: 'time', active: true})}
                                >
                                    {FormateTime(newSchedule.data)}
                                </Button>
                            </VStack>
                        </HStack>
                        <Text marginTop='2'>
                            Tipo:
                        </Text>
                        <Select 
                            placeholder='Tipo' 
                            width='100%'
                            borderRadius={10} 
                            onValueChange={itemValue => setNewSchedule({...newSchedule, tipo: itemValue})} 
                        >
                            <Select.Item label='Presencial' value='presencial'/>
                            <Select.Item label='Remoto' value='virtual'/>
                        </Select>
                        <Button
                            marginTop={8}
                            bgColor="#307DF1"
                            onPress={HandlePostNewSchedule}
                        >
                            Solicitar
                        </Button>
                        {
                            showDate.active&&
                                <RNDateTimePicker 
                                    mode={showDate.type}
                                    value={new Date()}
                                    minimumDate={new Date()}
                                    onTouchCancel={()=>setShowDate({...showDate, active: false})}
                                    onChange={(event, date) => {setShowDate({...showDate, active: false});setNewSchedule({...newSchedule, data: date})}}
                                />
                        }
                    </VStack>
                </Center>
            </Modal.Content>
        </Modal>
    )
}