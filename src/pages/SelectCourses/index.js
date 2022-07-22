import React, { useEffect, useState } from 'react';
import { VStack, Center, Button } from 'native-base';
import AuthHeader from '../../components/AuthHeader';
import { GetLoginToken } from '../../util/StorageLogin';
import api from '../../services/api';
import styles from './styles';

export default function SelectCourses({navigation}) {
    const [courses, setCourses] = useState([]);

    useEffect(()=>{
        async function GetCourses(){
            try{
                const response = await api.get('/cursos/', {
                    headers: {
                        'Authorization': 'Token ' + await GetLoginToken()
                    }
                });
                setCourses(response.data);
            }catch(error){
                console.log(error.response.data)
            }
        }

        GetCourses();
    }, [])

    return (
        <Center
            style={styles.container}
            bgColor="#fff"

        >
            <AuthHeader>
                Selecione o curso
            </AuthHeader>
            <VStack space="3">
                {courses.map((item, index)=>{
                    return (
                        <Button 
                            key={index}
                            bgColor="tertiaryBlue" 
                            borderRadius="2xl" 
                            width={80} 
                            height={60}
                            onPress={()=>navigation.navigate("SelectMonitoria", item.id)} 
                            _text={{
                                fontWeight: 800,
                                color: "#fff",
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