import axios from "axios"
import { apiClient } from "./ApiClient"

export function retrieveHelloWorldBean(){
    return apiClient.get('/hello-world-bean')
}
export const retrieveHelloWorldPathVariable = (username) => apiClient.get(`/hello-world/path-variable/${username}`)

export const executeBasicAuthenticationService = (token) => apiClient.get(`basicauth`,{
    headers:{
        Authorization: token
    }
})