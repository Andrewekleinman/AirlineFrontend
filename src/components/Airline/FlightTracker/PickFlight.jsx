import {useNavigate} from 'react-router-dom'
import { Formik,Form,Field, ErrorMessage } from 'formik'
import { useAuth } from '../security/AuthContext'
import moment from 'moment'
import './PickFlight.css'


export default function PickFlight(){
    const today = moment().add(1,'d').format('yyyy-MM-DD');
    const later = moment().add(5,'d').format('yyyy-MM-DD');
    const navigate = useNavigate()
    const auth = useAuth()

    function onSubmit(values){
        const flightSearch={Depart:values.Depart,Arrive:values.Arrive,Passengers:values.Passengers,
            DepartDate:values.DepartDate,ReturnDate:values.ReturnDate, roundTrip:values.yes}
        auth.setFlightSearch(flightSearch)
            
        navigate(`/search`)
    }
    function validate(values){
        let errors = {}
        if(values.Depart.length!==3||values.Arrive.length!==3)
            errors.Depart='invalid airport'
        if(!moment(values.DepartDate).isValid()|| !moment(values.ReturnDate).isValid() || values.ReturnDate<values.DepartDate)
            errors.DepartDate='invalid dates'
        return errors
    }


    return(
        <div className="container">
            <h1>Plan Flight</h1>
            <div>
                <Formik initialValues={{Depart: "DEN", Arrive:"SJC", yes: "true", Passengers:1, DepartDate: today, ReturnDate: later}} enableReinitialize = {true} onSubmit={onSubmit} validate={validate} validateOnBlur={false} validateOnChange={false}>
                {
                    (props) => (
                        <Form>
                            <ErrorMessage name="Depart" component="div" className='alert alert-warning'/>
                            <ErrorMessage name="DepartDate" component="div" className='alert alert-warning'/>
                            <div className='Row m-5'>
                            <div className="column">
                            <table><tbody>
                                <tr>
                                    <th>Depart</th>
                                    <th>Arrive</th>
                                    
                                </tr>
                                <tr>
                                    <td><Field type="text" name="Depart" /></td>
                                    <td><Field type="text" name="Arrive" /></td>
                                </tr>
                            </tbody></table>
                            </div>
                            <div className="column">
                            <table><tbody>
                                <tr>
                                  <th></th>
                                  <th></th>
                                    <th>Passengers</th>
                                </tr>
                                <tr>
                                    <td>Round Trip <Field type="radio"  name="yes" value="true"/></td>
                                    <td>One way <Field type="radio" name="yes" value="false"/></td>
                                    <td><Field type="number" name="Passengers" /></td>
                                </tr>
                            </tbody></table>
                            </div>              
                             
                            <div className="column2">
                            <table><tbody>
                                <tr>
                                    <th>Depart Date</th>
                                    {props.values.yes === "true" && <th>Return Date</th>}
               
                                </tr>
                                <tr>
                                    <td><Field type="date" name="DepartDate" /></td>
                                    {props.values.yes === "true" && <td><Field type="date" name="ReturnDate" /></td>}
  
                                </tr>
                                
                            </tbody></table>
                                </div>
                                <div>
                                <div className="rightjustify">
                                <table className='m-5'><tbody>
                                    <tr><td>Promo Code (optional)</td></tr>
                                    <tr>
                                        <td><Field type="text" name="description" /></td>
                                        <td><button className='btn btn-success m-1' type='submit'>Save</button></td>
                                    </tr>
                                </tbody></table>
                                </div>
                            </div>
                            </div>       
                        </Form>
                    )
                }
                </Formik>
            </div>
            {/* <td>{element.departDate.toString()}</td> */}
        </div>
    )
}