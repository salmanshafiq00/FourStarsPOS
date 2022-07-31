import { Component, OnInit } from '@angular/core';
import { City } from 'src/app/Core/Models/city.model';
import { CompanyInfo } from 'src/app/Core/Models/company-info.model';
import { State } from 'src/app/Core/Models/state.model';

import { DataListRepositoryService } from 'src/app/Core/Services/data-list-repository.service';
import { RestDataService } from 'src/app/Core/Services/rest.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css'],
})
export class CompanyComponent implements OnInit {
  private url: string = 'http://localhost:5000/api/';

  constructor(
    private service: RestDataService,
    public repo: DataListRepositoryService
  ) {

  }

  deleteRow(id: number) {
    var record = this.repo.companyData.find((e) => e.id == id);
    this.service
      .Delete<CompanyInfo>(this.url + 'companyinfo/' + record.id)
      .subscribe((res) => {
        alert('Data Deleted Successfully');
        this.repo.companyData.splice(this.repo.companyData.indexOf(record));
      });
  }

  getStateById(id: number): string {    
    if (id != undefined) {
      return this.repo.stateData.find((state) => state.id == id).name;
    } else {
      return '';
    }
  }

  getCityById(id: number): string {
    if (id != undefined) {
      return this.repo.cityData.find((city) => city.id == id).name;
    } else {
      return '';
    }
  }

  ngOnInit(): void {
    this.getAllData();
    this.getAllState();
    this.getAllCity();

  }

  private getAllData() {
    if (this.repo.companyData.length == 0) {
      this.repo.companyData = this.repo.getRecords('companyinfo');
    }
  }

  private getAllState() {
    if (this.repo.stateData.length == 0) {
      this.service.GetAll<State>(this.url + 'state').subscribe(res =>  {this.repo.stateData = res});
    } 
  }

  private getAllCity() {
    if (this.repo.cityData.length == 0) {
      this.service.GetAll<City>(this.url + 'city').subscribe(res =>  this.repo.cityData = res);
    } 
  }
}
