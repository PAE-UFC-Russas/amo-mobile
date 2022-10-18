import { View, Text, TouchableOpacity } from 'react-native'
import { HStack, VStack } from 'native-base'
import styles from './styles';

export default function ScheduleBox({setOpenDetailModal, Schedule}) {
  return (
    <View style={styles.container}>
      <VStack>
        <View style={{...styles.status,backgroundColor: 'red'}}></View>
        <Text>{Schedule.status}</Text>
      </VStack>
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