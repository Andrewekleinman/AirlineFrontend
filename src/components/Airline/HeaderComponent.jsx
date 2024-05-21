import { Link} from 'react-router-dom'
import { useAuth} from './security/AuthContext'
import { useNavigate} from 'react-router-dom'

export default function HeaderComponent(){
    const authContext = useAuth()
    const navigate = useNavigate()
    console.log(authContext.username)
    
    return(
        <header className="border-bottom border-light border-5 mb-5 p-2">
            <div className="container">
                <div className="row">
                    <nav className="navbar navbar-expand-lg">
                        <a className="navbar-brand ms-2 fs-2 fw-bold text-black" href="/">test</a>
                        <div className="collapse navbar-collapse">
                            <ul className="navbar-nav">
                                {authContext.isAuthenticated && <li className="nav-item fs-5"><Link className="nav-link" to="/home">Home</Link></li>}
                                {authContext.isAuthenticated && <li className="nav-item fs-5"><Link className="nav-link" to="/additional">Additional</Link></li>}
                            </ul>
                        </div>
                        <ul className="navbar-nav">
                            {!authContext.isAuthenticated && <li className="nav-item fs-5"><Link className="nav-link" to="/login">Login</Link></li>}
                            {authContext.isAuthenticated && <li className="nav-item fs-5"><Link className="nav-link" to="/logout">Logout</Link></li>}
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    )
}