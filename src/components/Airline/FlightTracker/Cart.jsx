
import { retrieveBookings } from '../api/BookingApiService';
import { useAuth } from '../security/AuthContext';
import { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { deleteBooking } from '../api/BookingApiService';


export default function Cart(){
    const auth = useAuth();
    const [bookings, setBookings] = useState([]);
    const navigate = useNavigate()
    function refreshCart(){
        retrieveBookings(auth.username, "Cart")
            .then(response => {
                setBookings(response.data)
            })
    }
    useEffect ( () => refreshCart,[] )

    function purchase(){
        navigate(`/payment`)
    }
    async function deleteElement(bookingId){
        await deleteBooking(bookingId);
        refreshCart()
    }
    return(
    <div>Items in your Cart
    <table className='center'>
        <tbody>
            <tr>
                <th>Departure</th>
                <th>Arrival</th>
                <td>Date</td>
                <td>Seats Booked</td>
                {/* <td>Seats</td> */}
            </tr>
            
            {bookings.map(
                        element => (
                            <tr key={element.bookingId}>
                                <td>{element.depart}</td>
                               <td>{element.arrive}</td>
                               <td>{element.departDate.toString()}</td>
                                {/* <td>{element.returnDate.toString()}</td> */}
                                <td>{element.passengers}</td>
                               <td>{element.departTime} - {element.arriveTime}</td>
                                <td>${element.price}</td>
                                <td><button className='btn btn-warning' onClick={() => deleteElement(element.bookingId)}>delete</button></td>
                                
                                
                            </tr>
                        )
                    )} 
                    </tbody>
                    </table>
                    <button className='btn btn-success' onClick={() => purchase()}>Purchase flights</button>
                    </div>
)
}