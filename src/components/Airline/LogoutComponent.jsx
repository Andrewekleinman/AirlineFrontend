
import {useAuth} from './security/AuthContext'

export default function LogoutComponent(){

    useAuth().logout()
    return(
        <div className="Logout">        
            You logged out
        </div>
    )
}