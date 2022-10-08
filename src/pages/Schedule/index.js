import React, { useState, useEffect } from 'react';
import { Center, Button, Spinner, ScrollView, FlatList, View, IconButton } from 'native-base';
import ModalScheduling from '../../components/ModalScheduling';
import SelectForSubjects from '../../components/SelectForSubjects';
import { MaterialIcons } from '@expo/vector-icons'; 
import { GetLoginToken } from '../../util/StorageLogin';
import api from '../../services/api';
import styles from './styles';
import Caixinha from '../../components/Caixinha';
import { AntDesign } from '@expo/vector-icons'; 

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
          alignItems={'center'}
          justfyContent={'center'}
          width={'90%'}
          borderWidth={1}
          backgroundColor='white' 
          style={{color:'black', backgroundColor:'white'}}
          placeholder='Selecione a monitoria' 
          items={subjects}
          setValue={itemValue => setNewSchedule({...newSchedule, subject: itemValue})} 
          color='#52D6FB'
        />
        <ModalScheduling openModal={openDetailModal} setOpenModal={setOpenDetailModal}/>
        <View style={{flex:1, marginLeft:'7%'}}>
          <FlatList 
            data={[1, 2, 3, 4, 5, 6]}
            renderItem={(item, index)=><Caixinha key={index}/>}/>
        </View>
      <View>
        <View style={{justifyContent:"flex-end", marginLeft:'70%'}}>
          <IconButton 
              variant='solid' 
              borderRadius='full' 
              bgColor='#52D6FB'
              marginY={2}
              icon={
                <MaterialIcons
                  color='#fff'
                  size={30}
                  name='add'
                />
              }
              onPress={()=>setOpenDetailModal(true) }
            />
        </View>
      </View>
      </>
      }
      
    </Center>
  );
}