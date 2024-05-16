import logo from './logo.svg';
import './App.css';
import {Component} from 'react'
import Component1 from './components/Component1'
import Counter from './components/Counter';

function App() {
  return (
    <div className="App">
      <Counter/>
    </div>
  );
}


function Component2(){
  return(
    <div className='component2'>test component again</div>
  )
}
class Component3 extends Component{
  render(){
    return(
      <div className = 'Test3'>test a third time</div>
    )
  }
}

export default App;
