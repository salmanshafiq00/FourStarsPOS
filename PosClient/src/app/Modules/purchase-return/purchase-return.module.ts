import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { PurchaseReturnDetailsComponent } from './purchase-return-details.component';
import { PurchaseReturnFormComponent } from './purchase-return-form/purchase-return-form.component';
import { PurchaseReturnComponent } from './purchasereturn.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbTypeaheadModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { PurchaseReturnStatusNamePipe } from 'src/app/Shared/Pipe/purchase-return-status-name.pipe';

const purchaseReturnComponentsArray =[
  PurchaseReturnComponent, PurchaseReturnFormComponent, PurchaseReturnDetailsComponent
]

@NgModule({
  declarations: [
    purchaseReturnComponentsArray, PurchaseReturnStatusNamePipe
  ],
  imports: [
    CommonModule, FormsModule, NgbTypeaheadModule, RouterModule, NgbDropdownModule
  ], 
  providers:[
    DatePipe
  ],
  exports:[purchaseReturnComponentsArray]
})
export class PurchaseReturnModule { }
