import { View, Text, TouchableOpacity } from 'react-native'
import { Popover, Button } from "native-base";
import DateISOToFormated from '../../util/DateISOToFormated';
import FormateTime from '../../util/FormateTime';
import styles from './styles';

export default function ScheduleBox({setOpenDetailModal, setNewSchedule, Schedule}) {

  const ColorOfSchedule = () => {
    if(Schedule.status == 'confirmado'){
      return 'green'
    }else if(Schedule.status == 'aguardando'){
      return 'yellow'
    }else{
      return 'red'
    }
  }

  const SchedulePopover = () => {
    return (
      <Popover
        trigger={triggerProps => {
          return <Button {...triggerProps} style={{...styles.status, backgroundColor: ColorOfSchedule()}}/>
        }}
      >
        <Popover.Content accessibilityLabel='Status of scheduling'>
          <Popover.Body>
            O agendamento foi {Schedule.status}
          </Popover.Body>
        </Popover.Content>
      </Popover>
    )
  }
          

  return (
    <View style={styles.container}>
      <SchedulePopover/>
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