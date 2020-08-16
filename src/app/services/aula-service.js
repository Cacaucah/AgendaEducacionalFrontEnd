import ApiService from '../apiservice';
import moment from 'moment';
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
        if(filtro.data){
            params = `${params}&data=${moment(filtro.data).format("YYYY-DD-MM")}`
        }
       return this.get('/'+params);
   }
   getAulaById(id){
      return this.get('/' + id + '/aula');
   }
   deletar(id){
       return this.delete('/' + id);
   }
   atualizar(aula){
       console.log(aula)
    return this.put('/' + aula.id + '/atualizar-aula', aula);
   }
}
export default AulaService;