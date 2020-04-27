import React, { useState, useEffect, forwardRef, useContext, useLayoutEffect  } from 'react';
import LocalStorageService from '../app/services/localStorage-service';
import Axios from 'axios';
import { makeStyles, TextField, Grid, FormControl, InputLabel, MenuItem, Select, Button, TextareaAutosize } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useHistory } from 'react-router-dom';
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
import moment, { now } from 'moment';
import AulaService from '../app/services/aula-service';
import { mensagemErro, mensagemSucesso } from '../components/toastr';
import MateriaService from '../app/services/materia-service';
import AlunoService from '../app/services/aluno-service';
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
    let instituicaoId = "";
    let alunoId = 0;
    let hora = value.hora[0];
    let min = value.hora[1];
    if(value.instituicao !== null){
      instituicaoId = value.instituicao.id;
    }else{
      instituicaoId= null;
    }
    if(value.aluno !== null){
      alunoId = value.aluno.id;
    }
    console.log(value)
    setState({
        current_id: value.id,
        materia: value.materia.id,
        aluno: alunoId,
        instituicao: instituicaoId,
        aula: value.tipoDeAula,
        datas: value.data,
        detalhes: value.detalhes,
        hora: new Date(year, month, day, hora, min),
        valor: value.valor
    })
  }
      const [state, setState] = useState({
        id: '',
        materia: '',
        aluno: '',
        instituicao: '',
        professor: '',
        //refere-se ao tipo de aula
        aula: '',
        datas: new Date(),
        hora: new Date(),
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
    //chamando os services
    alunoService.getAlunos(filtro).then(response=>
       setAlunos({
         aluno: response.data
       })
    ).catch(e=>{
      console.log(e.response)
    });
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
    const [allAluno, setAlunos] = useState({
      aluno: []
    });
    const [AllInstituicoes, setInstituicoes] = useState({
      instituicao: []
    });
    useLayoutEffect (()=>{
      fetchData();
    }, [] )
    useLayoutEffect (()=>{
      fetchData();
    }, [] )
    useLayoutEffect (()=>{
      fetchData();
    }, [] )
    const classes = useStyles();
  
    
    const handleDateChange = (date) => {
      setState({
        datas: date
      });
    };
    const validar = () =>{
      const msgs = [];
      if(!state.materia){
          msgs.push('O campo materia é obrigatório!')
      }
     
      if(!state.aluno && !state.instituicao){
        msgs.push('Selecione um aluno ou uma instituição para continuar!')
      }
      if(state.aluno){
        setState({
          disableInstituicao: true
        })
      }
      if(state.aluno && state.aula !== 'PARTICULAR'){
        msgs.push('Selecione o tipo de aula PARTICULAR para alunos!')
      }
      if(!state.aula){
        msgs.push('O campo tipo de aula é obrigatório!')
      }
      return msgs;
    }
    const cadastrarAula = React.createContext({
      cadastrar: async(materia, aluno, instituicao, aula, datas, hora, valor, detalhes)=>{
        console.log('No cadastro chega: ' + instituicao)
        const messages = validar();
        if(messages && messages.length>0){
          messages.forEach((msg, item)=>{
            mensagemErro(msg)
          });
          return false;
        }
        const dataFormata = moment(datas).format('YYYY-MM-DD'); 
        const horaFormatada = moment(hora).format('H:mm');
        if(!instituicao){
          instituicao= null;
        }
        console.log('Se não existe, então: ' + instituicao)
        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado');
        aulaService.salvar({
          materia: materia,
          aluno: aluno,
          instituicao: instituicao,
          professor: usuarioLogado.id,
          aula: aula,
          datas: dataFormata,
          hora: horaFormatada,
          valor: valor,
          detalhes: detalhes
        }).then(response=>{
          mensagemSucesso('Aula cadastrada com sucesso!')
        }).catch(e=>{
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
        const dataFormata = moment(state.datas).format('YYYY-MM-DD'); 
        const horaFormatada = moment(state.hora).format('H:mm');
        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado');
        aulaService.atualizar({
          id: state.current_id,
          materia: state.materia,
          aluno: state.aluno,
          instituicao: state.instituicao,
          aula: state.aula,
          professor: usuarioLogado.id,
          datas: dataFormata,
          hora: horaFormatada,
          valor: state.valor,
          detalhes: state.detalhes
        }).then(response=>{
          mensagemSucesso('Aula atualizada com sucesso!');
          setState({
            id: '',
            materia: '',
            aluno: '',
            instituicao: '',
            professor: '',
            //refere-se ao tipo de aula
            aula: '',
            datas: new Date(),
            hora: new Date(),
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

    //importação dos services que fazem conexão com a API
    const [materiaService, setMateriaService] = useState(new MateriaService());
    const [alunoService, setAlunoService] = useState(new AlunoService());
    const [instituicaoService, setInstituicaoService] = useState(new InstituicaoService());
    const [aulaService, setService] = useState(new AulaService());
    
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
                <InputLabel id="demo-simple-select-outlined-label">Alunos</InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    label="Alunos"
                    value={state.aluno}
                    onChange={e => (setState({...state, aluno: e.target.value}))}
                    disabled={state.instituicao ? true : false}
                   >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {
                       allAluno.aluno.map((aluno, index) => (
                        <MenuItem key={index} value={aluno.id}>
                          {aluno.nome}
                        </MenuItem>
                    ))
                    }
                  </Select>
                </FormControl>
              
                <FormControl variant="filled" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Instituição</InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    label="Instituição"
                    value={state.instituicao}
                    disabled={state.aluno ? true : false}
                    onChange={e => setState({...state, instituicao: e.target.value})}
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
                    {/* <MenuItem value={"FAESP"}>FAESP</MenuItem> */}
                  </Select>
                </FormControl>
                <FormControl variant="filled" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Tipo de Aula</InputLabel>
                <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    label="Aula"
                    value={state.aula}
                    onChange={e => setState({...state, aula: e.target.value})}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={'PRIVADA'}>PRIVADA</MenuItem>
                    <MenuItem value={'PARTICULAR'}>PARTICULAR</MenuItem>
                    <MenuItem value={'PUBLICA'}>PUBLICA</MenuItem>
                  </Select>
                </FormControl>
              
                <MuiPickersUtilsProvider locale={ptBR} utils={DateFnsUtils}>
                <FormControl variant="filled" className={classes.formControl}>
                  <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label="Date picker dialog"
                    format={'dd-MM-yyyy'}
                    value={state.datas}
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
                    label="Time picker"
                    value={state.hora}
                    ampm={false}
                    KeyboardButtonProps={{
                      'aria-label': 'change time',
                    }}
                    onChange={handleDateChange}
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
                        instituicao: '',
                        datas: new Date(),
                        hora: new Date(),
                        valor: '',
                        detalhes: '',
                        professor: ''
                      })}
                      >
                          Cancelar
                      </Button>
                      </Grid>:
                      <Button fullwidth variant="contained" color="primary"
                      onClick={e=> contextCadastrar.cadastrar(state.materia, state.aluno, 
                        state.instituicao, state.aula, state.datas, state.hora,
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