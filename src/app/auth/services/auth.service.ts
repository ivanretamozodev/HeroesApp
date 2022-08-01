import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
import { Auth } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl
  private _Auth : Auth | undefined

  get authData(){
    return  {...this._Auth!}
  }

  constructor(private http : HttpClient) { }

  verificarAutenticacion(): Observable<boolean>{
    if (!localStorage.getItem('token')) {
      return of(false)
    }

    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`)
      .pipe(
        map(auth =>{
          this._Auth = auth
          return true
          
        })
      )
  }

  login(): Observable<Auth>{
   return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`)
   .pipe(
    tap(resp => this._Auth = resp ),
    tap(resp => localStorage.setItem('token',resp.id.toString()))
   )
  }
}
