import React, { useState, useContext  } from 'react';
import LocalStorageService from '../app/services/localStorage-service';
import { makeStyles, TextField, Grid, FormControl, InputLabel, MenuItem, Select, Button } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import MenuHeader from '../components/menu-header/menuHeader'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Instituicoes from './Instituicoes';
import { mensagemErro, mensagemSucesso } from '../components/toastr';
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
export default function CadastrarInstituicao() {
      const onChildChanged = (value) =>{
        setState({
            current_id: value.id,
            nome: value.nome,
            rua: value.rua,
            cep: value.cep,
            numero: value.numero,
            situacao: value.situacao,
            telefone: value.telefone,
            estado: value.estado,
            cidade: value.cidade,
            tipoCliente: value.tipoCliente
        })
      }
      const validar = () =>{
        const msgs = [];
        if(!state.nome){
            msgs.push('O campo nome é obrigatório!')
        }
        if(!state.rua){
          msgs.push('O campo rua é obrigatório!')
        }
        if(!state.cep){
          msgs.push('O campo cep é obrigatório!')
        }
        if(!state.numero){
          msgs.push('O campo numero é obrigatório!')
        }
        if(!state.tipoCliente){
          msgs.push('O campo numero é obrigatório!')
        }
        if(!state.situacao){
          msgs.push('O campo numero é obrigatório!')
        }
        return msgs;
      }
      const cadastrarInstituicao = React.createContext({
        cadastrar: async(nome, rua, cep, numero, telefone, cidade, estado, situacao, tipoCliente)=>{
          console.log(telefone, situacao, tipoCliente)
          const messages = validar();
          if(messages && messages.length>0){
            messages.forEach((msg, item)=>{
              mensagemErro(msg)
            });
            return false;
          }
          const usuarioLogado = LocalStorageService.obterItem('_usuario_logado');
          instituicaoService.salvar({
            nome: nome,
            rua: rua,
            cep: cep,
            numero: numero,
            telefone: telefone,
            cidade: cidade,
            estado: estado,
            situacao: situacao,
            tipoCliente: tipoCliente,
            professor: usuarioLogado.id
          }).then(response=>{
            mensagemSucesso('Cliente cadastrado com sucesso!')
          }).catch(e=>{
            console.log(e)
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
          const usuarioLogado = LocalStorageService.obterItem('_usuario_logado');
          instituicaoService.atualizar({
            id: state.current_id,
            nome: state.nome,
            rua: state.rua,
            cep: state.cep,
            numero: state.numero,
            telefone: state.telefone,
            cidade: state.cidade,
            estado: state.estado,
            situacao: state.situacao,
            tipoCliente: state.tipoCliente,
            professor: usuarioLogado.id
          }).then(response=>{
            mensagemSucesso('Cliente atualizado com sucesso!')
          }).catch(e=>{
            console.log(e.response)
              mensagemErro(e.response);
          })
        }
      })
      const contextCadastrar = useContext(cadastrarInstituicao);
      const [instituicaoService] = useState(new InstituicaoService());
      const classes = useStyles();
      const [state, setState] = useState({
        nome: '',
        rua: '',
        numero: '',
        cep: '',
        telefone: '',
        cidade: '',
        estado: '',
        situacao: '',
        tipoCliente: '',
        professor: '',
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
                    Cadastro de Clientes
                  </Typography>
              </Grid>
              <Grid item xs={12} sm={12} lg={12}>
                
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
                  <TextField
                  className={classes.root}
                  required
                  id="outlined-required"
                  label="Telefone"
                  value={state.telefone}
                  variant="outlined"
                  fullWidth
                  onChange={e => setState({...state, telefone: e.target.value})}
                  />
                  
                </FormControl>
                <FormControl variant="filled" className={classes.formControl}>
                  <TextField
                  className={classes.root}
                  required
                  id="outlined-required"
                  label="Cep"
                  value={state.cep}
                  variant="outlined"
                  fullWidth
                  onChange={e => setState({...state, cep: e.target.value})}
                  />
                </FormControl>
                <FormControl variant="filled" className={classes.formControl}>
                  <TextField
                  className={classes.root}
                  required
                  id="outlined-required"
                  label="Rua"
                  value={state.rua}
                  variant="outlined"
                  onChange={e => setState({...state, rua: e.target.value})}
                  fullWidth
                  />
                </FormControl>
              
                <FormControl variant="filled" className={classes.formControl}>
                  <TextField
                  required
                  id="outlined-required"
                  label="Numero"
                  value={state.numero}
                  variant="outlined"
                  onChange={e => setState({...state, numero: e.target.value})}
                  />
                </FormControl>
                <FormControl variant="filled" className={classes.formControl}>
                  <TextField
                  className={classes.root}
                  required
                  id="outlined-required"
                  label="Estado"
                  value={state.estado}
                  variant="outlined"
                  fullWidth
                  onChange={e => setState({...state, estado: e.target.value})}
                  />
                </FormControl>
                <FormControl variant="filled" className={classes.formControl}>
                  <TextField
                  className={classes.root}
                  required
                  id="outlined-required"
                  label="Cidade"
                  value={state.cidade}
                  variant="outlined"
                  fullWidth
                  onChange={e => setState({...state, cidade: e.target.value})}
                  />
                </FormControl>
                <FormControl variant="filled" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Tipo de Cliente</InputLabel>
                <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    label="Aula"
                    value={state.tipoCliente}
                    onChange={e => setState({...state, tipoCliente: e.target.value})}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={'PRIVADO'}>PRIVADO</MenuItem>
                    <MenuItem value={'PARTICULAR'}>PARTICULAR</MenuItem>
                    <MenuItem value={'PUBLICO'}>PUBLICO</MenuItem>
                  </Select>
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
                <Grid item xs={12} sm={12} lg={4}>
                <FormControl variant="filled" className={classes.Cadastrar}>
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
                        rua: '',
                        cep: '',
                        numero: '',
                        telefone: '',
                        estado: '',
                        cidade: '',
                      })}
                      >
                          Cancelar
                      </Button>
                      </Grid>:
                      <Button fullwidth variant="contained" color="primary"
                      onClick={e=> contextCadastrar.cadastrar(state.nome, state.rua, state.cep, state.numero, state.telefone, state.cidade, state.estado, state.situacao, state.tipoCliente)}
                      >
                          Cadastrar
                      </Button>
                      }
                      
                    </Grid>
                </FormControl>
                </Grid>
              </Grid>
            </Grid>
        </CardContent>
      </Card>
        <Instituicoes callbackParent={(value) => onChildChanged(value)}/>
        </main>
        </Container>
        </div>
      );
}