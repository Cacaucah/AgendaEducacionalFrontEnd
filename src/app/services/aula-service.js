import ApiService from '../apiservice';

class AulaService extends ApiService{
    constructor(){
        super('/api/aula')
    }
    salvar(aula){
        return this.post('/', aula);
    }
    getAulas(filtro){
        let params;
        params = `?professor=${filtro.professor}`
       return this.get('/'+params);
   }
   getAulaById(id){
      return this.get('/' + id + '/aula');
   }
   deletar(id){
       return this.delete('/' + id);
   }
   atualizar(aula){
    return this.put('/' + aula.id + '/atualizar-aula', aula);
   }
}
export default AulaService;