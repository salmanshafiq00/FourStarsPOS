import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { PurchaseComponent } from './purchase.component';
import { PurchaseFormComponent } from './purchase-form/purchase-form.component';
import { FormsModule } from '@angular/forms';
import {NgbDropdownModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { PurchaseStatusNamePipe } from 'src/app/Shared/Pipe/purchase-status-name.pipe';
import { PurchaseDetailsComponent } from './purchase-details.component';


const purchaseComponentsArray =[
  PurchaseComponent, PurchaseFormComponent, PurchaseDetailsComponent
]

@NgModule({
  declarations: [
    purchaseComponentsArray, PurchaseStatusNamePipe
  ],
  imports: [
    CommonModule, FormsModule, NgbTypeaheadModule, RouterModule, NgbDropdownModule
  ], 
  providers:[
    DatePipe
  ],
  exports:[purchaseComponentsArray]
})
export class PurchaseModule { }
