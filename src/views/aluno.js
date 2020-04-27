import React, { useState, useEffect, useContext  } from 'react';
import LocalStorageService from '../app/services/localStorage-service';
import { makeStyles, TextField, Grid, FormControl, InputLabel, MenuItem, Select, Button } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import MenuHeader from '../components/menu-header/menuHeader'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Alunos from './Alunos'
import AlunoService from '../app/services/aluno-service';
import {mensagemErro, mensagemSucesso} from '../components/toastr';
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
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
export default function CadastrarAlunos() {
      //função que captura os dados que vem do componente filho ao clicar no botão editar
        const onChildChanged = (value) =>{
          console.log(value)
          setState({
              current_id: value.id,
              situacao: value.situacao,
              nome: value.nome
          })
        }

      //funcao de validacao
      const validar = () =>{
        const msgs = [];
        if(!state.nome){
            msgs.push('O campo nome é obrigatório!')
        }
        if(!state.situacao){
          msgs.push('O campo situação é obrigatório!')
        }
        return msgs;
      }
      const cadastrarAluno = React.createContext({
        cadastrar: async(nome, situacao)=>{
          const messages = validar();
          if(messages && messages.length>0){
            messages.forEach((msg, item)=>{
              mensagemErro(msg)
            });
            return false;
          }
          const usuarioLogado = LocalStorageService.obterItem('_usuario_logado');
          alunoService.salvar({
            nome: nome,
            situacao: situacao,
            professor: usuarioLogado.id
          }).then(response=>{
            mensagemSucesso('Aluno cadastrado com sucesso!')
          }).catch(e=>{
              mensagemErro(e.response.data);
          })
        }, //fim do metodo cadastrar
        atualizar: () =>{
          const messages = validar();
          if(messages && messages.length>0){
            messages.forEach((msg, item)=>{
              mensagemErro(msg)
            });
            return false;
          }
          const usuarioLogado = LocalStorageService.obterItem('_usuario_logado');
          alunoService.atualizar({
            id: state.current_id,
            nome: state.nome,
            situacao: state.situacao,
            professor: usuarioLogado.id
          }).then(response=>{
            mensagemSucesso('Aluno atualizado com sucesso!')
          }).catch(e=>{
              mensagemErro(e.response.data);
          })
        }
      });
      const classes = useStyles();
      const contextCadastrar = useContext(cadastrarAluno);
      const [alunoService, setService] = useState(new AlunoService());
      const [state, setState] = useState({
        nome: '',
        professor: '',
        situacao: '',
        current_id: 0,
      })
      return (
        <div className={classes.root}>
          <CssBaseline />
          <MenuHeader/>
        <Container maxWidth="lg" className={classes.container}>
        <main className={classes.content}>
        <div className={classes.appBarSpacer} />
          <Card className={classes.root}>
            <CardContent xs={12} sm={12} lg={12}>
              <Grid container spacing={3}>
                  <Grid item xs={12} sm={12} lg={12}>
                      <Typography variant="body2" color="textSecondary" component="h2">
                        Cadastro de Alunos
                      </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} lg={10}>
                    <FormControl variant="filled" className={classes.formControl}>
                      <TextField
                      className={classes.root}
                      required
                      id="outlined-required"
                      label="Nome"
                      value={state.nome}
                      variant="outlined"
                      fullWidth
                      onChange={e => setState({...state, nome: e.target.value})}
                      />
                    </FormControl>
                    <FormControl variant="filled" className={classes.formControl}>
                    <InputLabel id="demo-simple-select-outlined-label">Situação</InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        label="Age"
                        onChange={e => setState({...state, situacao: e.target.value})}
                        value={state.situacao}
                      >
                      <MenuItem value="">
                          <em>None</em>
                      </MenuItem>
                      <MenuItem value={'ATIVO'}>ATIVO</MenuItem>
                      <MenuItem value={'INATIVO'}>INATIVO</MenuItem>
                      </Select>
                    </FormControl>
                    <FormControl variant="filled" className={classes.formControl}>
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
                        nome: '',
                        situacao: ''
                      })}
                      >
                          Cancelar
                      </Button>
                      </Grid>:
                      <Button fullwidth variant="contained" color="primary"
                      onClick={e=> contextCadastrar.cadastrar(state.nome, state.situacao)}
                      >
                          Cadastrar
                      </Button>
                      }
                      
                    </Grid>
                    </FormControl>
                  </Grid>
              </Grid>
            </CardContent>
          </Card>
        <Alunos id={state.current_id} callbackParent={(value) => onChildChanged(value)}/>
        </main>
        </Container>
        </div>
      );
}