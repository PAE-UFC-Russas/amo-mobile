import React from 'react';
import { ScrollView } from 'react-native';
import { Button, Center } from 'native-base';

export default function SchedulingFilter({ setFilters, filters }){

    const handleChangeFilters = (type) => {
        if(type === 'mostLiked'){
            setFilters({mostLiked: !filters.mostLiked, lessLiked: false, recent: false, late: false});
        }else if(type === 'lessLiked'){
            setFilters({mostLiked: false, lessLiked: !filters.lessLiked, recent: false, late: false});
        }else if(type === 'recent'){
            setFilters({mostLiked: false, lessLiked: false, recent: !filters.recent, late: false});
        }else if(type === 'late'){
            setFilters({mostLiked: false, lessLiked: false, recent: false, late: !filters.late});
        }
    }

    return(
        <Center height='100'>
            <ScrollView 
                horizontal={true} 
                showsHorizontalScrollIndicator={false} 
                contentContainerStyle={{ flexGrow: 1 }}
            >
                <Button 
                    borderRadius='full' 
                    marginRight={3} 
                    marginLeft={3} 
                    borderColor='#52D6FB'
                    _text={{
                        color: filters.mostLiked?'#fff':'#52D6FB'
                    }}
                    variant={filters.mostLiked?'solid':'outline'} 
                    onPress={()=>handleChangeFilters('mostLiked')}>
                        Mais curtidas
                </Button>
                <Button 
                    borderRadius='full' 
                    marginRight={3} 
                    borderColor='#52D6FB' 
                    _text={{
                        color: filters.lessLiked?'#fff':'#52D6FB'
                    }}
                    variant={filters.lessLiked?'solid':'outline'} 
                    onPress={()=>handleChangeFilters('lessLiked')}>
                        Menos curtidas
                </Button>
                <Button 
                    borderRadius='full' 
                    marginRight={3} 
                    borderColor='#52D6FB' 
                    _text={{
                        color: filters.recent?'#fff':'#52D6FB'
                    }}
                    variant={filters.recent?'solid':'outline'} 
                    onPress={()=>handleChangeFilters('recent')}>
                        Mais recentes
                </Button>
                <Button 
                    borderRadius='full' 
                    marginRight={3} 
                    borderColor='#52D6FB'
                    _text={{
                        color: filters.late?'#fff':'#52D6FB'
                    }}
                    variant={filters.late?'solid':'outline'} 
                    onPress={()=>handleChangeFilters('late')}>
                        Mais antigas
                </Button>
            </ScrollView>
        </Center>
    )
};