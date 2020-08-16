import React, { useEffect, useState  } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import LocalStorageService from '../app/services/localStorage-service';
import MenuHeader from '../components/menu-header/menuHeader'
import { Button, FormControl } from '@material-ui/core';
import { ptBR } from 'date-fns/locale'
import AulaService from '../app/services/aula-service';
import 'react-nice-dates/build/style.css';
import { format } from 'date-fns';
import DateRangeIcon from '@material-ui/icons/DateRange';
// import { Calendar } from 'react-nice-dates';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import './style.css';
import CadAulaForm from './cadAulaForm';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import * as moment from 'moment';
import 'moment/locale/pt-br';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment)

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
 agendar:{
    padding: '5% 5%',
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


//agenda

export default function Dashboard() {
  
  const [dateAtual, setDate] = useState();
  const [aulaService] = useState(new AulaService());
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const [currentAula, setAula] = useState({
    id: '',
    materia: '',
    aluno: '',
    cliente: '',
    professor: '',
    //refere-se ao tipo de aula
    tipoCliente: '',
    detalhes: '',
    valor: '',
  })
  const [tipodeCliente, setTipoCliente] = useState();
  const [disabledDates] = useState([]);
  const onChildChanged = (value) =>{
    if(value===true){
      handleClose();
    }
   }
   
  function fetchData(){
    const usuarioLogado = LocalStorageService.obterItem('_usuario_logado');
    const filtro = {
      professor: usuarioLogado.id,
    }  
    //getAll
    let ano;
    let dia;
    let mes;
    let horaInicio;
    let minInicio;
    let horaFim;
    let minFim;
    aulaService.getAulas(filtro).then(response=>
      response.data.forEach(element => {
          ano = element.data.split("-")[0];
          dia = element.data.split("-")[2];
          horaInicio = element.horaInicial.split(":")[0];
          minInicio = element.horaInicial.split(":")[1];
          horaFim = element.horaFim.split(":")[0];
          minFim = element.horaFim.split(":")[1];
          mes = element.data.split("-")[1]-1;
          disabledDates.push({
          'id': element.id,
          'title': element.materia.nome,
          "start": new Date(ano, mes, dia, horaInicio, minInicio, 0, 0, 0),
          "end": new Date(ano, mes, dia, horaFim, minFim, 0, 0, 0),
          "tipoCliente": element.cliente.tipoCliente,
          cliente: element.cliente,
          materia: element.materia,
          professor: element.professor,
          valor: element.valor,
          detalhes: element.detalhes
         },
        
         setAula({
           id: element.id,
           cliente: element.cliente,
           detalhes: element.detalhes,
           horaInicial: new Date(ano, mes, dia, horaInicio, minInicio, 0, 0, 0),
           horaFim: new Date(ano, mes, dia, horaFim, minFim, 0, 0, 0),
           materia: element.materia,
           professor: element.professor,
           valor: element.valor
         })
        )
      }),
      );
  }
 
   useEffect(()=>{
    fetchData()
  }, []);
 const[horaInicial, setHoraInicial] =useState();
 const[horaFim, setHoraFim] =useState();
 const [currentDate, setCurrentDate] = useState();
 const onSelectEventDate = (event) => {
  setAula({
    id: event.id,
    cliente: event.cliente,
    detalhes: event.detalhes,
    horaInicial: event.start,
    horaFim: event.end,
    materia: event.materia,
    professor: event.professor,
    valor: event.valor,
    detalhes: event.detalhes
  })
  setHoraInicial(
    new Date(event.start)
   )
   setHoraFim(
     new Date(event.end)
   )
   setCurrentDate(
     new Date(event.start)
   )
   
  setTipoCliente(
    event.tipoCliente
  )
   setOpen(true);
 }
 const selectedDate = (event) =>{
  console.log('Daaate ' +event)
 }

  const classes = useStyles();
  const [showCalendar, setState] = useState(false);
  return (
    <div className={classes.root}>
      <CssBaseline />
     <MenuHeader/>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Agenda"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           <CadAulaForm dataAtual={currentDate} horaInicial={horaInicial} horaFinal={horaFim} aula={currentAula} tipoCliente={tipodeCliente} callbackParent={(value) => onChildChanged(value)}/>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
        <Container maxWidth="lg" className={classes.container}>
           
        <Grid container spacing={4}>
          
          <Grid item xs={12} sm={4} lg={12}  id="calendario">
            {/* <Aulas /> */}
             
            <div className={classes.agendar}>
            <Calendar
            selectable
            culture='pt-BR'
            localizer={localizer}
            events={disabledDates}
            style={{ height: 500 }}
            startAccessor="start"
            step={3}
            timeslots={10}
            defaultView='week'
            onSelectEvent={event => onSelectEventDate(event)}
          />
            
            </div>
        
       
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