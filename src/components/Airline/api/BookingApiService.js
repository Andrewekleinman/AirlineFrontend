
import { useAuth, flightSearch} from "../security/AuthContext"
import { apiClient } from "./ApiClient"

export function retrieveBookings(username, bookingType){
    console.log(username, bookingType)
    return apiClient.get(`/bookings/${username}/${bookingType}/test`)
}
export function createBooking(booking){
    console.log(booking)
    return apiClient.post(`/bookings`, booking)
 }
 export function purchase(username){
    return apiClient.put(`/purchase/${username}`)
 }
 export function deleteBooking(bookingId){
    // console.log(username,id)
    return apiClient.delete(`/bookings/${bookingId}`)
}