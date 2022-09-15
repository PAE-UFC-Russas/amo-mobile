import React, { useState, useLayoutEffect, useEffect } from 'react';
import { FlatList } from 'react-native'
import { Center, Text, IconButton } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons'; 
import ForumSearch from '../../components/ForumSearch';
import ForumQuest from '../../components/ForumQuest';
import { GetLoginToken } from '../../util/StorageLogin';
import api from '../../services/api';
import styles from './styles';

export default function Forum({navigation, route}) {
  const [filters, setFilters] = useState({
    date: null,
    recent: false,
    late: false,
    mostAnswered: false,
    lessAnswered: false,
    name: ''
  });
  const [showSearch, setShowSearch] = useState(true);
  const [data, setData] = useState([]);

  useEffect(()=>{
    async function GetQuestions(){
      try{
        let url = `/duvidas/?disciplina_id=${route.params.id}`
        //if(!filters.date && !filters.recent && !filters.late && !filters.mostAnswered && !filters.lessAnswered && !filters.name.length === 0)
        if(filters.date){
          url += ''
        }
        const response = await api.get(url, {
          headers: {
            'Authorization': 'Token ' + await GetLoginToken()
          }
        });

        setData(Array.isArray(response.data)?response.data:[response.data]);
      }catch(error){
        console.log(error)
      }
    }

    GetQuestions();
  },[filters])

  useLayoutEffect(() => {
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
      bgColor='#fff'
    >
      {
        showSearch&&<ForumSearch filters={filters} setFilters={setFilters}/>
      }
      <FlatList
        data={data.sort((a, b) => a.date - b.date)}
        renderItem={quest => ForumQuest(quest.item, handleLikeButton, navigation, route.params)}
        keyExtractor={quest => quest.id}
        style={styles.flatListContainer}
      />
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
