import { createContext, useContext, useState } from 'react';

export const AuthContext = createContext({});

export default function AuthContextProvider({ children }){
    const [user, setUser] = useState(null);

    function Login(user){
        console.log(user)
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