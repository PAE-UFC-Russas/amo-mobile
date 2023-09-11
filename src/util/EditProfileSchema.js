import { useToast } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../contexts/auth";

export async function EditProfilePerFormData(profile){
    const toast = useToast();
    const { goBack } = useNavigation();
    const { EditUser } = useAuth();

    const formData = new FormData();
    const randomNumberForPhoto = Math.floor(Math.random() * (1000000 - 1) + 1)
    formData.append("foto", {
        uri:
            Platform.OS === "ios"
            ? profile.foto.replace("file://", "")
            : profile.foto,
        name: profile.nome_exibicao + randomNumberForPhoto + "foto.jpg",
        fileName:
            profile.nome_exibicao + randomNumberForPhoto +
            "foto.jpg",
        type: "image/jpeg",
    });
    formData.append(
        "nome_exibicao",
        !profile.nome_exibicao ? user.nome_exibicao : profile.nome_exibicao
    );
    formData.append("curso", profile.curso);
    formData.append("entrada", profile.entrada);

    try {
        const response = await fetch("https://amo-backend.onrender.com/usuario/eu/", {
           method: "PATCH",
           headers: {
              Authorization: "Token " + (await GetLoginToken()),
              "Content-Type": "multipart/form-data",
           },
           body: formData,
        });
        const newEditedUser = await response.json()
        EditUser(newEditedUser)

        toast.show({
           title: "Dados cadastrados com sucesso!",
           placement: "bottom",
        });

        goBack();
    } catch (error) {
        toast.show({
            title: "Erro, verifique sua internet!",
            placement: "bottom",
        });
        console.log(error);
    }
}

export async function EditProfilePerApi(profile){
    const toast = useToast();
    const { goBack } = useNavigation();

    try {
        const response = await fetch("https://amo-backend.onrender.com/usuario/eu/", {
           method: "PATCH",
           headers: {
              Authorization: "Token " + (await GetLoginToken()),
              "Content-Type": "multipart/form-data",
           },
           body: formData,
        });
        const newEditedUser = await response.json()
        EditUser(newEditedUser)

        toast.show({
           title: "Dados cadastrados com sucesso!",
           placement: "bottom",
        });

        goBack();
    } catch (error) {
        toast.show({
            title: "Erro, verifique sua internet!",
            placement: "bottom",
        });
        console.log(error);
    }
}