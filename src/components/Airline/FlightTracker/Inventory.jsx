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
    <div>Upcoming Flights
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
                            <tr key={element.id}>
                                <td>{element.depart}</td>
                               <td>{element.arrive}</td>
                               <td>{element.departDate.toString()}</td>
                                {/* <td>{element.returnDate.toString()}</td> */}
                                <td>{element.passengers}</td>
                                {/* <td><button className='btn btn-warning' onClick={() => deleteElement(element.id)}>delete</button></td> */}
                                {/* {element.flightsRemaining>=auth.Passengers&& element.flightsRemaining>0&&<td><button className='btn btn-success' onClick={() => updateElement(element.id)}>book flight</button></td>} */}
                                
                            </tr>
                        )
                    )} 
                    </tbody>
                    </table>
                    </div>
)
}