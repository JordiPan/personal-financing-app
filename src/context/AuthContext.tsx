import { createContext, useContext, useState } from 'react';
// import { User } from '../api/models/User';
import { axiosPrivate } from '../api/axios';

interface AuthContextType {
    token: string | null; //access token
    role: string | null;
    setLoginInfo: (role: string, token: string) => void; 
    logout: () => void;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
    const [role, setRole] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);

    const setLoginInfo = (role: string, token: string) => {
        console.log("Logging info now!!!", role, token);
        setRole(role);
        setToken(token);
    }

    const logout = () => {
        setRole(null);
        setToken(null);
        // try {
        //     await axios.post('loguit', {}, {
        //         'withCredentials': true
        //     })
        // }
        // catch (err) {
        //     console.log(err);
        // }
    }
    return (
        <AuthContext.Provider value={{role, token, setLoginInfo, logout}}>
        {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context) {
        throw new Error("Bad")
    }
    return context;
}