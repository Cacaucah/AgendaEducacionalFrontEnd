import React, { useState, useContext } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {withRouter} from 'react-router-dom';
import { useHistory } from "react-router-dom";
import UsuarioService from '../app/services/usuario-service';
import {mensagemErro, mensagemSucesso} from '../components/toastr';

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
  
 function CadastroUsuario(){
     //material 
     const classes = useStyles();
     
     //importando service
     const [usuarioService] = useState(new UsuarioService());

     const validar = () =>{
      const msgs = [];
        if(!usuario.nome){
            msgs.push('O campo nome é obrigatório!')
        }
        if(!usuario.email){
          msgs.push('O campo email é obrigatório!')
        }else if(!usuario.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)){
          msgs.push('Informe um email válido!')
        }
        if(!usuario.senha || !senhaRepetida){
          msgs.push('Digite a senha 2x');
        }else if(usuario.senha !== senhaRepetida){
          msgs.push('As senhas não conferem');
        }
      return msgs;
     }
   //aplicação
      const cadastrarUsuario = React.createContext({
        cadastrar: async(nome, email, senha)=>{
          const messages = validar();
          if(messages && messages.length>0){
            messages.forEach((msg, item)=>{
              mensagemErro(msg)
            });
            return false;
          }
           usuarioService.salvar({
             nome: nome,
             email:email,
             senha: senha
           }).then(response=>{
               mensagemSucesso('Usuário cadastrado com sucesso! Faça o login para acessar o sistema.')
               history.push('/login');
             }).catch(e=>{
           
                 mensagemErro(e.response);
           })
         }
        
      });
  
      //referenciando o contexto a ser utilizado
      const contextCadastrar = useContext(cadastrarUsuario);
        const[usuario, setUsuario] = useState({
          nome: '', 
          email: '', 
          senha: ''
        })

        //contexto de erro
        const [erroText] = useState({
          errorNome: false,
          mensagem: ''
        });
        const [senhaRepetida, setRepitaSenha] = useState();
        const [cancelar, setCancelar] = useState();
        let history = useHistory();
        return(
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                <Avatar className={classes.avatar}>

                </Avatar>
                <Typography component="h1" variant="h5">
                     Cadastrar-se
                </Typography>
                <form className={classes.form}>
                <TextField
                    variant="outlined"
                    error = {erroText.errorNome}
                    helperText={erroText.mensagem}
                    margin="normal"
                    required
                    fullWidth
                    id="nome"
                    label="Nome: "
                    value={usuario.nome}
                    name="nome"
                    autoComplete="nome"
                    autoFocus
                    onChange={e => setUsuario({...usuario, nome: e.target.value})
                    }
                 />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email: "
                    value={usuario.email}
                    name="email"
                    autoComplete="email"
                    autoFocus
                    onChange={e => setUsuario({...usuario, email: e.target.value})}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="senha"
                    label="Senha: "
                    value={usuario.senha}
                    name="senha"
                    type="password"
                    autoComplete="senha"
                    autoFocus
                    onChange={e => setUsuario({...usuario, senha: e.target.value})}
                 />
                 <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="senhaRepetida"
                    label="Repita a Senha: "
                    value={senhaRepetida}
                    name="senhaRepetida"
                    type="password"
                    autoComplete="senhaRepetida"
                    autoFocus
                    onChange={e => setRepitaSenha(e.target.value)}
                 />
                 <Button
                   onClick={e=> contextCadastrar.cadastrar(usuario.nome, usuario.email, usuario.senha)}
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                 >
                    Cadastrar
                 </Button>
                 <Button
                    onClick={e => setCancelar(() => history.push('/login'))}
                    fullWidth
                    variant="contained"
                    color="secondary"
                    className={classes.submit}
                    type="submit"
                >
                    Cancelar
                 </Button>
            </form>
            </div>
            </Container>
        )
}  export default withRouter(CadastroUsuario);