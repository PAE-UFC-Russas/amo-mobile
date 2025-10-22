import React, { useState } from "react";
import { Avatar, Text, View, ScrollView, HStack } from "native-base";
import { AntDesign, Entypo } from "@expo/vector-icons";
import ConfirmDeleteModal from "../ConfirmDeleteModal";
import ReportQuest from "../ReportQuest";
import { useCustomToast } from "../../hooks/useCustomToast";
import DotsMenu from "../DotsMenu";
import { GetLoginToken } from "../../util/StorageLogin";
import api from "../../services/api";
import DateISOToFormated from "../../util/DateISOToFormated";
import CommentsModalEdit from "../CommentsModalEdit";
import StatusModal from "../StatusModal";

export default function Comments({
  comment,
  MarkResponse,
  correctResponse,
  enableMark,
  subject,
  GetResponses,
}) {
  const [modalStatus, setModalStatus] = useState({ visible: false, type: 'success', message: '' });
  const [confirmDelete, setConfirmDelete] = useState({
    id: null,
    open: false,
  });
  const [confirmReport, setConfirmReport] = useState({
    id: null,
    open: false,
  });
  const [confirmEdit, setConfirmEdit] = useState({
    id: null,
    open: false,
    resposta: "",
    idDuvida: null,
  });
  const showToast = useCustomToast();
  const isMonitor =
    subject && subject.monitores.some((obj) => obj.id === comment.autor.id);

  const isProfessor = !subject
    ? false
      ? true
      : false
    : subject.professores.find((obj) => obj.id == comment.autor.id);

  const handleDeleteResponse = async () => {
    try {
      await api.delete(`/respostas/${comment.id}/`, {
        headers: {
          Authorization: "Token " + (await GetLoginToken()),
        },
      });
      setConfirmDelete({ open: false, id: null });
      showToast("Sucesso", "Resposta apagada com sucesso!", "success");
      GetResponses(1, true);
    } catch (error) {
      setConfirmDelete({ open: false, id: null });
      setModalStatus({ visible: true, type: 'error', message: error.response.data.detail ?? 'Não foi possível apagar' })
      console.log(error.response);
    }
  };


  const handleEditComment = async (id) => {
    try{
      const data = {
        "duvida": confirmEdit.idDuvida,
        "resposta": confirmEdit.resposta,
      }
      await api.patch(`/respostas/${id}/`,data,{
        headers: {
          Authorization: "Token " + (await GetLoginToken()),
        },
      });
      setConfirmEdit({idDuvida: null,resposta:"",id:null})
      showToast("Sucesso", "Resposta atualizada com sucesso", "success");
      GetResponses(1, true);
    }
    catch(erro){
      console.log(erro);
      setReportQuestion({ open: false, id: null });
      showToast("Error", "Erro ao atualizar resposta !", "erro");
    }
  }

  const handleReportQuestion = async () => {
    try {
      if (!confirmReport.reason) {
        showToast("Erro", "Selecione um motivo", "warning");
        return;
      }

      const report = {
        reason: confirmReport.reason,
        descricao: confirmReport.description,
        duvida: comment.duvida,
      };

      await api.post(`/respostas/${confirmReport.id}/report/`, report, {
        headers: {
          Authorization: "Token " + (await GetLoginToken()),
        },
      });
      setConfirmReport({ open: false, id: null });
      showToast("Sucesso", "Resposta reportada com sucesso!", "success");
    } catch (error) {
      showToast("Error", "Tente novamente mais tarde", "erro");
      console.log(error.response);
    }
  };
  function getIcon() {
    if (subject.professores.some(professor => professor.id === comment.autor.id)) {
       return "🦉";
    } else if (comment.autor.cargos.includes("monitor") && subject.monitores.some(monitor => monitor.id === comment.autor.id)) {
       return "👨‍🏫";
    } else {
       return "🎓";
    }
  }

  return (
    <ScrollView
      backgroundColor={isMonitor || isProfessor ? "#C1F1C6" : "#E5EBF2"}
      padding="3%"
      margin={2}
      borderRadius={10}
      borderWidth={correctResponse === comment.id ? 4 : 0}
      borderColor={correctResponse === comment.id ? "#C1F1C6" : ""}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 2,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Avatar
            bg="tertiaryBlue"
            size="md"
            source={{
              uri: !comment.autor.perfil.foto
                ? "https://i.ibb.co/4f1jsPx/Splash-1.png"
                : comment.autor.perfil.foto,
            }}
          />
          <Text marginLeft={3} fontSize={14} fontWeight="bold">
            {comment.autor.perfil.nome_exibicao}{" "}
            {getIcon()}
          </Text>
        </View>
        <DotsMenu
          setConfirmDelete={setConfirmDelete}
          setConfirmReport={setConfirmReport}
          setUpdate={setConfirmEdit}
          author={comment.autor.id}
          id={comment.id}
          commennts={comment}
        />
      </View>
      <Text fontSize={15}>{comment.resposta}</Text>
      <View
        flexDirection="row"
        marginTop="5%"
        justifyContent="space-between"
        alignItems="center"
      >
        <HStack space={2}>
          {enableMark && (
            <AntDesign
              name="checkcircle"
              size={24}
              color={correctResponse.includes(comment.id) ? "#2F80ED" : "#C4C4C4"}
              onPress={() => MarkResponse(comment.id)}
            />
          )}
          {correctResponse.includes(comment.id) && (
            <HStack
              alignItems="center"
              justifyContent="center"
              textAlign="center"
            >
              <Entypo name="dot-single" size={32} color="#199B0E" />
              <Text color="#199B0E">Resposta verificada</Text>
            </HStack>
          )}
        </HStack>
        <Text fontSize="xs" fontWeight="400">
          {DateISOToFormated(comment.data)}
        </Text>
      </View>
      <ConfirmDeleteModal
        confirmDeleteQuest={confirmDelete}
        setOpen={setConfirmDelete}
        DeleteQuestion={handleDeleteResponse}
      />
      <ReportQuest
        reportQuestion={confirmReport}
        setReportQuestion={setConfirmReport}
        handleReportQuestion={handleReportQuestion}
      />
      <CommentsModalEdit
        confirmUpdateComment={confirmEdit}
        setUpdateComment={setConfirmEdit}
        UpdateComment={handleEditComment}
      />
      <StatusModal
        visible={modalStatus.visible}
        type={modalStatus.type}
        message={modalStatus.message}
        onClose={() => setModalStatus({ ...modalStatus, visible: false })}
      />
    </ScrollView>
  );
}
