import React, { useState, useLayoutEffect, useEffect } from 'react';
import { FlatList } from 'react-native'
import { Center, Text, IconButton, Spinner } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons'; 
import ForumSearch from '../../components/ForumSearch';
import ForumQuest from '../../components/ForumQuest';
import { GetLoginToken } from '../../util/StorageLogin';
import api from '../../services/api';
import styles from './styles';

export default function Forum({navigation, route}) {
  const [filters, setFilters] = useState({
    recent: false,
    late: false,
    mostAnswered: false,
    lessAnswered: false,
    text: '',
  });
  const [displayValue, setDisplayValue] = useState('');
  const [showSearch, setShowSearch] = useState(true);
  const [data, setData] = useState([]);

  const GetQuestions = async () => {
    try{
      let url = `/duvidas/?pages=1&disciplina_id=${route.params.id}`;

      if((!filters.recent && !filters.late)){
        url = `/duvidas/?pages=1&disciplina_id=${route.params.id}&ordering=-data`;
      }
      if(filters.recent){
        url = `/duvidas/?pages=1&disciplina_id=${route.params.id}&ordering=-data`;
      }
      if(filters.text){
        url += `&search=${filters.text}`;
      }

      const response = await api.get(url, {
        headers: {
          'Authorization': 'Token ' + await GetLoginToken()
        }
      });

      setData(Array.isArray(response.data.results)?response.data.results:[response.data.results]);
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

    return refreshData
  }, [navigation, showSearch]);

  const handleLikeButton = (id) => {
    data.map((item, index)=>{
      if(item.id === id){
        let newData = data;
        newData[index].liked = !item.liked;
        setData([...newData]);
      }
    });
  }

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
            data={data}
            renderItem={quest => ForumQuest(quest.item, handleLikeButton, navigation)}
            keyExtractor={quest => quest.id}
            style={styles.flatListContainer}
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
