import './App.css';
import {BrowserRouter, Route,  Routes,} from "react-router-dom";
import Navbar from './component/Navbar/Navbar';
import UserNavbar from './component/Navbar/UserNavbar';
import Home from './component/Home/Home';
import Auth from './component/Auth/Auth';
import CreateUser from './component/Admin/CreateUser';
import HomeUser from './component/Home/HomeUser';
import Profile from './component/User/Profile/Profile';
import {useState} from "react";

function App() {  
  const currentUser  = localStorage.getItem("currentUser");
  const roles = [localStorage.getItem("roleName")];
  const [foundUser, setFoundUser] = useState([]);
  
  const user = 1;
  console.log(localStorage.getItem("currentUser"));


  const handleUserChange = (newUser) => {
    setFoundUser(newUser);
  }


//          {localStorage.getItem("currentUser") != null ? <Navigate to="/home"/>: <Auth/>} 

//{current != "user" ?:

/******  */
      
  return (
    <div className="App">
      <BrowserRouter>
     {localStorage.getItem("currentUser") != null ? //user geldi mi? kontrolünden sonra yönlendirme
      currentUser == user? ( //problem var
          <UserNavbar></UserNavbar>
          ) : (
          <Navbar></Navbar>
          ) : <div></div>
     }

          

        <Routes> 
        <Route exact path="/home" element={<Home />} />
        <Route exact path='/create-user' element={<CreateUser/>} />
        <Route exact path="/" element={<Auth handleUserChange={handleUserChange} />}></Route>

        <Route exact path="/home-user" element={<HomeUser />} />
        <Route exact path={"/profile/"+currentUser} element={<Profile />} />
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