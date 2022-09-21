import React from 'react';
import { Image, View, Text, VStack } from 'native-base';
import { TouchableOpacity, Linking } from 'react-native';
import { MaterialIcons, EvilIcons } from '@expo/vector-icons'; 
import styles from './styles';

export default function About({navigation}) {
    return (
        <>
            <View backgroundColor='#fff' flexDirection='row' justifyContent='space-between'>
                <MaterialIcons
                    onPress={()=>navigation.goBack()}
                    color='#52D6FB'
                    size={24}
                    name='arrow-back-ios'
                    style={{marginLeft:'5%', marginTop:50,}}
                />
            </View>
            <View
                style={styles.container}
                bgColor='#fff'
            >   
                <VStack>
                    <Image
                        width={400} 
                        height={400}
                        alt='Ilustração da tela about'
                        source={require('../../assets/About_img.png')}
                    />
                    <View width='90%'>
                        <Text fontSize={18} textAlign='center' fontWeight={500} marginLeft={10}>
                            Aplicativo para auxiliar as monitorias, onde seria possível marcar monitoria, ver hórarios, visualizar conteúdo postados e solucionar dúvidas dos alunos da UFC - Campus Russas.
                        </Text>
                    </View>
                </VStack>
                <View width='100%' alignItems='center'>
                    <TouchableOpacity
                        onPress={()=> Linking.openURL('https://github.com/PAE-UFC-Russas')} 
                        style={{backgroundColor:'#52D6FB', width:'80%', height:50, alignItems:'center', borderRadius:20, flexDirection:'row', marginTop:30, justifyContent:'center'}}
                    >
                        <Text color={'#fff'} justifyContent='center' fontWeight='bold'>GitHub</Text>
                        <EvilIcons
                            color='#fff'
                            size={30}
                            name='external-link'
                            style={{marginLeft:10}}  
                        />
                    </TouchableOpacity>
                    <Image
                        width={30} 
                        height={60}
                        alt='Identidade Visual UFC'
                        source={require('../../assets/ufc.png')}
                        marginTop={5}
                        
                    />
                </View>
            </View>
        </>
    );
}