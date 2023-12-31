import React, { useEffect, useState } from "react";
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { Container } from "@mui/material";
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


function JustificationPerRequest() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [userList, setUserList] = useState([]);
    const [isSent, setIsSent] = useState(false); //textboxları temizlemek için
    const [justPermissionType, setJustPermissionType] = useState("");
    const [permissionType, setPermissionType] = useState([]);
    const [listJustPermissions, setListJustPermissions] = useState([]);
    const [checkboxSelection, setCheckboxSelection] = React.useState(true); //seçilen row
    const [rowSelectedRowId, setRowSelectedRowId] = useState();
    let status = true;
    let checkStatus = listJustPermissions.filter(x => x.approvalStatus);

    console.log(checkStatus);

    function sleep(time){ //bekletme
        return new Promise((resolve)=>setTimeout(resolve,time)
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

    //row seçildiğinde
    const handleRowClick = (params, // GridRowParams
    event, // MuiEvent<React.MouseEvent<HTMLElement>>
    details,) => {
        //setRowSelectedRowId(params.row.id); 
    }

     //row button
     const handleRowButton = (params, // GridRowParams
     event, // MuiEvent<React.MouseEvent<HTMLElement>>
     details,) => {
        //setRowSelectedRowId(event.row.id)
        if (event.row.approvalStatus === true) { //izin durumu true ise işlem yapmayacak.
            alert("Daha Önce Onaylandı...")
        } else {
            updatePermissionStatus(event.row.id)
        }
     }

       //izin onayı
    const updatePermissionStatus = (id) => { //ilanı yayınlamak için back-end tarafına yolluyoruz.
        PutWithAuth("/api/permissions/admin/update-status", {
            permissionId: id,
            approvalStatus: status,

        }
        )//services'de metdouna gidecek
            .then((res) => res.json())
            .then(data => {
                //onaylama buttonuna tıklandığında sayfada değer değişecek veya sayfa yenilenmiş olacak...
                const copyOfList = [...listJustPermissions];
                const copyOfObject = copyOfList.find(x => x.id === data.permissionId);
                const indexOfObject = copyOfList.indexOf(copyOfObject);
                let changedObject = {...copyOfObject, approvalStatus : data.approvalStatus};
                copyOfList[indexOfObject] = changedObject;
                setListJustPermissions(copyOfList);
            })
            .catch((err) => console.log(err))
    }
 

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

    //admin arayüzünde gelen izin isteklerini listeleme
    const getJustificationPermissions = () => {
        GetWithAuth("/api/admin/list-justification")
            .then(res => res.json())
            .then(
                (listPermissions) => {
                    setIsLoaded(true);
                    setListJustPermissions(listPermissions)
                },
                (error) => {
                    console.log(error);
                    setIsLoaded(true);
                    setError(error);
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

    async function handleCreatePermissionType() { //buttona basıldığında aldığımız değerleri objeye dönüştürüp göndereceğiz

        savePermissionType(); //save fonksiyonu çağırıyoruz.  
        setIsSent(true);
        setJustPermissionType("");

        //refreshProducts();       
    }

    const columns = [
        
        { field: "id", headerName: 'İzin ID', width: 60},
        { field: 'firstName', headerName: 'Adı', width: 80 },
        { field: 'lastName', headerName: 'Soyadı', width: 80 },
        { field: 'permissionType', headerName: 'İzin Türü', width: 80 },
        { field: 'permissionDescription', headerName: 'Açıklama', width: 120 },
        { field: 'userName', headerName: 'E-Mail', width: 120, },

        {
            field: 'startDate', headerName: 'Başlangıç Tarihi', width: 80,
            //sortable: false,
            // valueGetter: (params) =>
            //    `${params.row.firstName || ''} ${params.row.lastName || ''}`,
        },
        {
            field: 'endDate', headerName: 'Bitiş Tarihi', width: 80,
            //sortable: false,

            // valueGetter: (params) =>
            //    `${params.row.firstName || ''} ${params.row.lastName || ''}`,
        },
        { field: "approvalStatus",type: "boolean", headerName: 'Durum',width: 80},

        {
            field: "Onay", width: 100,
            renderCell: (cellValues) => {
                return(
                    cellValues.row.approvalStatus === false?
                    <Button
                    fullWidth
                    sx={{background: "#4BB543",color: 'white'}}
                    variant="contained"
                    color="neutral"
                    onClick={(event) => {
                      handleRowButton(event, cellValues);
                    }} //eğer onaylandı ise farklı button göster
                  >
                    Onayla
                  </Button>:
                  <div><Typography fontStyle={"oblique"} sx={{color: "#4BB543"}}>Onaylandı</Typography></div>
                
                  );
            }
          }
    ];

    useEffect(() => {
        getJustificationPermissions();
        //handlePermissionType();
    }, [])
    
    return (
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                py: 8,
                background: "#fdfdfd"
            }}
        >
            <Box sx={{ marginTop: "1%", width: "50vh", marginRight: "auto", marginLeft: "auto" }} component="main">
                <Button
                    fullWidth
                    variant="outlined"
                    sx={{
                        background: 'linear-gradient(45deg, #6120ff 70%, #8f6aff 90%)',
                        color: 'white'
                    }}
                    startDecorator={<Add />}
                    onClick={() => handleNewAddress()}
                >
                    Yeni İzin Türü Ekle
                </Button>
                <Modal open={open} onClose={() => setOpen(false)}>
                    <ModalDialog
                        aria-labelledby="basic-modal-dialog-title"
                        aria-describedby="basic-modal-dialog-description"
                        sx={{ width: "60vh" }}
                    >
                        <Typography id="basic-modal-dialog-title" level="h2">
                            Mazeret Türü
                        </Typography>
                        <Typography id="basic-modal-dialog-description">
                            Mazere Türü Ekleyiniz.
                        </Typography>
                        <form
                            onSubmit={(event) => {
                                event.preventDefault();
                                setOpen(false);
                            }}
                        >
                            <Stack spacing={2}>
                                <FormControl>
                                    <FormLabel>Yeni Mazeret Türü</FormLabel>
                                    <Input autoFocus required //value={country}
                                        onChange={(i) => handleAddType(i.target.value)} />
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
                            <InputLabel id="demo-simple-select-label">Mazere İzni Türleri</InputLabel>
                            <Select
                                fullWidth
                                required
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                //value={permissionType.justPerId}
                                label="İzin Türü"
                            //onChange={handlePermissionType}
                            //onClick={handlePermissionType}
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
                    </ModalDialog>
                </Modal>
            </Box>
            
            <Container maxWidth="xl">
            <Box sx={{typography: 'body1', marginLeft: "10vh", marginRight: "10vh", marginTop: '10vh'}}>

                <Box sx={{
                    marginRight: "auto", marginLeft: "auto", marginTop: '2.5%', height: 400, width: '75%', background: "#ffffff"
                }}>
                    <DataGrid
                        rows={listJustPermissions}
                        columns={columns}
                        pageSize={5}
                        initialState={{
                            sorting: {
                              sortModel: [{ field: 'id', sort: 'desc' }], //sıralama
                            },
                          }}                        rowsPerPageOptions={[5]}
                        sx={{ borderRadius: "16px",'& .MuiDataGrid-columnHeader, & .MuiDataGrid-field': {
                            backgroundColor: "#7091F5",
                            color: "white",
                            fontWeight: 700,
                         }, }}
                        //checkboxSelection={listJustPermissions} {...listJustPermissions}
                        //onRowClick={handleRowClick} //seçilen row'u handleRowClick metodunda permissionId'yi set edeceğiz
                        disableSelectionOnClick
                        experimentalFeatures={{ newEditingApi: true }}

                    />
                </Box>
                </Box>
            </Container>
        </Box>

    );
}
export default JustificationPerRequest;
