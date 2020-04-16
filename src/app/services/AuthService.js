import LocalStorageService from './localStorage-service';

export const USUARIO_LOGADO = '_usuario_logado'

export default class AuthService{

    static isUsuarioAutenticado(){
        const usuario = LocalStorageService.obterItem(USUARIO_LOGADO);
        return usuario && usuario.id;
    }

    static removerUsuarioAutenticado(){
        LocalStorageService.removerItem(USUARIO_LOGADO);
    }
}