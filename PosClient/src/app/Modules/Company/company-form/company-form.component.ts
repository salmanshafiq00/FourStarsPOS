import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { City } from 'src/app/Core/Models/city.model';
import { CompanyInfo } from 'src/app/Core/Models/company-info.model';
import { Country } from 'src/app/Core/Models/country.model';
import { State } from 'src/app/Core/Models/state.model';
import { DataListRepositoryService } from 'src/app/Core/Services/data-list-repository.service';
import { RestDataService } from 'src/app/Core/Services/rest.service';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.css']
})
export class CompanyFormComponent implements OnInit {

  public stateData: State[];
  public cityData: City[];
  public routeData? = Number(location.pathname.split('/')[3]);
  public formData : CompanyInfo = new CompanyInfo();
  public sampleImage : string = "/assets/Logo.PNG";
  public imagePlaceHolder : string;
  public buttonMode : string = "Save";
  private url : string = "http://localhost:5000/api/";

  constructor(private service : RestDataService, public repo: DataListRepositoryService, private route: Router) { }
  

  getDataAll() {   
    if (this.routeData > 0) {      
      if((this.repo.companyData.find(f => f.id == this.routeData)) == undefined){
        this.formData = new CompanyInfo();        
      }
      else{
        this.formData = this.repo.companyData.find(f => f.id == this.routeData);
        this.imagePlaceHolder = this.formData.companyLogo;
      }
      this.buttonMode = "Update";
    }
    
  }

  getStateById(countryId: number) {
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

  getCityById(stateId: number) {
    if (this.repo.cityData.length == 0) {
      this.service.GetAll<City>(this.url + 'city').subscribe((res) => {
        this.cityData = res.filter((e) => e.stateId == stateId);
      });
    } else {
      this.cityData = this.repo.cityData.filter((e) => e.stateId == stateId);
    }
  }

 
  submit(form : NgForm){
    if (form.valid) {
      if (this.routeData > 0) {
        this.formData.companyLogo = this.imagePlaceHolder;
        this.formData.id = this.routeData;
        this.service.Update<CompanyInfo>(this.formData, this.url+"companyinfo/" + this.routeData).subscribe(res => {
          alert("Data updated");
          var index = this.repo.companyData.indexOf(this.formData);
          this.repo.companyData.splice(index, 1, this.formData);
          this.route.navigateByUrl("company");
        })
      }else{
        this.formData.id = 0;
        this.service.Insert<CompanyInfo>(this.formData, this.url+"companyinfo").subscribe(res => {
          alert("Data Inserted");
          this.repo.companyData.push(res);
          form.reset();
          this.imagePlaceHolder = this.sampleImage;
        });
      }
    }

  }

  onChange(event : any){

    if(event.target.files && event.target.files[0]){
      const reader = new FileReader();
      reader.onload = (e : any) => {
        this.formData.companyLogo = e.target.result;
        this.imagePlaceHolder = e.target.result;
      };

      reader.readAsDataURL(event.target.files[0]);
    }
  }

  ngOnInit(): void {
    this.imagePlaceHolder = this.sampleImage;
    this.getDataAll();
    this.getAllCountry();
   
  }

  private getAllCountry() {
    if (this.repo.countryData.length == 0) {
      this.service.GetAll<Country>(this.url + 'country').subscribe(res =>  this.repo.countryData = res);
    } 
  }

}
