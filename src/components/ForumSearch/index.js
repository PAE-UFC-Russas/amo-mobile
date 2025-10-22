import React, { useCallback } from 'react';
import { Center, Input, Button, Menu, Pressable, HStack, Text } from 'native-base';
import { MaterialIcons, Ionicons } from '@expo/vector-icons'; 

export default function ForumSearch({ displayValue, setDisplayValue, setFilters, filters }) {

    const handleChangeFilters = (type) => {
        if(type === 'mostLiked'){
            setFilters({mostLiked: !filters.mostLiked, lessLiked: false, recent: false, late: false, text: filters.text});
        } else if(type === 'lessLiked'){
            setFilters({mostLiked: false, lessLiked: !filters.lessLiked, recent: false, late: false, text: filters.text});
        } else if(type === 'recent'){
            setFilters({mostLiked: false, lessLiked: false, recent: !filters.recent, late: false, text: filters.text});
        } else if(type === 'late'){
            setFilters({mostLiked: false, lessLiked: false, recent: false, late: !filters.late, text: filters.text});
        }
    }

    const debounce = (func) => {
        let timer;
        return function(...args){
            const context = this;
            if(timer) clearTimeout(timer);
            timer = setTimeout(()=>{ func.apply(context, args); timer = null; }, 2000);
        }
    }

    const handleChange = (text) => {
        setFilters({...filters, text: text});
    }

    const handler = useCallback(debounce(handleChange), []);

    return (
        <Center mt={2}>
            {/* Input de pesquisa */}
            <Input
                placeholder='Pesquisar perguntas...'
                value={displayValue}
                onChangeText={text => { setDisplayValue(text); handler(text); }}
                width='5/6'
                borderRadius='full'
                borderColor='#024284'
                borderWidth={1}
                marginBottom='3'
                InputLeftElement={
                    <MaterialIcons
                        color='#024284'
                        size={28}
                        name='search'
                        style={{ marginLeft: 10 }}
                    />
                }
                InputRightElement={
                    <Menu 
                        w="190"
                        trigger={triggerProps => {
                            return (
                                <Pressable {...triggerProps} style={{ marginRight: 10 }}>
                                    <Ionicons name="filter" size={28} color="#024284" />
                                </Pressable>
                            );
                        }}
                    >
                        <Menu.Item onPress={() => handleChangeFilters('mostLiked')}>
                            <Text color={filters.mostLiked ? '#024284' : '#000'}>Mais curtidas</Text>
                        </Menu.Item>
                        <Menu.Item onPress={() => handleChangeFilters('lessLiked')}>
                            <Text color={filters.lessLiked ? '#024284' : '#000'}>Menos curtidas</Text>
                        </Menu.Item>
                        <Menu.Item onPress={() => handleChangeFilters('recent')}>
                            <Text color={filters.recent ? '#024284' : '#000'}>Mais recentes</Text>
                        </Menu.Item>
                        <Menu.Item onPress={() => handleChangeFilters('late')}>
                            <Text color={filters.late ? '#024284' : '#000'}>Mais antigas</Text>
                        </Menu.Item>
                    </Menu>
                }
            />
        </Center>
    );
}
