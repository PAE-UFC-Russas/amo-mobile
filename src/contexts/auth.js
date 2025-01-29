import { createContext, useContext, useState } from "react";
import {
  DeleteLoginToken,
  StoreLoginToken,
  GetLoginToken,
} from "../util/StorageLogin";
import api from "../services/api";

export const AuthContext = createContext({});

export default function AuthContextProvider({ children }) {
  const [user, setUser] = useState();

  async function GetUser(token) {
    try {
      const response = await api.get("/usuario/eu/", {
        headers: {
          Authorization: "Token " + token,
        },
      });

      return response.data;
    } catch (error) {
      console.log(error.response.data);
      return null;
    }
  }

  function EditUser(user) {
    setUser(user);
  }

  async function Login(user) {
    try {
      const response = await api.post("/usuario/login/", {
        username: user.email,
        password: user.password,
      });
      const token = response.data.token;
      const userData = await GetUser(token);

      setUser({ ...userData });

      await StoreLoginToken(token);

      if (
        userData.perfil.curso === null ||
        userData.perfil.entrada === null ||
        userData.perfil.nome_completo.length < 1
      ) {
        return { erro: "usuario incompleto!" };
      }

      return undefined;
    } catch (error) {
      return error.response.data;
    }
  }

  async function Register(newUser) {
    try {
      await api.post("/registrar/", {
        email: newUser.email,
        password: newUser.password,
      });
      setUser({ email: newUser.email, password: newUser.password });

      return null;
    } catch (error) {
      console.log(error.response);
      return error.response.data;
    }
  }

  async function CompleteRegister(userData) {
    const foto = userData.foto ? userData.foto : null;

    try {
      const response = await api.patch(
        `/usuario/eu/`,
        {
          nome_completo: userData.name,
          nome_exibicao: userData.nickName,
          data_nascimento: new Date().toISOString().split("T")[0],
          matricula: userData.registration,
          entrada: userData.entryYear,
          curso: userData.course.id,
          foto: foto,
        },
        {
          headers: {
            Authorization: "Token " + (await GetLoginToken()),
          },
        }
      );

      return response.data.nome_exibicao;
    } catch (error) {
      console.log(error);
      return error.response.data;
    }
  }

  async function Active(token) {
    try {
      const response = await api.post("/registrar/confirmar-email/", {
        token: token,
      });
      const userData = await GetUser(response.data.auth_token);

      await StoreLoginToken(response.data.auth_token);
      setUser({ ...userData });

      return true;
    } catch (error) {
      console.log(error.response);
      if (
        error.response.status === 401 ||
        error.response.status === 404 ||
        error.response.status === 409
      ) {
        return error.response.data.detail;
      } else {
        return "Falha ao ativar o token, verifique se o código está correto ou se o celular está conectado a internet!";
      }
    }
  }

  async function Logout() {
    setUser(null);
    await DeleteLoginToken();
  }

  async function IsConnected() {
    const token = await GetLoginToken();
    const userData = await GetUser(token);

    if (!userData) {
      return false;
    } else {
      if (!userData.perfil.curso) {
        return null;
      } else {
        setUser({ ...userData });
        return true;
      }
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        Logout,
        Login,
        Register,
        CompleteRegister,
        Active,
        IsConnected,
        EditUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
