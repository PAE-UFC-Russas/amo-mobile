import React, { useState, useLayoutEffect, useEffect } from 'react';
import { FlatList } from 'react-native'
import { Center, Text, IconButton, Spinner } from 'native-base';
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
    mostAnswered: false,
    lessAnswered: false,
    text: ''
  });
  const [page, setPage] = useState(1);
  const [displayValue, setDisplayValue] = useState('');
  const [showSearch, setShowSearch] = useState(true);
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
      }
      if(filters.text){
        url += `&search=${filters.text}`;
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

    }catch(error){
      console.log(error);
    }
  }

  useEffect(()=>{
    GetQuestions();  
  },[filters])

  useLayoutEffect(() => {    
    const refreshData = navigation.addListener('focus', async () => {GetQuestions()})
    navigation.setOptions({
      headerBackVisible: false,
      headerLeft: () => (
        <MaterialIcons
          onPress={() => navigation.openDrawer()}
          color='#52D6FB'
          size={32}
          name='menu'
          style={{marginLeft: 10}}
        />
      ),
      headerTitle: () => <Text fontWeight='bold' fontSize='sm' color='tertiaryBlue'>Fórum</Text>,
      headerTitleAlign: 'center',
      headerRight: () => (
        <MaterialIcons
          onPress={() => setShowSearch(!showSearch)}
          color='#52D6FB'
          size={32}
          name='search'
          style={{marginRight: 10}}
        />
      )
    });

    setFilters({
      recent: false,
      late: false,
      mostAnswered: false,
      lessAnswered: false,
      text: ''
    })

    return refreshData
  }, [navigation, showSearch]);

  return (
    <Center
      style={styles.container}
    >
      {
        showSearch&&<ForumSearch displayValue={displayValue} setDisplayValue={setDisplayValue} filters={filters} setFilters={setFilters}/>
      }
      {
        displayValue === filters.text?
          <FlatList
            data={data.results}
            renderItem={quest => ForumQuest(quest.item, navigation)}
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
