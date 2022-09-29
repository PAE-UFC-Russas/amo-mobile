import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native'
import { Center, IconButton, Spinner } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons'; 
import ForumSearch from '../../components/ForumSearch';
import ForumQuest from '../../components/ForumQuest';
import { GetLoginToken } from '../../util/StorageLogin';
import api from '../../services/api';
import styles from './styles';
import ButtonGetNextValues from '../../components/ButtonGetNextValues';

export default function Forum({navigation, route}) {
  const [filters, setFilters] = useState({
    recent: false,
    late: false,
    mostLiked: false,
    lessLiked: false,
    text: ''
  });
  const [page, setPage] = useState(1);
  const [displayValue, setDisplayValue] = useState('');
  const [data, setData] = useState([]);

  const GetQuestions = async (next) => {
    try{
      let url = `/duvidas/?page=${page}&disciplina_id=${route.params.id}`;

      if(next && data.next){
        url = `/duvidas/?page=${data.next?data.next.substring(-1):page+1}&disciplina_id=${route.params.id}`;
        setPage(page+1);
      }
      if(filters.recent){
        url += '&ordering=-data';
      }else if(filters.recent){
        url += '&ordering=-data';
      }else if(filters.mostLiked){
        url += '&ordering=-votos';
      }else if(filters.lessLiked){
        url += '&ordering=votos';
      }

      const response = await api.get(url, {
        headers: {
          'Authorization': 'Token ' + await GetLoginToken()
        }
      });
      console.log('res',filters)
      if(next && data.next){
        const results = [...data.results, ...response.data.results]
        setData({...response.data, results: results});
      }else{
        setData(response.data);
      }

    }catch(error){
      console.log(error);
    }
  }

  const PostLike = async (id) => {
    try{
      await api.post(`/duvidas/${id}/votar/`, {}, {
        headers: {
          'Authorization': 'Token ' + await GetLoginToken()
        }
      });
      GetQuestions();
    }catch(error){
      console.log(error.response);
    }
  }

  const DeleteLike = async (id) => {
    try{
      await api.delete(`/duvidas/${id}/votar/`, {
        headers: {
          'Authorization': 'Token ' + await GetLoginToken()
        }
      });
      GetQuestions();
    }catch(error){
      console.log(error.response);
    }
  }

  useEffect(()=>{
    GetQuestions();  
  },[filters])

  useEffect(()=>{
    const refreshData = navigation.addListener('focus', async () => {GetQuestions()})
    return refreshData;
  })

  return (
    <Center
      style={styles.container}
    >
      <ForumSearch displayValue={displayValue} setDisplayValue={setDisplayValue} filters={filters} setFilters={setFilters}/>
      {
        displayValue === filters.text?
          <FlatList
            data={data.results}
            renderItem={quest => ForumQuest(quest.item, navigation, PostLike, DeleteLike)}
            keyExtractor={quest => quest.id}
            style={styles.flatListContainer}
            ListFooterComponent={data.next&&<ButtonGetNextValues label='perguntas' onPress={GetQuestions}/>}
          />
        :
          <Spinner marginTop='auto' marginBottom='auto' size='lg'/>
      }
      <IconButton 
        style={styles.addButton} 
        variant='solid' 
        bgColor='tertiaryBlue'
        borderRadius='full' 
        icon={
          <MaterialIcons
            color='#fff'
            size={32}
            name='add'
          />
        }
        onPress={()=>navigation.navigate('RegisterDoubt', route.params)}
      />
    </Center>
  );
}
