import React from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import DateRangeIcon from '@material-ui/icons/DateRange';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import BookIcon from '@material-ui/icons/Book';
import CollectionsBookmarkIcon from '@material-ui/icons/CollectionsBookmark';
import SchoolIcon from '@material-ui/icons/School';
import { useHistory } from 'react-router-dom';
import AuthService from '../../app/services/AuthService'
const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  typography:{
    fontSize: '1.2rem',
  },
   cardStyle: {
    display: 'block',
    width: '15vw',
    margin: '0 auto',
    transitionDuration: '0.3s',
    height: '10vw'
 },
 icon:{
   marginTop: 25,
   
 },
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));
  
export default function MenuHeader() {
   let history = useHistory();
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const handleDrawerOpen = () => {
      setOpen(true);
    };
    const handleDrawerClose = () => {
      setOpen(false);
    };
    const deslogar = () =>{
      AuthService.removerUsuarioAutenticado();
      history.push('/login')
    }
    return (
        <div className={classes.root}>
            <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
                <Toolbar className={classes.toolbar}>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                >
                    <MenuIcon />
                </IconButton>
                <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                    Dashboard
                </Typography>
                <Button 
                    onClick={deslogar}
                    edge="start"
                    color="inherit"
                  >Sair</Button>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                classes={{
                paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                }}
                open={open}
                >
                    <div className={classes.toolbarIcon}>
                      <DateRangeIcon style={{}} />  
                      <IconButton onClick={handleDrawerClose}>
                          <ChevronLeftIcon />
                      </IconButton>
                    </div>
                    <Divider />
                    <List>
                      <ListItem button onClick={ (e) => history.push('/dashboard')}>
                        <ListItemIcon>
                          <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard"/>
                      </ListItem>
                      <ListItem button onClick={ (e) => history.push('/Aulas')}>
                        <ListItemIcon>
                          <BookIcon />
                        </ListItemIcon>
                        <ListItemText primary="Aulas" />
                      </ListItem>
                      <ListItem button onClick={ (e) => history.push('/Materias')}>
                        <ListItemIcon>
                          <CollectionsBookmarkIcon />
                        </ListItemIcon>
                        <ListItemText primary="Materias" />
                      </ListItem>
                      <ListItem button onClick={ (e) => history.push('/Clientes')}>
                        <ListItemIcon>
                          <SchoolIcon />
                        </ListItemIcon>
                        <ListItemText primary="Clientes" />
                      </ListItem>
                    </List>
                    <Divider />
              </Drawer>
        </div>
    )
}

