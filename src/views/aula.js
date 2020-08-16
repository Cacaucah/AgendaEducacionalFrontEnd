import React, { useState, useContext, useLayoutEffect  } from 'react';
import LocalStorageService from '../app/services/localStorage-service';
import { makeStyles, TextField, Grid, FormControl, InputLabel, MenuItem, Select, Button, TextareaAutosize } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import MenuHeader from '../components/menu-header/menuHeader'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Aulas from './Aulas';
import { ptBR } from "date-fns/locale";
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import moment from 'moment';
import AulaService from '../app/services/aula-service';
import { mensagemErro, mensagemSucesso } from '../components/toastr';
import MateriaService from '../app/services/materia-service';
import InstituicaoService from '../app/services/instituicao-service';
const useStyles = makeStyles((theme) => ({
 
  root: {
    display: 'flex',
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
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
    height: '100%',
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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 420,
  },
  formControlNum: {
    minWidth: 120,
    margin: theme.spacing(1),
  },
  Cadastrar:{
    margin: theme.spacing(1),
    minWidth: 170,
  },
    selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
export default function CadastrarAulas() {

  const onChildChanged = (value) =>{
    var d = new Date();
    var year = d.getFullYear();
    var day = d.getDay();
    var month = d.getMonth();
    var horaInicial = value.horaInicial.split(":");
    var horaFinal = value.horaFim.split(":");
    var horaInicio = horaInicial[0];
    var minutoInicial= horaInicial[1];
    var horaFim = horaFinal[0];
    var minutoFim= horaFinal[1];
    var ano = value.data.split("-")[0];
    var dia = value.data.split("-")[2];
    var mes = value.data.split("-")[1]-1;
    setState({
        current_id: value.id,
        materia: value.materia.id,
        cliente: value.cliente.id,
        tipoCliente: value.cliente.tipoCliente,
        detalhes: value.detalhes,
        valor: value.valor
    })
    setData({
      datas: new Date(ano, mes, dia)
    })
    setDataFinal({
      horaFinal: new Date(year, month, day, horaFim, minutoFim)
    })
    setHoraInicial({
      horaInicial:  new Date(year, month, day, horaInicio, minutoInicial),
    })
  }
      const [state, setState] = useState({
        id: '',
        materia: '',
        aluno: '',
        cliente: '',
        professor: '',
        //refere-se ao tipo de aula
        tipoCliente: '',
       
        detalhes: '',
        valor: '',
        delete: false,
        open: false,
    })
   function fetchData(){
  
    const usuarioLogado = LocalStorageService.obterItem('_usuario_logado');
    //getAll
    const filtro = {
      professor: usuarioLogado.id,
    }
    materiaService.getMaterias(filtro).then(response=>
      // console.log(response.data)
      setMaterias({
        materia: response.data
      })
    ).catch(e=>{
      console.log(e.response)
    });
    instituicaoService.getInstituicoes(filtro).then(response=>
      // console.log(response.data)
      setInstituicoes({
        instituicao: response.data
      })
    ).catch(e=>{
      console.log(e.response)
    });
}
    const [allMaterias, setMaterias] = useState({
      materia: []
    });
    const [datas, setData] = useState({
      datas: new Date(),
    });
    const [horaFinal, setDataFinal] = useState({
      horaFinal: new Date(),
    });
    const [horaInicial, setHoraInicial] = useState({
      horaInicial: new Date(),
    });
    const [AllInstituicoes, setInstituicoes] = useState({
      instituicao: []
    }); 
    const classes = useStyles();

    const handleDateChange = (date) => {
      console.log(date)
      setData({
        datas: new Date(date),
      });
    };
    const handleDateHoraFim = (date) =>{
      console.log(date)
      setDataFinal({
        horaFinal: date
      })
    }
    const handleDateHoraInicio = (date) =>{
      setHoraInicial({
        horaInicial: date
      })
    }
    const validar = () =>{
      const msgs = [];
      if(!state.materia){
          msgs.push('O campo materia é obrigatório!')
      }
     
      if(!state.cliente){
        msgs.push('Selecione um cliente para continuar!')
      }
      if(horaFinal.horaFinal.getTime()===horaInicial.horaInicial.getTime()){
        msgs.push('Hora inválida!');
      }
      
      if(horaInicial.horaInicial.getTime()>horaFinal.horaFinal.getTime()){
        msgs.push('Hora inválida!');
      }
      if(horaFinal.horaFinal.getTime()<horaInicial.horaInicial.getTime()){
        msgs.push('Hora inválida!');
      }
      return msgs;
    }
    const cadastrarAula = React.createContext({
      cadastrar: async(materia, instituicao, datas, horaInicio, horaFim, valor, detalhes)=>{
       
        const messages = validar();
        if(messages && messages.length>0){
          messages.forEach((msg, item)=>{
            mensagemErro(msg)
          });
          return false;
        }
       
        if(!instituicao){
          instituicao= null;
        }
      
       
        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado');
        aulaService.salvar({
          materia: materia,
          cliente: instituicao,
          professor: usuarioLogado.id,
          data: moment(datas).format('YYYY-MM-DD'),
          horaInicial: moment(horaInicio).format('HH:mm'),
          horaFim: moment(horaFim).format('HH:mm'),
          valor: valor,
          detalhes: detalhes
        }).then(response=>{
          mensagemSucesso('Aula cadastrada com sucesso!')
        }).catch(e=>{
          console.log(e.response);
            mensagemErro(e.response.data);
        })
      },
      atualizar: () =>{
        const messages = validar();
        if(messages && messages.length>0){
          messages.forEach((msg, item)=>{
            mensagemErro(msg)
          });
          return false;
        }
       console.log(state.tipoCliente)
        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado');
        aulaService.atualizar({
          id: state.current_id,
          materia: state.materia,
          cliente: state.cliente,
          tipoCliente: state.tipoCliente,
          professor: usuarioLogado.id,
          data: moment(datas.datas).format('YYYY-MM-DD'),
          horaInicial: moment(horaInicial.horaInicial).format('HH:mm'),
          horaFim: moment(horaFinal.horaFinal).format('HH:mm'),
          valor: state.valor,
          detalhes: state.detalhes
        }).then(response=>{
          mensagemSucesso('Aula atualizada com sucesso!');
          setState({
            id: '',
            materia: '',
            aluno: '',
            cliente: '',
            professor: '',
            tipoCliente: '',
            //refere-se ao tipo de aula
            detalhes: '',
            valor: '',
            delete: false,
            open: false,
          })
        }).catch(e=>{
          console.log(e.response)
            mensagemErro(e.response);
        })
      }
    })
    const contextCadastrar = useContext(cadastrarAula);
    useLayoutEffect (()=>{
      fetchData();
    }, [] )
    //importação dos services que fazem conexão com a API
    const [materiaService] = useState(new MateriaService());
    const [instituicaoService] = useState(new InstituicaoService());
    const [aulaService] = useState(new AulaService());
    
      return (
        <div className={classes.root}>
          <CssBaseline />
          <MenuHeader/>
        <Container maxWidth="lg" className={classes.container}>
        <main className={classes.content}>
        <div className={classes.appBarSpacer} />
      <Card className={classes.root}>
        <CardContent >
            <Grid container spacing={0}>
              <Container maxWidth="lg">
              <Grid item xs={12} sm={12} lg={12}>
                  <Typography variant="body2" color="textSecondary" component="h2">
                    Cadastro de Aulas
                  </Typography>
                <FormControl variant="filled" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Materias</InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    label="Age"
                    value={state.materia}
                    onChange={e => setState({...state, materia: e.target.value})}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {
                       allMaterias.materia.map((materia, index) => (
                        <MenuItem key={index} value={materia.id}>
                          {materia.nome}
                        </MenuItem>
                    ))
                    }
                  </Select>
                </FormControl>
              
                <FormControl variant="filled" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Cliente</InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    label="Instituição"
                    value={state.cliente}
                    onChange={e => setState({...state, cliente: e.target.value})}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {
                       AllInstituicoes.instituicao.map((instituicao, index) => (
                        <MenuItem key={index} value={instituicao.id}>
                          {instituicao.nome}
                        </MenuItem>
                    ))
                    }
                  </Select>
                </FormControl>
               
              
                <MuiPickersUtilsProvider locale={ptBR} utils={DateFnsUtils}>
                <FormControl variant="filled" className={classes.formControl}>
                  <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label="Data da aula"
                    format={'dd-MM-yyyy'}
                    value={datas.datas}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                     onChange={handleDateChange}
                  />
                </FormControl>
                <FormControl variant="filled" className={classes.formControl}>
                  <KeyboardTimePicker
                    margin="normal"
                    id="time-picker"
                    label="Horario de inicio"
                    value={horaInicial.horaInicial}
                    ampm={false}
                    KeyboardButtonProps={{
                      'aria-label': 'change time',
                    }}
                    onChange={handleDateHoraInicio}
                  />
                </FormControl>
                <FormControl variant="filled" className={classes.formControl}>
                  <KeyboardTimePicker
                    margin="normal"
                    id="time-picker-fim"
                    label="Horario de fim"
                    value={horaFinal.horaFinal}
                    ampm={false}
                    KeyboardButtonProps={{
                      'aria-label': 'change time',
                    }}
                    onChange={handleDateHoraFim}
                  />
                </FormControl>
                </MuiPickersUtilsProvider>
                
                <FormControl variant="filled" className={classes.formControl}>
                  <TextField
                  className={classes.root}
                  required
                  id="outlined-required"
                  label="Valor da hora"
                  value={state.valor}
                  variant="outlined"
                  fullWidth
                  onChange={e => setState({...state, valor: e.target.value})}
                  />
                </FormControl>
                <FormControl variant="filled" className={classes.formControl}>
                 <TextareaAutosize 
                 value={state.detalhes} aria-label="minimum height" rowsMin={4} 
                 placeholder="Informe os detalhes da aula" 
                 onChange={e => setState({...state, detalhes: e.target.value})}
                 />
                </FormControl>
                <Grid item xs={12} sm={12} lg={4}>
                      {
                        state.current_id > 0 ?
                        <Grid item xs={12} sm={12} lg={10}>
                        <Button fullwidth variant="contained" color="primary"
                        onClick={e=> contextCadastrar.atualizar()}
                        >
                          Atualizar
                      </Button>
                      <Button fullwidth variant="contained" color="secondary"
                      onClick={e=> setState({
                        id: '',
                        materia: '',
                        aluno: '',
                        cliente: '',
                        datas: new Date(),
                        horaInicial: new Date(),
                        horaFinal: new Date(),
                        valor: '',
                        detalhes: '',
                        professor: ''
                      })}
                      >
                          Cancelar
                      </Button>
                      </Grid>:
                      <Button fullwidth variant="contained" color="primary"
                      onClick={e=> contextCadastrar.cadastrar(state.materia, 
                        state.cliente, datas.datas, horaInicial.horaInicial, horaFinal.horaFinal,
                        state.valor, state.detalhes)}
                      >
                          Cadastrar
                      </Button>
                      }
                      
                    </Grid>
              </Grid>
              </Container>
            </Grid>
        </CardContent>
      </Card>
        <Aulas callbackParent={(value) => onChildChanged(value)}/>
        </main>
        </Container>
        </div>
      );
}