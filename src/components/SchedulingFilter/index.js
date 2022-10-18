import React from 'react';
import { Button, View } from 'native-base';

export default function SchedulingFilter({ setFilters, filters }){

    const handleChangeFilters = (type) => {
        if(type === 'mine'){
            setFilters({mine: !filters.mine, all: false, opens: false, closed: false, subject: filters.subject});
        }else if(type === 'all'){
            setFilters({mine: false, all: !filters.all, opens: false, closed: false, subject: filters.subject});
        }else if(type === 'opens'){
            setFilters({mine: false, all: false, opens: !filters.opens, closed: false, subject: filters.subject});
        }else if(type === 'closed'){
            setFilters({mine: false, all: false, opens: false, closed: !filters.closed, subject: filters.subject});
        }
    }

    return(
        <View height='20' width='100%' justifyContent='space-around'>
            <View flexDirection='row' justifyContent='space-evenly'>
                <Button 
                    borderRadius='20' 
                    width='24%'
                    borderColor='#52D6FB'
                    _text={{
                        color: filters.mine?'#fff':'#52D6FB'
                    }}
                    variant={filters.mine?'solid':'outline'} 
                    onPress={()=>handleChangeFilters('mine')}>
                        Meus 
                </Button>
                <Button 
                    width='24%'
                    borderRadius='full'
                    borderColor='#52D6FB' 
                    _text={{
                        color: filters.all?'#fff':'#52D6FB'
                    }}
                    variant={filters.all?'solid':'outline'} 
                    onPress={()=>handleChangeFilters('all')}>
                        Todos
                </Button>
                <Button 
                    borderRadius='full' 
                    width='24%'
                    borderColor='#52D6FB' 
                    _text={{
                        color: filters.opens?'#fff':'#52D6FB'
                    }}
                    variant={filters.opens?'solid':'outline'} 
                    onPress={()=>handleChangeFilters('opens')}>
                        Abertos
                </Button>
                <Button 
                    borderRadius='full' 
                    width='25%'
                    borderColor='#52D6FB'
                    _text={{
                        color: filters.closed?'#fff':'#52D6FB'
                    }}
                    variant={filters.closed?'solid':'outline'} 
                    onPress={()=>handleChangeFilters('closed')}>
                        Encerrados
                </Button>
            </View>
        </View>
    )
};