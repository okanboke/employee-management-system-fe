import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { GetWithAuth } from "../../../services/HttpService";
import {  Typography } from "@mui/material";
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Divider from '@mui/joy/Divider';
//import Typography from '@mui/joy/Typography';
import { Box, Container, Grid } from "@mui/material";
import { Avatar } from "@mui/joy";
import AddressAdd from "./AddressAdd"

//personel profil
function Profile() {
    const { id } = useParams();
    const [user, setUser] = useState([]);
    const [address, setAddress] = useState([]);
    const path = localStorage.getItem("currentUser");
    

    const getUser = () => {

        GetWithAuth("/api/employee/profile/" + path) //services'de metdouna gidecek

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

    const getAddress = () => {

        GetWithAuth("/api/employee/profile/address/"+ path) //services'de metdouna gidecek

            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    setAddress(result);
                    localStorage.setItem("addressId",result.addressId);

                },
                (error) => {
                    console.log(error)
                }
            )
    }
    useEffect(() => {
        getUser()
        getAddress();
    }, [])
    return (<div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
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
                    <div >
                        <Grid
                            style={{ marginLeft: "auto", marginTop: '10%' }}
                        >
                            <Card variant="outlined" sx={{ width: "65vh", borderRadius: "16px" }}>
                                <CardOverflow>
                                    <Divider inset="none" sx={{ marginTop: "5%" }}>
                                        <Avatar>{ }</Avatar>
                                    </Divider>
                                </CardOverflow>
                                <CardContent>
                                    <Typography variant="h4" sx={{ marginTop: 2, textTransform: "capitalize" }}>
                                        {user.firstName}</Typography>
                                    <Typography variant="h4" sx={{ textTransform: "capitalize" }}>
                                        {user.lastName}</Typography>      </CardContent>
                                <CardOverflow variant="soft" sx={{ bgcolor: 'background.level1' }}>
                                    <Divider inset="context" />
                                    <CardContent orientation="horizontal">
                                        <Typography> </Typography>
                                        <Divider orientation="vertical" />
                                    </CardContent>
                                </CardOverflow>
                            </Card>
                            <Grid
                                style={{ marginTop: '10%'/*marginRight: "auto", , */ }}
                            >
                                <Card variant="outlined" sx={{ width: "65vh", borderRadius: "16px" }}>
                                    <CardOverflow>
                                        <Divider inset="none" sx={{ marginTop: "5%" }}></Divider>
                                    </CardOverflow>
                                    <CardContent>
                                        <Typography variant="h5" sx={{ marginTop: 2, textTransform: "capitalize" }}>
                                            Mail : {user.userName}</Typography>
                                        <Typography variant="h5" sx={{ textTransform: "capitalize" }}>
                                            İşe Giriş Tarihi : {user.userDate}</Typography>      </CardContent>
                                    <Divider inset="none" sx={{ marginTop: "5%" }}></Divider>
                                </Card>
                            </Grid>
                        </Grid>
                        <Grid

                            style={{ marginTop: '6%', marginLeft: "auto" /*, marginLeft: "auto",  */ }}
                        >
                            <Card variant="outlined" sx={{ width: "65vh", height: "70vh", borderRadius: "16px" }}>
                                <CardOverflow>
                                    <Divider inset="none" sx={{ marginTop: "5%" }}></Divider>
                                </CardOverflow>
                                <CardContent>
                                    <Typography variant="h4" sx={{ marginTop: 2, textTransform: "capitalize" }}>
                                        Adres Bilgileri</Typography>
                                    <Divider inset="none" sx={{ marginTop: "4%", marginBottom: "2%" }}></Divider>
                                    <Typography variant="h5" sx={{ textTransform: "capitalize" }}>
                                        Ülke : {address.country}</Typography>
                                    <Divider inset="none" sx={{ marginTop: "2%", marginBottom: "2%" }}></Divider>

                                    <Typography variant="h5" sx={{ textTransform: "capitalize" }}>
                                        İl : {address.city}</Typography>
                                    <Divider inset="none" sx={{ marginTop: "2%", marginBottom: "2%" }}></Divider>

                                    <Typography variant="h5" sx={{ textTransform: "capitalize" }}>
                                        İlçe : {address.district}</Typography>
                                    <Divider inset="none" sx={{ marginTop: "2%", marginBottom: "2%" }}></Divider>

                                    <Typography variant="h5" sx={{ textTransform: "capitalize" }}>
                                        Cadde/Sokak : {address.street}</Typography>
                                    <Divider inset="none" sx={{ marginTop: "2%", marginBottom: "2%" }}></Divider>

                                    <Typography variant="h5" sx={{ textTransform: "capitalize" }}>
                                        No : {address.apartmentNumber}</Typography>
                                    <Divider inset="none" sx={{ marginTop: "2%", marginBottom: "2%" }}></Divider>

                                    <Typography variant="h5" sx={{ textTransform: "capitalize" }}>
                                        Daire No : {address.doorNumber}</Typography>        </CardContent>
                                <Divider inset="none" sx={{}}></Divider>
                                <div style={{ display: "flex", flexDirection: "row", marginBottom: "1%" }}>
                                    <AddressAdd></AddressAdd>
                                    <Divider inset="none" sx={{ marginTop: "2%" }}></Divider>

                                </div>
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
