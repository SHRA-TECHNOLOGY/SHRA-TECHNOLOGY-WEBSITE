import { createContext,useState } from "react";
import {useGetMe} from './Hooks/useAuth'

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const {data,isLoading,isError} = useGetMe();

    const user = data?.user || null;

    const isAuthenticated = !!user;

    return (
        <AuthContext.Provider value={{user,isError,isLoading,isAuthenticated}}>
            {children}
        </AuthContext.Provider>
    )
}