import React, { useState, useEffect, forwardRef, useContext  } from 'react';
import LocalStorageService from '../app/services/localStorage-service';
import MaterialTable from 'material-table';
import { makeStyles, Button } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import AlunoService from '../app/services/aluno-service';
import { mensagemSucesso, mensagemErro } from '../components/toastr';
import SweetAlert from 'react-bootstrap-sweetalert';
import swal from 'sweetalert2/dist/sweetalert2.all.min.js'
const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
};
const useStyles = makeStyles((theme) => ({
  typography:{
    fontSize: '1.2rem',
  },
   cardStyle: {
    display: 'block',
    width: '15vw',
    margin: '0 auto',
    transitionDuration: '0.3s',
    height: '10vw'
 },
 icon:{
   marginTop: 25,
   
 },
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
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
    height: '100vh',
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
}));
export default function Alunos(props) {
        
    const [stateAluno, setStateAluno] = useState({
          id: '',
          nome: '',
          professor: '',
          situacao: '',
          alunos: [],
          delete: false,
          open: false,
    })
  
    const Crud = React.createContext({
      deletar: (id)=>{
          setStateAluno({
            open: false
          })
          alunoService.deletar(id).then(
            response=>{
            mensagemSucesso('Aluno deletado com sucesso')
          }).catch(e=>{
            mensagemErro(e.response);
          })
        
      }
    })
    const contextCrud = useContext(Crud);
    const [allAlunos, setAll] = useState({});
    async function fetchData(){
      const usuarioLogado = LocalStorageService.obterItem('_usuario_logado');
      //getAll
      const filtro = {
        professor: usuarioLogado.id,
      }
       alunoService.getAlunos(filtro).then(response=>
          //console.log(response.data.value)
          setAll({
            aluno: response.data
          })
        );
    }
    useEffect(()=>{
      fetchData();
    }, [allAlunos])
      const classes = useStyles();
      const [stateAlert, setAlert] = React.useState({
        open: false
      })
      const [alunoService, setService] = useState(new AlunoService());
      const [state, setState] = React.useState({
        columns: [
          { title: 'Nome', field: 'nome' },
          { title: 'Situacao', field: 'situacao' },
        ],
      });
     
      return (
        <div className={classes.root}>
          <CssBaseline />
          <SweetAlert
          danger
          show={stateAluno.open}
          showCancel
          confirmBtnText="Sim!"
          title="Tem certeza que deseja deletar este aluno?"
          customButtons={
            <React.Fragment>
              <Button style={{margin: 10}} fullwidth variant="contained" color="secondary" onClick={(event) => setStateAluno({
            open: false
          })}>Cancelar</Button>
              <Button variant="contained" fullwidth color="primary" onClick={()=> contextCrud.deletar(stateAluno.id)}>Sim</Button>
            </React.Fragment>
          }
          focusCancelBtn
        >
         
        </SweetAlert>
        <main className={classes.content}>
        <div className={classes.appBarSpacer} />
     
        <MaterialTable
         title="Alunos"
         columns={state.columns}
         data={allAlunos.aluno}       
         options={{
          search: false,
        }}
        
         actions={[
        {
          icon: tableIcons.Delete,
          tooltip: 'Delete Aula',
          onClick: (event, rowData) => setStateAluno({
            id: rowData.id,
            open: true
          })
        },
        {
          icon: tableIcons.Edit,
          tooltip: 'Editar Aula',
          onClick: (event, rowData) => props.callbackParent(rowData)
        },
        
      ]}
        />
        </main>
        </div>
      );
     
}