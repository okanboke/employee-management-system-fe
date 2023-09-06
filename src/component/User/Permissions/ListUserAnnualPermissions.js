import React, { useEffect, useState } from "react";
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { Container } from "@mui/material";
import { Typography } from "@mui/joy";
import axios from "axios";
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import { Button } from "@mui/joy";

function ListUserAnnualPermissions() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isSent, setIsSent] = useState(false); //textboxları temizlemek için
    const [listAnnualPermissions, setListAnnualPermissions] = useState([]);
    const [annualPermissionPrint, setAnnualPermissionPrint] = useState([])
    let status = true;
    let checkStatus = listAnnualPermissions.filter(x => x.approvalStatus);

    console.log(checkStatus);

    function sleep(time) { //bekletme
        return new Promise((resolve) => setTimeout(resolve, time)
        )
    }
     /***Print Document *********************/
     const documentData = {
        title: "Senelik İzin Talebi",
        firstName: annualPermissionPrint.firstName,
        lastName: annualPermissionPrint.lastName,
        mail: annualPermissionPrint.userName,
        type: annualPermissionPrint.type,
        contactPersonName: annualPermissionPrint.contactPersonName,
        contactPerson: annualPermissionPrint.contactPerson,
        travelLocation: annualPermissionPrint.travelLocation,
        startDate: annualPermissionPrint.startDate,
        endDate: annualPermissionPrint.endDate,
        Tarih: new Date().toLocaleDateString(),
      };
  
  
      // Belgeyi oluşturan fonksiyon
  function createDocument(data) {
    const documentContent = `
      <html>
        <head>
          <title></title>
        </head>
        <body style="display:block; ">
          <h1>${data.title}</h1>
          <p>İsim: ${data.firstName}</p>
          <p>Soyisim: ${data.lastName}</p>
          <p>Mail: ${data.mail}</p>
          <p>İzin Türü: ${data.type}</p>
          <p>İletişim Kişisi: ${data.contactPersonName}</p>
          <p>Numara: ${data.contactPerson}</p>
          <p>Seyahat Konumu: ${data.travelLocation}</p>
          <p>İzin Başlangıç Tarihi: ${data.startDate}</p>
          <p>İzin Bitiş Tarihi: ${data.endDate}</p>
          <p>Sistem Onayı: Onaylandı</p>
          <br>
          <p>
            Yukarıda belirtiğim   -   tarihler arasında  gün  kullanmak istiyorum.
          </p>
          <p>
            Bilgilerinize arz ederim.
        </p>
        <p><input maxlength="10" type="text" name="isim" value="${data.Tarih}" readonly="readonly" style="width: 70%; text-align: center;"></p>
        <p style="width: 70%; text-align: center;">  </p>
        <br>
        <br>
        <br>
        <p><u><strong>İŞVEREN ONAYI &nbsp;</strong></u></p>
        <p><span>  İşveren  &nbsp; &nbsp; &nbsp; &nbsp;: </span></p>
        <p><span>  Onaylayan &nbsp;:</span></p>
        <p><span class="yazi">
                Tarih &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;:</span></p>
                <p>İmza &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;:</p>
                <br>
        </body>
      </html>
    `;
    return documentContent;
  }
  
  // Yazdırma işlemini başlatan bir fonksiyon tanımlayın
  function printDocument() {
    const documentContent = createDocument(documentData);
        const printWindow = window.open('', '', 'width=800,height=800');
        printWindow.document.open();
        printWindow.document.write(documentContent);
        printWindow.document.close();
        printWindow.print();
        printWindow.close();   
  }
  
  const handlePrintEvent = (params, // GridRowParams
  event, // MuiEvent<React.MouseEvent<HTMLElement>>
  details,
  ) => {
     //setRowSelectedRowId(event.row.id)
     if (event.row.approvalStatus === false) { //izin durumu true ise işlem yapmayacak.
         alert("Talebiniz onaylandıktan sonra belge oluşturabilirsiniz.")
     } else {
        setAnnualPermissionPrint(event.row);
        printDocument();
     }
  }
  
      /************************************* */


    
    //User arayüzünde izinleri listeleme localden id gönderiyoruz
    const getJustificationPermissionsUser = () => {
        axios.post("/api/annual/permissions/user/list-permissions", {
            id: localStorage.getItem("currentUser")
        },
            {
                headers
            })
            .then(response => {
                JSON.parse(setListAnnualPermissions(response.data));
            })
            .catch(error => {
                setIsLoaded(true);
                setError(error);
            });
    };
    const headers = {
        'Content-Type': 'application/json', // JSON içeriği belirtiliyor
        'Authorization': localStorage.getItem("tokenKey"), // Gerekirse Authorization header'ı
    };


    /*
        //User arayüzünde izinleri listeleme localden id gönderiyoruz
        const getJustificationPermissionsUser = () => {
            PostingWithoutAuth("/api/permissions/user/list-permissions", {
                id: localStorage.getItem("currentUser")
    
            })
                .then(res => res.json())
                .then(
                    (listPermissions) => {
                        setIsLoaded(true);
                        setListAnnualPermissions(listPermissions)
                    },
                    (error) => {
                        console.log(error);
                        setIsLoaded(true);
                        setError(error);
                    }
                )
        }
    */

    /** Kolon üzerine Mouse ile gelindiğinde görünmeyen yazıyı gösterir. */

    function isOverflown(element) {
        return (
            element.scrollHeight > element.clientHeight ||
            element.scrollWidth > element.clientWidth
        );
    }

    const GridCellExpand = React.memo(function GridCellExpand(props) {
        const { width, value } = props;
        const wrapper = React.useRef(null);
        const cellDiv = React.useRef(null);
        const cellValue = React.useRef(null);
        const [anchorEl, setAnchorEl] = React.useState(null);
        const [showFullCell, setShowFullCell] = React.useState(false);
        const [showPopper, setShowPopper] = React.useState(false);

        const handleMouseEnter = () => {
            const isCurrentlyOverflown = isOverflown(cellValue.current);
            setShowPopper(isCurrentlyOverflown);
            setAnchorEl(cellDiv.current);
            setShowFullCell(true);
        };

        const handleMouseLeave = () => {
            setShowFullCell(false);
        };

        React.useEffect(() => {
            if (!showFullCell) {
                return undefined;
            }

            function handleKeyDown(nativeEvent) {
                // IE11, Edge (prior to using Bink?) use 'Esc'
                if (nativeEvent.key === 'Escape' || nativeEvent.key === 'Esc') {
                    setShowFullCell(false);
                }
            }

            document.addEventListener('keydown', handleKeyDown);

            return () => {
                document.removeEventListener('keydown', handleKeyDown);
            };
        }, [setShowFullCell, showFullCell]);

        return (
            <Box
                ref={wrapper}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                sx={{
                    alignItems: 'center',
                    lineHeight: '24px',
                    width: '100%',
                    height: '100%',
                    position: 'relative',
                    display: 'flex',
                }}
            >
                <Box
                    ref={cellDiv}
                    sx={{
                        height: '100%',
                        width,
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                    }}
                />
                <Box
                    ref={cellValue}
                    sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                >
                    {value}
                </Box>
                {showPopper && (
                    <Popper
                        open={showFullCell && anchorEl !== null}
                        anchorEl={anchorEl}
                        style={{ width, marginLeft: -17 }}
                    >
                        <Paper
                            elevation={1}
                            style={{ minHeight: wrapper.current.offsetHeight - 3 }}
                        >
                            <Typography variant="body2" style={{ padding: 8 }}>
                                {value}
                            </Typography>
                        </Paper>
                    </Popper>
                )}
            </Box>
        );
    });


    function renderCellExpand(params) {
        return (
            <GridCellExpand value={params.value || ''} width={params.colDef.computedWidth} />
        );
    }
    //************************************************* */
    const columns = [

        { field: "id", headerName: 'İzin ID', width: 60 },
        { field: 'firstName', headerName: 'Adı', width: 80 },
        { field: 'lastName', headerName: 'Soyadı', width: 80 },
        { field: 'type', headerName: 'İzin Türü', width: 120, renderCell: renderCellExpand, },
        { field: 'userName', headerName: 'E-Mail', width: 120, },

        {
            field: 'startDate', headerName: 'Başlangıç Tarihi', width: 100,
            //sortable: false,
            // valueGetter: (params) =>
            //    `${params.row.firstName || ''} ${params.row.lastName || ''}`,
        },
        {
            field: 'endDate', headerName: 'Bitiş Tarihi', width: 100,
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
                    <div><Typography fontStyle={"oblique"} sx={{ color: "#dc3545" }}>Beklemede</Typography></div>:
                        <div><Typography fontStyle={"oblique"} sx={{ color: "#4BB543" }}>Onaylandı</Typography></div>

                );
            }
        },
        {
          field: "Print", width: 100,
          renderCell: (cellValues) => {
              return(
                  <Button
                  fullWidth
                  sx={{background: "#7091F5",color: 'white'}}
                  variant="contained"
                  color="neutral"
                  onClick={(event) => {
                    handlePrintEvent(event, cellValues);
                  }} //eğer onaylandı ise farklı button göster
                >
                  Yazdır
                </Button>
              
                );
          }
        }
    ];                 /* <Button
                            fullWidth
                            sx={{ background: "#4BB543", color: 'white' }}
                            variant="contained"
                            color="neutral"
                        >
                            Onayla
                        </Button>  *///onaylama buttonu izin silmek için kullanılacak...

    useEffect(() => {
        getJustificationPermissionsUser();
    }, [])

    return (
        <Box display={"block"} sx={{ typography: 'body1', marginLeft: "10vh", marginRight: "10vh", marginTop: '10vh' }}>
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
                        marginRight: "auto", marginLeft: "auto", marginTop: '2.5%', height: 400, width: '75%', background: "#ffffff"
                    }}>
                        <DataGrid
                            rows={listAnnualPermissions}
                            columns={columns}
                            pageSize={5}
                            initialState={{
                                sorting: {
                                    sortModel: [{ field: 'id', sort: 'desc' }], //sıralama
                                },
                            }} rowsPerPageOptions={[5]}
                            sx={{ borderRadius: "16px",'& .MuiDataGrid-columnHeader, & .MuiDataGrid-field': {
                                backgroundColor: "#7091F5",
                                color: "white",
                                fontWeight: 700,
                             },}}
                            //checkboxSelection={listAnnualPermissions} {...listAnnualPermissions}
                            //onRowClick={handleRowClick} //seçilen row'u handleRowClick metodunda permissionId'yi set edeceğiz
                            //disableSelectionOnClick
                            showCellRightBorder
                            experimentalFeatures={{ newEditingApi: true }}

                        />
                    </Box>
                </Container>
            </Box>
        </Box>

    );
}
export default ListUserAnnualPermissions;
