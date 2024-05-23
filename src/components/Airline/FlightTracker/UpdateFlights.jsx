import {useParams,useNavigate} from 'react-router-dom'
import { alterFlight, createFlight, retrieveFlight } from '../api/FlightApiService'
import { useEffect,useState } from 'react'
import { Formik,Form,Field, ErrorMessage } from 'formik'
import { useAuth } from '../security/AuthContext'
import moment from 'moment'

export default function UpdateFlights(){
    const {id} = useParams()
    const [description,setDescription] = useState("")
    const [targetDate,setTargetDate] = useState('')
    const username = useAuth().username
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
                    setDescription(response.data.description)
                    setTargetDate(response.data.targetDate)
                }
            )
        }
    }

    function onSubmit(values){
        const flight={id: id, username: username, description: values.description, targetDate: values.targetDate, done:false}
        if(id == -1){
            createFlight(flight).then(response=>{
                console.log(flight)
                console.log(response)
                navigate(`/flights`)
            })
        }
        else{
        alterFlight(id, flight).then(response =>{
            console.log(response)
            navigate(`/flights`)
        })
    }
     
    }
    function validate(values){
        let errors = {}
        if(values.description.length<5)
            errors.description='description is too short'
        if(values.targetDate==null|| values.targetDate == "" || !moment(values.targetDate).isValid())
            errors.targetDate='Enter targetDate'
        return errors
    }

    return(
        <div className="container">
            <h1>Enter details</h1>
            <div>
                <Formik initialValues={{description,targetDate}} enableReinitialize = {true} onSubmit={onSubmit} validate={validate} validateOnBlur={false} validateOnChange={false}>
                {
                    (props) => (
                        <Form>
                            <ErrorMessage name="description" component="div" className='alert alert-warning'/>
                            <ErrorMessage name="targetDate" component="div" className='alert alert-warning'/>
                            <fieldset className='form-group'>
                                <label>Description</label>
                                <Field type="text" className="form-control" name="description" />
                            </fieldset>
                            <fieldset className='form-group'>
                                <label>Target Date</label>
                                <Field type="date" className="form-control" name="targetDate" />
                            </fieldset>
                            <div>
                                <button className='btn btn-success m-5' type='submit'>Save</button>
                            </div>
                        </Form>
                    )
                }
                </Formik>
            </div>
        </div>
    )
}