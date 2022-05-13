import React, { useState } from 'react';
import { View } from 'react-native';
import { Center, Select, Button } from 'native-base';
import RegisterHeader from '../../components/RegisterHeader';
import styles from './styles';

export default function SelectProfile({navigation}) {
    const [profile, setProfile] = useState("");

    const handleNavigation = () => {
        if(profile){
            if(profile === "aluno")
                return "StudentProfile"
            else if(profile === "professor")
                return "ProfessorProfile"
            else
                return "MonitorProfile"
        }
    }

    return (
        <Center
            style={styles.container}
            bgColor="#fff"

        >
            <View>
                <RegisterHeader>
                    Selecionar perfil
                </RegisterHeader>
                <Select 
                    selectedValue={profile} 
                    minWidth="320" 
                    accessibilityLabel="Escolha seu perfil" 
                    placeholder="Escolha seu perfil"
                    placeholderTextColor="tertiaryBlue"
                    borderColor="tertiaryBlue"
                    color="tertiaryBlue"
                    borderRadius={15}
                    _selectedItem={{
                        bg: "tertiaryBlue"
                    }}
                    _text={{
                        fontSize: "3xl"
                    }}
                    onValueChange={itemValue => setProfile(itemValue)}
                >
                    <Select.Item label="Aluno" value="aluno"/>
                    <Select.Item label="Monitor" value="monitor"/>
                    <Select.Item label="Professor" value="professor"/>
                </Select>
            </View>
            <Button 
                bgColor="defaultBlue" 
                borderRadius="2xl" 
                width={80} 
                height={60}
                disabled={!profile?true:false}
                onPress={()=>navigation.navigate(handleNavigation())} 
                _text={{
                    fontWeight: 800,
                    color: "#fff",
                }}
            >
                Próximo
            </Button>
        </Center>
    );
}