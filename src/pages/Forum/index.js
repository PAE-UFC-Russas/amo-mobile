import React, { useState, useEffect } from "react";
import { FlatList } from "react-native";
import { Center, IconButton, Spinner, useToast } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import ForumSearch from "../../components/ForumSearch";
import ForumQuest from "../../components/ForumQuest";
import ButtonGetNextValues from "../../components/ButtonGetNextValues";
import DefaultStagger from "../../components/DefaultStagger";
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal";
import { GetLoginToken } from "../../util/StorageLogin";
import api from "../../services/api";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import ReportQuest from "../../components/ReportQuest";
import { useSubject } from "../../contexts/subject";

export default function Forum() {
  const [filters, setFilters] = useState({
    recent: false,
    late: false,
    mostLiked: false,
    lessLiked: false,
    text: "",
  });
  const [confirmDeleteQuest, setConfirmDeleteQuest] = useState({
    open: false,
    id: null,
  });
  const [reportQuestion, setReportQuestion] = useState({
    open: false,
    id: null,
    reason: "",
    description: "",
  });
  const [page, setPage] = useState(1);
  const [displayValue, setDisplayValue] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const { subject } = useSubject();
  const { navigate, addListener } = useNavigation();

  function handleNavigation(screen, item) {
    navigate(screen, item);
  }

  const GetQuestions = async (next) => {
    try {
      setLoading(true);
      let url = `/duvidas/?page=${page}&disciplina_id=${subject.id}`;

      if (next && data.next) {
        url = `/duvidas/?page=${
          data.next ? data.next.substring(-1) : page + 1
        }&disciplina_id=${subject.id}`;
        setPage(page + 1);
      }

      if (filters.recent) {
        url += "&ordering=-data";
      } else if (filters.late) {
        url += "&ordering=data";
      } else if (filters.mostLiked) {
        url += "&ordering=-votos";
      } else if (filters.lessLiked) {
        url += "&ordering=votos";
      } else if (filters.text.length > 0) {
        url += `&search=${filters.text}`;
      }

      const response = await api.get(url, {
        headers: {
          Authorization: "Token " + (await GetLoginToken()),
        },
      });

      if (next && data.next) {
        const results = [...data.results, ...response.data.results];
        setData({ ...response.data, results: results });
      } else {
        setData(response.data);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const DeleteQuestion = async () => {
    try {
      await api.delete(`/duvidas/${confirmDeleteQuest.id}/`, {
        headers: {
          Authorization: "Token " + (await GetLoginToken()),
        },
      });
      setConfirmDeleteQuest({ open: false, id: null });
      GetQuestions();
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleReportQuestion = async () => {
    try {
      // await api.delete(`/duvidas/${confirmDeleteQuest.id}/`, {
      //    headers: {
      //       Authorization: "Token " + (await GetLoginToken()),
      //    },
      // });
      setReportQuestion({ open: false, id: null });
      toast.show({
        title: "Dúvida reportada com sucesso!",
        placement: "bottom",
      });
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleLikeButton = (id) => {
    data.results.map((item, index) => {
      if (item.id === id) {
        let newData = data.results;
        const votou = data.results[index].votou;
        const votos = data.results[index].votos;

        newData[index].votos = votou ? votos - 1 : votos + 1;
        newData[index].votou = !item.votou;
        setData({ ...data, results: newData });
      }
    });
  };

  const PostLike = async (id) => {
    try {
      handleLikeButton(id);
      await api.post(
        `/duvidas/${id}/votar/`,
        {},
        {
          headers: {
            Authorization: "Token " + (await GetLoginToken()),
          },
        }
      );
    } catch (error) {
      console.log(error.response);
    }
  };

  const DeleteLike = async (id) => {
    try {
      handleLikeButton(id);
      await api.delete(`/duvidas/${id}/votar/`, {
        headers: {
          Authorization: "Token " + (await GetLoginToken()),
        },
      });
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    if (
      filters.late ||
      filters.lessLiked ||
      filters.mostLiked ||
      filters.recent ||
      filters.text.length > 0
    ) {
      GetQuestions();
    } else {
      const focusHandler = addListener("focus", () => {
        GetQuestions();
      });
      return focusHandler;
    }
  }, [filters]);

  return (
    <Center style={styles.container}>
      <ForumSearch
        displayValue={displayValue}
        setDisplayValue={setDisplayValue}
        filters={filters}
        setFilters={setFilters}
      />
      {loading || !(displayValue === filters.text) ? (
        <Spinner marginTop="auto" marginBottom="auto" size="lg" />
      ) : (
        <FlatList
          data={data.results}
          renderItem={(quest) =>
            ForumQuest(
              quest.item,
              handleNavigation,
              PostLike,
              DeleteLike,
              setConfirmDeleteQuest,
              setReportQuestion,
              subject.monitores
            )
          }
          keyExtractor={(quest) => quest.id}
          style={styles.flatListContainer}
          ListFooterComponent={
            data.next && (
              <ButtonGetNextValues label="perguntas" onPress={GetQuestions} />
            )
          }
        />
      )}
      <ConfirmDeleteModal
        confirmDeleteQuest={confirmDeleteQuest}
        setOpen={setConfirmDeleteQuest}
        DeleteQuestion={DeleteQuestion}
      />
      <ReportQuest
        setReportQuestion={setReportQuestion}
        reportQuestion={reportQuestion}
        handleReportQuestion={handleReportQuestion}
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
          onPress={() => navigate("RegisterDoubt")}
        />
      </DefaultStagger>
    </Center>
  );
}
