import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/Core/Models/category.model';
import { Unit } from 'src/app/Core/Models/unit.model';
import { DataListRepositoryService } from 'src/app/Core/Services/data-list-repository.service';
import { RestDataService } from 'src/app/Core/Services/rest.service';

@Component({
  selector: 'app-unit-form',
  templateUrl: './unit-form.component.html',
  styleUrls: ['./unit-form.component.css']
})
export class UnitFormComponent implements OnInit {
  public buttonMode : string = "Save";
  public routeData?= Number(location.pathname.split('/')[3]);
  public formData: Unit = new Unit();

  private url: string = "http://localhost:5000/api/";

  constructor(private service: RestDataService, private repo: DataListRepositoryService, private route: Router) { }
   
  
    getEdit() {
      if (this.routeData > 0) {
        if (this.repo.unitData.find(f => f.id == this.routeData) == undefined) {
          this.formData = new Unit();
        }
        else{
          this.formData = this.repo.unitData.find(f => f.id == this.routeData);
        }
        this.buttonMode = "Update";
      }
    }
  
    submit(form: NgForm) {
      if (form.valid) {
        if (this.routeData > 0) {
          this.formData.id = this.routeData;
          this.service.Update<Unit>(this.formData, this.url + "unit/" + this.routeData).subscribe(res => {
            alert("Data updated");
            var index = this.repo.unitData.indexOf(this.formData);
            this.repo.unitData.splice(index, 1, this.formData);
            this.route.navigateByUrl("unit");
          })
        } else {
          this.formData.id = 0;
          this.service.Insert<Unit>(this.formData, this.url + "unit").subscribe(res => {
            alert("Data Inserted");
            this.repo.unitData.push(res);
            form.reset();
          });
        }
      }
  
    }
  
    ngOnInit(): void {
      this.getEdit();
    }
  
  }
  