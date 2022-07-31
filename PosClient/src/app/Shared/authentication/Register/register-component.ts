import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms';
import { NgbToast } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'register',
  templateUrl: 'register-component.html',
  styleUrls: ['register-component.css']
})
export class RegisterComponent {
  invalidLogin?: boolean;

  url =  'http://localhost:5000/api/Authenticate';
  //url = configurl.apiServer.url + '/api/authentication/';

  constructor(private router: Router, private http: HttpClient,
    private toastr: NgbToast) { }

  public Registration = (form: NgForm) => {
    var object = new Object(form.value);
    this.http.post(this.url +"/register", object).subscribe(response => {
      this.invalidLogin = false;
      this.toastr.show;
      this.router.navigate(["/login"]);
      console.log(response);
    }, err => {
      this.invalidLogin = true;
      console.log(err);
    });
  }
}