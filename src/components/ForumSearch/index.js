import React, { useCallback } from 'react';
import { ScrollView } from 'react-native';
import { Button, Center, Input } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons'; 

export default function ForumSearch({displayValue, setDisplayValue, setFilters, filters}){
    const handleChangeFilters = (type) => {
        if(type === 'mostLiked'){
            setFilters({mostLiked: !filters.mostLiked, lessLiked: false, recent: false, late: false, text: filters.text});
        }else if(type === 'lessLiked'){
            setFilters({mostLiked: false, lessLiked: !filters.lessLiked, recent: false, late: false, text: filters.text});
        }else if(type === 'recent'){
            setFilters({mostLiked: false, lessLiked: false, recent: !filters.recent, late: false, text: filters.text});
        }else if(type === 'late'){
            setFilters({mostLiked: false, lessLiked: false, recent: false, late: !filters.late, text: filters.text});
        }
    }

    const debounce = (func) => {
        let timer;
        return function(...args){
            const context = this;
            if(timer) clearTimeout(timer);
                timer = setTimeout(()=>{
                    timer = null;
                    func.apply(context, args)
                }, 2000
            )
        }
    }

    const handleChange = (text) => {
        setFilters({...filters, text: text});
    }

    const handler = useCallback(debounce(handleChange), []);

    return(
        <Center height='100'>
            <Input
                placeholder='Pesquisar perguntas...'
                value={displayValue}
                onChangeText={text => {setDisplayValue(text);handler(text)}}
                width='5/6'
                borderRadius='full'
                borderColor='#024284'
                marginBottom='2'
                InputLeftElement={
                    <MaterialIcons
                        color='#024284'
                        size={32}
                        name='search'
                        style={{marginLeft: 10}}
                    />
                }
            />
            <ScrollView 
                horizontal={true} 
                showsHorizontalScrollIndicator={false} 

            >
                <Button 
                    borderRadius='full' 
                    marginRight={3} 
                    marginLeft={3} 
                    borderColor='#024284'
                    _text={{
                        color: filters.mostLiked?'#fff':'#024284'
                    }}
                    variant={filters.mostLiked?'solid':'outline'} 
                    onPress={()=>handleChangeFilters('mostLiked')}>
                        Mais curtidas
                </Button>
                <Button 
                    borderRadius='full' 
                    marginRight={3} 
                    borderColor='#024284' 
                    _text={{
                        color: filters.lessLiked?'#fff':'#024284'
                    }}
                    variant={filters.lessLiked?'solid':'outline'} 
                    onPress={()=>handleChangeFilters('lessLiked')}>
                        Menos curtidas
                </Button>
                <Button 
                    borderRadius='full' 
                    marginRight={3} 
                    borderColor='#024284' 
                    _text={{
                        color: filters.recent?'#fff':'#024284'
                    }}
                    variant={filters.recent?'solid':'outline'} 
                    onPress={()=>handleChangeFilters('recent')}>
                        Mais recentes
                </Button>
                <Button 
                    borderRadius='full' 
                    marginRight={3} 
                    borderColor='#024284'
                    _text={{
                        color: filters.late?'#fff':'#024284'
                    }}
                    variant={filters.late?'solid':'outline'} 
                    onPress={()=>handleChangeFilters('late')}>
                        Mais antigas
                </Button>
            </ScrollView>
        </Center>
    )
};