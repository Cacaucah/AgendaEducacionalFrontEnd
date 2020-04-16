import React, { useState } from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import BookIcon from '@material-ui/icons/Book';
import moment from 'moment';
import Container from '@material-ui/core/Container';
import { Grid } from '@material-ui/core';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function CriarAula() {
  const classes = useStyles();
  const data = new Date();
  const [dataFormatada, setData] = useState(moment(data).format('DD-MM-YYYY'));
  return (
    <React.Fragment>
      <Container maxWidth="lg" className={classes.container} >
        <Grid 
        justify="center"
        alignItems="center" 
        container 
        spacing={0}
        direction="column"
        >
        <Grid item xs={12} md={8} lg={9}>
          <Title>Criar uma aula</Title>
        </Grid>
        <Grid style={{marginTop: 20}} item xs={12} md={8} lg={9}>
          <Typography component="p" variant="h4">
            <BookIcon style={{fontSize: 50,}}/>
          </Typography>
        </Grid>
        <Grid style={{marginTop: 20}}item xs={12} md={8} lg={9}>
        <Typography color="textSecondary" className={classes.depositContext}>
          {dataFormatada}
        </Typography>
        </Grid>
        </Grid>
      <div>
    
      </div>
      </Container>
    </React.Fragment>
  );
}