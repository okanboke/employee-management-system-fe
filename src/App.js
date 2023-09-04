import './App.css';
import {BrowserRouter, Route,  Routes,} from "react-router-dom";
import Navbar from './component/Navbar/Navbar';
import UserNavbar from './component/Navbar/UserNavbar';
import Home from './component/Home/Home';
import Auth from './component/Auth/Auth';
import CreateUser from './component/Admin/CreateUser';
import HomeUser from './component/Home/HomeUser';
import Profile from './component/User/Profile/Profile';
import JustificationPerRequest from './component/Admin/JustificationPerRequest';
import {useState} from "react";
import ListJustPermissions from './component/User/Permissions/ListJustPermissions';
import JustificationPermission from './component/Permission/JustificationPermission';
import ListAnnualPermissions from './component/Admin/ListAnnualPermissions';
import AnnualPermissions from './component/User/Permissions/AnnualPermissions';

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

/*
currentUser === user?( //problem var
          <UserNavbar></UserNavbar>
          ) : (
          <Navbar></Navbar>
          ) : <div></div>

/******  */
      
  return (
    <div className="App">
      <BrowserRouter>
     {currentUser !== null?  //user geldi mi? kontrolünden sonra yönlendirme
        JSON.parse(currentUser) === user?( //problem var
        <Navbar></Navbar>
        ) : (
          <UserNavbar></UserNavbar>
        ) : <div></div>

     }
        <Routes> 
        <Route exact path="/home" element={<Home />} />
        <Route exact path='/create-user' element={<CreateUser/>} />
        <Route exact path="/" element={<Auth handleUserChange={handleUserChange} />}></Route>
        <Route exact path="/permission/request" element={<JustificationPerRequest />} />
        <Route exact path="/annual/permissions/admin/list-permissions" element={<ListAnnualPermissions />} />

        <Route exact path={'/list-permissions'} element={<ListJustPermissions />} />
        <Route exact path="/home-user" element={<HomeUser />} />
        <Route exact path={"/profile/"+currentUser} element={<Profile />} />
        <Route exact path={"/permissions"} element={<JustificationPermission />}/>
        <Route exact path={"/annual/permissions/user/create"} element={<AnnualPermissions />} />
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