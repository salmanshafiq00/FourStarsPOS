import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { FooterComponent } from './footer/footer.component';
import { RouterLink, RouterModule } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { NgbAccordion, NgbAccordionModule, NgbDropdownMenu, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

const layoutComponentsArray=[
  LayoutComponent, FooterComponent ,ErrorComponent
]

@NgModule({
  declarations: [
    layoutComponentsArray
  ],
  imports: [
    CommonModule , RouterModule, NgbAccordionModule
  ], exports:[
    layoutComponentsArray
  ]
})
export class LayoutModule { }
