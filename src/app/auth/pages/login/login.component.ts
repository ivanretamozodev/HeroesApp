import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {

  constructor( private route : Router,
                private authservice: AuthService) { }

  login(): void{
    this.authservice.login()
    .subscribe( user => {
      if (user.id) {
        this.route.navigate(['./heroes'])
        
      }
    }
    )
  }

}
