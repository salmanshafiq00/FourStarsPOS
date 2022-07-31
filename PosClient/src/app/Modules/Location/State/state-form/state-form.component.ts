import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Country } from 'src/app/Core/Models/country.model';
import { State } from 'src/app/Core/Models/state.model';
import { DataListRepositoryService } from 'src/app/Core/Services/data-list-repository.service';
import { RestDataService } from 'src/app/Core/Services/rest.service';

@Component({
  selector: 'app-state-form',
  templateUrl: './state-form.component.html',
  styleUrls: ['./state-form.component.css']
})
export class StateFormComponent implements OnInit {

  public routeData? = Number(location.pathname.split('/')[3]);
  public formData : State = new State();
  public buttonMode : string = "Save";
  private url : string = "http://localhost:5000/api/";
  
  constructor(private service : RestDataService, private repo: DataListRepositoryService, private route: Router) { }
  
  getDataAll() {

    if (this.routeData > 0) {
      if (this.repo.stateData.find(f => f.id == this.routeData) == undefined) {
        this.formData = new State();
      }
      else{
        this.formData = this.repo.stateData.find(f => f.id == this.routeData);
      
      }
      this.buttonMode = "Update";
    }

  }


  submit(form : NgForm){
    if (form.valid) {
      if (this.routeData > 0) {
        this.formData.id = this.routeData;
        this.service.Update<State>(this.formData, this.url+"state/" + this.routeData).subscribe(res => {
          alert("Data updated");
          var index = this.repo.stateData.indexOf(this.formData);
          this.repo.stateData.splice(index, 1, this.formData);
          this.route.navigateByUrl("state");
        })
      }else{
        this.formData.id = 0;
        this.service.Insert<State>(this.formData, this.url+"state").subscribe(res => {
          alert("Data Inserted");
          this.repo.stateData.push(res);
          form.reset();
        })
      }
    }

  }

  countryList : any;
  ngOnInit(): void {
    this.service.GetAll<Country>(this.url+"country").subscribe(res => this.countryList = res);
    this.getDataAll();
  }

}
