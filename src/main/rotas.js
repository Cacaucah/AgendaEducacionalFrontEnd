import React, { useState } from 'react';

import Login from '../views/login';
import CadastroUsuario from '../views/cadastroUsuario';
import Dashboard from '../views/dashboard'
import { Route, Switch, HashRouter, useHistory, Redirect} from 'react-router-dom';
import NotAuthorized from '../views/notAuthorize'

import AuthService from '../app/services/AuthService'

function PrivateRoute ({ component: Component, ...rest }) {
    return(
        <Route
            {...rest}
            render={
                (props)=>{
                    if(AuthService.isUsuarioAutenticado() ){
                        console.log(props)
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
            </Switch>
        </HashRouter>
    )
}
export default Rotas