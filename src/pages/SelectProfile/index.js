import React, { useState } from 'react';
import { View } from 'react-native';
import { Center, Select, Button } from 'native-base';
import RegisterHeader from '../../components/RegisterHeader';
import DefaultSelect from '../../components/DefaultSelect';
import styles from './styles';

export default function SelectProfile({navigation}) {
    const [profile, setProfile] = useState("");

    const handleNavigation = () => {
        if(profile){
            if(profile === "Aluno")
                return "StudentProfile"
            else if(profile === "Professor")
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
                <DefaultSelect
                    placeholder="Escolha seu perfil" 
                    items={['Aluno', 'Monitor', 'Professor']}
                    value={profile} 
                    setValue={itemValue => setProfile(itemValue)} 
                    color="tertiaryBlue" 
                    error={null}
                />
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