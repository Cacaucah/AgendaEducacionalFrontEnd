import React from 'react';

import Login from '../views/login';
import CadastroUsuario from '../views/cadastroUsuario';
import Dashboard from '../views/dashboard'
import { Route, Switch, HashRouter, Redirect} from 'react-router-dom';
import AuthService from '../app/services/AuthService'
import CadastrarMaterias from '../views/materia';
import CadastrarInstituicao from '../views/instituicao';
import CadastrarAulas from '../views/aula';
function PrivateRoute ({ component: Component, ...rest }) {
    return(
        <Route
            {...rest}
            render={
                (props)=>{
                    if(AuthService.isUsuarioAutenticado() ){
                        return(
                            <Component {...props} />
                        )
                    }else{
                        return(
                            <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
                        )
                    }
                    
                }
            }
        />
    )
    };
function Rotas(){
    return(
        <HashRouter>
            <Switch>
                <Route path="/login" component={Login}/>
                <Route path="/cadastro-usuario" component={CadastroUsuario}/>
                <PrivateRoute path="/dashboard" component={ Dashboard}/>        
                <PrivateRoute path="/Materias" component={ CadastrarMaterias}/>      
                <PrivateRoute path="/Clientes" component={ CadastrarInstituicao}/>   
                <PrivateRoute path="/Aulas" component={ CadastrarAulas}/>     
            </Switch>
        </HashRouter>
    )
}
export default Rotas
