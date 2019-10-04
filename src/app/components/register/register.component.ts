import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email: string;
  password: string;
  constructor(private router: Router, private authService: AuthService, private flashMessage: FlashMessagesService) { }

  ngOnInit() {
  }

  createAccount() {
    this.authService.register(this.email, this.password)
        .then(() => {
          this.flashMessage.show('Account created !', {
            cssClass: 'alert-success',
            timer: 5000
          })

          this.router.navigate(['/login']);
        })
        .catch((error) => {
          console.log(error);
        })
  }

}
