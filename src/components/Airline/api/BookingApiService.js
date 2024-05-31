
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