import  React, { useEffect, useState } from 'react';
import { Box, TextField } from "@mui/material"
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

function AnnualPermissions() {
    const userId = localStorage.getItem("currentUser") //giriş yapmış userID
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);
    const [permissionDescription, setPermissionDescription] = useState("");
    const [isSent, setIsSent] = useState(false); //textboxları temizlemek için
    const [startDate, setStartDate] = useState(dayjs(""));
    const [endDate, setEndDate] = useState(dayjs(""));

      //İzin Ekleme
      const permissionSave = () => { //isteği eklemek için back-end tarafına yolluyoruz.
        PostingWithoutAuth("/api/annual/permissions/user/create", {
            userId: userId,
            permissionDescription: permissionDescription,
            startDate: startDate,
            endDate: endDate
        }
        )//services'de metdouna gidecek
            .then((res) => res.json())
            .catch((err) => console.log(err))
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

          //Mazere İzni ekleme
    async function handleSubmit() { //buttona basıldığında aldığımız değerleri objeye dönüştürüp göndereceğiz

        permissionSave(""); //save fonksiyonu çağırıyoruz.  
        setIsSent(true);
        setPermissionDescription("");
        setStartDate("");
        setEndDate("");
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

    const handlePermissionDescription = (value) => { //girilen değeri alıp state e gönderecek
        setPermissionDescription(value);
        setIsSent(false);
    }
    
    useEffect(() => {
      //getPermissionType();//izin türleri sayfa açıldığında select içerisine Get isteği yapılıyor.
    }, [])    
    return (
      <Box sx={{typography: 'body1'}}>
        <Box color={"#fdfdfd"}>
            <Box display={"flex"} justifyContent={"center"} sx={{ marginLeft: "10vh", marginRight: "10vh", marginTop: '20vh'}}>
            <Grid sx={{width:"80vh"}}>
            <Stack spacing={2}>
                <TextField onChange={(i) => handlePermissionDescription(i.target.value)}
                    required
                    id="outlined-required"
                    label="Mazeret Tanımı"
                    fullWidth
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
                color: 'white'}}>İzin İste</Button>
                </Stack>
            </Grid>
            </Box>
        </Box>
        </Box>
    );
}
export default AnnualPermissions;