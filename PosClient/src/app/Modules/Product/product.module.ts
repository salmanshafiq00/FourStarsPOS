import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category/category.component';
import { ItemComponent } from './item/item.component';
import { UnitComponent } from './unit/unit.component';
import { CategoryFormComponent } from './category/category-form/category-form.component';
import { ItemFormComponent } from './item/item-form/item-form.component';
import { UnitFormComponent } from './unit/unit-form/unit-form.component';
import { BrandComponent } from './brand/brand.component';
import { BrandFormComponent } from './brand/brand-form/brand-form.component';
import { RouterModule } from '@angular/router';
import { NgbDropdown, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

const productComponentsArray = [
  BrandComponent, BrandFormComponent, CategoryComponent, CategoryFormComponent, ItemComponent, ItemFormComponent, UnitComponent, UnitFormComponent
]

@NgModule({
  declarations: [
    productComponentsArray
  ],
  imports: [
    CommonModule, RouterModule, NgbDropdownModule, FormsModule
  ], exports: [
    productComponentsArray
  ]
})
export class ProductModule { }
