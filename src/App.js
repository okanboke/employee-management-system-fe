import './App.css';
import {BrowserRouter, Route, Redirect, Routes, Navigate} from "react-router-dom";
import Navbar from './component/Navbar/Navbar';
import UserNavbar from './component/Navbar/UserNavbar';

import Home from './component/Home/Home';
import Auth from './component/Auth/Auth';
import CreateUser from './component/Admin/CreateUser';
import HomeUser from './component/Home/HomeUser';
import { Grid } from '@mui/material';

function App() {
  const current  = localStorage.getItem("roleName");
  const user = "user";

//          {localStorage.getItem("currentUser") != null ? <Navigate to="/home"/>: <Auth/>} 

//{current != "user" ?:

/******  */
      
  return (
    <div className="App">
      <BrowserRouter>
      {current === user? ( //problem var
          <UserNavbar></UserNavbar>
          ) : (
          <Navbar></Navbar>
          )}
        <Routes> 
        <Route exact path="/home" element={<Home />} />
        <Route exact path='/create-user' element={<CreateUser/>} />
        <Route exact path="/" element={<Auth/>}></Route>

        <Route exact path="/home-user" element={<HomeUser />} />
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