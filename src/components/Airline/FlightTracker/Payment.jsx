import {useParams,useNavigate} from 'react-router-dom'
import { useEffect,useState } from 'react'
import { Formik,Form,Field, ErrorMessage } from 'formik'
import { useAuth } from '../security/AuthContext'
import './Payment.css'
import { purchase } from '../api/BookingApiService';


export default function Payment(){
    const username = useAuth().username;
    const navigate = useNavigate();

    async function onSubmit(){
        await purchase(username)
        navigate('/Inventory');
    }
    function validate(){
    
    }


    return(
        <div><Formik initialValues={{CreditCard: "0000-0000-0000-0000",ExpirationDate: "06/28", CVV: "123"}} enableReinitialize = {true} onSubmit={onSubmit} validate={validate} validateOnBlur={false} validateOnChange={false}>
        {
            (props) => (
                <Form>
                    <ErrorMessage name="Depart" component="div" className='alert alert-warning'/>
                    <ErrorMessage name="DepartDate" component="div" className='alert alert-warning'/>
                    <div className='Row m-5'>
                    
                    <table className='center'><tbody>
                        <tr>
                            <th>Credit Card Number</th>
                        </tr>
                        <tr>
                            <td><Field type="text" name="CreditCard" className="wideField"/></td>
                            
                        </tr>
                    </tbody></table>
                    
                    <div >
                    <table className='center'><tbody>
                        <tr>
                  
                            <th>Expiration date</th><th>CVV</th>
                        </tr>
                        <tr>
                            <td><Field type="text" name="ExpirationDate" /></td><td><Field type="password" name="CVV" /></td>
                        </tr>
                    </tbody></table>
                    </div>              
                     
                    <div className="column2">
                    <table><tbody>

                        
                    </tbody></table>
                        </div>
                        <div>
                        <table className='center'><tbody>
                            <tr><td>Promo Code (optional)</td></tr>
                            <tr>
                                <td><Field type="text" name="description" /></td>
                                <td><button className='btn btn-success m-1' type='submit'>Pretend I paid</button></td>
                            </tr>
                        </tbody></table>
                        </div>
                    </div>       
                </Form>
            )
        }
        </Formik></div>
    )
}