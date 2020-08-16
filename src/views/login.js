import React, { useState, useContext } from 'react';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import UsuarioService from '../app/services/usuario-service';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from "react-router-dom";
import LocalStorageService from '../app/services/localStorage-service';
import {mensagemErro} from '../components/toastr';
const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));
 
  export default function SignIn() {
     const entrarAplicacao = React.createContext({
      entrar:  async (email, senha) => {
        usuarioService.autenticar({
          email: email,
          senha: senha
        }).then(response=>{
            LocalStorageService.adicionarItem('_usuario_logado', response.data);
               history.push('/dashboard');
             }).catch(e=>{
                mensagemErro(e.response.data);
             })
        }
    });
    let history = useHistory();
    const classes = useStyles();
    const contextEntrar = useContext(entrarAplicacao);
    const [usuarioService] = useState(new UsuarioService());
    const[usuario, setUsuario] = useState({
      email: '', 
      senha: ''
    })
    const printValues = e => {
      e.preventDefault();
      
    };
    
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>

          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} onSubmit={printValues} method="post">
          <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              value={usuario.email}
              name="email"
              autoComplete="email"
              autoFocus
              onChange={e => setUsuario({...usuario, email: e.target.value})
            }
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="senha"
              label="Senha"
              type="password"
              value={usuario.senha}
              id="senha"
              autoComplete="current-password"
              onChange={e => setUsuario({...usuario, senha: e.target.value})
          }
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              onClick={e=> contextEntrar.entrar(usuario.email, usuario.senha)}
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              type="submit"
            >
              Log In
            </Button>
            <Grid container>
             
              <Grid item>
                <Link href="#/cadastro-usuario" variant="body2">
                  {"Não tem uma conta? Inscreva-se"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        
      </Container>
    );
  }