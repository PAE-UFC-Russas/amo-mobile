import React from 'react';
import { Box, Center } from 'native-base';
import AuthHeader from '../../components/AuthHeader';
import styles from './styles';

export default function SelectMonitoria({route, navigation}) {
    return (
        <Center
            style={styles.container}
            bgColor="#fff"

        >
            <AuthHeader>
                Selecione a monitoria
            </AuthHeader>
            <Box>
                
            </Box>
        </Center>
    );
}