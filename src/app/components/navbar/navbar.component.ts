import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  userAuthenticated = null;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.isAthenticated().subscribe((user) => {
      this.userAuthenticated = user;
    })
  }

  signOut() {
    this.authService.logout()
        .then(() => {
          this.router.navigate(['/login']);
        })
  }
}
