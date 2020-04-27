import ApiService from '../apiservice';

class InstituicaoService extends ApiService{
    constructor(){
        super('/api/instituicao')
    }
    salvar(instituicao){
        console.log(instituicao)
        return this.post('/', instituicao);
    }
    getInstituicoes(filtro){
        let params;
        params = `?professor=${filtro.professor}`
       return this.get('/'+params);
   }
   getInstituicaoById(id){
      return this.get('/' + id + '/instituicao');
   }
   deletar(id){
       return this.delete('/' + id);
   }
   atualizar(instituicao){
    return this.put('/' + instituicao.id + '/atualizar-instituicao', instituicao);
   }
}
export default InstituicaoService;