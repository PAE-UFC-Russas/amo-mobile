import React, { useState, useLayoutEffect } from 'react';
import { FlatList } from 'react-native'
import { Center, Text, IconButton } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons'; 
import ForumSearch from '../../components/ForumSearch';
import ForumQuest from '../../components/ForumQuest';
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

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackVisible: false,
      headerLeft: () => (
          <MaterialIcons
              onPress={() => alert('Menu hamburger!')}
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


  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
  ];

  return (
    <Center
      style={styles.container}
      bgColor="#fff"
    >
      {
        showSearch&&<ForumSearch filters={filters} setFilters={setFilters}/>
      }
      
      <FlatList
        data={DATA}
        renderItem={ForumQuest}
        keyExtractor={item => item.id}
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
