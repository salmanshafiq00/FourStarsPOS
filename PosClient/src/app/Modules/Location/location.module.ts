import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CityComponent } from './City/city.component';
import { StateComponent } from './State/state.component';
import { CountryComponent } from './Country/country.component';
import { CityFormComponent } from './City/city-form/city-form.component';
import { StateFormComponent } from './State/state-form/state-form.component';
import { CountryFormComponent } from './Country/country-form/country-form.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

const locationComponentsArray = [
  CityComponent, StateComponent, CountryComponent, CityFormComponent, StateFormComponent, CountryFormComponent
]


@NgModule({
  declarations: [
    locationComponentsArray
  ],
  imports: [
    CommonModule,
    FormsModule, RouterModule, NgbDropdownModule

  ], exports: [
    locationComponentsArray
  ]
})
export class LocationModule { }
