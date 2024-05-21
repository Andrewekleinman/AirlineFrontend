
export default function SearchFlights(){
    return(
    <div className="Container">
        <table>
            <div>
                <th>Departure</th>
                <th>Arrival</th>
                <td>Number of stops</td>
                <td> test </td>
                <td>duration</td>
                <td>test</td>
            </div>
            <tbody>
            {/* {flights.map(
                        element => (
                            <tr key={element.depart}>
                                <td>{element.arrive}</td>
                                <td>{element.departDate.toString()}</td>
                                <td>{element.arriveDate.toString()}</td>
                                <td>{element.seats.length}</td>
                                <td><button className='btn btn-warning' onClick={() => deleteElement(element.id)}>delete</button></td>
                                <td><button className='btn btn-success' onClick={() => updateElement(element.id)}>update</button></td>
                            </tr>
                        )
                    )}     */}
            </tbody>
        </table>
        {/* <div className='btn btn-success m-3' onClick={() => createElement()}>Add new</div> */}
    </div>
    )
}