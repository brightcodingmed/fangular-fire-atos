import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email;
  password;
  constructor(
               private authService: AuthService, 
               private router: Router,
               private flashMessage: FlashMessagesService
               ) { }

  ngOnInit() {
  }
  login() {
    this.authService.login(this.email, this.password)
        .then(() => {
          this.router.navigate(['/']);
        })
        .catch((error) => {
           console.log(error)
        })
  }


}
