import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuardService {

  constructor(private router: Router) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        
        
        const isLoggedIn = this.checkUserInLocalStorage();
        if (!isLoggedIn) {
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
            return false;
        } else {
            
         }
        return isLoggedIn;

    }
    checkUserInLocalStorage(): boolean {
        const userJson = localStorage.getItem('user');
        if (!userJson) {
            return false; 
        }
        try {
            const user = JSON.parse(userJson);

          
            
            if(user&& typeof user === 'object' && 'userName' in user && 'roleId' in user) {
                if (typeof user.userName === 'string' && typeof user.roleId === 'number') {
                    return true;
                }
            }
        } catch (e) {
            console.error('Invalid JSON in localStorage for key "user"', e);
        }

        return false;
    }

}