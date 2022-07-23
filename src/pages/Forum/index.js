import React, { useState, useLayoutEffect, useEffect } from 'react';
import { FlatList } from 'react-native'
import { Center, Text, IconButton } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons'; 
import ForumSearch from '../../components/ForumSearch';
import ForumQuest from '../../components/ForumQuest';
import api from '../../services/api';
import styles from './styles';

export default function Forum({navigation}) {
  const [filters, setFilters] = useState({
    date: null,
    recent: false,
    late: false,
    mostAnswered: false,
    lessAnswered: false,
    name: ''
  });
  const [showSearch, setShowSearch] = useState(true);
  const [data, setData] = useState(
  [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
      content: '',
      user: {
        name: "Marcio de Sousa Santos",
        avatar: "https://images.unsplash.com/photo-1570470836811-78ef04bb23d3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
      },
      date: new Date(),
      liked: true
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,',
      content: 'https://www.researchgate.net/profile/Ana-Melo-23/publication/301540260/figure/fig1/AS:352949281804288@1461161074767/Figura-1-Equacoes-para-o-calculo-do-Indicador-de-Consumo-da-envoltoria-para-as-Zonas.png',
      user: {
        name: 'Ana Pereira de Jesus',
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80"
      },
      date: new Date(),
      liked: true
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,',
      content: '',
      user: {
        name: "Julia Alencar de Silva Sousa",
        avatar: "https://images.unsplash.com/photo-1504439904031-93ded9f93e4e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=736&q=80"
      },
      date: new Date(),
      liked: true
    },
  ])

  useEffect(()=>{
    async function GetQuestions(){
      try{
        const response = await api.get("/duvidas/", {
            headers: {
              "Authorization": "Token " + await GetLoginToken()
            }
        });
        setData(response.data);
      }catch(error){
        console.log(error.response.data)
      }
    }

  //GetQuestions();
  },[])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackVisible: false,
      headerLeft: () => (
        <MaterialIcons
          onPress={() => navigation.openDrawer()}
          color="#52D6FB"
          size={32}
          name="menu"
          style={{marginLeft: 10}}
        />
      ),
      headerTitle: () => <Text fontWeight="bold" fontSize="sm" color="tertiaryBlue">Fórum</Text>,
      headerTitleAlign: "center",
      headerRight: () => (
        <MaterialIcons
          onPress={() => setShowSearch(!showSearch)}
          color="#52D6FB"
          size={32}
          name="search"
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
      bgColor="#fff"
    >
      {
        showSearch&&<ForumSearch filters={filters} setFilters={setFilters}/>
      }
      <FlatList
        data={data.sort((a, b) => a.date - b.date)}
        renderItem={quest => ForumQuest(quest.item, handleLikeButton, navigation)}
        keyExtractor={quest => quest.id}
        style={styles.flatListContainer}
      />
      <IconButton 
        style={styles.addButton} 
        variant="solid" 
        bgColor="tertiaryBlue"
        borderRadius="full" 
        icon={
                <MaterialIcons
                  color="#fff"
                  size={32}
                  name="add"
                />
              }
        onPress={()=>navigation.navigate("RegisterDoubt")}
      />
    </Center>
  );
}
