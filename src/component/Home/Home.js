import React, {useState, useEffect} from "react";
import Navbar from "../Navbar/Navbar"
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { Container, Grid } from "@mui/material";
import { OverviewTotalCustomers } from "../overview/overview-total-users";
import { OverviewTasksProgress } from "../overview/overview-tasks-progress";



const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 90,
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
  ];

  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ];

function Home() {

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
          value="1.6k"
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
        rows={rows}
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