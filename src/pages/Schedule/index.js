import React, { useState, useLayoutEffect } from 'react';
import { Center, Text, Button } from 'native-base';
import ModalScheduling from '../../components/ModalScheduling';
import styles from './styles';

export default function Schedule({navigation, route}) {  

  const [ openDetailModal, setOpenDetailModal] = useState(false)

  return (
    <Center
      style={styles.container}
      bgColor='#fff'
    >
    <Button onPress={()=> setOpenDetailModal(true)}>MODAL</Button>
    <ModalScheduling openModal={openDetailModal} setOpenModal={setOpenDetailModal}/>
    </Center>
  );
}