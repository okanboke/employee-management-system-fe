import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import MessageIcon from '@mui/icons-material/Message';
import EnergySavingsLeafIcon from '@mui/icons-material/EnergySavingsLeaf';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { useNavigate } from 'react-router-dom';
import PeopleIcon from '@mui/icons-material/People';
import HistoryIcon from '@mui/icons-material/History';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';


/******* ACCOURDİON  ***/

import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props}/>
))(({ theme }) => ({
  border: `0px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary2 = styled((props) => (
  <MuiAccordionSummary id='panel1d-header2'
    expandIcon={<BeachAccessIcon />}
    {...props}
  />  
))(({ theme }) => ({

  //justifyContent: "flex-start",
  position:"relative",
  color:"#000000",
  right:11.5,
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(3),
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary id='panel1d-header'
    expandIcon={<HistoryIcon />}
    {...props}
  />
))(({ theme }) => ({

  //justifyContent: "flex-start",
  position:"relative",
  color:"#000000",
  right:11.5,
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(3),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));




const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  let history = useNavigate();
  const currentUser  = localStorage.getItem("currentUser");

     /************ACCORDION */
     const [expanded, setExpanded] = React.useState('panel1','panel2');

     const handleChange = (panel) => (event, newExpanded) => {
       setExpanded(newExpanded ? panel : false);
     };
   /************************ */
    

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const onClick = () => { //çıkış işlemi
    localStorage.removeItem("tokenKey")
    localStorage.removeItem("currentUser")
    localStorage.removeItem("refreshKey")
    localStorage.removeItem("userName")
    localStorage.removeItem("roleName")
    localStorage.removeItem("addressId")
    history("/")
  }
/*
  <Box component="main" sx={{ flexGrow: 1, p: 3 }}>

        <DrawerHeader />
        <Typography paragraph>
          
          
        </Typography>
      </Box>




          {localStorage.getItem("currentUser") == null ? <Link to="/">Giriş/Kayıt</Link>:
            <div><IconButton ><LockOpen></LockOpen></IconButton>
          <Link to={{pathname : '/users/' + localStorage.getItem("currentUser")}}>Profil</Link>
           </div>}
          
*/
  return (

    
    <Box sx={{ display: 'flex'}}>
             {currentUser == null ? <div></div>

      
   
:<div>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{backgroundColor: "#6120ff" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" to>Finastech İzin Sistemi
          </Typography>
        </Toolbar>
      </AppBar>
      
      <Drawer variant="permanent" open={open}>
      
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />

        <ListItemButton sx={{
                  maxHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                href='/home'>
        <ListItemIcon sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Personeller" sx={{ visibility: open ?  "visible" : "hidden"}} />
      </ListItemButton>  
 
        <ListItemButton sx={{
                  maxHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                href='/create-user'>
        <ListItemIcon sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}>
          <PersonAddAlt1Icon />
        </ListItemIcon>
        <ListItemText primary="Personel ekle" sx={{ visibility: open ?  "visible" : "hidden"}} />
      </ListItemButton>  

        <ListItemButton sx={{
                  maxHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}>
        <ListItemIcon sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
          <CalendarMonthIcon />
        </ListItemIcon>
        <ListItemText primary="Takvim" sx={{visibility: open ?  "visible" : "hidden"}} />
      </ListItemButton>

      <div>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
      <ListItemButton //onClick = {onClick}
                  sx={{
                  maxHeight: 48,
                  justifyContent: open ? 'start' : 'left',
                }}>
      <ListItemIcon sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',                  
                  }}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
        <ListItemText primary="İzinler" sx={{ visibility: open ?  "visible" : "hidden"}} />
        </AccordionSummary>
        </ListItemIcon>
        </ListItemButton>
        <AccordionDetails>

        <ListItemButton sx={{
                  maxHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 1,
                }}
                href={"/permission/request"}>
        <ListItemIcon sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}>
          <LocalHospitalIcon />
        </ListItemIcon>
        <ListItemText primary="Mazeret İzinleri" sx={{ visibility: open ?  "visible" : "hidden"}} />
      </ListItemButton>

      <ListItemButton sx={{
                  maxHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 1,
                }}
                href={"/annual/permissions/admin/list-permissions"}>
        <ListItemIcon sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}>
          <EnergySavingsLeafIcon />
        </ListItemIcon>
        <ListItemText primary="Yıllık İzinler" sx={{ visibility: open ?  "visible" : "hidden"}} />
      </ListItemButton>
      
        <ListItemButton sx={{
                  maxHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 1,
                }}
                href={"/justification/type"}>
        <ListItemIcon sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}>
          <FormatListNumberedIcon />
        </ListItemIcon>
        <ListItemText primary="İzin Türleri" sx={{ visibility: open ?  "visible" : "hidden"}} />
      </ListItemButton>

        </AccordionDetails>
      </Accordion>
    </div>

      <ListItemButton sx={{
                  maxHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}>
        <ListItemIcon sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}>
          <MessageIcon />
        </ListItemIcon>
        <ListItemText primary="Mesaj gönder" sx={{ visibility: open ?  "visible" : "hidden"}} />
      </ListItemButton>

      <ListItemButton sx={{
                  maxHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}>
        <ListItemIcon sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}>
          <EnergySavingsLeafIcon />
        </ListItemIcon>
        <ListItemText primary="İzindeki personeller" sx={{ visibility: open ?  "visible" : "hidden"}} />
      </ListItemButton>
        <Divider />
      <ListItemButton onClick = {onClick}
                  sx={{
                  maxHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}>
        <ListItemIcon sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}>
          <LoginIcon />
        </ListItemIcon>
        
        <ListItemText primary="Çıkış" sx={{ visibility: open ?  "visible" : "hidden"}} />
      </ListItemButton>
      

      </Drawer>
      </div>}
    </Box>
  );
}
