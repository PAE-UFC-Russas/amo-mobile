import { createContext, useContext, useState } from 'react';
import { DeleteLoginToken, StoreLoginToken, GetLoginToken } from '../util/StorageLogin';
import api from '../services/api';

export const AuthContext = createContext({});

export default function AuthContextProvider({ children }){
    const [user, setUser] = useState({
        email: null,
        password: null,
        token: null,
        signed: false
    });

    async function Login(user){
        try{
            const response = await api.post('/usuario/login/', {
                "username": user.email,
                "password": user.password
            });
            const token = response.data.token;
            setUser({...user, token: token});

            if(user.signed){
                await StoreLoginToken(token);
            }

            return undefined
        }catch(error){
            return error.response.data
        }
    }

    async function Logout(){
        setUser({
            email: null,
            password: null,
            token: null,
            signed: false
        });
        await DeleteLoginToken();
    }

    async function IsConnected(){
        const token = GetLoginToken();
        if(!token)
            return false
        return true
    }

    return (
        <AuthContext.Provider value={{user, Login, Logout, IsConnected}}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth(){
    const context = useContext(AuthContext);
   
    return context;
}