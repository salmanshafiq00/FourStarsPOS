import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { City } from 'src/app/Core/Models/city.model';
import { Country } from 'src/app/Core/Models/country.model';
import { State } from 'src/app/Core/Models/state.model';
import { Supplier } from 'src/app/Core/Models/supplier.model';
import { DataListRepositoryService } from 'src/app/Core/Services/data-list-repository.service';
import { RestDataService } from 'src/app/Core/Services/rest.service';

@Component({
  selector: 'app-supplier-form',
  templateUrl: './supplier-form.component.html',
  styleUrls: ['./supplier-form.component.css'],
})
export class SupplierFormComponent implements OnInit {
  public stateData: State[];
  public cityData: City[];
  public routeData? = Number(location.pathname.split('/')[3]);
  public buttonMode : string = "Save";
  public formData: Supplier = new Supplier();

  private url: string = 'http://localhost:5000/api/';

  constructor(
    private service: RestDataService,
    public repo: DataListRepositoryService,
    private route: Router
  ) {}

  getDataAll() {
    if (this.routeData > 0) {
      if (this.repo.supplierData.find((f) => f.id == this.routeData) == undefined) {
        this.formData = new Supplier();
      }
      else{
        this.formData = this.repo.supplierData.find((f) => f.id == this.routeData);
        this.buttonMode = "Update";
      }
    }
  }
  getAllState(countryId: number) {
    if (this.repo.stateData.length == 0) {
      this.service.GetAll<State>(this.url + 'state').subscribe((res) => {
        this.stateData = res.filter((e) => e.countryId == countryId);        
      });
    } else {
      this.stateData = this.repo.stateData.filter(
        (e) => e.countryId == countryId
      );
    }
  }

  getAllCity(stateId: number) {
    if (this.repo.cityData.length == 0) {
      this.service.GetAll<City>(this.url + 'city').subscribe((res) => {
        this.cityData = res.filter((e) => e.stateId == stateId);
      });
    } else {
      this.cityData = this.repo.cityData.filter((e) => e.stateId == stateId);
    }
  }

  submit(form: NgForm) {
    if (form.valid) {
      if (this.routeData > 0) {
        this.formData.id = this.routeData;
        this.service
          .Update<Supplier>(
            this.formData,
            this.url + 'supplier/' + this.routeData
          )
          .subscribe((res) => {
            var index = this.repo.supplierData.indexOf(this.formData);
            this.repo.supplierData.splice(index, 1, this.formData);
            alert('Data updated');
            this.route.navigateByUrl('supplier');
          });
      } else {
        this.formData.id = 0;
        this.service
          .Insert<Supplier>(this.formData, this.url + 'supplier')
          .subscribe((res) => {
            this.repo.supplierData.push(res);
            alert('Data Inserted');
            form.reset();
          });
      }
    }
  }

  ngOnInit(): void {
    this.getDataAll();
    this.getAllCountry();
  }

  private getAllCountry() {
    if (this.repo.countryData.length == 0) {
      this.service.GetAll<Country>(this.url + 'country').subscribe(res =>  this.repo.countryData = res);
    } 
  }
}
