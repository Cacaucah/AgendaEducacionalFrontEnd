import React, { useState, useContext, useLayoutEffect  } from 'react';
import LocalStorageService from '../app/services/localStorage-service';
import { makeStyles, TextField, Grid, FormControl, InputLabel, MenuItem, Select, Button, TextareaAutosize } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { ptBR } from "date-fns/locale";
import 'date-fns';
import moment from 'moment';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
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

export default function CadAulaForm(props) {
  
    const [state, setState] = useState({
        id: props.aula.id,
        materia: props.aula.materia.id,
        cliente: props.aula.cliente.id,
        professor: props.aula.professor.id,
        detalhes: props.aula.detalhes,
        valor: props.aula.valor,
        data: props.dataAtual,
        condicao: '',
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
    useLayoutEffect (()=>{
      fetchData();
    }, [] )
    const [datas, setData] = useState({
        datas: new Date(),
      });
      const [horaInicial, setDataInicial] = useState({
       horaInicial: props.horaInicial
      });
      const [horaFinal, setDataFinal] = useState({
        horaFinal: props.horaFinal
      });

    const classes = useStyles();
    const [AllInstituicoes, setInstituicoes] = useState({
        instituicao: []
      });
      const [allMaterias, setMaterias] = useState({
        materia: []
      });
   
    const handleDateChange = (date) => {
        setData({
          datas: date,
        });
      };
      const handleDateHoraFim = (date) =>{
        setDataFinal({
          horaFinal: date
        })
      }
      const handleDateHoraInicio = (date) =>{
        setDataInicial({
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
        atualizar: () =>{
         
          const messages = validar();
          console.log('atualizaaar')
          if(messages && messages.length>0){
            messages.forEach((msg, item)=>{
              mensagemErro(msg)
            });
            return false;
          }
         
          const usuarioLogado = LocalStorageService.obterItem('_usuario_logado');
         
          aulaService.atualizar({
            id: state.id,
            materia: state.materia,
            cliente: state.cliente,
            professor: usuarioLogado.id,
            data: moment(state.data).format('YYYY-MM-DD'),
            horaInicial: moment(horaInicial.horaInicial).format('HH:mm'),
            horaFim: moment(horaFinal.horaFinal).format('HH:mm'),
            valor: state.valor,
            detalhes: state.detalhes,
          }).then(response=>{
            props.callbackParent(true);
            mensagemSucesso('Aula atualizada com sucesso!');
            setState({
              condicao: true
            })
            
          }).catch(e=>{
              mensagemErro(e.response.data);
          })
        }
      })
      const contextCadastrar = useContext(cadastrarAula);
      const [materiaService] = useState(new MateriaService());
      const [instituicaoService] = useState(new InstituicaoService());
      const [aulaService] = useState(new AulaService());
      return (
        <div className={classes.root}>
        <Container maxWidth="lg" className={classes.container}>
            <Card className={classes.root}>
            <CardContent >
                <Grid container spacing={0}>
                <Container maxWidth="lg">
                <Grid item xs={12} sm={12} lg={12}>
                    <Typography variant="body2" color="textSecondary">
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
                        value={state.data}
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
                        <Button fullwidth variant="contained" color="primary"
                        onClick={e=> contextCadastrar.atualizar()}
                        >
                            Atualizar
                        </Button>
                        </Grid>
                </Grid>
                </Container>
                </Grid>
            </CardContent>
        </Card>
           
        </Container>
        </div>
      )
}

