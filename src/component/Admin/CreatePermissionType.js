import React, { useEffect, useState } from "react";
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { Container, Divider } from "@mui/material";
import { GetWithAuth, PostingWithoutAuth, PutWithAuth } from "../../services/HttpService";
import { Button, Typography } from "@mui/joy";
import { Add, RoundaboutLeft } from "@mui/icons-material";
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Stack from '@mui/joy/Stack';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Card } from '@mui/material';
import { Grid } from "@mui/material";
import { TextField } from "@mui/material";


function JustificationPerRequest() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [isSent, setIsSent] = useState(false); //textboxları temizlemek için
    const [justPermissionType, setJustPermissionType] = useState("");
    const [permissionType, setPermissionType] = useState([]);
    const [listJustPermissions, setListJustPermissions] = useState([]);
    let status = true;
    let checkStatus = listJustPermissions.filter(x => x.approvalStatus);

    console.log(checkStatus);

    function sleep(time) { //bekletme
        return new Promise((resolve) => setTimeout(resolve, time)
        )
    }
    const handleNewAddress = () => { //Adres ekleme alanı açıldığında
        console.log(permissionType);
        getPermissionType();
        setOpen(true)
    }


    const handleAddType = (value) => { //girilen değeri alıp state e gönderecek
        setJustPermissionType(value);
        setIsSent(false);
    }

    //İzin türü görüntüleme
    const handlePermissionType = (event) => { //select
        getPermissionType();
        setIsSent(false);
    };

    //İzin türü görüntüleme
    const getPermissionType = () => {

        GetWithAuth("/api/permissions/type/user/list-types")                              //AdminController classından backend den oluşturduğumuz isteği fetch ediyoruz...
            .then(res => res.json())                        //gelen isteği parse ediyoruz
            .then(
                (data) => {                               //result gelme durumunda ne yapmamız gerektiği
                    setIsLoaded(true);              //data geldiğinde isLoaded i true yapmamız gerekiyor
                    setPermissionType(data)   //gelen datayı productList'e result ediyoruz searcbar ile arıyoruzz
                },

                (error) => {                                //error oluşması durumunda ne yapmamız gerekdiği
                    console.log(error)
                    setIsLoaded(true);                      //sayfa döner durumda kalmasın diye true yapıyoruz 
                    setError(error);                        //erroru kullanıcıya göstereceğiz
                }
            )
    }

    //İzin türü ekleme
    const savePermissionType = () => {
        PostingWithoutAuth("/api/permissions/type/admin/create-type", {
            justPermissionType: justPermissionType,

        }
        )//services'de metdouna gidecek
            .then((res) => res.json())
            .catch((err) => console.log(err))
    }
    const handleRefreshType = () => {
        getPermissionType()
    }

    async function handleCreatePermissionType() { //buttona basıldığında aldığımız değerleri objeye dönüştürüp göndereceğiz

        savePermissionType(); //save fonksiyonu çağırıyoruz.  
        setIsSent(true);
        setJustPermissionType("");

        //refreshProducts();       
    }

    useEffect(() => {
        getPermissionType();
        handleRefreshType();
        //handlePermissionType();
    }, [])

    return (
        <div style={{ backgroundColor: "#f8f8f8", height: "100vh", width: "100%", display: "flex", justifyContent: "center" }}>
            <div style={{ typography: 'body1', marginLeft: "10vh", marginRight: "10vh", marginTop: "20vh" }}>
                <Card
                    sx={{ borderRadius: "16px",height: "50vh", width: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}
                    spacing={3}>
                    <Box sx={{ width: "50vh", marginRight: "auto", marginLeft: "auto" }} component="main">

                        <Typography id="basic-modal-dialog-title" level="h1">Yeni İzin Türü</Typography>

                        <Typography id="basic-modal-dialog-title" level="h3">
                            Mazeret Türü
                        </Typography>

                        <form
                            onSubmit={(event) => {
                                event.preventDefault();
                                setOpen(false);
                            }}
                        >
                            <Stack spacing={2}>
                                <FormControl>
                                    <FormLabel> </FormLabel>
                                    <TextField onChange={(i) => handleAddType(i.target.value.replace(/^\w/, function ($0) { return $0.toUpperCase(); }))}
                                        required
                                        id="outlined-required"
                                        label="Yeni Mazere Türü"
                                        fullWidth
                                    />
                                </FormControl>
                                <div style={{ display: "flex", flexDirection: "row", marginBottom: "1%" }}>
                                    <Button type="submit"
                                        fullWidth
                                        onClick={handleCreatePermissionType}
                                        style={{
                                            marginRight: "1%",
                                            background: 'linear-gradient(45deg, #6120ff 60%, #8f6aff 90%)',
                                            color: 'white'
                                        }}>Ekle</Button>
                                </div>
                            </Stack>
                            <InputLabel id="demo-simple-select-label">Mazeret İzni Türleri</InputLabel>
                            <Select
                                fullWidth
                                required
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="İzin Türü"
                                onClick={handleRefreshType}
                            >
                                {permissionType.map(option => {
                                    return (
                                        <MenuItem key={option.justPerId} value={option.justPerId}>
                                            {option.justPermissionType}
                                        </MenuItem>
                                    )
                                })}
                            </Select>
                        </form>
                    </Box>
                </Card>
            </div>
        </div>


    );
}
export default JustificationPerRequest;
