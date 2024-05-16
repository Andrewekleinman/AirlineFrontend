import { useState } from 'react'
import { useNavigate} from 'react-router-dom'
import { useAuth } from './security/AuthContext'
import './LoginComponent.css'

export default function LoginComponent(){
    const[username,setUsername] = useState('testusername')
    const[password,setPassword] = useState('testpassword')
    const[state,setState] = useState('nothing')
    const navigate = useNavigate()
    const authContext = useAuth()

    function handleUsernameChange(event){
        setUsername(event.target.value)
    }
    
    function handlePasswordChange(event){
        setPassword(event.target.value)
    }

    async function handleSubmit(){
        if(await authContext.login(username, password)){
            navigate(`/home`)
        }
        else{
            setState("failure")
            //authContext.setAuthenticated(false)
        }
    }

    return(
        <div className="Login">
            {state==='failure'&&<div className='failureMessage'>Invalid credentials</div>}
            <div className="LoginForm">
                <div>
                    <label>User Name</label>
                    <input type="text" name="username" value={username} onChange={handleUsernameChange}/>
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" name="password" value={password} onChange={handlePasswordChange}/>
                </div>
            </div>
            <div>
                <button type="button" name="login" onClick={handleSubmit}>login</button>
            </div>
        </div>
    )
}