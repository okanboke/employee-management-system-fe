import React, { useEffect, useState } from "react";
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { Container } from "@mui/material";
import { GetWithAuth, PutWithAuth } from "../../services/HttpService";
import { Button, Typography } from "@mui/joy";

function ListAnnualPermissions() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [userList, setUserList] = useState([]);
    const [isSent, setIsSent] = useState(false); //textboxları temizlemek için
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
        setOpen(true)
    }


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
        PutWithAuth("/api/annual/permissions/admin/update-status", {
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
 
    //admin arayüzünde gelen izin isteklerini listeleme
    const getJustificationPermissions = () => {
        GetWithAuth("/api/annual/permissions/admin/list-annual")
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

    async function handleCreatePermissionType() { //buttona basıldığında aldığımız değerleri objeye dönüştürüp göndereceğiz

        setIsSent(true);
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
export default ListAnnualPermissions;
