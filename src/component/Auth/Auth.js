import React, { useState, useEffect} from "react";
import { FormControl, FormHelperText, Input, Typography } from "@mui/material";
import Button from '@mui/material/Button';
import { Route, useHref, useNavigate } from "react-router-dom";
import { PostWithoutAuth } from "../../services/HttpService";
import Grid from '@mui/material/Grid';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import "../Auth/Auth.css"
import Home from "../Home/Home";

function Auth() {
    //onChange metoduyla bu bilgileri inputlardan alacağız
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    let history = useNavigate();

    const handleUsername = (value) => {
        setUsername(value)
    }

    const handlePassword = (value) => {
        setPassword(value)
    }
    /************************************** */
    //kayıt ol ve giriş yap

    const sendRequest = (path) => {

        PostWithoutAuth(("/api/auth/"+path), {
            userName: username,
            password: password,
        })    //services'de metoduna gidecek

            .then((res) => res.json())
            .then((result) => {
                localStorage.setItem("tokenKey", result.accessToken);
                localStorage.setItem("refreshKey",result.refreshToken); //refresh olmuş tokenla işlem yapacak
                localStorage.setItem("currentUser", result.userId);
                localStorage.setItem("userName", result.userName);            
            })
            .catch((err) => console.log(err))
    }
    /******************************************* */


    const handleButton = (path) => {
        sendRequest(path) //register backend e istek atacak
        setUsername("")
        setPassword("")
        history("/home")
        //register olduktan sonra tekrar aynı sayfaya gitmesini sağlayacağız
    }



    return (
        <Box
            component="form"
            noValidate
            autoComplete="off"
        >
            <div className="ortalama">
                <Grid container component="main" className="foto" style={{ height: "100vh" }}>
                    <CssBaseline />
                    <Grid item xs={12} sm={8} md={6} component={Paper} elevation={3} square style={{ boxShadow: "none" }} >

                        <FormControl style={{ marginTop: "15%" }} >
                            <Typography align="left"
                                variant="h2">Giriş</Typography>
                            <div style={{ marginTop: "7%" }}>

                                <TextField onChange={(i) => handleUsername(i.target.value)}
                                    required
                                    id="outlined-required"
                                    label="E-Mail"
                                    fullWidth
                                />
                                <TextField onChange={(i) => handlePassword(i.target.value)}
                                    style={{
                                        marginTop: 20
                                    }}
                                    required
                                    id="outlined-required"
                                    label="Şifre"
                                    fullWidth
                                />
                                <Button variant="contained"
                                    fullWidth
                                    style={{
                                        marginTop: 30,
                                        background: 'linear-gradient(45deg, #27496D 40%, #51C4D3 90%)',
                                        color: 'white',
                                    }}
                                    onClick={(() => handleButton("login"))}>Giriş</Button>
                                <FormHelperText style={{ margin: 5, }}>Yönetici girişi</FormHelperText>
                                <Button variant="contained"
                                    fullWidth
                                    style={{
                                        background: 'linear-gradient(45deg, #C51605 40%, #FD8D14 90%)',
                                        color: 'white'
                                    }}
                                    onClick={(() => handleButton("register"))}>Admin</Button>
                            </div>

                        </FormControl>
                    </Grid>
                    <Grid item xs={false} sm={4} md={6} className="image" />

                </Grid>
            </div>
        </Box>
    )
}
export default Auth;