import React, { useState, useEffect } from 'react';
import { Button, Center, VStack, Input } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons'; 
import AuthHeader from '../../components/AuthHeader';
import styles from './styles';

export default function SelectMonitoria({route, navigation}) {
    const [monitorias, setMonitorias] = useState(['a']);
    const [filterMonitoria, setFilterMonitoria] = useState("");
    
    useEffect(()=>{
        const DATA = ["Projeto e analise de algoritimos","Redes de computadores", "Lógica para computação"];
        if(route.params === "Ciência da Computação"){
            setMonitorias(DATA.filter((item)=>{
                const itemUpperCase = item.toUpperCase();
                return itemUpperCase.indexOf(filterMonitoria.toUpperCase()) > -1;
            }));
        }else if(route.params === "Engenharia Civil"){
            setMonitorias(DATA.filter((item)=>{
                const itemUpperCase = item.toUpperCase();
                return itemUpperCase.indexOf(filterMonitoria.toUpperCase()) > -1;
            }));
        }else if(route.params === "Engenharia Mecânica"){
            setMonitorias(DATA.filter((item)=>{
                const itemUpperCase = item.toUpperCase();
                return itemUpperCase.indexOf(filterMonitoria.toUpperCase()) > -1;
            }));
        }else if(route.params === "Engenharia de Produção"){
            setMonitorias(DATA.filter((item)=>{
                const itemUpperCase = item.toUpperCase();
                return itemUpperCase.indexOf(filterMonitoria.toUpperCase()) > -1;
            }));
        }else if(route.params === "Engenharia de Software"){
            setMonitorias(DATA.filter((item)=>{
                const itemUpperCase = item.toUpperCase();
                return itemUpperCase.indexOf(filterMonitoria.toUpperCase()) > -1;
            }));
        }
    },[filterMonitoria]);

    return (
        <Center
            style={styles.container}
            bgColor="#fff"

        >
            <AuthHeader>
                Selecione a monitoria
            </AuthHeader>
            <Input
                placeholder="Pesquisar monitorias..."
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
                            onPress={()=>navigation.navigate("ForumTab", item)} 
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