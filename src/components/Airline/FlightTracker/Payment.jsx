import {useNavigate} from 'react-router-dom'
import { Formik,Form,Field, ErrorMessage } from 'formik'
import { useAuth } from '../security/AuthContext'
import './Payment.css'
import { purchase } from '../api/BookingApiService';
import moment from 'moment'

export default function Payment(){
    const username = useAuth().username;
    const navigate = useNavigate();

    async function onSubmit(){
        await purchase(username)
        navigate('/Inventory');
    }
    function validate(values){
        let errors = {}
        let expDate = moment(new Date(), "MM/YY")
        expDate = values.ExpirationDate
        if(values.CVV.length!==3)
            errors.CVV='invalid credit card numbers'
        
        if(moment(expDate).isBefore(moment()))
            errors.ExpirationDate='invalid dates'
        return errors
    }


    return(
        <div className='background' ><Formik initialValues={{CreditCard: "0000-0000-0000-0000",ExpirationDate: "06/28", CVV: "123"}} enableReinitialize = {true} onSubmit={onSubmit} validate={validate} validateOnBlur={false} validateOnChange={false}>
        {
            (props) => (
                <Form>
                    <ErrorMessage name="CVV" component="div" className='alert alert-warning'/>
                    <ErrorMessage name="ExpirationDate" component="div" className='alert alert-warning'/>
                    <div>
                    
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