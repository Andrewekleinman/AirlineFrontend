
import { useAuth, flightSearch} from "../security/AuthContext"
import { apiClient } from "./ApiClient"

const username = useAuth.username
export function retrieveFlights(depart, arrive, departDate, returnDate){
    console.log(depart, arrive, departDate.toString(),returnDate.toString());
    return apiClient.get(`/flights/${depart}/${arrive}/${departDate}/${returnDate}/test`)
}
export function deleteFlight(id){
    // console.log(username,id)
    return "apiClient.delete(`/flights/${id}`)"
}

export function retrieveFlight(id){
    return apiClient.get(`/flights/${id}`)
}

export function alterFlight(id, flight){
    return apiClient.put(`/flights/${id}` ,flight)
}
export function createFlight(flight){
   return apiClient.post(`/flights`, flight)

}
