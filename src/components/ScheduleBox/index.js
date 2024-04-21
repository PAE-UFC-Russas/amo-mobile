import { View, Text, TouchableOpacity } from "react-native";
import DateISOToFormated from "../../util/DateISOToFormated";
import styles from "./styles";
import FormateTime from "../../util/FormateTime";

export default function ScheduleBox({
  setOpenDetailModal,
  setNewSchedule,
  Schedule,
}) {
  const status =
    Schedule.status[0].toUpperCase() +
    Schedule.status.substring(1, Schedule.status.length);
  const type =
    Schedule.tipo[0].toUpperCase() +
    Schedule.tipo.substring(1, Schedule.tipo.length);

  const ColorOfSchedule = () => {
    if (Schedule.status == "confirmado") {
      return "#03CD23";
    } else if (Schedule.status == "aguardando") {
      return "#FFD749";
    } else {
      return "#FF5B5B";
    }
  };

  const CutString = (text, len) => {
    if (text.length > len) {
      return text.slice(0, len) + "...";
    }

    return text;
  };

  return (
    <View style={styles.container}>
      <View style={{ ...styles.status, backgroundColor: ColorOfSchedule() }} />
      <TouchableOpacity
        onPress={() => {
          setOpenDetailModal(true);
          setNewSchedule(Schedule);
        }}
        style={styles.box}
      >
        <View style={styles.infoArea}>
          <View>
            <Text style={{ color: ColorOfSchedule() }}>{status}</Text>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              {CutString(Schedule.assunto, 18)}
            </Text>
          </View>
          <View>
            <Text>{type}</Text>
            <Text>
              {DateISOToFormated(Schedule.data)} as {FormateTime(Schedule.data)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}
