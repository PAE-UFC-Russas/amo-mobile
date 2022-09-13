import React, { useState } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { Button, Center, Input, Text } from 'native-base';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { MaterialIcons } from '@expo/vector-icons'; 
import styles from './styles';

export default function ForumSearch({setFilters, filters}){
    const [showDate, setShowDate] = useState(false);

    const handleChangeFilters = (type) => {
        if(type === 'mostAnswered'){
            setFilters({mostAnswered: !filters.mostAnswered, lessAnswered: false, recent: false, late: false});
        }else if(type === 'lessAnswered'){
            setFilters({mostAnswered: false, lessAnswered: !filters.lessAnswered, recent: false, late: false});
        }else if(type === 'recent'){
            setFilters({mostAnswered: false, lessAnswered: false, recent: !filters.recent, late: false});
        }else if(type === 'late'){
            setFilters({mostAnswered: false, lessAnswered: false, recent: false, late: !filters.late});
        }
    }

    return(
        <Center height='50' flexDirection='row'>
            <Button 
                width='20%'
                borderRadius='full' 
                marginRight={3} 
                borderColor='#52D6FB'
                _text={{
                    color: 'tertiaryBlue'
                }}
                variant={filters.mostAnswered?'solid':'outline'} 
                onPress={()=>handleChangeFilters('mostAnswered')}>
                    Meus
            </Button>
            <Button 
                width='20%'
                borderRadius='full' 
                marginRight={3} 
                borderColor='#52D6FB' 
                _text={{
                    color: 'tertiaryBlue'
                }}
                variant={filters.lessAnswered?'solid':'outline'} 
                onPress={()=>handleChangeFilters('lessAnswered')}>
                    Todos
            </Button>
            <Button 
                width='20%'
                borderRadius='full' 
                marginRight={3} 
                borderColor='#52D6FB' 
                _text={{
                    color: 'tertiaryBlue'
                }}
                variant={filters.recent?'solid':'outline'} 
                onPress={()=>handleChangeFilters('recent')}>
                    Abertos
            </Button>
            <Button 
                width='20%'
                borderRadius='full' 
                marginRight={3} 
                borderColor='#52D6FB'
                _text={{
                    color: 'tertiaryBlue'
                }}
                variant={filters.late?'solid':'outline'} 
                onPress={()=>handleChangeFilters('late')}>
                    Encerramentos
            </Button>
        </Center>
    )
};