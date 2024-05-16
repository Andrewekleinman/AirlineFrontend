import { BrowserRouter,Routes,Route, Navigate} from 'react-router-dom'


import LogoutComponent from './LogoutComponent'
import HeaderComponent from './HeaderComponent'
import LoginComponent from './LoginComponent'
import AdditionalComponent from './AdditionalComponent'
import WelcomeComponent from './WelcomeComponent'
import ErrorComponent from './ErrorComponent'
import AuthProvider, { useAuth } from './security/AuthContext'
import './Homepage.css'
import UpdateComponent from './UpdateComponent'
import PickFlight from './PickFlight'
import SearchFlights from './SearchFlights'


export default function App(){
    return(
        <div className="App">
           <AuthProvider>
                <BrowserRouter>
                    <HeaderComponent/>
                    <Routes>
                        <Route path='/' element={<LoginComponent/>}></Route>
                        <Route path='/login' element={<LoginComponent/>}></Route>
                        <Route path='/additional' element={<AuthenticatedRoute><AdditionalComponent/></AuthenticatedRoute>}></Route>
                        <Route path='/welcome' element={<AuthenticatedRoute><WelcomeComponent/></AuthenticatedRoute>}></Route>
                        <Route path='/additional/:id' element={<AuthenticatedRoute><UpdateComponent/></AuthenticatedRoute>}></Route>
                        <Route path='/logout' element={<LogoutComponent/>}></Route>
                        <Route path='/home' element={<PickFlight/>}></Route>
                        <Route path='/search' element={<SearchFlights/>}></Route>
                        <Route path='/*' element={<ErrorComponent/>}></Route>
                    </Routes>
                </BrowserRouter>
            </AuthProvider>

        </div>
    )
}
function AuthenticatedRoute({children}){
    const authContext=useAuth()
    if(authContext.isAuthenticated)
        return children
    return <Navigate to="/"/>
}





