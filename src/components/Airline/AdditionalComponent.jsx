import { useEffect, useState } from 'react'
import { deleteTodo, retrieveTodoUsername } from './api/TodoApiService';
import UpdateComponent from './UpdateComponent';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './security/AuthContext';


export default function AdditionalComponent(){
    const [todos, setTodos] = useState([]);
    const [message, setMessage] = useState([]);
    const navigate = useNavigate()
    const username = useAuth().username

    function refreshTodos(){
    retrieveTodoUsername(`${username}`)
        .then(response => {
            setTodos(response.data)
        })
    }
    useEffect ( () => refreshTodos,[] )
    
    function deleteElement(id){
        deleteTodo(useAuth.username, id)
            .then(()=>{
                setMessage(`Delete of todo with id= ${id} successful`) 
                refreshTodos()})
            .catch(()=>console.log(`Tried to delete ${useAuth.username}, ${id} but failed`))
    }
    function updateElement(id){       
        navigate(`/additional/${id}`)
    }
    function createElement(){
        navigate(`/additional/-1`)
    }

    return(
        <div className="container">
            {message != "" && <div className='alert alert-warning'>{message}</div>}
            <table className='table'>
                <thead>
                    <tr>
                        <th>Description</th>
                        <td><b>Completion</b></td>
                        <td><b>Goal</b></td>
                    </tr>
                </thead>
                <tbody>
                    {todos.map(
                        element => (
                            <tr key={element.id}>
                                <td>{element.description}</td>
                                <td>{element.done.toString()}</td>
                                <td>{element.targetDate}</td>
                                <td><button className='btn btn-warning' onClick={() => deleteElement(element.id)}>delete</button></td>
                                <td><button className='btn btn-success' onClick={() => updateElement(element.id)}>update</button></td>
                            </tr>
                        )
                    )}             
                </tbody>
            </table>
            <div className='btn btn-success m-3' onClick={() => createElement()}>Add new</div>
        </div>
    )
}
