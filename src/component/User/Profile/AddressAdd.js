import * as React from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Stack from '@mui/joy/Stack';
import Add from '@mui/icons-material/Add';
import Typography from '@mui/joy/Typography';
import { useState } from 'react';
import { GetWithAuth, PostingWithoutAuth, PutWithAuth } from '../../../services/HttpService';
import { useParams } from 'react-router-dom';
import { CardActions } from '@mui/material';
import { useEffect } from 'react';


export default function BasicModalDialog() {
    const userId = localStorage.getItem("currentUser") //giriş yapmış userID
    const addressId = localStorage.getItem("addressId") //giriş yapmış adresID
    const [address, setAddress] = useState([]); //var olan adres
    //const userId = localStorage.getItem("currentUser")
    const [isSent, setIsSent] = useState(false); //textboxları temizlemek için
    const [open, setOpen] = React.useState(false);
    let disabled = localStorage.getItem("addressId") === null? false:true; //adres bilgisi varsa yenisi eklenemeyecek


  //adress bilgileri
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [street, setStreet] = useState("");
  const [apartmentNumber, setApartmentNumber] = useState();
  const [doorNumber, setDoorNumber] = useState();


  //adress ekleme
    const saveAddress = () => { //ilanı yayınlamak için back-end tarafına yolluyoruz.
        PostingWithoutAuth("/api/employee/edit-profile", {
            id: userId,
            country: country,
            city: city,

            district: district,
            street: street,
            apartmentNumber: apartmentNumber,
            doorNumber: doorNumber
        }
        )//services'de metdouna gidecek
            .then((res) => res.json())
            .catch((err) => console.log(err))
    }
    //adres güncelleme
    const updateAddress = () => { //ilanı yayınlamak için back-end tarafına yolluyoruz.
      PutWithAuth("/api/employee/update-address", {
          id: addressId,
          country: country,
          city: city,

          district: district,
          street: street,
          apartmentNumber: apartmentNumber,
          doorNumber: doorNumber
      }
      )//services'de metdouna gidecek
          .then((res) => res.json())
          .catch((err) => console.log(err))
  }

  //adres güncelleme ekranı
  const getAddress = () => {

    GetWithAuth("/api/employee/profile/address/currentuser/"+ addressId) //services'de metdouna gidecek

        .then(res => res.json())
        .then(
            (result) => {
                console.log(result);
                setAddress(result);
            },
            (error) => {
                console.log(error)
            }
        )
}

    //adres ekleme
    async function handleSubmit() { //buttona basıldığında aldığımız değerleri objeye dönüştürüp göndereceğiz

        saveAddress(); //save fonksiyonu çağırıyoruz.  
        setIsSent(true);
        setCountry("");
        setCity("");
        setDistrict("");
        setStreet("");
        setApartmentNumber("");
        setDoorNumber("");

        //refreshProducts();       
    }
     //adres güncelleme
     async function handleUpdateAddress() { //buttona basıldığında aldığımız değerleri objeye dönüştürüp göndereceğiz

      updateAddress(); //save fonksiyonu çağırıyoruz.  
      setIsSent(true);
      setCountry("");
      setCity("");
      setDistrict("");
      setStreet("");
      setApartmentNumber("");
      setDoorNumber("");

      //refreshProducts();       
  }

    const handleCountry = (value) => { //girilen değeri alıp state e gönderecek
        setCountry(value);
        setIsSent(false);
    }
    const handleCity = (value) => { //girilen değeri alıp state e gönderecek
        setCity(value);
        setIsSent(false);
    }
    const handleDistrict = (value) => { //girilen değeri alıp state e gönderecek
        setDistrict(value);
        setIsSent(false);
    }
    const handleStreet = (value) => { //girilen değeri alıp state e gönderecek
        setStreet(value);
        setIsSent(false);
    }
    const handleApartmentNumber = (value) => { //girilen değeri alıp state e gönderecek
        setApartmentNumber(value);
        setIsSent(false);
    }
    const handleDoorNumber = (value) => { //girilen değeri alıp state e gönderecek
        setDoorNumber(value);
        setIsSent(false);
    }

    const handleNewAddress = () => { //Adres ekleme alanı açıldığında
      getAddress();
      setOpen(true) 
}
useEffect(() => {
  //düzenlenecek
}, [])



  return (
    <React.Fragment>
      <Button
      fullWidth
        variant="outlined"
        color="neutral"
        startDecorator={<Add />}
        onClick={() => handleNewAddress()}
      >
        Yeni Adres
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog
          aria-labelledby="basic-modal-dialog-title"
          aria-describedby="basic-modal-dialog-description"
          sx={{ width: "60vh" }}
        >
          <Typography id="basic-modal-dialog-title" level="h2">
            Adres
          </Typography>
          <Typography id="basic-modal-dialog-description">
            Açık adresini ekleyiniz.
          </Typography>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setOpen(false);
            }}
          >
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>Ülke</FormLabel>
                <Input autoFocus required value={country}
                onChange = { (i) => handleCountry(i.target.value)}/>
              </FormControl>
              <FormControl>
                <FormLabel>İl</FormLabel>
                <Input  required value={city} //{address.country}
                onChange = { (i) => handleCity(i.target.value)}/> 
              </FormControl>
              <FormControl>
                <FormLabel>İlçe</FormLabel>
                <Input required value={district}
                onChange = { (i) => handleDistrict(i.target.value)}/>
              </FormControl>
              <FormControl>
                <FormLabel>Cadde/Sokak</FormLabel>
                <Input required value={street}
                onChange = { (i) => handleStreet(i.target.value)}/>
              </FormControl>
              <FormControl>
                <FormLabel>No</FormLabel>
                <Input required value={apartmentNumber}
                onChange = { (i) => handleApartmentNumber(i.target.value)}/>
              </FormControl>
              <FormControl>
                <FormLabel>Kapı No</FormLabel>
                <Input required value={doorNumber} 
                onChange = { (i) => handleDoorNumber(i.target.value)}/>
              </FormControl>
              <div style={{display:"flex", flexDirection:"row", marginBottom:"1%"}}>
              <Button type="submit"
              fullWidth
              onClick={handleUpdateAddress}
              style={{marginRight: "1%"}}>Adresi Düzenle</Button>
              {disabled? <Button type="submit"
              disabled
              fullWidth
              color='neutral'
              onClick={handleSubmit}
              style={{marginLeft: "1%"}}>Yeni Adres Ekle</Button>:
              <Button type="submit"
              fullWidth
              onClick={handleSubmit}
              style={{marginLeft: "1%"}}>Yeni Adres Ekle</Button>}
              </div>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
