import './App.css';
import {BrowserRouter, Route, Redirect, Routes, Navigate} from "react-router-dom";
import Navbar from './component/Navbar/Navbar';
import Home from './component/Home/Home';
import Auth from './component/Auth/Auth';
import CreateUser from './component/Admin/CreateUser';

function App() {

//          {localStorage.getItem("currentUser") != null ? <Navigate to="/home"/>: <Auth/>} 


  return (
    <div className="App">
      <BrowserRouter>
      <Navbar></Navbar>        
        <Routes>
        <Route path="/home" element={<Home />} />
        <Route exact path='/create-user' element={<CreateUser/>} />
        <Route exact path="/" element={<Auth/>}></Route>

        </Routes>
      </BrowserRouter>
      <header className="App-header">

      </header>
    </div>
  );
}

export default App;
/******
 <Route exact path="/" element={<Auth/>}>
        </Route>
 * 
 * 
 */