import React, { useState, useEffect } from 'react';
import { Center, Button, Spinner } from 'native-base';
import ModalScheduling from '../../components/ModalScheduling';
import SelectForSubjects from '../../components/SelectForSubjects';
import { GetLoginToken } from '../../util/StorageLogin';
import api from '../../services/api';
import styles from './styles';

export default function Schedule({navigation, route}) {
  const [ subjects, setSubjects] = useState([]);
  const [ openDetailModal, setOpenDetailModal] = useState(false);
  const [ loading, setLoading ] = useState(true);
  const [ newSchedule, setNewSchedule ] = useState({subject: null});

  useEffect(()=>{
    async function GetSubjects(){
        try{
          setLoading(true);
          const response = await api.get(`/disciplinas/?pages=1`, {
              headers: {
                'Authorization': 'Token ' + await GetLoginToken()
              }
          });
          setSubjects(response.data.results);
          setLoading(false);
        }catch(error){
          console.log(error)
        }
    }

    GetSubjects();
  },[]);

  return (
    <Center
      style={styles.container}
      bgColor='#fff'
    >
      {
      loading?
        <Spinner marginTop='auto' marginBottom='auto' size='lg'/>
      :
      <>
        <SelectForSubjects
          borderWidth={1}
          backgroundColor='white' 
          style={{color:'black', backgroundColor:'white'}}
          placeholder='Selecione a monitoria' 
          items={subjects}
          setValue={itemValue => setNewSchedule({...newSchedule, subject: itemValue})} 
          color='#52D6FB'
        />
        <ModalScheduling openModal={openDetailModal} setOpenModal={setOpenDetailModal}/>
      </>
      }
      <Button onPress={()=> setOpenDetailModal(true)}>MODAL</Button>
    </Center>
  );
}