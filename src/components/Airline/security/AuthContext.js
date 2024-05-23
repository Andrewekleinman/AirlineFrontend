import { createContext, useContext, useState } from "react";
import { executeBasicAuthenticationService } from "../api/ApiService";
import { apiClient } from "../api/ApiClient";

export const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export default function AuthProvider({children}){

    const [number,setNumber] = useState(0)
    const[isAuthenticated,setAuthenticated] = useState(false)
    const [username, setUsername] = useState(null)
    const [token, setToken] = useState(null)
    const [flightSearch,setFlightSearch] = useState(null)


    setInterval( ()=> setNumber(number+1),10000)
    const sharedValue = {number, isAuthenticated, login, logout, username, token, flightSearch,setFlightSearch}

   async function login(username,password){
        const baToken = 'Basic ' + window.btoa(username + ":" + password)
        try{
        const response = await executeBasicAuthenticationService(baToken)
        
        if(response.status==200){
            setAuthenticated(true)
            setUsername(username)
            setToken(baToken)
            apiClient.interceptors.request.use(
                config =>{
                    config.headers.Authorization=baToken
                    return config
                }
            )
            return true
        }
        setAuthenticated(false)
        setUsername(null)
        return false
    }catch(error){
        setAuthenticated(false)
        setUsername(null)
        return false
    }
    }
    function logout(){
        setAuthenticated(false)
        setToken(null)
        setUsername(null)
    }
    return(
        <AuthContext.Provider value={sharedValue}>
            {children}
        </AuthContext.Provider>
    )
}