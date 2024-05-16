
import { useAuth } from "../security/AuthContext"
import { apiClient } from "./ApiClient"

const username = useAuth.username
export function retrieveTodoUsername(username){
    return apiClient.get(`/users/${username}/todos`)
}
export function deleteTodo(username, id){
    console.log(username,id)
    return apiClient.delete(`/users/${username}/todos/${id}`)
}

export function retrieveTodo(id){
    return apiClient.get(`/users/${username}/todos/${id}`)
}

export function alterTodo(id, todo){
    return apiClient.put(`/users/${username}/todos/${id}` ,todo)
}
export function createTodo(todo){
   return apiClient.post(`/users/${username}/todos`, todo)

}

