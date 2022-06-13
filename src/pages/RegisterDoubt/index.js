import React, { useState, useEffect } from 'react';
import { Button, Center, VStack, Input } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons'; 
import styles from './styles';

export default function RegisterDoubt({navigation}) {
    const [doubt, setDoubt] = useState({
        title: "",
        desc: ""
    });

    return (
        <Center
            style={styles.container}
            bgColor="#fff"

        >
            
        </Center>
    );
}