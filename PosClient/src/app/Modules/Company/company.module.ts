import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyComponent } from './company.component';
import { CompanyFormComponent } from './company-form/company-form.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

const CompanyConponentsArray = [
  CompanyComponent, CompanyFormComponent

]


@NgModule({
  declarations: [
    CompanyConponentsArray
  ],
  imports: [
    CommonModule, FormsModule, RouterModule, NgbDropdownModule
  ], exports:[
    CompanyConponentsArray
  ]

})
export class CompanyModule { }
