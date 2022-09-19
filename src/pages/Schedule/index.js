import React, { useState, useLayoutEffect } from 'react';
import { Center, Text } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons'; 
import AgendamentoSearch from '../../components/AgendamentoSearch';
import styles from './styles';

export default function Schedule({navigation, route}) {  
  const [filters, setFilters] = useState({
    date: null,
    recent: false,
    late: false,
    mostAnswered: false,
    lessAnswered: false,
    name: ''
  });
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
      <AgendamentoSearch filters={filters} setFilters={setFilters}/>
    </Center>
  );
}