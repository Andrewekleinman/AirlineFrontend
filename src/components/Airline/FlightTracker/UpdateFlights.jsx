import {useParams,useNavigate} from 'react-router-dom'
import { alterFlight, createFlight, retrieveFlight } from '../api/FlightApiService'
import { useEffect,useState } from 'react'
import { Formik,Form,Field, ErrorMessage} from 'formik'
import { useAuth } from '../security/AuthContext'
import moment from 'moment'

export default function UpdateFlights(){
    const {id} = useParams()
    const [depart,setDepart] = useState("")
    const [departDate,setDepartDate] = useState('')
    const [flightsRemaining,setFlightsRemaining] = useState('')
    const [arrive,setArrive] = useState('')
    const auth = useAuth().flightSearch;
    const navigate = useNavigate()

    useEffect(
        ()=>retrieveInfo,
        [id]
    )

    function retrieveInfo(){
        if(id != -1){
            retrieveFlight(id)
            .then(
                response=> {
                    setDepart(response.data.depart)
                    setArrive(response.data.arrive)
                    setDepartDate(response.data.departDate)
                    setFlightsRemaining(response.data.flightsRemaining)
                }

            )
        }
    }

    function goBack(){
        navigate('/search')
    }
    function onSubmit(values){
        const flight={depart: values.depart, arrive: values.arrive, departDate: values.departDate,returnDate: null, flightsRemaining:values.flightsRemaining}
        if(id == -1){
            createFlight(flight).then(response=>{
                console.log(flight)
                console.log(response)
                navigate(`/home`)
            })
        }
        else{
            flight.flightsRemaining -= auth.Passengers
        alterFlight(id, flight).then(response =>{
            console.log(response)
            navigate(`/search`)
        })
    }
     
    }
    function validate(values){
        let errors = {}
        // if(values.description.length<5)
        //     errors.description='description is too short'
        // if(values.targetDate==null|| values.targetDate == "" || !moment(values.targetDate).isValid())
        //     errors.targetDate='Enter targetDate'
        return errors
    }

    return(
        <div className="container">
            {id==-1 && <h1>Enter details</h1>}
            {id == -1 &&<div>
                <Formik initialValues={{depart,arrive,departDate,flightsRemaining}} enableReinitialize = {true} onSubmit={onSubmit} validate={validate} validateOnBlur={false} validateOnChange={false}>
                {
                    (props) => (
                        <Form>
                            <ErrorMessage name="depart" component="div" className='alert alert-warning'/>
                            <ErrorMessage name="targetDate" component="div" className='alert alert-warning'/>
                            <fieldset className='form-group'>
                                <label>Departure Location</label>
                                <Field type="text" className="form-control" name="depart" />
                            </fieldset>
                            <fieldset className='form-group'>
                                <label>Arrival Location</label>
                                <Field type="text" className="form-control" name="arrive" />
                            </fieldset>
                            <fieldset className='form-group'>
                                <label>Departure Date</label>
                                <Field type="date" className="form-control" name="departDate" />
                            </fieldset>
                            <fieldset className='form-group'>
                                <label>Flights Remaining</label>
                                <Field type="number" className="form-control" name="flightsRemaining" />
                            </fieldset>
                            <div>
                                <button className='btn btn-success m-5' type='submit'>Save</button>
                            </div>
                        </Form>
                    )
                }
                </Formik>
            </div>}
            {id!=-1&&<div><span>Continue booking flight {id} for {auth.Passengers}</span> {auth.passengers==1&&<span> passengers?</span>}{auth.passengers!=1&&<span> passenger?</span>}<div>
                <Formik initialValues={{depart,arrive,departDate,flightsRemaining}} enableReinitialize = {true} onSubmit={onSubmit}>
                <div>
                    <Form>
                        <div>
                            <button className='btn btn-warning m-5' onClick={() => goBack()}>Cancel</button>
                            <button className='btn btn-success m-5' type='submit'>Continue</button>
                        </div>
                    </Form>
                           
                </div>
                </Formik></div></div>}
        </div>
    )
}