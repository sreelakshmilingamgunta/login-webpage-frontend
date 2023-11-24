// import logo from './logo.svg';
import { BrowserRouter,Routes,Route } from 'react-router-dom';  
import './App.css';
import Signup from './signup/signup';
import Login from './login/login';
import Forgot from './forgot/forgot';
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route exact path='/' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/forgot' element={<Forgot />} />
    </Routes>
    </BrowserRouter>
  );
} 

export default App;
