import ApiService from '../apiservice';

class UsuarioService extends ApiService{
    constructor(){
        super('/api/professor')
    }
    autenticar(credenciais){
        return this.post('/autenticar', credenciais);
    }
    salvar(usuario){
        console.log(usuario)
        return this.post('/', usuario);
    }
}
export default UsuarioService;