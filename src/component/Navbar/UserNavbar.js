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
import LoginIcon from '@mui/icons-material/Login';
import HistoryIcon from '@mui/icons-material/History';
import { useNavigate } from 'react-router-dom';
import PeopleIcon from '@mui/icons-material/People';
import { Link } from '@mui/material';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import PropTypes from 'prop-types';


import {
  Link as RouterLink,
  Route,
  Routes,
  MemoryRouter,
  useLocation,
} from 'react-router-dom';

/************ COLLAPSE */
 

const breadcrumbNameMap = {
  '/inbox': 'İzin İstekleri',
  '/inbox/important': 'Important',
  '/trash': 'Trash',
  '/spam': 'Spam',
  '/drafts': 'Drafts',
};

function ListItemLink(props) {
  const { to, open, ...other } = props;
  const primary = breadcrumbNameMap[to];

  let icon = null;
  if (open != null) {
    icon = open ? <ExpandLess /> : <ExpandMore />;
  }

  return (
    <li>
      <ListItem button component={RouterLink} to={to} {...other}>
        <ListItemText primary={primary} />
        {icon}
      </ListItem>
    </li>
  );
}

ListItemLink.propTypes = {
  open: PropTypes.bool,
  to: PropTypes.string.isRequired,
};

function LinkRouter(props) {
  return <Link {...props} component={RouterLink} />;
}

 
 //******************* */



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

  const [openCollapse, setOpenCollapse] = React.useState(true); //collapse

  const handleClick = () => {
    setOpenCollapse((prevOpen) => !prevOpen);
  };


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
          <Link href="#" color="inherit" underline="none">
          <Typography variant="h6" noWrap component="div" to>Finastech İzin Sistemi
          </Typography>
          </Link>

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
                href={"/profile/"+currentUser}
                >
        <ListItemIcon sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Profil" sx={{ visibility: open ?  "visible" : "hidden"}} />
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

      <ListItemButton sx={{
                  maxHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                href={"/permissions"}>
        <ListItemIcon sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}>
          <BeachAccessIcon />
        </ListItemIcon>
        <ListItemText primary="İzin İstekleri" sx={{ visibility: open ?  "visible" : "hidden"}} />
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
          <MessageIcon />
        </ListItemIcon>
        <ListItemText primary="Mesaj gönder" sx={{ visibility: open ?  "visible" : "hidden"}} />
      </ListItemButton>

            <List>
              <ListItemLink to="/inbox" sx={{ visibility: open ?  "visible" : "hidden"}} open={openCollapse} onClick={handleClick} />
              <Collapse component="li" in={openCollapse} timeout="auto" unmountOnExit>
                <List disablePadding>
                  <ListItemLink sx={{ pl: 4 }} to="/inbox/important" />
                </List>
              </Collapse>
            </List>

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
          <HistoryIcon />
        </ListItemIcon>
        <ListItemText primary="İzinler" sx={{ visibility: open ?  "visible" : "hidden"}} />
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
