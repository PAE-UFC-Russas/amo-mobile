import { Platform } from "react-native";
import { GetLoginToken } from "./StorageLogin";
import api from "../services/api";

export async function EditProfilePerFormData(profile) {
  const formData = new FormData();
  const randomNumberForPhoto = Math.floor(Math.random() * (1000000 - 1) + 1);
  const token = await GetLoginToken();

  formData.append("foto", {
    uri:
      Platform.OS === "ios"
        ? profile.foto.replace("file://", "")
        : profile.foto,
    name: profile.nome_exibicao + randomNumberForPhoto + "foto.jpg",
    fileName: profile.nome_exibicao + randomNumberForPhoto + "foto.jpg",
    type: "image/jpeg",
  });
  formData.append(
    "nome_exibicao",
    !profile.nome_exibicao ? user.nome_exibicao : profile.nome_exibicao
  );
  formData.append("curso", profile.curso);
  formData.append("entrada", profile.entrada);

  try {
    const response = await fetch(
      "https://amo-backend.onrender.com/usuario/eu/",
      {
        method: "PATCH",
        headers: {
          Authorization: "Token " + token,
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      }
    );
    const newEditedUser = await response.json();
    return { success: true, user: newEditedUser };
  } catch (error) {
    console.log(error);
    return { success: false, user: null };
  }
}

export async function EditProfilePerApi(profile) {
  try {
    const response = await api.patch(
      `/usuario/eu/`,
      {
        nome_exibicao: profile.nome_exibicao,
        entrada: profile.entrada,
        curso: profile.curso,
      },
      {
        headers: {
          Authorization: "Token " + (await GetLoginToken()),
        },
      }
    );
    return { success: true, user: response.data };
  } catch (error) {
    console.log(error.response);
    return { success: false, user: null };
  }
}
