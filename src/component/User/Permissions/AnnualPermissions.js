import React, { useEffect, useState } from 'react';
import { Box, Card,  TextField } from "@mui/material"
import { Grid } from "@mui/material";
import Stack from '@mui/material/Stack';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { PostingWithoutAuth } from '../../../services/HttpService';
import Button from '@mui/joy/Button';
import { OverviewRestDayUsers } from '../../overview/overview-restday-user';
import { OverviewRestDayCalculator } from '../../overview/overview-restday-calculator';
import { Alert, Snackbar } from '@mui/material';
import axios from 'axios';

function AnnualPermissions() {
  const userId = localStorage.getItem("currentUser") //giriş yapmış userID
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState({});
  const [contactPersonName, setContactPersonName] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [travelLocation, setTravelLocation] = useState("");
  const [isSent, setIsSent] = useState(false); //textboxları temizlemek için
  const [isPop, setIsPop] = useState(false);
  const [startDate, setStartDate] = useState(dayjs(""));
  const [endDate, setEndDate] = useState(dayjs(""));
  const [restDayCalc, setRestDayCalc] = useState([]);
  const [createPermission, setCreatePermission] = useState([]);

  //İzin Hesaplama ve izin günü alma
  const permissionCalc = () => {
    axios.post("/api/annual/permissions/user/calculate", {
      id: userId,
      startDate: startDate,
      endDate: endDate
    },
      {
        headers
      })
      .then(response => {
        JSON.parse(setRestDayCalc(response.data));
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

  //İzin Talebi
  const permissionSave = () => { //isteği eklemek için back-end tarafına yolluyoruz.
    axios.post("/api/annual/permissions/user/create", {
      userId: userId,
      contactPersonName: contactPersonName,
      contactPerson: contactPerson,
      travelLocation: travelLocation,
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

  function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

  //Yıllık izin talebi
  async function handleSubmit() { //buttona basıldığında aldığımız değerleri objeye dönüştürüp göndereceğiz

    setIsSent(true);
    permissionSave(""); //save fonksiyonu çağırıyoruz.  
    setContactPersonName("");
    setContactPerson("");
    setTravelLocation("");
    setStartDate("");
    setEndDate("");

  }
    //Yıllık izin talebi hesaplama
    async function handleCalc() { //buttona basıldığında aldığımız değerleri objeye dönüştürüp göndereceğiz
      permissionCalc();
      setIsPop(true);
    }

  // TODO remove, this demo shouldn't need to reset the theme.

  const defaultTheme = createTheme();

  const handleStartDate = (startValue) => { //start date
    setStartDate(startValue);
    setIsSent(false);
  };

  const handleEndDate = (endValue) => { //end date
    setEndDate(endValue);
    setIsSent(false);
  };

  const handleContactPersonName = (value) => { //girilen değeri alıp state e gönderecek
    setContactPersonName(value);
    setIsSent(false);
  }

  const handleContactPerson = (value) => { //girilen değeri alıp state e gönderecek
    setContactPerson(value);
    setIsSent(false);
  }

  const handleTravelLocation = (value) => { //girilen değeri alıp state e gönderecek
    setTravelLocation(value);
    setIsSent(false);
  }


  const handleClose = (event, reason) => { //kaydedildi uyarı mesajı
    if (reason === 'clickaway') {
      return;
    }
      setIsPop(false);
      setIsSent(false);
  };

  useEffect(() => {
    handleCalc();
    //getPermissionType();//izin türleri sayfa açıldığında select içerisine Get isteği yapılıyor.
  }, [])
  return (
    <Box sx={{ typography: 'body1' }}>
      <Box color={"#fdfdfd"}>
        <Box display={"flex"} justifyContent={"center"} sx={{ marginLeft: "10vh", marginRight: "10vh", marginTop: '15vh' }}>
          <Card
            sx={{ height: "80vh", width: "80vh", display: "flex", alignItems: "center", justifyContent: "center",borderRadius: '16px' }}
            spacing={3}>
            <Grid sx={{ width: "60vh"}}>
              <Typography variant='h5' >Senelik İzin Talebi</Typography>

              <Stack spacing={2} marginTop={"1vh"}>
                <TextField onChange={(i) => handleContactPersonName(i.target.value.replace(/^\w/, function ($0) { return $0.toUpperCase(); }))}
                  required
                  id="outlined-required"
                  label="İletişim Kişisi"
                  fullWidth
                  value={contactPersonName}
                />
                <TextField onChange={(i) => handleContactPerson(i.target.value)}
                  required
                  id="outlined-required"
                  label="Telefon No"
                  fullWidth
                  value={contactPerson}
                />
                <TextField onChange={(i) => handleTravelLocation(i.target.value.replace(/^\w/, function ($0) { return $0.toUpperCase(); }))}
                  required
                  id="outlined-required"
                  label="Bulunacağı İl"
                  fullWidth
                  value={travelLocation}
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
                  onClick={handleCalc}
                  style={{
                    background: 'linear-gradient(45deg, #6120ff 40%, #8f6aff 90%)',
                    color: 'white'
                  }}>Hesapla</Button>
                <Button type="submit"
                  fullWidth
                  color='neutral'
                  onClick={handleSubmit}
                  style={{
                    background: 'linear-gradient(45deg, #6120ff 40%, #8f6aff 90%)',
                    color: 'white'
                  }}>İzin Talebi Gönder</Button>

                <Snackbar open={isPop} autoHideDuration={3000} onClose={handleClose}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right"
               }}>
                  <Alert onClose={handleClose} severity="success">
                    {restDayCalc.errorMessage}
                  </Alert>
                </Snackbar>

                <Snackbar open={isSent} autoHideDuration={3000} onClose={handleClose}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}>
                  <Alert onClose={handleClose} severity="success">
                    {createPermission.errorMessage}
                  </Alert>
                </Snackbar>

                <Snackbar open={isSent} autoHideDuration={3000} onClose={handleClose}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right"
               }}>
                    <Alert onClose={handleClose} severity='error'>
                    {error.data}
                  </Alert>
                  </Snackbar>

              </Stack>   
            </Grid>
          </Card>
          <Grid display={"grid"}>
            <OverviewRestDayUsers restDay={restDayCalc.restDay} sx={{ borderRadius: '16px', marginLeft:"5%", marginBottom:"5%"}}></OverviewRestDayUsers>
            <OverviewRestDayCalculator restDayCalc={restDayCalc.restDayCalc} sx={{ borderRadius: '16px', marginLeft:"5%", marginTop:"5%"}}></OverviewRestDayCalculator>
          </Grid>
        </Box>
      </Box>
    </Box>

  );
}
export default AnnualPermissions;