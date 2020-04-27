import ApiService from '../apiservice';

class MateriaService extends ApiService{
    constructor(){
        super('/api/materia')
    }
    salvar(materia){
        return this.post('/', materia);
    }
    getMaterias(filtro){
        let params;
        params = `?professor=${filtro.professor}`
       return this.get('/'+params);
   }
   getMateriaById(id){
      return this.get('/' + id + '/materia');
   }
   deletar(id){
       return this.delete('/' + id);
   }
   atualizar(materia){
       return this.put('/' + materia.id + '/atualizar-materia', materia);
   }
}
export default MateriaService;