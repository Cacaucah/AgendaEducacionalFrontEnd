import React, { useState, useContext } from 'react';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { Alert } from '@material-ui/lab';
import {withRouter} from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
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
export default function NotAuthorized(){
    const classes = useStyles();
    return(
        <Container component="main" maxWidth="xs">
          
            <Alert variant="outlined" severity="error">
               Não autorizado 
            </Alert> 
            <a
              href="#/login"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              type="submit"
            >
              Log In
            </a>
       </Container>
    )
}