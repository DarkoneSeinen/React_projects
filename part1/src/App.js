import './App.css';
import Mensaje from './Mensaje';

const Description =() => {
  return <p>Esta es una descripción</p>
}

const App=() => {
  return (
    <div className="App">
        <Mensaje />
        <Mensaje />
        <Mensaje />
        <Description />
    </div>
  );
}

export default App;
