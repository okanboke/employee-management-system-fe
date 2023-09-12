import React, { useEffect, useState } from 'react';
import { Box, TextField } from "@mui/material"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Grid } from "@mui/material";
import Stack from '@mui/material/Stack';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { GetWithAuth } from '../../services/HttpService';
import Button from '@mui/joy/Button';
import { Alert, Snackbar } from '@mui/material';

import axios from 'axios';

function JustificationPermission() {
  const userId = localStorage.getItem("currentUser") //giriş yapmış userID
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [justPermissionType, setJustPermissionType] = useState(""); //select
  const [permissionDescription, setPermissionDescription] = useState("");
  const [isSent, setIsSent] = useState(false); //textboxları temizlemek için
  const [startDate, setStartDate] = useState(dayjs(""));
  const [endDate, setEndDate] = useState(dayjs(""));
  const [permissionType, setPermissionType] = useState([]);
  const [createPermission, setCreatePermission] = useState([]);

  const [isPop, setIsPop] = useState(false);

  const headers = {
    'Content-Type': 'application/json', // JSON içeriği belirtiliyor
    'Authorization': localStorage.getItem("tokenKey"), // Gerekirse Authorization header'ı
  };

  //İzin Talebi
  const permissionSave = () => { //isteği eklemek için back-end tarafına yolluyoruz.
    axios.post("/api/permissions/create", {
      userId: userId,
      permissionTypeId: justPermissionType.toString(),
      permissionDescription: permissionDescription,
      startDate: startDate,
      endDate: endDate
    },
      {
        headers
      }
    )//services'de metdouna gidecek
      .then(response => {
        JSON.parse(setCreatePermission(response.data))
      })
      .catch(error => {
        setIsLoaded(true);
        setError(error.response);
      });
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
  console.log(createPermission.status);


  function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

  //Mazere İzni ekleme
  async function handleSubmit() { //buttona basıldığında aldığımız değerleri objeye dönüştürüp göndereceğiz
    permissionSave(""); //save fonksiyonu çağırıyoruz.
    setIsSent(true);
  setJustPermissionType();
  setPermissionDescription("");
  setStartDate("");
  setEndDate("");
    if (createPermission.errorMessage === null) {
      setIsPop(false);
    } else {
      setIsPop(true);
    }
  }

  // TODO remove, this demo shouldn't need to reset the theme.

  const defaultTheme = createTheme();

  const handlePermissionType = (event) => { //select
    setJustPermissionType(event.target.value);
    console.log(justPermissionType);
    setIsSent(false);
  };


  const handleStartDate = (startValue) => { //start date
    setStartDate(startValue);
    setIsSent(false);
  };

  const handleEndDate = (endValue) => { //end date
    setEndDate(endValue);
    setIsSent(false);
  };

  const handlePermissionDescription = (value) => { //girilen değeri alıp state e gönderecek
    setPermissionDescription(value);
    setIsSent(false);
  }

  const handleClose = (event, reason) => { //kaydedildi uyarı mesajı
    if (reason === 'clickaway') {
      return;
    }
    setIsPop(false);
  };

  useEffect(() => {
    getPermissionType();//izin türleri sayfa açıldığında select içerisine Get isteği yapılıyor.
  }, [])
  return (
    <Box sx={{ typography: 'body1' }}>
      <Box color={"#fdfdfd"}>
        <Box display={"flex"} justifyContent={"center"} sx={{ marginLeft: "10vh", marginRight: "10vh", marginTop: '20vh' }}>
          <Grid sx={{ width: "80vh" }}>
            <Stack spacing={2}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Mazere İzni Türleri</InputLabel>
                <Select
                  fullWidth
                  required
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={justPermissionType}
                  label="Mazere İzni Türleri"
                  onChange={handlePermissionType}
                >
                  {permissionType.map(option => {
                    return (
                      <MenuItem key={option.justPerId} value={option.justPerId}>
                        {option.justPermissionType}
                      </MenuItem>
                    )
                  })}
                </Select>


              </FormControl>
              <TextField onChange={(i) => handlePermissionDescription(i.target.value)}
                required
                id="outlined-required"
                label="Mazeret Tanımı"
                fullWidth
                value={permissionDescription}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MobileDatePicker
                  disablePast={true}
                  label="İzin Başlangıç Tarihi"
                  inputFormat="MM/dd/yyyy"
                  value={startDate}
                  onChange={handleStartDate}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MobileDatePicker
                  disablePast={true}
                  label="İzin Bitiş Tarihi"
                  inputFormat="MM/dd/yyyy"
                  value={endDate}
                  onChange={handleEndDate}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
              <Button type="submit"
                fullWidth
                color='neutral'
                onClick={handleSubmit}
                style={{
                  background: 'linear-gradient(45deg, #6120ff 40%, #8f6aff 90%)',
                  color: 'white'
                }}>İzin İste</Button>

              <Snackbar open={isPop} autoHideDuration={3000} onClose={handleClose}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}>
                <Alert onClose={handleClose} severity="success">
                  {createPermission.errorMessage}
                </Alert>
              </Snackbar>
            </Stack>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
export default JustificationPermission;