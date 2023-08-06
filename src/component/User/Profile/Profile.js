import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { GetWithAuth } from "../../../services/HttpService";
import { Typography } from "@mui/material";
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Divider from '@mui/joy/Divider';
//import Typography from '@mui/joy/Typography';
import { Box, Container, Grid } from "@mui/material";
import { Avatar } from "@mui/joy";

//personel profil
function Profile() {
    const { userId } = useParams();
    const [user, setUser] = useState([]);
    const currentUser = localStorage.getItem("currentUser");

    const getUser = () => {

        GetWithAuth("/api/employee/profile/" + currentUser) //services'de metdouna gidecek

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
    return (<div>
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                py: 8,
                background: "#fdfdfd"
            }}
        >
            <Container>
            <Grid container spacing={1}>
                <div style={{ display: "flex", flexDirection: "row", justifyContent:"space-between"}}>
                    <Grid
                        style={{marginLeft: "15%", marginTop: '10%'}}
                    >
                        <Card variant="outlined" sx={{ width: 340, borderRadius: "16px" }}>
                            <CardOverflow>
                                <Divider inset="none" sx={{ marginTop: "5%" }}>
                                    <Avatar>{}</Avatar>
                                </Divider>
                            </CardOverflow>
                            <CardContent>
                                <Typography variant="h4" sx={{ marginTop: 2, textTransform: "capitalize"}}> 
                                    {user.firstName}</Typography>
                                <Typography variant="h4" sx={{ textTransform: "capitalize" }}>
                                    {user.lastName}</Typography>      </CardContent>
                            <CardOverflow variant="soft" sx={{ bgcolor: 'background.level1' }}>
                                <Divider inset="context" />
                                <CardContent orientation="horizontal">
                                    <Typography level="body-xs" fontWeight="md" textColor="text.secondary">
                                        Mesleği
                                    </Typography>
                                    <Divider orientation="vertical" />
                                    <Typography level="body-xs" fontWeight="md" textColor="text.secondary">
                                        alanı
                                    </Typography>
                                </CardContent>
                            </CardOverflow>
                        </Card>
                        <Grid
                        style={{marginTop: '10%'/*marginRight: "auto", , */ }}
                    >

                        <Card variant="outlined" sx={{ width: 340, borderRadius: "16px" }}>
                            <CardOverflow>
                                <Divider inset="none" sx={{ marginTop: "5%" }}></Divider>
                            </CardOverflow>
                            <CardContent>
                                <Typography variant="h5" sx={{ marginTop: 2, textTransform: "capitalize"}}> 
                                    Mail : {user.userName}</Typography>
                                <Typography variant="h5" sx={{ textTransform: "capitalize" }}>
                                    İşe Giriş Tarihi : {user.userDate}</Typography>      </CardContent>
                            <Divider inset="none" sx={{ marginTop: "5%" }}></Divider>
                        </Card>
                    </Grid>
          
                    </Grid>
                    <Grid

                        style={{marginTop: '6%' ,marginLeft: "10%" /*, marginLeft: "auto",  */}}
                    >

                        <Card variant="outlined" sx={{ width: 480, height: 480, borderRadius: "16px" }}>
                            <CardOverflow>
                                <Divider inset="none" sx={{ marginTop: "5%" }}></Divider>
                            </CardOverflow>
                            <CardContent>
                            <Typography variant="h4" sx={{ marginTop: 2, textTransform: "capitalize"}}> 
                               Adres Bilgileri</Typography>
                                <Typography variant="h5" sx={{ marginTop: 2, textTransform: "capitalize"}}> 
                               Ülke : {user.userName}</Typography>
                               <Divider inset="none" sx={{  marginTop: "2%",marginBottom: "2%"}}></Divider>

                                <Typography variant="h5" sx={{ textTransform: "capitalize" }}>
                                    İl : {user.userDate}</Typography>
                                    <Divider inset="none" sx={{  marginTop: "2%",marginBottom: "2%" }}></Divider>

                                    <Typography variant="h5" sx={{ textTransform: "capitalize" }}>
                                    İlçe : {user.userDate}</Typography>
                                    <Divider inset="none" sx={{ marginTop: "2%",marginBottom: "2%"  }}></Divider>

                                    <Typography variant="h5" sx={{ textTransform: "capitalize" }}>
                                    Cadde/Sokak : {user.userDate}</Typography>  
                                    <Divider inset="none" sx={{  marginTop: "2%",marginBottom: "2%" }}></Divider>

                                    <Typography variant="h5" sx={{ textTransform: "capitalize" }}>
                                    Numara : {user.userDate}</Typography> 
                                    <Divider inset="none" sx={{ marginTop: "2%",marginBottom: "2%" }}></Divider>

                                    <Typography variant="h5" sx={{ textTransform: "capitalize" }}>
                                    Kapı Numarası : {user.userDate}</Typography>        </CardContent>
                            <Divider inset="none" sx={{ marginTop: "" }}></Divider>
                        </Card>
                    </Grid>
               

                    </div>
                    </Grid>


            </Container>
             
        </Box>
    </div>

    )
}
export default Profile;
