import React from 'react';
import { ScrollView, } from 'react-native';
import { Button, Center, View } from 'native-base';

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
        <View height='20' width='100%' justifyContent={'space-around'}>
            <View flexDirection={'row'} justifyContent={'space-evenly'}>
                <Button 
                    borderRadius='20' 
                    width={'24%'}
                    borderColor='#52D6FB'
                    _text={{
                        color: filters.mostLiked?'#fff':'#52D6FB'
                    }}
                    variant={filters.mostLiked?'solid':'outline'} 
                    onPress={()=>handleChangeFilters('mostLiked')}>
                        Meus 
                </Button>
                <Button 
                    width={'24%'}
                    borderRadius='full' 
                    
                    borderColor='#52D6FB' 
                    _text={{
                        color: filters.lessLiked?'#fff':'#52D6FB'
                    }}
                    variant={filters.lessLiked?'solid':'outline'} 
                    onPress={()=>handleChangeFilters('lessLiked')}>
                        Todos
                </Button>
                <Button 
                    borderRadius='full' 
                    width={'24%'}
                    borderColor='#52D6FB' 
                    _text={{
                        color: filters.recent?'#fff':'#52D6FB'
                    }}
                    variant={filters.recent?'solid':'outline'} 
                    onPress={()=>handleChangeFilters('recent')}>
                        Abertos
                </Button>
                <Button 
                    borderRadius='full' 
                    width={'25%'}
                    borderColor='#52D6FB'
                    _text={{
                        color: filters.late?'#fff':'#52D6FB'
                    }}
                    variant={filters.late?'solid':'outline'} 
                    onPress={()=>handleChangeFilters('late')}>
                        Encerrados
                </Button>
            </View>
        </View>
    )
};