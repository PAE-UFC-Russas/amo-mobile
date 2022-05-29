import React from 'react';
import { VStack, Center, Button } from 'native-base';
import AuthHeader from '../../components/AuthHeader';
import styles from './styles';

export default function SelectCourses({navigation}) {
    const courses = ["Ciência da Computação", "Engenharia Civil", "Engenharia Mecânica", "Engenharia de Produção", "Engenharia de Software"];

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
                            onPress={()=>navigation.navigate("SelectMonitoria", item)} 
                            _text={{
                                fontWeight: 800,
                                color: "#fff",
                            }}
                        >
                            {item}
                        </Button>
                    )
                })}
            </VStack>
        </Center>
    );
}