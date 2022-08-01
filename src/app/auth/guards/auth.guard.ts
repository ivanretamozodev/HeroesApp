import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements  CanLoad ,CanActivate {

  constructor(private auth: AuthService,
              private router : Router){}
   canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean{

    return this.auth.verificarAutenticacion()
            .pipe(
              tap(
                autenticado => {
                  if (!autenticado) {
                    this.router.navigate(['.auth/login'])
                  }
                }
              )
            )
  /*     if (this.auth.authData.id) {
        return true
      }
        
        console.log('bloqueado por authguard - canActivate');
        
      return false; */
  } 
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {

    return this.auth.verificarAutenticacion()
            .pipe(
                tap(
                  autenticado => {
                    if (!autenticado) {
                      this.router.navigate(['.auth/login'])
                    }
                  }
                )
              )
      
  /*   if (this.auth.authData.id) {
      return true
    }
      
      console.log('bloqueado por authguard - canload');
      
    return false; */
  }
}
