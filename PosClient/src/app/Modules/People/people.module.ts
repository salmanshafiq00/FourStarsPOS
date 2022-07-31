import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerComponent } from './Customer/customer.component';
import { EmployeeComponent } from './Employee/employee.component';
import { RoleComponent } from './role/role.component';
import { SupplierComponent } from './Supplier/supplier.component';
import { UserComponent } from './User/user.component';
import { CustomerFormComponent } from './Customer/customer-form/customer-form.component';
import { EmployeeFormComponent } from './Employee/employee-form/employee-form.component';
import { RoleFormComponent } from './role/role-form/role-form.component';
import { SupplierFormComponent } from './Supplier/supplier-form/supplier-form.component';
import { UserFormComponent } from './User/user-form/user-form.component';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { ToEnumNamePipe } from 'src/app/Shared/Pipe/to-enum-name.pipe';

const PeopleComponentsArray = [
  CustomerComponent,  CustomerFormComponent, EmployeeComponent, EmployeeFormComponent,  RoleComponent, RoleFormComponent,  SupplierComponent, SupplierFormComponent , UserComponent,  UserFormComponent 
]

@NgModule({
  declarations: [
    PeopleComponentsArray, ToEnumNamePipe
   ],
  imports: [
    CommonModule, RouterModule, BrowserModule, FormsModule , NgbDropdownModule
  ], exports: [
    PeopleComponentsArray
  ]
})
export class PeopleModule { }

