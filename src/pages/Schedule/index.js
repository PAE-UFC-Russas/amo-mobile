import React, { useState, useEffect } from "react";
import { Center, Spinner, FlatList, IconButton, View } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import ModalAddScheduling from "../../components/ModalAddScheduling";
import ModalDetailScheduling from "../../components/ModalDetailScheduling";
import DefaultStagger from "../../components/DefaultStagger";
import SchedulingFilter from "../../components/SchedulingFilter";
import ScheduleBox from "../../components/ScheduleBox";
import ConfirmCancelModal from "../../components/ConfirmCancelModal";
import { GetLoginToken } from "../../util/StorageLogin";
import api from "../../services/api";
import styles from "./styles";
import { useSubject } from "../../contexts/subject";

export default function Schedule() {
   const { subject } = useSubject();
   const [openAddModal, setOpenAddModal] = useState(false);
   const [openDetailModal, setOpenDetailModal] = useState(false);
   const [loading, setLoading] = useState(true);
   const [schedules, setSchedules] = useState([]);
   const [newSchedule, setNewSchedule] = useState({
      tipo: "",
      data: new Date(),
      assunto: "",
      descricao: "",
      disciplina: subject.id,
   });

   const [confirmCancelQuest, setConfirmCancelQuest] = useState({
      open: false,
      id: null,
   });

   const [filters, setFilters] = useState({
      mine: false,
      all: true,
      opens: false,
      closed: false,
   });

   async function GetSchedules() {
      let params = {};

      params = { disciplina: subject.id };

      if (!filters.all) {
         if (filters.opens) {
            params = { ...params, status: "confirmado" };
         } else if (filters.closed) {
            params = { ...params, status: "cancelado" };
         }
      }

      try {
         setLoading(true);
         const response = await api.get("/agendamentos", {
            headers: {
               Authorization: "Token " + (await GetLoginToken()),
            },
            params,
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
         setConfirmCancelQuest({ open: false, id: null });
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
            "/agendamentos/",
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
         return error.response.status;
      }
   }

   useEffect(() => {
      GetSchedules();
   }, [filters]);

   return (
      <Center style={styles.container} bgColor="#fff">
         <SchedulingFilter filters={filters} setFilters={setFilters} />
         {loading ? (
            <Spinner marginTop="auto" marginBottom="auto" size="lg" />
         ) : (
            <>
               <FlatList
                  data={schedules.results}
                  contentContainerStyle={{
                     paddingVertical: 5,
                     paddingHorizontal: 30,
                  }}
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
                     bgColor="#024284"
                     marginY={10}
                     icon={
                        <MaterialIcons color="#fff" size={33} name="create" />
                     }
                     onPress={() => setOpenAddModal(true)}
                  />
               </DefaultStagger>
               {openDetailModal && (
                  <ModalDetailScheduling
                     subject={subject}
                     details={newSchedule}
                     openModal={openDetailModal}
                     setOpenModal={setOpenDetailModal}
                     EditSchedule={EditSchedule}
                     setConfirmCancelQuest={setConfirmCancelQuest}
                  />
               )}
               <ModalAddScheduling
                  PostNewSchedule={PostNewSchedule}
                  newSchedule={newSchedule}
                  setNewSchedule={setNewSchedule}
                  openModal={openAddModal}
                  setOpenModal={setOpenAddModal}
               />
               <ConfirmCancelModal
                  confirmCancelModal={confirmCancelQuest}
                  setOpen={setConfirmCancelQuest}
                  DeleteQuestion={() => {
                     EditSchedule("cancelado");
                  }}
               />
            </>
         )}
      </Center>
   );
}
