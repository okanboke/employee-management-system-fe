import React, { useEffect, useState } from "react";
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { Container } from "@mui/material";
import { Button, Typography } from "@mui/joy";
import { GetIdWithAuth } from "../../../services/HttpService";

function ListJustPermissions() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isSent, setIsSent] = useState(false); //textboxları temizlemek için
    const [listJustPermissions, setListJustPermissions] = useState([]);
    let status = true;
    let checkStatus = listJustPermissions.filter(x => x.approvalStatus);

    console.log(checkStatus);

    function sleep(time) { //bekletme
        return new Promise((resolve) => setTimeout(resolve, time)
        )
    }


    //User arayüzünde izinleri listeleme localden id gönderiyoruz
    const getJustificationPermissions = () => {
        GetIdWithAuth("/api/permissions/user/list-permissions", {
            id:localStorage.getItem("currentUser")

        })
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

    const columns = [

        { field: "id", headerName: 'İzin ID', width: 60 },
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
        { field: "approvalStatus", type: "boolean", headerName: 'Durum', width: 80 },

        {
            field: "Onay", width: 100,
            renderCell: (cellValues) => {
                return (
                    cellValues.row.approvalStatus === false ?
                        <Button
                            fullWidth
                            sx={{ background: "#4BB543", color: 'white' }}
                            variant="contained"
                            color="neutral"
                        >
                            Onayla
                        </Button> :
                        <div><Typography fontStyle={"oblique"} sx={{ color: "#4BB543" }}>Onaylandı</Typography></div>

                );
            }
        }
    ];

    useEffect(() => {
        getJustificationPermissions();
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
                <Box sx={{
                    marginRight: "auto", marginLeft: "auto", marginTop: '2.5%', height: 400, width: '87%', background: "#ffffff"
                }}>
                    <DataGrid
                        rows={listJustPermissions}
                        columns={columns}
                        pageSize={5}
                        initialState={{
                            sorting: {
                                sortModel: [{ field: 'id', sort: 'desc' }], //sıralama
                            },
                        }} rowsPerPageOptions={[5]}
                        sx={{ borderRadius: "16px" }}
                        //checkboxSelection={listJustPermissions} {...listJustPermissions}
                        //onRowClick={handleRowClick} //seçilen row'u handleRowClick metodunda permissionId'yi set edeceğiz
                        disableSelectionOnClick
                        experimentalFeatures={{ newEditingApi: true }}

                    />
                </Box>
            </Container>
        </Box>

    );
}
export default ListJustPermissions;
