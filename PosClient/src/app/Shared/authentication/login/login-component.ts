import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms';
//import configurl from '../../assets/config/config.json';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgbToast } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'login',
  templateUrl: 'login-component.html',
  styleUrls: ['login-component.css']
})
export class LoginComponent {
  invalidLogin?: boolean;

  url =  'http://localhost:5000/api/authenticate/';
  //url = configurl.apiServer.url + '/api/authentication/';

  constructor(private router: Router, private http: HttpClient,private jwtHelper : JwtHelperService,
    private toastr: NgbToast) { }

  public login = (form: NgForm) => {
    const credentials = JSON.stringify(form.value);
    this.http.post(this.url +"login", credentials, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }).subscribe(response => {
      const token = (<any>response).token;
      localStorage.setItem("jwt", token);
      this.invalidLogin = false;
      this.toastr.show;
      this.router.navigate(["/"]);
    }, err => {
      this.invalidLogin = true;
    });
  }

  isUserAuthenticated() {
    const token = localStorage.getItem("jwt");
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }
    else {
      return false;
    }
  }

}