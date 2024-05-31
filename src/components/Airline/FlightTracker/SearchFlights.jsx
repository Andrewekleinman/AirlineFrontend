import { useEffect, useState } from 'react'
import { deleteFlight, retrieveFlight,retrieveFlights } from '../api/FlightApiService';
import UpdateComponent from '../UpdateComponent';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../security/AuthContext';

export default function SearchFlights(){
    const [flights, setFlights] = useState([]);
    const username = useAuth().username;
    const navigate = useNavigate();
    const auth = useAuth().flightSearch;
    
    function refreshFlights(){
        retrieveFlights(auth.Depart, auth.Arrive, auth.DepartDate, auth.ReturnDate)
            .then(response => {
                setFlights(response.data)
            })
        }
        useEffect ( () => refreshFlights,[] )

    function deleteElement(id){
        deleteFlight(useAuth.username, id)
            .then(()=>{
                // setMessage(`Delete of todo with id= ${id} successful`) 
                // refreshTodos()
            })
            .catch(()=>console.log(`Tried to delete ${useAuth.username}, ${id} but failed`))
    }
    function updateElement(id){       
        navigate(`/flights/${id}`)
    }
    function createElement(){
        navigate(`/flights/-1`)
    }

    return(
    <div className="Container">
        <table>
        <tbody>
            <tr>
                <th>Departure</th>
                <th>Arrival</th>
                <td>Date</td>
                {/* <td>Seats</td> */}
            </tr>
            
            {flights.map(
                        element => (
                            <tr key={element.id}>
                                <td>{element.depart}</td>
                                <td>{element.arrive}</td>
                                <td>{element.departDate.toString()}</td>
                                {/* <td>{element.returnDate.toString()}</td> */}
                                <td>{element.flightsRemaining}</td>
                                <td><button className='btn btn-warning' onClick={() => deleteElement(element.id)}>delete</button></td>
                                <td><button className='btn btn-success' onClick={() => updateElement(element.id)}>book flight</button></td>
                            </tr>
                        )
                    )}    
            </tbody>
        </table>
        {username == 'testusername' && <div className='btn btn-success m-3' onClick={() => createElement()}>Add new</div>}
    </div>
    )
}