import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { GetWithAuth } from "../../services/HttpService";

function Profile() {
    const {userId} = useParams();
    const [user, setUser] = useState();
    const {userName, firstName, lastName, userDate} = useState();
    const currentUser = localStorage.getItem("currentUser");

    const getUser = () => {

        GetWithAuth("/api/employee/profile/"+currentUser) //services'de metdouna gidecek

        .then(res => res.json())
        .then(
            (result) => {
                console.log(result);
                setUser(result);
            },
            (error) => {
                console.log(error)
            }
        )
    }
    useEffect(() => {
        getUser()
    }, [])




    return (

        <div>
            
         
          <h1>PROFİLE</h1>
        <h3></h3>
        <h1>PROFİLE</h1>
        <h1>PROFİLE</h1>
        <h1>PROFİLE</h1>
        <h1>PROFİLE</h1>
        </div>
    )
}
export default Profile;
