import  React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import Navbar from "../Navbar/Navbar"
import { PostingWithoutAuth } from '../../services/HttpService';
import { Alert, Snackbar } from '@mui/material';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';




function CreateUser(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("")
  const [restDay, setRestDay] = useState()
  const [isSent, setIsSent] = useState(false); //textboxları temizlemek için
  const [userDate, setDate] = useState(dayjs(""));


    let [imageUpload , setImageUpload] = useState("");
    let [image] = useState("");

        const handleSubmit = (event) => {
          event.preventDefault();
          const data = new FormData(event.currentTarget);
          console.log({
            email: data.get('email'),
            password: data.get('password'),
          });
        };

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
          
          // TODO remove, this demo shouldn't need to reset the theme.
          
          const defaultTheme = createTheme();


          const createUsers = () => { //Yeni Çalışan Eklemek için back-end tarafına yolluyoruz.
            PostingWithoutAuth("/api/auth/admin/create-user", {
              firstName: firstName,
              lastName: lastName,
              phoneNumber: phoneNumber,
              userName: username,
              password: password,
              userDate: userDate,
              restDay: restDay,
          }
        )//services'de metdouna gidecek
                  .then((res) => res.json())
                  /*.then((result) => {
                    localStorage.getItem("tokenKey", result.accessToken);
                  })*/
                  .catch((err) => console.log(err))
          }

          async function handleSaveCreateUser() { //buttona basıldığında aldığımız değerleri objeye dönüştürüp göndereceğiz
    
            createUsers(); //save fonksiyonu çağırıyoruz.  
            setIsSent(true);
            setFirstName("");
            setLastName("");
            setUsername("");
            setPassword("");
            setPhoneNumber("");
            setRestDay("");
            setDate("");
          }


        const handleFirstName = (value) => { //girilen değeri alıp state e gönderecek
            setFirstName(value);
            setIsSent(false);
        }
    
        const handleLastName = (value) => {
            setLastName(value);
            setIsSent(false);
        }

        const handlePhoneNumber = (value) => {
          setPhoneNumber(value);
          setIsSent(false);
        }
    
        const handleEmail = (value) => {
            setUsername(value);
            setIsSent(false);
        }
    
        const handlePassword = (value) => {
          setPassword(value);
          setIsSent(false);
        }

        const handleRestDay = (value) => {
          setRestDay(value);
          setIsSent(false);
        }

        const handleClose = (event, reason) => { //kaydedildi uyarı mesajı
          if (reason === 'clickaway') {
            return;
          }
      
          setIsSent(false);
        };

        const handleChangeDate = (newValue) => {
          setDate(newValue);
          setIsSent(false);
        };
          
        
    return (
        <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">

      <Snackbar open={isSent} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Kullanıcı Başarıyla Eklendi!
        </Alert>

      </Snackbar>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 15,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1,
                background: 'linear-gradient(45deg, #6120ff 60%, #8f6aff 90%)',
                color: 'white'}}>
          <PersonAddAlt1Icon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Yeni Çalışan Ekle
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="Adı"
                  autoFocus
                  value={firstName}
                  onChange = { (i) => handleFirstName(i.target.value.replace(/^\w/, function($0){return $0.toUpperCase();}))}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Soyadı"
                  name="lastName"
                  autoComplete="family-name"
                  value={lastName}
                  onChange = { (i) => handleLastName(i.target.value.replace(/^\w/, function($0){return $0.toUpperCase();}))}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="phoneNumber"
                  label="Telefon"
                  name="phoneNumber"
                  autoComplete="family-name"
                  value={phoneNumber}
                  onChange = { (i) => handlePhoneNumber(i.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Adresi"
                  name="email"
                  autoComplete="email"
                  value={username}
                  onChange = { (i) => handleEmail(i.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Şifre"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange = { (i) => handlePassword(i.target.value)}
                />
              </Grid>
                <Grid item xs={12} sm={6}>

                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <MobileDatePicker
                      label="İşe Giriş Tarihi"
                      inputFormat="MM/dd/yyyy"
                      value={userDate}
                      onChange={handleChangeDate}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="restDay"
                  label="İzin Günü"
                  id="restDay"
                  autoComplete="new-password"
                  value={restDay}
                  onChange = { (i) => handleRestDay(i.target.value)}
                />
              </Grid>

              </Grid>
              <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2,
                background: 'linear-gradient(45deg, #6120ff 60%, #8f6aff 90%)',
                color: 'white' }}
              onClick={handleSaveCreateUser}
            >
              Kaydet
            </Button>
            <Grid container justifyContent="flex-end">
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>

    )
}
export default CreateUser;