import React, { useState } from 'react';
import { Avatar, Box, Button, Text, Select, Input, HStack, TextArea, Image } from 'native-base';
import { View } from 'react-native';
import styles from './styles';
import { MaterialIcons } from '@expo/vector-icons'; 
import PickImage from '../../util/PickImage';
import OnDeleteModal from '../../components/OnDeleteModal';

export default function RegisterDoubt({navigation}) {

    const [openModal, setOpenModal] = useState(false)

    const [doubt, setDoubt] = useState({
        title: "",
        desc: ""
    });
    const [image, setImage] = useState(null);
    
    const getImage = async () => {
        setImage(await PickImage());
    }

    const OnDelete = () => {
        if(doubt.title.length > 0 || doubt.desc.length > 0){
            setOpenModal(true)
        }else{
            navigation.goBack()
        }
    }
    
    return (
        <Box marginTop="3" height="full" padding="7" width="full" justifyContent="space-between">
            <View>
                <HStack>
                    <MaterialIcons
                        onPress={OnDelete}
                        color="#52D6FB"
                        size={24}
                        name="arrow-back-ios"
                    />
                    <Text style={styles.title}>Cadastrar dúvida</Text>
                </HStack>
                <HStack>
                    <Avatar 
                        marginLeft={30}
                        marginTop={50} 
                        margin={5}
                        bg="tertiaryBlue" 
                        size="md" 
                        source={{
                            uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                        }}
                    />
                    <Select placeholder="Privacidade do Autor" marginTop={28} width={165} height={38} borderRadius={20} borderColor="#52D6FB" placeholderTextColor="#52D6FB" ></Select>
                </HStack>
                <View style={{width:'100%'}}>
                    <Input size="md" borderColor="#52D6FB" borderRadius={20} marginTop={2} width="90%" color="#52D6FB" marginLeft={5}  placeholderTextColor="#52D6FB" onChangeText={(text)=> setDoubt({...doubt, title:text})} placeholder="Insira um titulo"/>
                    <Text style={{fontSize:11, fontFamily:'Roboto', flexWrap:'wrap', width:'80%', marginLeft:35}}>O titulo deve conter palavras chaves, ex: equação do segundo grau</Text>
                    <TextArea size="md" borderColor="#52D6FB" color="#52D6FB" maxLength={500} borderRadius={20} marginLeft={5} width="90%" marginTop={2} height={50} placeholderTextColor="#52D6FB" onChangeText={(text)=> setDoubt({...doubt, desc:text})} placeholder="Insira um descrição"/>
                    <Text style={{ height:100, fontSize:11, width:230, fontFamily:'Roboto', marginLeft:35,}}>A descrição deve conter 500 caracteres</Text>
                </View>
                {
                    image&&
                    <Image borderRadius={5} width={400} height={200} alt="Conteúdo da dúvida" source={{
                            uri: image
                        }}
                    />
                }
            </View>
            <HStack width="full" justifyContent="space-between">
                <HStack space={2}>
                    <MaterialIcons
                        color="#52D6FB"
                        size={32}
                        name="drive-folder-upload"   
                    />
                    <MaterialIcons
                        color="#52D6FB"
                        size={32}
                        name="add-photo-alternate" 
                        onPress={getImage}           
                    />
                </HStack>
                <Button style={{width:'30%', borderRadius:30}}>Publicar</Button>
            </HStack>
            {
                openModal && <OnDeleteModal setOpenModal={setOpenModal} openModal={openModal} navigation={navigation} />
            }
        </Box>
    );
}