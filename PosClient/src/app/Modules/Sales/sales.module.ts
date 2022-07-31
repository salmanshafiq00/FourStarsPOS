import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { SalesComponent } from './sales.component';
import { SalesFormComponent } from './sales-form/sales-form.component';
import { FormsModule } from '@angular/forms';
import { NgbModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { PosComponent } from '../Pos/pos.component';
import { RouterModule } from '@angular/router';
import { SalesStatusNamePipe } from 'src/app/Shared/Pipe/sales-status-name.pipe';
import { SalesDetailsComponent } from './sales-details.component';
import { SalesPaymentComponent } from './sales-payment/sales-payment.component';

const salesComponentsArray = [
  SalesComponent, SalesFormComponent,  PosComponent, SalesDetailsComponent
]

@NgModule({
  declarations: [
    salesComponentsArray, SalesStatusNamePipe, SalesPaymentComponent
  ],
  imports: [
    CommonModule, FormsModule, NgbTypeaheadModule, RouterModule, NgbModule
  ], exports: [
    salesComponentsArray
  ]
})
export class SalesModule { }
