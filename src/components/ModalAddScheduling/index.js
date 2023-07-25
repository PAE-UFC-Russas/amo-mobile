import React, { useState } from 'react';
import { Text, Modal, HStack , Input, View, Select, Button, Center, VStack, useToast } from 'native-base';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import FormateTime from '../../util/FormateTime';
import DateISOToFormated from '../../util/DateISOToFormated';
import SelectForSubjects from '../SelectForSubjects';

export default function ModalAddScheduling({setOpenModal, openModal, PostNewSchedule, setNewSchedule, newSchedule, subjects}){
    const [ showDate, setShowDate ] = useState({active: false, type: 'date'});
    const [ errors, setErros ] = useState(null);
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
                padding='1' 
                bgColor='#fff'
                width='90%'
                height='75%'
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
                    height='100%'
                    paddingHorizontal= '5%'
                    paddingVertical='3%'
                    space={2}
                >
                    <Text>
                        Assunto:
                    </Text>
                    <Input
                        borderColor='grey' 
                        borderRadius={6}
                        maxLength={64}
                        width='100%' 
                        placeholderTextColor='grey' 
                        placeholder='Digitar assunto aqui'
                        onChangeText={text => {setNewSchedule({...newSchedule, assunto: text})}}
                    />
                    <Text>
                        Descrição:
                    </Text>
                    <Input
                        borderColor='grey' 
                        borderRadius={6} 
                        maxLength={96}
                        width='100%' 
                        height='15%'
                        placeholderTextColor='grey' 
                        placeholder='Digite a descrição'
                        onChangeText={text => {setNewSchedule({...newSchedule, descricao: text})}}
                    />
                    <Text>
                        Disciplina:
                    </Text>
                    <SelectForSubjects
                        alignItems='center'
                        justfyContent='center'
                        width='100%'
                        borderWidth={1}
                        backgroundColor='white' 
                        style={{color:'black', backgroundColor:'white', borderColor: 'grey'}}
                        placeholder='Selecione a disciplina' 
                        items={subjects}
                        setValue={itemValue => setNewSchedule({...newSchedule, disciplina: itemValue})} 
                    />
                    <Text paddingRight='5%'>
                        Data:
                    </Text>
                    <Button
                        paddingTop='4%'
                        fontSize={10}
                        borderColor='grey' 
                        borderRadius={6} 
                        variant='outline'
                        width='40%'
                        _text={{
                            color:'black'
                        }}
                        onPress={()=>setShowDate({type: 'date', active: true})}
                    >
                        {DateISOToFormated(newSchedule.data)}
                    </Button>
                    <Text marginRight='3%'>
                        Horario:
                    </Text>
                    <Button
                        paddingTop='4%'
                        fontSize={10}
                        borderColor='grey' 
                        borderRadius={6} 
                        variant='outline'
                        width='25%'
                        _text={{
                            color:'black'
                        }}
                        onPress={()=>setShowDate({type: 'time', active: true})}
                    >
                        {FormateTime(newSchedule.data)}
                    </Button>
                    <Text>
                        Tipo:
                    </Text>
                    <Select 
                        placeholder='Tipo' 
                        height={8}
                        width='50%'
                        borderRadius={6} 
                        borderColor='grey'
                        onValueChange={itemValue => setNewSchedule({...newSchedule, tipo: itemValue})} 
                    >
                        <Select.Item label='Presencial' value='presencial'/>
                        <Select.Item label='Remoto' value='virtual'/>
                    </Select>
                    <Button 
                        width='80%'
                        borderRadius={16}
                        alignSelf='center' 
                        onPress={HandlePostNewSchedule}
                        backgroundColor='#024284'
                    >
                        Solicitar agendamento
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
            </Modal.Content>
        </Modal>
    )
}