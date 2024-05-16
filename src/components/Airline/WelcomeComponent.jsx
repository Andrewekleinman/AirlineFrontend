import { useState } from 'react'
import {Link} from 'react-router-dom'
import { useAuth } from './security/AuthContext'

import {retrieveHelloWorldBean,retrieveHelloWorldPathVariable} from './api/ApiService'

export default function WelcomeComponent(){
    const [message,setMessage] = useState("")
    const authContext = useAuth()

    function callHelloWorldRestApi(){
        console.log("Called")
        // retrieveHelloWorldBean()
        //     .then( (response) => successfulResponse(response))
        //     .catch ( (response) => errorResponse(response))
        //     .finally( () => console.log('cleanup'))
        retrieveHelloWorldPathVariable(authContext.username,authContext.token)
            .then( (response) => successfulResponse(response))
            .catch ( (response) => errorResponse(response))
    }
    function successfulResponse(response){
        console.log(response)
        setMessage(response.data.message)
    }
    function errorResponse(response){
        console.log("error" + response)
    }

    return(
        <div className="Welcome">
            <h1>Welcome {authContext.username}</h1>
            <div>
                <div>
                    <Link to="/additional">click here</Link>
                </div>
                <div>
                    <button className='btn btn-success m-5' onClick={callHelloWorldRestApi}>Call Hello World</button>
                </div>
                <div className='text-info'>{message}</div>
            </div>
            
        </div>
    )
}