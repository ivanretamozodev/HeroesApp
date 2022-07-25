import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
import { Auth } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl

  constructor(private http : HttpClient) { }

  login(): Observable<Auth>{
   return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`)
  }
}
