import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { City } from 'src/app/Core/Models/city.model';
import { Country } from 'src/app/Core/Models/country.model';
import { State } from 'src/app/Core/Models/state.model';
import { DataListRepositoryService } from 'src/app/Core/Services/data-list-repository.service';
import { RestDataService } from 'src/app/Core/Services/rest.service';

@Component({
  selector: 'app-city-form',
  templateUrl: './city-form.component.html',
  styleUrls: ['./city-form.component.css']
})
export class CityFormComponent implements OnInit {

  public routeData?= Number(location.pathname.split('/')[3]);
  public formData: City = new City();
  public buttonMode : string = "Save";
  public stateData: State[];

  private url: string = "http://localhost:5000/api/";

  constructor(private service: RestDataService, public repo: DataListRepositoryService, private route: Router) {
  }

  getDataAll() {
    if (this.routeData > 0) {
      if (this.repo.cityData.find(f => f.id == this.routeData) == undefined) {
        this.formData = new City();
      }
      else{
        this.formData = this.repo.cityData.find(f => f.id == this.routeData);
      }
      this.buttonMode = "Update";
    }
  }


  submit(form: NgForm) {
    if (form.valid) {
      if (this.routeData > 0) {
        this.formData.id = this.routeData;
        this.service.Update<City>(this.formData, this.url + "city/" + this.routeData).subscribe(res => {
          alert("Data updated");
          var index = this.repo.cityData.indexOf(this.formData);
          this.repo.cityData.splice(index, 1, this.formData);
          this.route.navigateByUrl("city");
        })
      } else {
        this.formData.id = 0;
        this.service.Insert<City>(this.formData, this.url + "city").subscribe(res => {
          alert("Data Inserted");
          this.repo.cityData.push(res);
          form.reset();
        })
      }
    }

  }



  getStateById(countryId: any) {   
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


  ngOnInit(): void {
    this.getDataAll();
    this.getAllCountry();
  }

  private getAllCountry() {    
    if (this.repo.countryData.length == 0) {
      this.service.GetAll<Country>(this.url + "country").subscribe(res => {this.repo.countryData = res});
    }

  }
}
