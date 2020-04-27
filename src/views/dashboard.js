import React, { useEffect, useState, useReducer  } from 'react';
import { 
  Context, 
  initialState, 
  reducer 
} from '../store';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import axios from 'axios';
import Aulas from '../views/Aulas'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import LocalStorageService from '../app/services/localStorage-service';
import MenuHeader from '../components/menu-header/menuHeader'
import Alunos from '../views/Alunos';
import { Card, CardContent, Icon, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
       Agenda Educacional
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

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

export default function Dashboard() {

  useEffect(()=>{
    const usuarioLogado = LocalStorageService.obterItem('_usuario_logado');
   // para pegar dados que necessitem do id do usuario logado
   //`http://localhost:8080/api/materia/${usuarioLogado.id}/materia`
    axios.get('http://localhost:8080/api/materia/2/materia')
    .then(response =>{
      console.log(response.data)
    }).catch(err=>{
      console.log(err.response)
    })
  })
  let history = useHistory();
  const classes = useStyles();
  const [estado, setState] = useState(false);
  return (
    <div className={classes.root}>
      <CssBaseline />
     <MenuHeader/>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
           
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4} lg={3}>
          <Card className={classes.cardStyle}>
          <div className={classes.details}>
            <CardContent className={classes.content} onClick={ (e) => history.push('/Aulas')}>
              <Typography className={classes.typography}  align={'center'}>
                Criar Aula
              </Typography>
              <Typography className={classes.typography} align={'center'} className={classes.icon} >
                <Button onClick={e => setState(true)}>
                  <AddCircleIcon  color="primary"  fontSize="large"/>
                </Button>
              </Typography>
            </CardContent>
          </div>
          </Card>
          </Grid>
          <Grid item xs={12} sm={4} lg={3}>
          <Card className={classes.cardStyle} onClick={ (e) => history.push('/Alunos')}>
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Typography className={classes.typography} align={'center'}>
                Alunos
              </Typography>
              <Typography className={classes.typography} align={'center'} className={classes.icon} >
              <Button>
                  <AddCircleIcon  color="primary"  fontSize="large"/>
              </Button>
              </Typography>
            </CardContent>
          </div>
          </Card>
          </Grid>
          <Grid item xs={12} sm={4} lg={3}>
          <Card className={classes.cardStyle}  onClick={ (e) => history.push('/Materias')}>
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Typography className={classes.typography} align={'center'}>
                Materias
              </Typography>
              <Typography className={classes.typography} align={'center'} className={classes.icon} >
              <Button>
                  <AddCircleIcon  color="primary"  fontSize="large"/>
              </Button>
              </Typography>
            </CardContent>
          </div>
          </Card>
          </Grid>
          <Grid item xs={12} sm={4} lg={3}>
          <Card className={classes.cardStyle}>
          <div className={classes.details}>
            <CardContent className={classes.content} onClick={ (e) => history.push('/Instituicoes')}>
              <Typography className={classes.typography} align={'center'}>
                Instituições
              </Typography>
              <Typography className={classes.typography} align={'center'} className={classes.icon} >
              <Button>
                  <AddCircleIcon  color="primary"  fontSize="large"/>
              </Button>
              </Typography>
            </CardContent>
          </div>
          </Card>
          </Grid>
          <Grid item xs={12} sm={4} lg={12}>
            <Aulas />
          </Grid>
        </Grid>
         
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}