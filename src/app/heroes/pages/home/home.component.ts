import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { Auth } from '../../../auth/interfaces/auth.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [`
  .container{
    margin: 10px
  }
  `]
})
export class HomeComponent {

  get auth(): Auth{
    return this.authservice.authData
  }

  constructor( private route : Router,
               private authservice : AuthService) { }

  logout(){
    this.route.navigate(['./auth'])
  }
}
