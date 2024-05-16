import { useState } from 'react'
import './Counter.css'

export default function Counter(){
    const [count,setCount] = useState(0);

    function incrementCounter(){
        setCount(count+1);
    }
    function decrementCounter(){
        setCount(count-1);
    }

    return(
        <div>
            <div className="Counter">
                <span className="count">{count}</span> 
                <div>
                    <button className="countButton" onClick={() => incrementCounter()}>+1</button>
                    <button className="countButton" onClick={() => decrementCounter()}>-1</button>
                </div>
            </div>
       
    </div>
        
    )
}