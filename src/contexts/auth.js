import { createContext, useContext, useState } from 'react';
import api from '../services/api';

export const AuthContext = createContext({});

export default function AuthContextProvider({ children }){
    const [user, setUser] = useState({
        username: null,
        password: null,
        token: null,
        signed: false
    });

    async function Login(user){
        try{
            const userToken = await api.post('/usuario/login/', {
                "username": user.username,
                "password": user.password
            });
            setUser({...user, token: userToken});
            console.log(userToken);
        }catch(error){
            alert("error")
            console.log(error.response.data.username)
            if(error.response.data.username){
                return error.response.data.username
            }else{
                return error.response.data.password
            }
        }
    }

    /*function Logout(){

    }*/

    return (
        <AuthContext.Provider value={{user, Login}}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth(){
    const context = useContext(AuthContext);
   
    return context;
}