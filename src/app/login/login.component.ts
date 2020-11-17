import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/Auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService) { }

  loginUser: any = {}

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    (window as any).initialize();
  }
  login() {
    this.authService.login(this.loginUser);
  }

  logOut() {
    this.authService.logout();
  }

  get isAuthenticated(): boolean {
    console.log(this.authService.loggedIn())
    return this.authService.loggedIn();
  }
}
