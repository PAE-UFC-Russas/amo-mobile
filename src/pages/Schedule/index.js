import React, { useState, useEffect } from "react";
import { Center, Spinner, FlatList, IconButton } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import ModalAddScheduling from "../../components/ModalAddScheduling";
import ModalDetailScheduling from "../../components/ModalDetailScheduling";
import SelectForSubjects from "../../components/SelectForSubjects";
import DefaultStagger from "../../components/DefaultStagger";
import SchedulingFilter from "../../components/SchedulingFilter";
import ScheduleBox from "../../components/ScheduleBox";
import { GetLoginToken } from "../../util/StorageLogin";
import api from "../../services/api";
import styles from "./styles";

export default function Schedule() {
   const [subjects, setSubjects] = useState([]);
   const [openAddModal, setOpenAddModal] = useState(false);
   const [openDetailModal, setOpenDetailModal] = useState(false);
   const [loading, setLoading] = useState(true);
   const [schedules, setSchedules] = useState([]);
   const [newSchedule, setNewSchedule] = useState({
      tipo: "",
      data: new Date(),
      assunto: "",
      descricao: "",
      disciplina: null,
   });
   const [filters, setFilters] = useState({
      mine: false,
      all: false,
      opens: false,
      closed: false,
      subject: {id: null, name: "Selecione a disciplina"}
   });

   async function GetSubjects() {
      try {
         const response = await api.get(`/disciplinas/?pages=1`, {
            headers: {
               Authorization: "Token " + (await GetLoginToken()),
            },
         });

         setSubjects(response.data.results);
      } catch (error) {
         console.log(error);
      }
   }

   async function GetSchedules() {
      let url = "/agendamentos/?pages=1";

      if (filters.subject.id !== null) {
         url += `&disciplina=${filters.subject.id}`;
      } else if (filters.all) {
         url = "/agendamentos/?pages=1";
      } else if (filters.confimed) {
         url += "&status=confirmado";
      } else if (filters.closed) {
         url += "&status=cancelado";
      }

      try {
         setLoading(true);
         const response = await api.get(url, {
            headers: {
               Authorization: "Token " + (await GetLoginToken()),
            },
         });

         setSchedules(response.data);
         setLoading(false);
      } catch (error) {
         console.log(error);
      }
   }

   async function EditSchedule(type) {
      try {
         await api.patch(
            `/agendamentos/${newSchedule.id}/`,
            {
               status: type,
            },
            {
               headers: {
                  Authorization: "Token " + (await GetLoginToken()),
               },
            }
         );
         setOpenDetailModal(false);
         GetSchedules();
         return true;
      } catch (error) {
         console.log(error.response);
         return false;
      }
   }

   async function PostNewSchedule() {
      try {
         await api.post(
            `/agendamentos/`,
            {
               ...newSchedule,
            },
            {
               headers: {
                  Authorization: "Token " + (await GetLoginToken()),
               },
            }
         );
         GetSchedules();
         return true;
      } catch (error) {
         console.log(error.response);
         return false;
      }
   }

   useEffect(() => {
      if (subjects.length < 1) {
         GetSubjects();
      }
      GetSchedules();
   }, [filters]);

   return (
      <Center style={styles.container} bgColor="#fff">
         <SchedulingFilter filters={filters} setFilters={setFilters} />
         {loading ? (
            <Spinner marginTop="auto" marginBottom="auto" size="lg" />
         ) : (
            <>
               <SelectForSubjects
                  alignItems="center"
                  justfyContent="center"
                  width="90%"
                  borderWidth={1}
                  backgroundColor="white"
                  style={{ color: "black", backgroundColor: "white" }}
                  items={subjects}
                  placeholder={filters.subject.name}
                  setValue={(itemValue) =>
                     setFilters({ ...filters, subject: {id: itemValue.substring(0,itemValue.indexOf(",")), name: itemValue.substring(itemValue.indexOf(",")+1,itemValue.length)}})
                  }
                  color="#52D6FB"
               />
               <FlatList
                  data={schedules.results}
                  contentContainerStyle={{ padding: 10 }}
                  renderItem={(item, index) => (
                     <ScheduleBox
                        Schedule={item.item}
                        setNewSchedule={setNewSchedule}
                        setOpenDetailModal={setOpenDetailModal}
                        key={index}
                     />
                  )}
               />
               <DefaultStagger>
                  <IconButton
                     style={{
                        shadowColor: "#000",
                        shadowOffset: {
                           width: 10,
                           height: 10,
                        },
                        shadowOpacity: 4,
                        shadowRadius: 3.84,
                        elevation: 5,
                     }}
                     variant="solid"
                     borderRadius="full"
                     bgColor="teal.400"
                     marginY={2}
                     icon={<MaterialIcons color="#fff" size={24} name="add" />}
                     onPress={() => setOpenAddModal(true)}
                  />
               </DefaultStagger>
               {openDetailModal && (
                  <ModalDetailScheduling
                     subjects={subjects}
                     details={newSchedule}
                     openModal={openDetailModal}
                     setOpenModal={setOpenDetailModal}
                     EditSchedule={EditSchedule}
                  />
               )}
               <ModalAddScheduling
                  PostNewSchedule={PostNewSchedule}
                  subjects={subjects}
                  newSchedule={newSchedule}
                  setNewSchedule={setNewSchedule}
                  openModal={openAddModal}
                  setOpenModal={setOpenAddModal}
               />
            </>
         )}
      </Center>
   );
}
