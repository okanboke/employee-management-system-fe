import  React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import Navbar from "../Navbar/Navbar"
import { PostingWithoutAuth } from '../../services/HttpService';
import { Alert, Snackbar } from '@mui/material';



function CreateUser(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const [isSent, setIsSent] = useState(false); //textboxları temizlemek için

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
            PostingWithoutAuth("http://localhost:8080/api/auth/admin/create-user", {
              firstName: firstName,
              lastName: lastName,
              email: email,
              password: password,
          }
        )//services'de metdouna gidecek
                  .then((res) => res.json())
                  .catch((err) => console.log(err))
          }

          async function handleSaveCreateUser() { //buttona basıldığında aldığımız değerleri objeye dönüştürüp göndereceğiz
    
            createUsers(); //save fonksiyonu çağırıyoruz.  
            setIsSent(true);
            setFirstName("");
            setLastName("");
            setEmail("");
            setPassword("");
          }


        const handleFirstName = (value) => { //girilen değeri alıp state e gönderecek
            setFirstName(value);
            setIsSent(false);
        }
    
        const handleLastName = (value) => {
            setLastName(value);
            setIsSent(false);
        }
    
        const handleEmail = (value) => {
            setEmail(value);
            setIsSent(false);
        }
    
        const handlePassword = (value) => {
          setPassword(value);
          setIsSent(false);
        }

        const handleClose = (event, reason) => { //kaydedildi uyarı mesajı
          if (reason === 'clickaway') {
            return;
          }
      
          setIsSent(false);
        };
          

    return (

        <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">

      <Snackbar open={isSent} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          İlanınız başarıyla yayınlandı!
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
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
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
                  onChange = { (i) => handleFirstName(i.target.value)}
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
                  onChange = { (i) => handleLastName(i.target.value)}
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
                  value={email}
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

            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
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




