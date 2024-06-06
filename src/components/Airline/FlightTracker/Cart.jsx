
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
    <div><h1>Items in your Cart</h1>
    <table className='center bordered'>
        <tbody>
            <tr>
                <th className='tableFormat'>Departure</th>
                <th className='tableFormat'>Arrival</th>
                <td className='tableFormat'>Date</td>
                <td className='tableFormat'>Seats Booked</td>
                <td className='tableFormat'>Duration</td>
                {/* <td className='tableFormat'>Seats</td> */}
            </tr>
            
            {bookings.map(
                        element => (
                            <tr key={element.bookingId}>
                                <td className='tableFormat'>{element.depart}</td>
                               <td className='tableFormat'>{element.arrive}</td>
                               <td className='tableFormat'>{element.departDate.toString()}</td>
                                {/* <td className='tableFormat'>{element.returnDate.toString()}</td> */}
                                <td className='tableFormat'>{element.passengers}</td>
                               <td className='tableFormat'>{element.departTime} - {element.arriveTime}</td>
                                {/* <td className='tableFormat'>${element.price}</td> */}
                                <td className='tableFormat'><button className='btn btn-warning' onClick={() => deleteElement(element.bookingId)}>delete</button></td>
                                
                                
                            </tr>
                        )
                    )} 
        </tbody>
    </table>
    <button className='btn btn-success' onClick={() => purchase()}>Purchase flights</button>
    </div>
    )
}