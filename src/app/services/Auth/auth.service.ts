import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AlertifyService } from '.././alertify.service';
import { LoginUser } from 'src/app/models/loginUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router, private alertifyService: AlertifyService) { }
  path = "http://localhost:8090/api/auth";
  userToken: any;
  decodedToken: any;
  helper = new JwtHelperService();
  TOKEN_KEY = 'token';

  login(loginUser: LoginUser) {
    let headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json");
    headers = headers.append("Authorization", "Bearer " + this.token);
    this.http
      .post(this.path + "/login", loginUser, { headers: headers, responseType: 'json' })
      .subscribe(data => {
        this.decodedToken = JSON.parse(JSON.stringify(data));
        console.log(this.decodedToken.jwtToken);
        this.saveToken(this.decodedToken.jwtToken);
        this.userToken = this.decodedToken.jwtToken;
        this.router.navigateByUrl("/calendar")
        console.log(this.getCurrentUsername())
        this.alertifyService.success("Başarıyla giriş yapıldı!");

      });
  }

  saveToken(token) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }
  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    this.alertifyService.error("Başarıyla çıkış yapıldı!");
  }
  loggedIn() {
    let isExpired = this.helper.isTokenExpired(this.TOKEN_KEY);
    return isExpired;
  }
  get token() {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getCurrentUsername(): String {
    return this.helper.decodeToken(this.token).sub;
  }

  getHeaders() {
    let headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json");
    headers = headers.append("Authorization", "Bearer " + this.token);
    return headers;
  }
}
