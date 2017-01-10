import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { AuthService } from './auth.service';

/**
 * Serviço que intercepta acesso as rotas e redireciona para a página de login
 * caso o usuário não esteja autenticado. Deve ser utilizado na configuração de rotas
 * da seguinte forma:
 * 
 * { 
    path: '/home',
    ...
    canActivate: [GuardService] 
  },
 * 
 * 
 */
@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private authService: AuthService) { }

    canActivate() {
        if (this.authService.isAuthenticated()) {
            // logged in so return true
            return true;
        }

        let loginRoute = this.authService.getLoginRoute();
        let typeOfLoginRoute = (typeof loginRoute);
        switch (typeOfLoginRoute) {
            case 'function':
                loginRoute();
                break;
            // case 'string':
            default:
                this.router.navigate([loginRoute]);
                break;
        }

        return false;
    }
}
