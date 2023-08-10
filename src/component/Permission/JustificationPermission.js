import  React, { useState } from 'react';
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
import { PostingWithoutAuth } from '../../services/HttpService';
import Button from '@mui/joy/Button';

function JustificationPermission() {
    const userId = localStorage.getItem("currentUser") //giriş yapmış userID
    const [permissionType, setPermissionType] = React.useState(""); //select
    const [permissionDescription, setPermissionDescription] = useState("");
    const [isSent, setIsSent] = useState(false); //textboxları temizlemek için
    const [startDate, setStartDate] = useState(dayjs(""));
    const [endDate, setEndDate] = useState(dayjs(""));


      //İzin Ekleme
      const permissionSave = () => { //ilanı yayınlamak için back-end tarafına yolluyoruz.
        PostingWithoutAuth("/api/permissions/create", {
            userId: userId,
            permissionType: permissionType,
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
              Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
          </Typography>
        );
      }

          //Mazere İzni ekleme
    async function handleSubmit() { //buttona basıldığında aldığımız değerleri objeye dönüştürüp göndereceğiz

        permissionSave(); //save fonksiyonu çağırıyoruz.  
        setIsSent(true);
        setPermissionType("");
        setPermissionDescription("");
        setStartDate("");
        setEndDate("");
        //refreshProducts();       
    }
      
      // TODO remove, this demo shouldn't need to reset the theme.
      
      const defaultTheme = createTheme();

    const handlePermissionType = (event) => { //select
        setPermissionType(event.target.value);
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
    return (
        <Box color={"#fdfdfd"}>
            <Box display={"flex"} justifyContent={"center"}>
            <Grid sx={{width:"80vh"}}>
            <Stack spacing={2}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">İzin Türü</InputLabel>
                    <Select
                        required
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={permissionType}
                        label="İzin Türü"
                        onChange={handlePermissionType}
                    >
                        <MenuItem value={"Hastane İzni"}>Hastane İzni</MenuItem>
                        <MenuItem value={"Düğün İzni"}>Düğün İzni</MenuItem>
                        <MenuItem value={"Özel Durum İzni"}>Özel Durum İzni</MenuItem>
                    </Select>
                </FormControl>
                <TextField onChange={(i) => handlePermissionDescription(i.target.value)}
                    required
                    id="outlined-required"
                    label="Mazeret Tanımı"
                    fullWidth
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <MobileDatePicker
                      label="İzin Başlangıç Tarihi"
                      inputFormat="MM/dd/yyyy"
                      value={startDate}
                      onChange={handleStartDate}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>

                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <MobileDatePicker
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
                background: 'linear-gradient(45deg, #6120ff 40%, #8f6aff 80%)',
                color: 'white'}}>İzin İste</Button>
                </Stack>
            </Grid>
            </Box>
        </Box>
    );
}
export default JustificationPermission;