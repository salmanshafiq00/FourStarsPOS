import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesReturnComponent } from './sales-return.component';
import { SalesReturnFormComponent } from './sales-return-form/sales-return-form.component';

const salesReturnComponentsArray = [
  SalesReturnComponent, SalesReturnFormComponent,
]

@NgModule({
  declarations: [
    salesReturnComponentsArray
  ],
  imports: [
    CommonModule
  ],
  exports:[
    salesReturnComponentsArray
  ]
})
export class SalesReturnModule { }
