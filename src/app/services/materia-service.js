import ApiService from '../apiservice';

class UsuarioService extends ApiService{
    constructor(){
        super('/api/materia')
    }
    autenticar(credenciais){
        return this.post('', credenciais);
    }
}
export default UsuarioService;