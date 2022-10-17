import React, { useState, useEffect } from 'react';
import { Center, Spinner, FlatList, View, IconButton } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons'; 
import ModalAddScheduling from '../../components/ModalAddScheduling';
import ModalDetailScheduling from '../../components/ModalDetailScheduling';
import SelectForSubjects from '../../components/SelectForSubjects';
import DefaultStagger from '../../components/DefaultStagger';
import SchedulingFilter from '../../components/SchedulingFilter';
import ScheduleBox from '../../components/ScheduleBox';
import { GetLoginToken } from '../../util/StorageLogin';
import api from '../../services/api';
import styles from './styles';

export default function Schedule({navigation, route}) {
  const [ subjects, setSubjects] = useState([]);
  const [ openAddModal, setOpenAddModal] = useState(false);
  const [ openDetailModal, setOpenDetailModal] = useState(false);
  const [ loading, setLoading ] = useState(true);
  const [ schedules, setSchedules ] = useState([]);
  const [ newSchedule, setNewSchedule ] = useState({
    tipo: '',
    data: new Date(),
    assunto: '',
    descricao: '',
    disciplina: null
  });
  const [filters, setFilters] = useState({
    recent: false,
    late: false,
    mostLiked: false,
    lessLiked: false,
  });

  async function GetSubjects(){
    try{
      const response = await api.get(`/disciplinas/?pages=1`, {
          headers: {
            'Authorization': 'Token ' + await GetLoginToken()
          }
      });
      setSubjects(response.data.results);

    }catch(error){
      console.log(error)
    }
  }

  async function GetSchedules(){
    try{
      setLoading(true);
      const response = await api.get(`/agendamentos/?pages=1`, {
          headers: {
            'Authorization': 'Token ' + await GetLoginToken()
          }
      });
      setSchedules(response.data);
      setLoading(false);
    }catch(error){
      console.log(error)
    }
  }

  async function PostNewSchedule(){
    try{
      await api.post(`/agendamentos/`, {
        ...newSchedule
      }, {
        headers: {
          'Authorization': 'Token ' + await GetLoginToken()
        }
      });
    }catch(error){
      console.log(error)
    }
  }

  useEffect(()=>{
    GetSubjects();
    GetSchedules();
  },[]);

  return (
    <Center
      style={styles.container}
      bgColor='#fff'
    >
      <SchedulingFilter filters={filters} setFilters={setFilters} />
      {
        loading?
          <Spinner marginTop='auto' marginBottom='auto' size='lg'/>
        :
        <>
          <SelectForSubjects
            alignItems='center'
            justfyContent='center'
            width='90%'
            borderWidth={1}
            backgroundColor='white' 
            style={{color:'black', backgroundColor:'white'}}
            placeholder='Selecione a monitoria' 
            items={subjects}
            setValue={itemValue => setNewSchedule({...newSchedule, disciplina: itemValue})} 
            color='#52D6FB'
          />
          <ModalAddScheduling PostNewSchedule={PostNewSchedule} subjects={subjects} newSchedule={newSchedule} setNewSchedule={setNewSchedule} openModal={openAddModal} setOpenModal={setOpenAddModal}/>
          <ModalDetailScheduling openModal={openDetailModal} setOpenModal={setOpenDetailModal}/>
          <View style={{flex:1, marginLeft:'7%'}}>
            <FlatList 
              data={schedules.results}
              renderItem={(item, index)=><ScheduleBox setOpenDetailModal={setOpenDetailModal} key={index}/>}
            />
          </View>
          <DefaultStagger>
            <IconButton 
              variant='solid' 
              borderRadius='full' 
              bgColor='teal.400'
              marginY={2}
              icon={
                <MaterialIcons
                  color='#fff'
                  size={24}
                  name='add'
                />
              }
              onPress={()=>setOpenAddModal(true)}
            />
          </DefaultStagger>
        </>
      }
    </Center>
  );
}