import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native'
import { Center, IconButton, Spinner } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons'; 
import ForumSearch from '../../components/ForumSearch';
import ForumQuest from '../../components/ForumQuest';
import ButtonGetNextValues from '../../components/ButtonGetNextValues';
import DefaultStagger from '../../components/DefaultStagger';
import ConfirmQuestDelete from '../../components/ConfirmQuestDelete';
import { GetLoginToken } from '../../util/StorageLogin';
import api from '../../services/api';
import styles from './styles';

export default function Forum({navigation, route}) {
  const [filters, setFilters] = useState({
    recent: false,
    late: false,
    mostLiked: false,
    lessLiked: false,
    text: ''
  });
  const [confirmDeleteQuest, setConfirmDeleteQuest] = useState({open: false, id: null});
  const [page, setPage] = useState(1);
  const [displayValue, setDisplayValue] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const GetQuestions = async (next) => {
    try{
      setLoading(true);
      let url = `/duvidas/?page=${page}&disciplina_id=${route.params.id}`;

      if(next && data.next){
        url = `/duvidas/?page=${data.next?data.next.substring(-1):page+1}&disciplina_id=${route.params.id}`;
        setPage(page+1);
      }
      if(filters.recent){
        url += '&ordering=-data';
      }else if(filters.late){
        url += '&ordering=data';
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

      if(next && data.next){
        const results = [...data.results, ...response.data.results]
        setData({...response.data, results: results});
      }else{
        setData(response.data);
      }
      setLoading(false);
      
    }catch(error){
      console.log(error);
    }
  }

  const DeleteQuestion = async () => {
    try{
      await api.delete(`/duvidas/${confirmDeleteQuest.id}/`, {
        headers: {
          'Authorization': 'Token ' + await GetLoginToken()
        }
      });
      setConfirmDeleteQuest({open: false, id: null})
      GetQuestions();
    }catch(error){
      console.log(error.response);
    }
  }

  const handleLikeButton = (id) => {
    data.results.map((item, index)=>{
      if(item.id === id){
        let newData = data.results;
        const votou = data.results[index].votou;
        const votos = data.results[index].votos;

        newData[index].votos = votou?votos - 1:votos + 1;
        newData[index].votou = !item.votou;
        setData({...data, results: newData});
      }
    });
  }

  const PostLike = async (id) => {
    try{
      handleLikeButton(id);
      await api.post(`/duvidas/${id}/votar/`, {}, {
        headers: {
          'Authorization': 'Token ' + await GetLoginToken()
        }
      });
    }catch(error){
      console.log(error.response);
    }
  }

  const DeleteLike = async (id) => {
    try{
      handleLikeButton(id);
      await api.delete(`/duvidas/${id}/votar/`, {
        headers: {
          'Authorization': 'Token ' + await GetLoginToken()
        }
      });
    }catch(error){
      console.log(error.response);
    }
  }

  useEffect(() => {
    if(filters.late || filters.lessLiked || filters.mostLiked || filters.recent || filters.text.length > 0){
      GetQuestions(); 
    }else{
      const focusHandler = navigation.addListener('focus', () => {
        GetQuestions(); 
      });
      return focusHandler;
    }
  }, [navigation,filters]);

  return (
    <Center
      style={styles.container}
    >
      <ForumSearch displayValue={displayValue} setDisplayValue={setDisplayValue} filters={filters} setFilters={setFilters}/>
      {
        loading || !(displayValue === filters.text)?
          <Spinner marginTop='auto' marginBottom='auto' size='lg'/>
        :
        <FlatList
          data={data.results}
          renderItem={quest => ForumQuest(quest.item, navigation, PostLike, DeleteLike, setConfirmDeleteQuest)}
          keyExtractor={quest => quest.id}
          style={styles.flatListContainer}
          ListFooterComponent={data.next&&<ButtonGetNextValues label='perguntas' onPress={GetQuestions}/>}
        />
      }
      <ConfirmQuestDelete confirmDeleteQuest={confirmDeleteQuest} setOpen={setConfirmDeleteQuest} DeleteQuestion={DeleteQuestion}/>
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
          onPress={()=>navigation.navigate('RegisterDoubt', route.params)}
        />
      </DefaultStagger>
    </Center>
  );
}
