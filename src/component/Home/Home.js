import React, {useState, useEffect} from "react";
import Navbar from "../Navbar/Navbar"
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { Container, Grid } from "@mui/material";
import { OverviewTotalCustomers } from "../overview/overview-total-users";
import { OverviewTasksProgress } from "../overview/overview-tasks-progress";
import { GetWithAuth } from "../../services/HttpService";







function Home() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);    //datanın gelme gelmeme durumu kontrolü
  const [userList, setUserList] = useState([]);
  let usersCount = userList.map(size => (size.usersCount))
  let sum = usersCount.reduce((acc, current) => acc + current, 0);

  const refreshUser = () => {
    
    GetWithAuth("/api/admin/list-user")                              //AdminController classından backend den oluşturduğumuz isteği fetch ediyoruz...
      .then(res => res.json())                        //gelen isteği parse ediyoruz
      .then(
        (result) => {                               //result gelme durumunda ne yapmamız gerektiği
          setIsLoaded(true);              //data geldiğinde isLoaded i true yapmamız gerekiyor
          setUserList(result)   //gelen datayı productList'e result ediyoruz searcbar ile arıyoruzz
        },

        (error) => {                                //error oluşması durumunda ne yapmamız gerekdiği
          console.log(error)
          setIsLoaded(true);                      //sayfa döner durumda kalmasın diye true yapıyoruz 
          setError(error);                        //erroru kullanıcıya göstereceğiz
        }
      )
  }


const columns = [
    { field: "id", headerName: 'ID', width: 60 },
    { field: 'firstName', headerName: 'Adı', width: 140 },
    { field: 'lastName', headerName: 'Soyadı', width: 140 },
    {
      field: 'userName',
      headerName: 'E-Mail',
      width: 240,
    },
    {
      field: 'userDate',
      headerName: 'İşe Başlangıç Tarihi',
      //sortable: false,
      width: 140,
     // valueGetter: (params) =>
    //    `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
  ];


  /* {userList.map(users => (
    <UserDataGrid firstName = {users.firstName} lastName = {users.lastName} userName = {users.userName} userDate = {users.userDate}></UserDataGrid>
  ))}*/

  useEffect(() => { //API yazıyoruz listenin içini dolduracağız
    refreshUser()
  }, []) //herhangi bir değişiklik olduğunda sayfayı yeniler


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
        <div style={{display: "flex"}}>

        <Grid
        xs={12}
        sm={6}
        lg={3}
        style={{width: "25%",marginRight: "5%",marginLeft: "auto",marginTop: '5%'}}
      >
        <OverviewTotalCustomers
          difference={16}
          positive={false}
          sx={{ height: '100%',borderRadius: '16px'}}
          value={sum}
        />
      </Grid>
      <Grid
            xs={12}
            sm={6}
            lg={3}
            style={{width: "25%",marginRight: "auto",marginTop: '5%'}}

          >
            <OverviewTasksProgress
              sx={{ height: '100%',borderRadius: '16px' }}
              value={75.5}
            />
          </Grid>
          </div>

        <Box sx={{marginRight: "auto",marginLeft: "auto",marginTop: '2.5%', height: 400, width: '65%', background: "#ffffff"
 }}>
 
      <DataGrid
        rows={userList}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        sx={{borderRadius: "16px"}}
        
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
    </Container>
    </Box>
    );
}

export default Home;