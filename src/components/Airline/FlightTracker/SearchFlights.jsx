import { useEffect, useState } from 'react'
import { deleteFlight, retrieveFlight,retrieveFlights } from '../api/FlightApiService';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../security/AuthContext';
import './SearchFlights.css';

export default function SearchFlights(){
    const [flights, setFlights] = useState([]);
    const [returnFlights, setReturnFlights] = useState([]);
    const username = useAuth().username;
    const navigate = useNavigate();
    const auth = useAuth().flightSearch;
    
    function refreshFlights(){
        retrieveFlights(auth.Depart, auth.Arrive, auth.DepartDate)
            .then(response => {
                setFlights(response.data)
            })
            if(auth.ReturnDate != null){
                retrieveFlights(auth.Arrive, auth.Depart, auth.ReturnDate)
            .then(response => {
                setReturnFlights(response.data)
            })
            }
        }
        useEffect ( () => refreshFlights,[] )

    function deleteElement(id){
        deleteFlight(useAuth.username, id)
            // .then(()=>{
            //     // setMessage(`Delete of todo with id= ${id} successful`) 
            //     // refreshTodos()
            // })
            // .catch(()=>console.log(`Tried to delete ${useAuth.username}, ${id} but failed`))
    }
    function updateElement(id){    
           
        navigate(`/flights/${id}`)
    }
    function createElement(){
        navigate(`/flights/-1`)
    }

    return(
        
    <div className="Container">
        {auth.roundTrip == "true" &&<div className='informative'>Select your initial flight</div>}
        {auth.roundTrip != "true" &&<div className='informative'>Select your flight</div>}

        <table className='center tableFormat bordered'>
        <tbody>
            <tr>
                <th className='tableFormat'>Departure</th>
                <th className='tableFormat'>Arrival</th>
                <td className='tableFormat'>Date</td>
                <td className='tableFormat'>Seats Remaining</td>
                <td className='tableFormat'>Duration</td>
                <td className='tableFormat'>Price</td>
                {/* <td className='tableFormat'>Seats</td> */}
            </tr>
            
            {flights.map(
                        element => (
                            <tr key={element.id}>
                                {element.flightsRemaining>=auth.Passengers&&<td className='tableFormat'>{element.depart}</td>}
                               {element.flightsRemaining>=auth.Passengers&& <td className='tableFormat'>{element.arrive}</td>}
                               {element.flightsRemaining>=auth.Passengers&&<td className='tableFormat'>{element.departDate.toString()}</td>}
                                {/* <td className='tableFormat'>{element.returnDate.toString()}</td> */}
                                {element.flightsRemaining>=auth.Passengers&& <td className='tableFormat'>{element.flightsRemaining}</td>}
                                {element.flightsRemaining>=auth.Passengers&&<td className='tableFormat'>{element.departTime} - {element.arriveTime}</td>}
                                {element.flightsRemaining>=auth.Passengers&&<td className='tableFormat'>${element.price}</td>}
                                {/* <td className='tableFormat'><button className='btn btn-warning' onClick={() => deleteElement(element.id)}>delete</button></td> */}
                                {element.flightsRemaining>=auth.Passengers&& element.flightsRemaining>0&&<td className='tableFormat'><button className='btn btn-success' onClick={() => updateElement(element.id)}>book flight</button></td>}
                                
                            </tr>
                        )
                    )} 
                    </tbody>
                    </table>
                   {auth.roundTrip == "true" &&<span>
                    <div className='informative'>Book your return trip</div>
                    <table className='center bordered'><tbody>
                    <tr>
                <th className='tableFormat'>Departure</th>
                <th className='tableFormat'>Arrival</th>
                <td className='tableFormat'>Date</td>
                <td className='tableFormat'>Seats Remaining</td>
                <td className='tableFormat'>Duration</td>
                <td className='tableFormat'>Price</td>
                {/* <td className='tableFormat'>Seats</td> */}
            </tr>
                    {auth.ReturnDate != null && returnFlights.map(
                        element => (
                            <tr key={element.id}>
                                {element.flightsRemaining>=auth.Passengers&&<td className='tableFormat'>{element.depart}</td>}
                                {element.flightsRemaining>=auth.Passengers&&<td className='tableFormat'>{element.arrive}</td>}
                                {element.flightsRemaining>=auth.Passengers&& <td className='tableFormat'>{element.departDate.toString()}</td>}
                                {/* <td className='tableFormat'>{element.returnDate.toString()}</td> */}
                                {element.flightsRemaining>=auth.Passengers&&<td className='tableFormat'>{element.flightsRemaining}</td>}
                                {element.flightsRemaining>=auth.Passengers&&<td className='tableFormat'>{element.departTime} - {element.arriveTime}</td>}
                                {element.flightsRemaining>=auth.Passengers&&<td className='tableFormat'>${element.price}</td>}
                                {/* <td className='tableFormat'><button className='btn btn-warning' onClick={() => deleteElement(element.id)}>delete</button></td> */}
                                {element.flightsRemaining>=auth.Passengers&&element.flightsRemaining>0&&<td className='tableFormat'><button className='btn btn-success' onClick={() => updateElement(element.id)}>book flight</button></td>}
                            </tr>
                        )
                    )}    
            </tbody>
        </table></span>}
        {username == 'testusername' && <div className='btn btn-success m-3' onClick={() => createElement()}>Add new</div>}
    </div>
    )
}