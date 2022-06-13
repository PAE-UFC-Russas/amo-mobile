import React, { useState } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { Button, Center, Input, Text } from 'native-base';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { MaterialIcons } from '@expo/vector-icons'; 
import styles from './styles';

export default function ForumSearch({setFilters, filters}){
    const [showDate, setShowDate] = useState(false);

    const handleChangeFilters = (type) => {
        if(type === "mostAnswered"){
            setFilters({mostAnswered: !filters.mostAnswered, lessAnswered: false, recent: false, late: false});
        }else if(type === "lessAnswered"){
            setFilters({mostAnswered: false, lessAnswered: !filters.lessAnswered, recent: false, late: false});
        }else if(type === "recent"){
            setFilters({mostAnswered: false, lessAnswered: false, recent: !filters.recent, late: false});
        }else if(type === "late"){
            setFilters({mostAnswered: false, lessAnswered: false, recent: false, late: !filters.late});
        }
    }

    return(
        <Center height="1/6">
            <Input
                placeholder="Pesquisar perguntas..."
                value={filters.name}
                onChangeText={text => setFilters({...filters, name: text})}
                width="5/6"
                borderRadius="full"
                borderColor="#52D6FB"
                color="#52D6FB"
                marginBottom="2"
                InputLeftElement={<MaterialIcons
                                        color="#52D6FB"
                                        size={32}
                                        name="search"
                                        style={{marginLeft: 10}}
                                    />
                }
            />
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
                <TouchableOpacity 
                    onPress={()=>setShowDate(true)}
                    style={styles.dateTimeFilterButton}
                >
                    <Text color="tertiaryBlue">
                       Ordenar por
                    </Text>
                    <MaterialIcons
                        color="#52D6FB"
                        size={24}
                        name="keyboard-arrow-down"
                    />
                </TouchableOpacity>
                <Button 
                    borderRadius="full" 
                    marginRight={3} 
                    borderColor="#52D6FB"
                    _text={{
                        color: "tertiaryBlue"
                    }}
                    variant={filters.mostAnswered?"solid":"outline"} 
                    onPress={()=>handleChangeFilters("mostAnswered")}>
                        Mais respondidas
                </Button>
                <Button 
                    borderRadius="full" 
                    marginRight={3} 
                    borderColor="#52D6FB" 
                    _text={{
                        color: "tertiaryBlue"
                    }}
                    variant={filters.lessAnswered?"solid":"outline"} 
                    onPress={()=>handleChangeFilters("lessAnswered")}>
                        Menos respondidas
                </Button>
                <Button 
                    borderRadius="full" 
                    marginRight={3} 
                    borderColor="#52D6FB" 
                    _text={{
                        color: "tertiaryBlue"
                    }}
                    variant={filters.recent?"solid":"outline"} 
                    onPress={()=>handleChangeFilters("recent")}>
                        Mais recentes
                </Button>
                <Button 
                    borderRadius="full" 
                    marginRight={3} 
                    borderColor="#52D6FB"
                    _text={{
                        color: "tertiaryBlue"
                    }}
                    variant={filters.late?"solid":"outline"} 
                    onPress={()=>handleChangeFilters("late")}>
                        Mais antigas
                </Button>
            </ScrollView>
            {
                showDate&&
                    <RNDateTimePicker 
                        mode="date"
                        display="spinner"
                        value={filters.date?filters.date:new Date()}
                        minimumDate={new Date(2021, 0, 1)}
                        onTouchCancel={()=>setShowDate(false)}
                        onChange={(event, date) => {setShowDate(false);setFilters({...filters, date: date})}}
                    />
                }
        </Center>
    )
};