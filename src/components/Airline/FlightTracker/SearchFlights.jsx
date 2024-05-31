import { useEffect, useState } from 'react'
import { deleteFlight, retrieveFlight,retrieveFlights } from '../api/FlightApiService';
import UpdateComponent from '../UpdateComponent';
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

        <table className='center'>
        <tbody>
            <tr>
                <th>Departure</th>
                <th>Arrival</th>
                <td>Date</td>
                <td>Seats Remaining</td>
                {/* <td>Seats</td> */}
            </tr>
            
            {flights.map(
                        element => (
                            <tr key={element.id}>
                                {element.flightsRemaining>=auth.Passengers&&<td>{element.depart}</td>}
                               {element.flightsRemaining>=auth.Passengers&& <td>{element.arrive}</td>}
                               {element.flightsRemaining>=auth.Passengers&&<td>{element.departDate.toString()}</td>}
                                {/* <td>{element.returnDate.toString()}</td> */}
                                {element.flightsRemaining>=auth.Passengers&& <td>{element.flightsRemaining}</td>}
                                {/* <td><button className='btn btn-warning' onClick={() => deleteElement(element.id)}>delete</button></td> */}
                                {element.flightsRemaining>=auth.Passengers&& element.flightsRemaining>0&&<td><button className='btn btn-success' onClick={() => updateElement(element.id)}>book flight</button></td>}
                                
                            </tr>
                        )
                    )} 
                    </tbody>
                    </table>
                   {auth.roundTrip == "true" &&<span>
                    <div className='informative'>Book your return trip</div>
                    <table className='center'><tbody>
                    <tr>
                <th>Departure</th>
                <th>Arrival</th>
                <td>Date</td>
                <td>Seats Remaining</td>
                {/* <td>Seats</td> */}
            </tr>
                    {auth.ReturnDate != null && returnFlights.map(
                        element => (
                            <tr key={element.id}>
                                {element.flightsRemaining>=auth.Passengers&&<td>{element.depart}</td>}
                                {element.flightsRemaining>=auth.Passengers&&<td>{element.arrive}</td>}
                                {element.flightsRemaining>=auth.Passengers&& <td>{element.departDate.toString()}</td>}
                                {/* <td>{element.returnDate.toString()}</td> */}
                                {element.flightsRemaining>=auth.Passengers&&<td>{element.flightsRemaining}</td>}
                                {/* <td><button className='btn btn-warning' onClick={() => deleteElement(element.id)}>delete</button></td> */}
                                {element.flightsRemaining>=auth.Passengers&&element.flightsRemaining>0&&<td><button className='btn btn-success' onClick={() => updateElement(element.id)}>book flight</button></td>}
                            </tr>
                        )
                    )}    
            </tbody>
        </table></span>}
        {username == 'testusername' && <div className='btn btn-success m-3' onClick={() => createElement()}>Add new</div>}
    </div>
    )
}