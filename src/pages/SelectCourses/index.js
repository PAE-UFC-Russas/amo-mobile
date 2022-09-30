import React, { useEffect, useState } from 'react';
import { VStack, Center, Button, Spinner } from 'native-base';
import AuthHeader from '../../components/AuthHeader';
import { GetLoginToken } from '../../util/StorageLogin';
import api from '../../services/api';
import styles from './styles';

export default function SelectCourses({navigation}) {
    const [courses, setCourses] = useState([]);
    const [ loading, setLoading ] = useState(true);
    useEffect(()=>{
        async function GetCourses(){
            try{
                setLoading(true)
                const response = await api.get('/cursos/?page=1', {
                    headers: {
                        'Authorization': 'Token ' + await GetLoginToken()
                    }
                });
                setLoading(false)
                setCourses(response.data.results);
            }catch(error){
                console.log(error.response.data)
            }
        }
        GetCourses();
    }, [])

    return (
        <Center
            style={styles.container}
            bgColor='#fff'

        >
            <AuthHeader>
                Selecione o curso
            </AuthHeader>
            <VStack space='3' alignItems={'center'} width={'100%'}>
                {loading?(
                    <Spinner marginTop='auto' marginBottom='auto' size='lg'/>
                )
                :
                courses.map((item, index)=>{
                    return (
                        <Button
                            key={index}
                            textAlign={'center'}
                            bgColor='tertiaryBlue' 
                            borderRadius='2xl' 
                            width={'80%'} 
                            height={60}
                            onPress={()=>navigation.navigate('SelectMonitoria', item.id)} 
                            _text={{
                                fontWeight: 800,
                                color: '#fff',
                            }}
                        >
                            {item.nome}
                        </Button>
                    )
                })}
            </VStack>
        </Center>
    );
}