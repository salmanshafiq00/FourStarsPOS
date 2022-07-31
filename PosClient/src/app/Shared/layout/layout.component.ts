import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgbAccordionConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  providers: [NgbAccordionConfig]
  
})
export class LayoutComponent implements OnInit {

  constructor(config: NgbAccordionConfig, private jwtHelper: JwtHelperService, private router: Router) { 
    config.closeOthers= true;
    config.type = "success";
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

  public logOut = () => {
    localStorage.removeItem("jwt");
    this.router.navigate(["/login"]);
  }

  
  ngOnInit(): void {
  }

}
