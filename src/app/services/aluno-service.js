import ApiService from '../apiservice';

class AlunoService extends ApiService{
    constructor(){
        super('/api/aluno')
    }
    salvar(aluno){
        return this.post('/', aluno);
    }
    getAlunos(filtro){
         let params;
         params = `?professor=${filtro.professor}`
         if(filtro.situacao){
            params = `${params}&situacao=${filtro.situacao}`
         }

        return this.get('/'+params);
    }
    getAlunoById(id){
       return this.get('/' + id + '/obter-aluno');
    }
    deletar(id){
        return this.delete('/' + id + '/deletar');
    }
    atualizar(aluno){
        return this.put('/' + aluno.id + '/atualizar-aluno', aluno);
    }
}
export default AlunoService;