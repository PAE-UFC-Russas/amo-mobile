import React, { useState, useLayoutEffect, useEffect } from 'react';
import { FlatList } from 'react-native'
import { Center, Text, IconButton } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons'; 
import AgendamentoSearch from '../../components/AgendamentoSearch';
import styles from './styles';

export default function Agendamento({navigation, route}) {  
    console.log(navigation)
  const [filters, setFilters] = useState({
    date: null,
    recent: false,
    late: false,
    mostAnswered: false,
    lessAnswered: false,
    name: ''
  });
  const [showSearch, setShowSearch] = useState(true);
  const data = []

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
      headerTitle: () => <Text fontWeight='bold' fontSize='sm' color='tertiaryBlue'>Agendamento</Text>,
      headerTitleAlign: 'center',
    });
  }, [navigation]);


  return (
    <Center
      style={styles.container}
      bgColor='#fff'
    >
      {
        showSearch&&<AgendamentoSearch filters={filters} setFilters={setFilters}/>
      }
    </Center>
  );
}