import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Principal from './components/principal/principal.js';

function App() {
  return (
    <div className="app">
      <ToastContainer autoClose="2000"/>
      <h1>Monta Time</h1>
      <Principal/>
    </div>
  );
}

export default App;
