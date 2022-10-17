import { View, Text, TouchableOpacity } from 'react-native'
import { HStack } from 'native-base'
import { AntDesign } from '@expo/vector-icons'; 
import styles from './styles';

export default function ScheduleBox({setOpenDetailModal}) {
  return (
    <View style={styles.container}>
        <AntDesign name='login' size={24} color='#52D6FB'/>
        <TouchableOpacity onPress={()=>setOpenDetailModal(true)} style={styles.box}>
          <HStack justifyContent='space-between'>
            <Text style={{fontSize:20}}>Assunto</Text>
            <Text>07/10/2022</Text>
          </HStack>
          <View>
            <Text>duvida sobre tal pergunta!</Text>
          </View>
        </TouchableOpacity>
    </View>
  )
}