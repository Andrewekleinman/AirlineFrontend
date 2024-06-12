import { retrieveBookings } from '../api/BookingApiService';
import { useAuth } from '../security/AuthContext';
import { useEffect, useState } from 'react'

export default function Inventory(){
    const auth = useAuth();
    const [bookings, setBookings] = useState([]);


    function refreshInventory(){
        retrieveBookings(auth.username, "Inventory")
            .then(response => {
                setBookings(response.data)
            })
    }
    useEffect ( () => refreshInventory,[] )
    
    return(
    <div><h1>Upcoming Flights</h1>
        <table className='center'>
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
                            {/* <td className='tableFormat'><button className='btn btn-warning' onClick={() => deleteElement(element.id)}>delete</button></td> */}
                            {/* {element.flightsRemaining>=auth.Passengers&& element.flightsRemaining>0&&<td className='tableFormat'><button className='btn btn-success' onClick={() => updateElement(element.id)}>book flight</button></td>} */}
                            
                        </tr>
                    )
                )} 
            </tbody>
        </table>
    </div>
)
}