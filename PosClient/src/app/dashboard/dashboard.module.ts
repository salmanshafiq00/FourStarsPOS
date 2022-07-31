import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule } from '@angular/router';
import { NgChartsModule } from 'ng2-charts';



@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule, RouterModule, NgChartsModule
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule { }
