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
                        placeholderTextColor='grey' 
                        placeholder='Digitar assunto aqui'
                        onChangeText={text => {setNewSchedule({...newSchedule, assunto: text})}}
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
                        placeholderTextColor='grey' 
                        placeholder='Digite sua dúvida'
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
                        placeholder='Selecione a monitoria' 
                        items={subjects}
                        setValue={itemValue => setNewSchedule({...newSchedule, disciplina: itemValue})} 
                    />
                    <HStack 
                        height='15%'
                        marginVertical='5%'
                    >
                        <View 
                            width='50%'
                            flexDirection='row'
                            alignItems='center'
                        >
                            <Text paddingRight='5%'>
                                Data:
                            </Text>
                            <Button
                                paddingTop={'4%'}
                                fontSize={10}
                                borderColor='grey' 
                                color='#52D6FB' 
                                borderRadius={6} 
                                height='50%'
                                variant='outline'
                                onPress={()=>setShowDate({type: 'date', active: true})}
                            >
                                {DateISOToFormated(newSchedule.data)}
                            </Button>
                        </View>
                        <View 
                            width='50%'
                            flexDirection='row'
                            alignItems='center'
                        >
                            <Text paddingRight='5%'>
                                Horario:
                            </Text>
                            <Button
                                paddingTop={'4%'}
                                fontSize={10}
                                borderColor='grey' 
                                color='#52D6FB' 
                                borderRadius={6} 
                                width='60%' 
                                height='50%'
                                variant='outline'
                                onPress={()=>setShowDate({type: 'time', active: true})}
                            >
                                {FormateTime(newSchedule.data)}
                            </Button>
                        </View>
                    </HStack>
                    <HStack>
                        <Text paddingRight='5%'>
                            Tipo:
                        </Text>
                        <Select 
                            placeholder='Tipo' 
                            height={8}
                            width='200%'
                            borderRadius={6} 
                            borderColor='grey'
                            placeholderTextColor='#52D6FB'
                            color='#52D6FB'
                            onValueChange={itemValue => setNewSchedule({...newSchedule, tipo: itemValue})} 
                        >
                            <Select.Item label='Presencial' value='presencial'/>
                            <Select.Item label='Online' value='online'/>
                        </Select>
                        {
                            showDate.active&&
                                <RNDateTimePicker 
                                    mode={showDate.type}
                                    value={newSchedule.data}
                                    minimumDate={new Date()}
                                    onTouchCancel={()=>setShowDate({...showDate, active: false})}
                                    onChange={(event, date) => {setShowDate({...showDate, active: false});setNewSchedule({...newSchedule, data: date})}}
                                />
                        }
                    </HStack>
                    <Button 
                        width='80%'
                        height='9%'
                        borderRadius={16}
                        alignSelf='center' 
                        marginVertical='10%'
                        onPress={HandlePostNewSchedule}
                        backgroundColor='#024284'
                    >
                        Solicitar agendamento
                    </Button>
                </VStack>
            </Modal.Content>
        </Modal>
    )
}