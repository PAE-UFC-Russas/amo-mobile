import React, { useState, useEffect } from 'react';
import { Button, Center, VStack, Input } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons'; 
import AuthHeader from '../../components/AuthHeader';
import styles from './styles';

export default function SelectMonitoria({route, navigation}) {
    const [monitorias, setMonitorias] = useState([]);

    const [filterMonitoria,setFilterMonitoria] = useState("Heron gay");
    
    useEffect(()=>{
        if(route.params === "Ciência da Computação"){
            setMonitorias(["Projeto e analise de algoritimos","Redes de computadores", "Lógica para computação"]);
        }else if(route.params === "Engenharia Civil"){
            setMonitorias(["Projeto e analise de algoritimos","Redes de computadores", "Lógica para computação"]);
        }else if(route.params === "Engenharia Mecânica"){
            setMonitorias(["Projeto e analise de algoritimos","Redes de computadores", "Lógica para computação"]);
        }else if(route.params === "Engenharia de Produção"){
            setMonitorias(["Projeto e analise de algoritimos","Redes de computadores", "Lógica para computação"]);
        }else if(route.params === "Engenharia de Software"){
            setMonitorias(["Projeto e analise de algoritimos","Redes de computadores", "Lógica para computação"]);
        }
    },[]);

    return (
        <Center
            style={styles.container}
            bgColor="#fff"

        >
            <AuthHeader>
                Selecione a monitoria
            </AuthHeader>
            <Input
                placeholder="Pesquisar perguntas..."
                value={filterMonitoria}
                onChangeText={text => setFilterMonitoria(text)}
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
            <VStack space="3">
                {monitorias.map((item, index)=>{
                    return (
                        <Button 
                            key={index}
                            bgColor="tertiaryBlue" 
                            borderRadius="2xl" 
                            width={80} 
                            height={60}
                            onPress={()=>navigation.navigate("TabStack", item)} 
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