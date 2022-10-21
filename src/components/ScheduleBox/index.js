import { View, Text, TouchableOpacity } from 'react-native'
import DateISOToFormated from '../../util/DateISOToFormated';
import FormateTime from '../../util/FormateTime';
import styles from './styles';

export default function ScheduleBox({setOpenDetailModal, setNewSchedule, Schedule}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={{...styles.status, backgroundColor: 'red'}}/>
      <TouchableOpacity onPress={()=>{setOpenDetailModal(true);setNewSchedule(Schedule)}} style={styles.box}>
        <View style={{maxWidth: '80%'}}>
          <Text style={{fontSize:18}}>{Schedule.assunto}</Text>
          <Text>{Schedule.descricao}</Text>
        </View>
        <View>
          <Text style={styles.hourText}>{FormateTime(Schedule.data)}</Text>
          <Text>{DateISOToFormated(Schedule.data)}</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}