import React, { useState, useEffect } from "react";
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import HotelIcon from '@mui/icons-material/Hotel';
import RepeatIcon from '@mui/icons-material/Repeat';
import Typography from '@mui/material/Typography';
import GroupsIcon from '@mui/icons-material/Groups';
import { Box, Divider, Grid } from "@mui/material";
import { OverviewRestDayUsers } from "../overview/overview-restday-user";
import { Card } from '@mui/material';
import axios from "axios";
import { OverviewUserInfo } from "../overview/overview-userinfo";
import { OverviewUserCreateDay } from "../overview/overview-usercreateday";



function HomeUser() {
  const [userInfo, setUserInfo] = useState([]);
  const userId = localStorage.getItem("currentUser") //giriş yapmış userID
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  //User arayüzünde izinleri listeleme localden id gönderiyoruz
  const getOneUser = () => {
    axios.post("/api/employee/user-home/userInfo", {
      id: parseInt(userId)
    },
      {
        headers
      })
      .then(response => {
        setUserInfo(response.data);
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

  useEffect(() => { //API yazıyoruz listenin içini dolduracağız
    getOneUser()
  }, []) //herhangi bir değişiklik olduğunda sayfayı yeniler


  return (
    <Box display={"flex"} justifyContent={"center"} sx={{ marginLeft: "10vh", marginRight: "10vh", marginTop: '20vh' }}>

      <Box width={"60vh"} display={"flex"} alignItems={"center"}>
        <Grid container spacing={4}
        alignItems={"center"}
        justifyContent={"center"}>
          <Grid item lg={9}>
            <OverviewUserInfo
              firstName={userInfo.firstName}
              lastName={userInfo.lastName}
            ></OverviewUserInfo>
          </Grid>
          <Grid item lg={9}>
            <OverviewRestDayUsers restDay={userInfo.restDay}></OverviewRestDayUsers>
          </Grid>
          <Grid item lg={9}>
            <OverviewUserCreateDay userDate={userInfo.userDate}></OverviewUserCreateDay>
          </Grid>
        </Grid>
      </Box>
   
      <Box width={"60vh"}>
        <Card alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
          spacing={3}
          sx={{borderRadius: "16px"}} >

          <Timeline position="alternate">
            <TimelineItem>
              <TimelineOppositeContent
                sx={{ m: 'auto 0' }}
                align="right"
                variant="body2"
                color="text.secondary"
              >
                8:30
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineConnector />
                <TimelineDot>
                  <GroupsIcon />
                </TimelineDot>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent sx={{ py: '12px', px: 2 }}>
                <Typography variant="h6" component="span">
                  Daily
                </Typography>
                <Typography>Because you need strength</Typography>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineOppositeContent
                sx={{ m: 'auto 0' }}
                variant="body2"
                color="text.secondary"
              >
                09:00
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineConnector />
                <TimelineDot color="primary">
                  <LaptopMacIcon />
                </TimelineDot>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent sx={{ py: '12px', px: 2 }}>
                <Typography variant="h6" component="span">
                  Code
                </Typography>
                <Typography>Because it&apos;s awesome!</Typography>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineSeparator>
                <TimelineConnector />
                <TimelineDot color="primary" variant="outlined">
                  <HotelIcon />
                </TimelineDot>
                <TimelineConnector sx={{ bgcolor: 'secondary.main' }} />
              </TimelineSeparator>
              <TimelineContent sx={{ py: '12px', px: 2 }}>
                <Typography variant="h6" component="span">
                  Sleep
                </Typography>
                <Typography>Because you need rest</Typography>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineSeparator>
                <TimelineConnector sx={{ bgcolor: 'secondary.main' }} />
                <TimelineDot color="secondary">
                  <RepeatIcon />
                </TimelineDot>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent sx={{ py: '12px', px: 2 }}>
                <Typography variant="h6" component="span">
                  Repeat
                </Typography>
                <Typography>Because this is the life you love!</Typography>
              </TimelineContent>
            </TimelineItem>
          </Timeline>
        </Card>
      </Box>
    </Box>
  )
}
export default HomeUser;