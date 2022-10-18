import { View, Text, TouchableOpacity } from 'react-native'
import { HStack, VStack } from 'native-base'
import DateISOToFormated from '../../util/DateISOToFormated';
import FormateTime from '../../util/FormateTime';
import styles from './styles';

export default function ScheduleBox({setOpenDetailModal, Schedule}) {
  return (
    <View style={styles.container}>
      <VStack>
        <TouchableOpacity style={{...styles.status,backgroundColor: 'red'}}></TouchableOpacity>
      </VStack>
        <TouchableOpacity onPress={()=>setOpenDetailModal(true)} style={styles.box}>
          <HStack justifyContent='space-between'>
            <Text style={{fontSize:20}}>{Schedule.assunto}</Text>
            <View>          
              <Text>{FormateTime(Schedule.data)}</Text>
            </View>
          </HStack>
          <View style={{flexDirection:'row', justifyContent:'space-between'}}>
            <Text>{Schedule.descricao}</Text>
            <Text>{DateISOToFormated(Schedule.data)}</Text>
          </View>
        </TouchableOpacity>
    </View>
  )
}